import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';
import { siteConfig } from '@/data/site';

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be 2–80 characters').max(80, 'Name must be 2–80 characters'),
  email: z.string().trim().max(120, 'Valid email required').email('Valid email required'),
  message: z.string().trim().min(10, 'Message must be 10–4000 characters').max(4000, 'Message must be 10–4000 characters'),
  // Honeypot. Named so browser autofill won't touch it (a field called
  // "company"/"organization" gets filled from saved contact profiles, which
  // would silently drop a real message).
  hp_field: z.string().optional(),
});

// Distributed limiter for production. Falls back to per-worker in-memory
// for dev when Upstash env vars are missing.
const upstashConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = upstashConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(MAX_PER_WINDOW, '60 s'),
      analytics: true,
      prefix: 'contact',
    })
  : null;

if (!ratelimit && process.env.NODE_ENV === 'production') {
  console.warn(
    '[contact] Upstash env missing — using per-worker in-memory limiter, which is not safe in multi-instance serverless. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.',
  );
}

const hits = new Map<string, number[]>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [ip, times] of hits) {
    const fresh = times.filter((t) => now - t < WINDOW_MS);
    if (fresh.length === 0) hits.delete(ip);
    else hits.set(ip, fresh);
  }
}

function allowMemory(ip: string) {
  const now = Date.now();
  sweep(now);
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

async function allow(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return success;
  }
  return allowMemory(ip);
}

let _resend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

function allowedOriginsFor(req: Request): Set<string> {
  const host = req.headers.get('host');
  return new Set(
    [
      host ? `https://${host}` : null,
      host ? `http://${host}` : null,
      siteConfig.url,
    ].filter((v): v is string => v !== null),
  );
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  const allowed = allowedOriginsFor(req);
  if (!origin || !allowed.has(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  const allowedOrigins = allowedOriginsFor(req);
  if (!origin || !allowedOrigins.has(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const cors = corsHeaders(origin);

  // x-real-ip is set by trusted proxies (Vercel/Cloudflare).
  // Bare x-forwarded-for is client-spoofable, so it's the last resort.
  const ip =
    req.headers.get('x-real-ip') ??
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  if (!(await allow(ip))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: cors });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: cors });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400, headers: cors },
    );
  }
  const { name, email, message, hp_field } = parsed.data;

  // Honeypot: real users never fill this; bots fill every field.
  if (hp_field && hp_field.length > 0) {
    return NextResponse.json({ ok: true }, { headers: cors });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503, headers: cors });
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const toAddress = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  // Strip control chars to defend against header-injection in any downstream relay.
  const safeName = name.replace(/[\r\n\t]/g, '');
  const safeEmail = email.replace(/[\r\n\t]/g, '');

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromAddress}>`,
      to: [toAddress],
      replyTo: safeEmail,
      subject: `Portfolio inquiry from ${safeName}`,
      text: `From: ${safeName} <${safeEmail}>\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 502, headers: cors });
    }
    return NextResponse.json({ ok: true }, { headers: cors });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502, headers: cors });
  }
}

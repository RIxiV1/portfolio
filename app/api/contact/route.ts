import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function allow(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

let _resend: Resend | null = null;
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!_resend) _resend = new Resend(key);
  return _resend;
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin') ?? '';
  const host = req.headers.get('host') ?? '';
  if (origin && host && !origin.endsWith(host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  if (!allow(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    company?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: real users never fill this; bots fill every field.
  if (body.company && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Name must be 2–80 characters' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }
  if (message.length < 10 || message.length > 4000) {
    return NextResponse.json({ error: 'Message must be 10–4000 characters' }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }

  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const toAddress = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromAddress}>`,
      to: [toAddress],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }
}

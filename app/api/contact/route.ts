import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { siteConfig } from '@/data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
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

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';
  const toAddress = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
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

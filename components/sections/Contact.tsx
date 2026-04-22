'use client';

import { useState } from 'react';
import { Mail, Send, AlertCircle, Check } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

import { siteConfig } from '@/data/site';

const socials = siteConfig.socials;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const headerRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const validate = () => {
    if (form.name.trim().length < 2) return 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) return 'Please enter a valid email.';
    if (form.message.trim().length < 10) return 'Message must be at least 10 characters.';
    return null;
  };

  const mailtoFallback = () => {
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${form.name}`,
    )}&body=${encodeURIComponent(form.message)}`;
    window.open(mailto);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus('error');
      setErrorMsg(v);
      return;
    }

    setStatus('sending');
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company: honeypot }),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        return;
      }

      if (res.status === 503) {
        mailtoFallback();
        setStatus('sent');
        return;
      }

      const data = await res.json().catch(() => ({}));
      setStatus('error');
      setErrorMsg(data.error ?? 'Something went wrong. Try again.');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Try again or email me directly.');
    }
  };

  const sending = status === 'sending';
  const sent = status === 'sent';

  return (
    <section id="contact" className="section-padding container-narrow">
      <div ref={headerRef} className="reveal-up flex flex-col mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Say Hello
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Let's connect.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: info */}
        <div ref={leftRef} className="reveal-left lg:col-span-2 flex flex-col gap-6">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Email
              </span>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-lg font-medium text-white hover:text-neutral-300 transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-5">
              Find me on
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white hover:text-black hover:border-white text-neutral-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div ref={rightRef} className="reveal-right lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={errorMsg ? 'contact-error' : undefined}
            className="card p-8 flex flex-col gap-5"
          >
            {/* Honeypot: hidden from humans, filled by bots. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] top-[-9999px] w-0 h-0 overflow-hidden"
            >
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-500"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  aria-required="true"
                  disabled={sending || sent}
                  className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all placeholder:text-neutral-600 text-sm text-white focus:border-white/50 disabled:opacity-60"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-500"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  required
                  aria-required="true"
                  disabled={sending || sent}
                  className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all placeholder:text-neutral-600 text-sm text-white focus:border-white/50 disabled:opacity-60"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-mono text-[10px] uppercase tracking-widest text-neutral-500"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project or idea..."
                required
                aria-required="true"
                disabled={sending || sent}
                className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all resize-none placeholder:text-neutral-600 text-sm text-white focus:border-white/50 disabled:opacity-60"
              />
            </div>

            {errorMsg && (
              <p
                id="contact-error"
                role="alert"
                className="flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={sending || sent}
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-mono uppercase tracking-wider text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:cursor-not-allowed ${
                sent ? 'bg-emerald-500 text-white' : 'bg-white text-black'
              }`}
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4" />
                  Message sent
                </>
              ) : sending ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

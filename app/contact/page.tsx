'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Mail, Copy, Check, Sparkles, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { ContactForm } from '@/components/ui/contact-form'
import { FadeUp } from '@/components/ui/fade-up'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to Overview
        </Link>

        {/* Page Header */}
        <FadeUp>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">04 / Connect</span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Say Hi</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Let&apos;s Build Something.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              I&apos;m looking for summer 2026 internships where I can work on real products, write code, and learn from a strong engineering &amp; product team.
            </p>
          </div>
        </FadeUp>

        {/* Availability Card & Fast Contact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeUp delay={0.05}>
            <div className="rounded-2xl border border-border/80 bg-elevated/40 p-5 backdrop-blur-sm space-y-2 h-full">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Current Status</span>
              <div className="flex items-center gap-2 pt-1 font-medium text-positive text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-positive/60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
                </span>
                Open for Internships
              </div>
              <p className="text-xs text-muted-foreground">Summer 2026 · Remote or Chennai</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-border/80 bg-elevated/40 p-5 backdrop-blur-sm space-y-2 h-full">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Location</span>
              <div className="flex items-center gap-1.5 pt-1 font-medium text-foreground text-sm">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Chennai, India
              </div>
              <p className="text-xs text-muted-foreground">IST (UTC +5:30)</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="rounded-2xl border border-border/80 bg-elevated/40 p-5 backdrop-blur-sm space-y-2 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Direct Email</span>
                <p className="pt-1 font-mono text-xs text-foreground font-semibold truncate">{siteConfig.email}</p>
              </div>
              <button
                onClick={copyEmail}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-positive" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" /> Copy Email
                  </>
                )}
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Contact Form Container */}
        <FadeUp delay={0.2}>
          <div className="mt-12 rounded-3xl border border-border/80 bg-elevated/50 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[var(--card-shadow)] space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-semibold text-foreground">Send a Message</h2>
              <p className="text-sm text-muted-foreground">Fill out the form below and it goes straight to my inbox.</p>
            </div>

            <ContactForm />
          </div>
        </FadeUp>

        {/* Social Links Grid */}
        <div className="mt-14 space-y-4">
          <FadeUp delay={0.25}>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Other Channels</span>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {siteConfig.socials.map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-border/70 bg-elevated/30 p-4 transition-all hover:border-accent/40 hover:bg-elevated/60"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-accent" />
                    <div>
                      <span className="font-medium text-xs text-foreground block">{label}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">{handle}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </main>
  )
}

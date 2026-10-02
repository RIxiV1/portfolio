'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Code2, Database, Cpu, Layout, Terminal, Wrench, ShieldCheck, Sparkles } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'

const categoryIcons = {
  'Languages & Core': Code2,
  'Frontend & Frameworks': Layout,
  'Backend & Infrastructure': Database,
  'AI & Machine Learning Tooling': Cpu,
  'System & Workflow': Terminal,
}

export default function StackPage() {
  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
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
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">03 / Workbench</span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tech Stack &amp; Tools</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              What I Actually Use
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Here is the stack of languages, frameworks, cloud services, and developer tooling I rely on daily to ship reliable software.
            </p>
          </div>
        </FadeUp>

        {/* Categorized Stack Grid */}
        <div className="mt-16 space-y-12">
          {siteConfig.stackCategories?.map((cat, idx) => {
            const IconComponent = (categoryIcons as any)[cat.name] || Wrench

            return (
              <FadeUp key={cat.name} delay={idx * 0.06}>
                <section className="rounded-3xl border border-border/80 bg-elevated/40 p-6 sm:p-8 backdrop-blur-md shadow-[var(--card-shadow)]">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-muted/40 text-accent">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-foreground">{cat.name}</h2>
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="group flex flex-col justify-between rounded-xl border border-border/60 bg-muted/30 p-4 transition-all duration-200 hover:border-accent/40 hover:bg-muted/60"
                      >
                        <span className="font-mono text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.name}
                        </span>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                          {item.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </FadeUp>
            )
          })}
        </div>

        {/* Technical Principles */}
        <div className="mt-20 space-y-6">
          <FadeUp>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Tech Opinions</span>
              <h2 className="font-display text-2xl font-semibold text-foreground">Stack Choices &amp; Opinions</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FadeUp delay={0.05}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-2 h-full">
                <ShieldCheck className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-base font-semibold text-foreground">Postgres RLS &gt; App Logic</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Securing data at the database layer means accidental buggy frontend queries physically cannot leak another user&apos;s data.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-2 h-full">
                <Cpu className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-base font-semibold text-foreground">Client-side OCR for Health</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In Digital Clinic, parsing lab PDFs in the browser guarantees patient documents never touch a remote third-party server.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-2 h-full">
                <Sparkles className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-base font-semibold text-foreground">Shadow DOM for Extensions</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In InfoBlend, using Shadow DOM walls off the UI so website CSS never breaks the extension and vice versa.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Footer CTA */}
        <FadeUp delay={0.2}>
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-border/80 bg-elevated/50 p-8 backdrop-blur-md">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-foreground">Want to talk tech or build something?</h3>
              <p className="text-xs text-muted-foreground">Always happy to talk about Linux, AI pipelines, or software architecture.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong shrink-0"
            >
              Reach Out <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  )
}

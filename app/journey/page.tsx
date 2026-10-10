'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Terminal,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'

export default function JourneyPage() {
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
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                02 / Journey
              </span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Background &amp; Philosophy
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Where I&apos;ve Been &amp; How I Think
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              I&apos;m an Information Technology undergraduate in Chennai who
              likes building software, experimenting with AI workflows, and
              figuring out what makes products actually useful.
            </p>
          </div>
        </FadeUp>

        {/* Experience Timeline */}
        <div className="mt-16 space-y-12">
          <FadeUp delay={0.05}>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Timeline
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Experience &amp; Education
              </h2>
            </div>
          </FadeUp>

          <div className="relative border-l border-border/80 pl-6 ml-2 space-y-10 md:pl-8">
            {siteConfig.experience.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-accent md:-left-[39px]">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-elevated/50 p-6 md:p-7 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-[var(--card-shadow)]">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs text-subtle-foreground">
                        {item.period}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2 text-sm font-medium text-accent">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{item.org}</span>
                    </div>

                    <p className="mt-3 leading-relaxed text-muted-foreground text-sm md:text-base">
                      {item.description}
                    </p>

                    {(item as any).details && (
                      <details
                        className="group/details mt-5 border-t border-border/50 pt-4"
                        open
                      >
                        <summary className="cursor-pointer text-xs font-mono uppercase tracking-widest text-accent hover:underline focus:outline-none flex items-center gap-1 list-none [&::-webkit-details-marker]:hidden font-semibold">
                          Breakdown &amp; Key Learnings{' '}
                          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open/details:rotate-180" />
                        </summary>
                        <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground text-xs uppercase font-mono tracking-wider">
                              What I actually did
                            </h4>
                            <ul className="space-y-2">
                              {(item as any).details.actions.map(
                                (action: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                                    <span className="text-foreground/90">
                                      {action}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-1">
                            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                              Biggest Takeaway
                            </h4>
                            <p className="text-foreground/90 font-medium">
                              {(item as any).details.learned}
                            </p>
                          </div>
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}

            {/* Education Card */}
            <FadeUp delay={0.25}>
              <div className="relative group">
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-accent md:-left-[39px]">
                  <GraduationCap className="h-2.5 w-2.5 text-accent" />
                </div>

                <div className="rounded-2xl border border-border/80 bg-elevated/40 p-6 backdrop-blur-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      Undergraduate Degree
                    </span>
                    <p className="font-medium text-foreground text-base">
                      {siteConfig.education.degree}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {siteConfig.education.school}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                    {siteConfig.education.period}
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Product & Engineering Philosophy */}
        <div className="mt-24 space-y-10">
          <FadeUp>
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Principles
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                How I Approach Building Things
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeUp delay={0.05}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent">01</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Talk through the problem first
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Building something is easy compared to deciding what should
                    be built. I prefer sketching out user flows and talking
                    through edge cases before jumping straight to code.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent">02</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Make it work out of the box
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tools shouldn&apos;t be dead weight until you hand over an
                    API key or credit card. Products should offer immediate
                    value for free, with advanced options as optional upgrades.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent">03</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Security by architecture, not trust
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Whether it&apos;s isolating user tables with PostgreSQL
                    Row-Level Security or processing health reports client-side
                    with OCR, privacy should be structurally enforced.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-accent">04</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Learn by breaking things
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I don&apos;t pretend to know everything upfront. I prototype
                    quickly, see where the system bottlenecks or crashes, and
                    iterate until it runs smoothly and reliably.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Quick Connect CTA */}
        <FadeUp delay={0.25}>
          <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-border/80 bg-elevated/50 p-8 backdrop-blur-md">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Looking for a Product / Dev Intern?
              </h3>
              <p className="text-sm text-muted-foreground">
                I&apos;m available for Summer 2026 internships where I can ship
                real software.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong shrink-0"
            >
              Get in Touch <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  )
}

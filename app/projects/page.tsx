'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'All',
  'AI & Healthcare',
  'Extensions & Web',
  'FinTech & Security',
] as const
type Category = (typeof CATEGORIES)[number]

function getProjectCategory(slug: string): Category {
  switch (slug) {
    case 'digital-clinic':
    case 'caliber':
      return 'AI & Healthcare'
    case 'infoblend':
      return 'Extensions & Web'
    case 'subsentry':
      return 'FinTech & Security'
    default:
      return 'All'
  }
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')

  const filteredProjects = siteConfig.projects.filter((p) => {
    if (selectedCategory === 'All') return true
    return getProjectCategory(p.slug) === selectedCategory
  })

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
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                01 / Directory
              </span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Curated Index
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Projects &amp; Builds
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              A collection of tools, browser extensions, and full-stack systems
              I&apos;ve designed and shipped. Most started because something
              annoyed me and I wanted to build a cleaner solution.
            </p>
          </div>
        </FadeUp>

        {/* Interactive Filter Pills */}
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 pt-10 pb-6 border-b border-border/60">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count =
                cat === 'All'
                  ? siteConfig.projects.length
                  : siteConfig.projects.filter(
                      (p) => getProjectCategory(p.slug) === cat,
                    ).length

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all duration-200',
                    isSelected
                      ? 'bg-foreground text-background font-semibold shadow-md'
                      : 'border border-border/80 bg-elevated/40 text-muted-foreground hover:bg-elevated hover:text-foreground',
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      'text-[10px] tabular-nums',
                      isSelected ? 'opacity-80' : 'text-subtle-foreground',
                    )}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 pt-10">
          {filteredProjects.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.06}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-elevated/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl shadow-[var(--card-shadow)]">
                <div className="space-y-4">
                  {/* Visual Preview */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 group/media">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={`${p.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectPosition: p.imagePosition ?? 'center' }}
                        className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.04]"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />

                    <Link
                      href={`/projects/${p.slug}`}
                      className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/media:opacity-100"
                    >
                      <span className="flex items-center gap-1.5 rounded-full border border-border/80 bg-elevated/95 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-foreground shadow-xl">
                        Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.year}
                    </span>
                    {p.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/30 bg-positive/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-positive font-semibold">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inset-0 rounded-full bg-positive/60 motion-safe:animate-ping" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
                        </span>
                        {p.status}
                      </span>
                    )}
                  </div>

                  {/* Title & Story */}
                  <div className="space-y-2">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {p.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.builtBecause ? p.builtBecause : p.description}
                    </p>
                  </div>
                </div>

                {/* Footer stack & links */}
                <div className="mt-6 space-y-4 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group/link inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-accent"
                    >
                      Read Case Study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    <div className="flex items-center gap-3">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Live <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        {/* Creative Callout Banner */}
        <FadeUp delay={0.2}>
          <div className="mt-20 rounded-2xl border border-border/70 bg-elevated/40 p-8 text-center backdrop-blur-sm space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-accent mx-auto">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Want to see how these were engineered?
            </h3>
            <p className="max-w-md mx-auto text-sm text-muted-foreground">
              Every project has a complete writeup covering the actual problem,
              architectural decisions, and what broke along the way.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-strong"
              >
                Discuss a Project <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </main>
  )
}

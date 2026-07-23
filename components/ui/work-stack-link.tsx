'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ProjectArt } from '@/components/ui/project-art'

type Project = {
  title: string
  year: string
  slug: string
  description: string
  hook?: string
  tech: string[]
  href: string
  liveUrl?: string
  accent: string
  caseStudy?: unknown
}

function projectDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-t border-foreground/[0.05]">
      {projects.map((p, i) => {
        const hasCaseStudy = !!p.caseStudy
        const linkProps = hasCaseStudy
          ? { href: `/projects/${p.slug}` as const }
          : {
              href: p.href,
              target: '_blank' as const,
              rel: 'noopener noreferrer',
            }
        const LinkComp = hasCaseStudy ? Link : 'a'
        const domain = projectDomain(p.href)

        return (
          <li
            key={p.title}
            className="border-b border-foreground/[0.05] transition-colors duration-300 hover:border-[color:var(--project-accent)]/30"
            style={
              {
                ['--project-accent' as string]: p.accent,
              } as React.CSSProperties
            }
          >
            <LinkComp
              {...linkProps}
              className="group relative grid grid-cols-[36px_1fr] gap-x-4 gap-y-2 py-8"
            >
              <ProjectArt
                seed={p.title}
                className="pointer-events-none absolute right-0 top-6 hidden h-20 w-20 md:block"
              />
              <span className="pt-2 font-mono text-[10px] uppercase tracking-widest tabular-nums text-muted-foreground/50 transition-colors group-hover:text-[color:var(--project-accent)]">
                P{String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-3 md:pr-28">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[color:var(--project-accent)]">
                    {p.title}
                    <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-0.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-60" />
                  </h3>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                    {p.year}
                  </span>
                </div>
                <p className="max-w-xl leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                {p.hook && (
                  <p className="max-w-xl text-sm leading-relaxed text-foreground/55">
                    <span className="text-[color:var(--project-accent)]/70">
                      →{' '}
                    </span>
                    {p.hook}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                  <ul className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[color:var(--border)] px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[color:var(--project-accent)]/40 hover:text-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-2 font-mono text-[10px] text-[color:var(--project-accent)]/70 opacity-80 transition-opacity group-hover:opacity-100">
                    {p.liveUrl && (
                      <span className="rounded-full bg-[color:var(--project-accent)]/15 px-2 py-0.5">
                        live
                      </span>
                    )}
                    {hasCaseStudy && <span>↗ case study</span>}
                    {!hasCaseStudy && domain && <span>↗ {domain}</span>}
                  </span>
                </div>
              </div>
            </LinkComp>
          </li>
        )
      })}
    </ul>
  )
}

// The one project that gets star treatment — a card, not a list row, so the
// eye lands here first and the rest read as supporting work.
export function FeaturedProject({ project: p }: { project: Project }) {
  const hasCaseStudy = !!p.caseStudy
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[color:var(--project-accent)]/25 bg-[color:var(--project-accent)]/[0.03] p-8 md:p-10"
      style={
        { ['--project-accent' as string]: p.accent } as React.CSSProperties
      }
    >
      <ProjectArt
        seed={p.title}
        className="pointer-events-none absolute -right-8 -top-8 hidden h-44 w-44 opacity-50 md:block"
      />
      <div className="relative flex flex-col gap-4 md:pr-36">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--project-accent)]">
          Featured
        </span>
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
          <h3 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {p.title}
          </h3>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {p.year}
          </span>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-foreground/80">
          {p.description}
        </p>
        {p.hook && (
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/55">
            <span className="text-[color:var(--project-accent)]/70">→ </span>
            {p.hook}
          </p>
        )}
        <ul className="flex flex-wrap gap-2 pt-1">
          {p.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors duration-200 hover:border-[color:var(--project-accent)]/40 hover:text-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 font-mono text-xs">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[color:var(--project-accent)] hover:underline"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--project-accent)]/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--project-accent)]" />
              </span>
              Live
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
          {hasCaseStudy && (
            <Link
              href={`/projects/${p.slug}`}
              className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-[color:var(--project-accent)]"
            >
              Read the case study
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          )}
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            Source
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

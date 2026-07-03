'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { ProjectArt } from '@/components/ui/project-art'

type Project = {
  title: string
  year: string
  slug: string
  description: string
  tech: string[]
  href: string
  liveUrl?: string
  accent: string
  caseStudy?: unknown
}

type StackGroup = {
  group: string
  items: string[]
}

type CrossLinkValue = {
  hovered: string | null
  setHovered: (t: string | null) => void
}

const CrossLinkCtx = createContext<CrossLinkValue>({
  hovered: null,
  setHovered: () => {},
})

const norm = (s: string) => s.toLowerCase().trim()

export function CrossLinkProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <CrossLinkCtx.Provider value={{ hovered, setHovered }}>
      {children}
    </CrossLinkCtx.Provider>
  )
}

function projectDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  const { hovered, setHovered } = useContext(CrossLinkCtx)

  return (
    <ul className="border-t border-foreground/[0.05]">
      {projects.map((p, i) => {
        const matches =
          hovered !== null && p.tech.some((t) => norm(t) === norm(hovered))
        const dim = hovered !== null && !matches
        const hasCaseStudy = !!p.caseStudy
        const linkProps = hasCaseStudy
          ? { href: `/projects/${p.slug}` as const }
          : { href: p.href, target: '_blank' as const, rel: 'noopener noreferrer' }
        const LinkComp = hasCaseStudy ? Link : 'a'
        const domain = projectDomain(p.href)

        return (
          <li
            key={p.title}
            className="border-b border-foreground/[0.05] transition-[opacity,border-color] duration-300 hover:border-[color:var(--project-accent)]/30"
            style={
              {
                ['--project-accent' as string]: p.accent,
                opacity: dim ? 0.3 : 1,
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
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2">
                  <ul className="flex flex-wrap gap-2">
                    {p.tech.map((t) => {
                      const chipMatch =
                        hovered !== null && norm(t) === norm(hovered)
                      return (
                        <li
                          key={t}
                          onPointerEnter={(e) => {
                            e.stopPropagation()
                            setHovered(t)
                          }}
                          onPointerLeave={() => setHovered(null)}
                          className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide transition-colors duration-200"
                          style={{
                            borderColor: chipMatch
                              ? p.accent
                              : 'var(--border)',
                            color: chipMatch ? p.accent : 'var(--muted-foreground)',
                          }}
                        >
                          {t}
                        </li>
                      )
                    })}
                  </ul>
                  <span className="flex items-center gap-2 font-mono text-[10px] text-[color:var(--project-accent)]/70 opacity-0 transition-opacity group-hover:opacity-100">
                    {p.liveUrl && <span className="rounded-full bg-[color:var(--project-accent)]/15 px-2 py-0.5">live</span>}
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

export function StackList({
  stack,
  projects,
}: {
  stack: StackGroup[]
  projects: Project[]
}) {
  const { hovered, setHovered } = useContext(CrossLinkCtx)
  const techInProjects = new Set(
    projects.flatMap((p) => p.tech.map(norm)),
  )

  return (
    <div className="space-y-5">
      {stack.map((g) => (
        <div
          key={g.group}
          className="grid grid-cols-[120px_1fr] items-baseline gap-6 border-b border-foreground/[0.05] pb-4 last:border-b-0"
        >
          <h3 className="text-sm text-muted-foreground">{g.group}</h3>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            {g.items.map((t, i) => {
              const isHovered = hovered !== null && norm(t) === norm(hovered)
              const isLinkable = techInProjects.has(norm(t))
              return (
                <li key={t} className="flex items-center gap-3">
                  <button
                    type="button"
                    onPointerEnter={() => isLinkable && setHovered(t)}
                    onPointerLeave={() => setHovered(null)}
                    onFocus={() => isLinkable && setHovered(t)}
                    onBlur={() => setHovered(null)}
                    aria-pressed={isHovered}
                    className={[
                      'rounded-sm transition-colors duration-200 focus:outline-none focus-visible:[outline:2px_solid_var(--accent)] focus-visible:[outline-offset:3px]',
                      isHovered
                        ? 'text-accent'
                        : i === 0
                          ? 'text-accent/80'
                          : 'text-foreground/85',
                      isLinkable ? 'cursor-pointer' : 'cursor-default',
                    ].join(' ')}
                  >
                    {t}
                  </button>
                  {i < g.items.length - 1 && (
                    <span aria-hidden="true" className="text-foreground/15">
                      ·
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <p className="pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
        Hover any tech to see where I&apos;ve shipped it
      </p>
    </div>
  )
}

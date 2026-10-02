import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type Project = {
  title: string
  year: string
  slug: string
  description: string
  status?: string
  builtBecause?: string
  tech: string[]
  href: string
  liveUrl?: string
  image?: string
  imagePosition?: string
  caseStudy?: unknown
}

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-elevated/50 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-2xl shadow-[var(--card-shadow)]">
      {/* Top Media & Content */}
      <div className="space-y-4">
        {/* Image Preview Window */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 group/media">
          {p.image && (
            <Image
              src={p.image}
              alt={`${p.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectPosition: p.imagePosition ?? 'center' }}
              className="object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.04]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />

          {/* Hover Overlay Button */}
          <Link
            href={`/projects/${p.slug}`}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/media:opacity-100"
          >
            <span className="flex items-center gap-1.5 rounded-full border border-border/80 bg-elevated/95 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-foreground shadow-xl">
              Case Study <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {/* Metadata Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-xs tracking-wider text-muted-foreground">{p.year}</span>
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

        {/* Title & Narrative */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {p.builtBecause ? p.builtBecause : p.description}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack & Action Links */}
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
            Read Story
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
  )
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  )
}

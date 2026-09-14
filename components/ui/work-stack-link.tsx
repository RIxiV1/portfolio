import { ArrowUpRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Project = {
  title: string
  year: string
  slug: string
  description: string
  hook?: string
  metric?: string
  image?: string
  imagePosition?: string
  tech: string[]
  href: string
  liveUrl?: string
  caseStudy?: unknown
}

function Preview({
  p,
  className,
  sizes,
}: {
  p: Project
  className?: string
  sizes: string
}) {
  return (
    <div className={cn('relative overflow-hidden bg-muted/70', className)}>
      {p.image && (
        <Image
          src={p.image}
          alt={`${p.title} preview`}
          fill
          sizes={sizes}
          style={{ objectPosition: p.imagePosition ?? 'top' }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
    </div>
  )
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors group-hover:border-border"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function Actions({ p }: { p: Project }) {
  const hasCaseStudy = !!p.caseStudy
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
      {hasCaseStudy && (
        <Link
          href={`/projects/${p.slug}`}
          className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.04] px-3 py-1 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Case study <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-accent"
        >
          Live <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        Source <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

const cardBase =
  'group relative overflow-hidden rounded-2xl border border-border/80 bg-elevated/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[var(--card-shadow)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background'

// Featured project with widescreen split layout and editorial flair
export function FeaturedProject({ project: p }: { project: Project }) {
  return (
    <article className={cardBase}>
      <div className="grid md:grid-cols-12">
        <Preview
          p={p}
          className="aspect-[16/10] border-b border-border/80 md:col-span-7 md:aspect-auto md:border-b-0 md:border-r"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <div className="flex flex-col gap-4 p-7 md:col-span-5 md:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider uppercase text-accent">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
            <span className="font-mono text-xs text-subtle-foreground">{p.year}</span>
          </div>

          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-3xl">
            <Link
              href={`/projects/${p.slug}`}
              className="after:absolute after:inset-0"
            >
              {p.title}
            </Link>
          </h3>

          <p className="leading-relaxed text-muted-foreground">
            {p.description}
          </p>

          {p.metric && (
            <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-1.5 font-mono text-xs text-foreground/80">
              {p.metric}
            </div>
          )}

          <TechChips tech={p.tech} />

          <div className="mt-auto pt-4">
            <Actions p={p} />
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className={cn(cardBase, 'flex flex-col')}>
      <Preview
        p={p}
        className="aspect-[16/10] border-b border-border/80"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="flex flex-1 flex-col gap-3.5 p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            <Link
              href={`/projects/${p.slug}`}
              className="after:absolute after:inset-0"
            >
              {p.title}
            </Link>
          </h3>
          <span className="font-mono text-xs shrink-0 text-subtle-foreground">
            {p.year}
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>

        {p.metric && (
          <div className="rounded-md border border-border/50 bg-muted/20 px-2.5 py-1 font-mono text-[11px] text-foreground/75">
            {p.metric}
          </div>
        )}

        <TechChips tech={p.tech} />

        <div className="mt-auto pt-4">
          <Actions p={p} />
        </div>
      </div>
    </article>
  )
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  )
}

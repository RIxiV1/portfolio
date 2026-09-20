import { ArrowUpRight } from 'lucide-react'
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
  heroMetric?: {
    value: string
    label: string
  }
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
    <div className={cn('relative overflow-hidden bg-muted/70 group/preview', className)}>
      {p.image && (
        <Image
          src={p.image}
          alt={`${p.title} preview`}
          fill
          sizes={sizes}
          style={{ objectPosition: p.imagePosition ?? 'top' }}
          className="object-cover transition-transform duration-700 ease-out group-hover/preview:scale-[1.03]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
      
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 bg-background/10 backdrop-blur-[2px]">
        <Link href={`/projects/${p.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">View project</span>
        </Link>
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-widest uppercase text-foreground bg-background/95 px-5 py-2.5 rounded-full shadow-xl">
           OPEN <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  )
}

function Actions({ p }: { p: Project }) {
  return (
    <div className="relative z-10 mt-6 font-mono text-[11px] font-semibold tracking-widest uppercase">
      <Link
        href={`/projects/${p.slug}`}
        className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent"
      >
        View Project <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

export function FeaturedProject({ project: p }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-none border-b border-border/40 pb-16">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm tracking-wider text-muted-foreground">01</span>
          <span className="h-px w-12 bg-accent/50" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
            FEATURED
          </span>
        </div>
        {p.status && (
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70" /> {p.status}
          </span>
        )}
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-7">
          <Preview
            p={p}
            className="aspect-[4/3] md:aspect-auto md:h-[500px] rounded-sm"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        <div className="flex flex-col gap-8 md:col-span-5 md:pt-4">
          <h3 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl uppercase">
            {p.title}
          </h3>

          {p.builtBecause && (
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Built because</span>
              <p className="text-xl leading-relaxed text-foreground/90">
                {p.builtBecause}
              </p>
            </div>
          )}

          {p.heroMetric && (
            <div className="pt-2">
              <div className="font-display text-6xl font-light tracking-tight text-foreground">{p.heroMetric.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3">{p.heroMetric.label}</div>
            </div>
          )}

          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Built with</p>
            <p className="font-mono text-xs text-foreground/80 leading-relaxed">
              {p.tech.join(' · ')}
            </p>
          </div>

          <Actions p={p} />
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const num = (index + 2).toString().padStart(2, '0') // 02, 03...

  return (
    <article className="group relative flex flex-col rounded-none border-t border-border/40 pt-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-sm tracking-wider text-muted-foreground">{num}</span>
        {p.status && (
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70" /> {p.status}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground uppercase">
          {p.title}
        </h3>

        {p.builtBecause ? (
          <p className="text-lg leading-relaxed text-foreground/90">
            {p.builtBecause}
          </p>
        ) : (
          <p className="text-lg leading-relaxed text-muted-foreground">
            {p.description}
          </p>
        )}

        <Preview
          p={p}
          className="aspect-[16/10] w-full rounded-sm mt-2 mb-2"
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        {p.heroMetric && (
          <div className="pt-2">
            <div className="font-display text-5xl font-light tracking-tight text-foreground">{p.heroMetric.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{p.heroMetric.label}</div>
          </div>
        )}

        <div className="space-y-1 mt-auto pt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">Built with</p>
          <p className="font-mono text-xs text-foreground/80">
            {p.tech.join(' · ')}
          </p>
        </div>

        <Actions p={p} />
      </div>
    </article>
  )
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-20 pt-8">
      {projects.map((p, i) => (
        <div key={p.title} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}>
          <ProjectCard project={p} index={i} />
        </div>
      ))}
    </div>
  )
}

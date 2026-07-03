import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'
import { ProjectArt } from '@/components/ui/project-art'

type Params = { slug: string }

type CaseStudy = NonNullable<(typeof siteConfig.projects)[number]['caseStudy']>

function getProject(slug: string) {
  return siteConfig.projects.find((p) => p.slug === slug && p.caseStudy)
}

export function generateStaticParams(): Params[] {
  return siteConfig.projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const cs = project.caseStudy as CaseStudy
  const title = `${project.title} — case study · ${siteConfig.name}`
  return {
    title,
    description: cs.tagline,
    openGraph: { title, description: cs.tagline, type: 'article' },
    twitter: { card: 'summary_large_image', title, description: cs.tagline },
  }
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const cs = project.caseStudy as CaseStudy

  return (
    <main className="relative">
      <article
        className="mx-auto max-w-3xl px-6 pt-32 pb-24"
        style={
          {
            ['--project-accent' as string]: project.accent,
          } as React.CSSProperties
        }
      >
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          back to work
        </Link>

        <FadeUp>
          <header className="mt-10 space-y-6 border-b border-foreground/[0.05] pb-12">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="text-[color:var(--project-accent)]">
                Case study
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>

            <div className="relative">
              <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                {project.title}
                <span className="text-[color:var(--project-accent)]">.</span>
              </h1>
              <ProjectArt
                seed={project.title}
                className="pointer-events-none absolute -right-2 top-0 hidden h-24 w-24 opacity-70 md:block"
              />
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">
              {cs.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors"
                  style={{
                    borderColor: 'color-mix(in oklch, var(--project-accent) 40%, transparent)',
                    color: 'var(--project-accent)',
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--project-accent)]/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--project-accent)]" />
                  </span>
                  live demo
                  <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/[0.1] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-[color:var(--project-accent)]/40 hover:text-[color:var(--project-accent)]"
              >
                <Github className="h-3 w-3" />
                source
                <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </header>
        </FadeUp>

        <Section title="Problem">
          <p>{cs.problem}</p>
        </Section>

        <Section title="Approach">
          <p>{cs.approach}</p>
        </Section>

        <Section title="Key decisions">
          <ol className="space-y-8">
            {cs.decisions.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[28px_1fr] gap-x-4">
                <span className="pt-1 font-mono text-[11px] tabular-nums text-[color:var(--project-accent)]/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {d.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Outcome">
          <p>{cs.outcome}</p>
        </Section>

        <div className="mt-20 flex items-center justify-between border-t border-foreground/[0.05] pt-10">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            all projects
          </Link>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-[color:var(--project-accent)]"
          >
            view source
            <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </article>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <FadeUp>
      <section className="mt-16 space-y-5">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--project-accent)]/80">
          {title}
        </h2>
        <div className="text-base leading-relaxed text-foreground/85 md:text-lg">
          {children}
        </div>
      </section>
    </FadeUp>
  )
}

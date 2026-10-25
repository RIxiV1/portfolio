import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'

type Params = { slug: string }
type Project = (typeof siteConfig.projects)[number]
type CaseStudy = NonNullable<Project['caseStudy']>

const caseStudyProjects = siteConfig.projects.filter((p) => p.caseStudy)

function getProject(slug: string) {
  return caseStudyProjects.find((p) => p.slug === slug)
}

export function generateStaticParams(): Params[] {
  return caseStudyProjects.map((p) => ({ slug: p.slug }))
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
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description: cs.tagline,
      type: 'article',
      url: `/projects/${slug}`,
    },
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
  const idx = caseStudyProjects.findIndex((p) => p.slug === slug)
  const next = caseStudyProjects[(idx + 1) % caseStudyProjects.length]

  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      <article className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link
          href="/projects"
          className="eyebrow group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </Link>

        <FadeUp>
          <header className="mt-10 space-y-6">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-accent">Case study</span>
              <span className="h-px w-8 bg-border" aria-hidden="true" />
              <span className="eyebrow text-muted-foreground">
                {project.year}
              </span>
            </div>

            <h1 className="font-display text-5xl font-semibold tracking-[-0.02em] md:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {cs.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Live
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                Source
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </header>
        </FadeUp>

        {project.image && (
          <FadeUp>
            <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-elevated">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                width={1280}
                height={800}
                sizes="(max-width: 896px) 100vw, 896px"
                style={{ objectPosition: project.imagePosition ?? 'top' }}
                className="aspect-[16/10] w-full object-cover"
                priority
              />
            </div>
          </FadeUp>
        )}

        <Section title="Problem">
          <p>{cs.problem}</p>
        </Section>

        <Section title="Approach">
          <p>{cs.approach}</p>
        </Section>

        <Section title="Key decisions">
          <ol className="space-y-8">
            {cs.decisions.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[32px_1fr] gap-x-4">
                <span className="eyebrow pt-1.5 text-accent">
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

        <div className="mt-24 border-t border-border pt-8">
          <span className="eyebrow text-muted-foreground">Next project</span>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-3 flex items-baseline justify-between gap-6"
          >
            <span className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-4xl">
              {next.title}
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 translate-y-1 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
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
      <section className="mt-16 grid gap-3 md:grid-cols-[140px_1fr] md:gap-8">
        <h2 className="eyebrow pt-1.5 text-muted-foreground">{title}</h2>
        <div className="max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
          {children}
        </div>
      </section>
    </FadeUp>
  )
}

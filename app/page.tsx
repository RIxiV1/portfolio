import Image from 'next/image'
import { ArrowUpRight, ChevronDown, FileText, Sparkles } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'
import { ContactForm } from '@/components/ui/contact-form'
import { ExperienceTabs } from '@/components/ui/experience-tabs'
import { StatusPill } from '@/components/ui/status-pill'
import { CtaButton } from '@/components/ui/cta-button'
import { FeaturedProject, ProjectsList } from '@/components/ui/work-stack-link'

const sectionHeading =
  'font-display text-3xl font-semibold tracking-tight md:text-4xl'
const sectionIntro = 'max-w-xl leading-relaxed text-muted-foreground'

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-sm lowercase text-accent">
      <span className="text-accent/50">/</span> {children}
    </span>
  )
}

function SectionAction({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap pb-1 text-sm text-muted-foreground transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

const GITHUB_URL = 'https://github.com/RIxiV1'
const MEDIUM_URL = 'https://medium.com/@shaiksuhaib360'

// Feature the strongest, most on-identity build (InfoBlend); lightest last.
const PROJECT_ORDER = ['infoblend', 'subsentry', 'resumescreen']
const orderedProjects = [...siteConfig.projects].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.slug) - PROJECT_ORDER.indexOf(b.slug),
)

export default function Page() {
  return (
    <main className="relative">
      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 pt-32 pb-16"
      >
        <div className="space-y-8">
          <StatusPill>Available for internships · Chennai</StatusPill>

          <h1 className="font-display text-7xl font-semibold leading-[0.86] tracking-tight md:text-8xl lg:text-[9.5rem]">
            <span className="block">Shaik</span>
            <span className="block text-accent [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2.5px_currentColor]">
              Suhaib
            </span>
          </h1>

          <div className="max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p className="text-foreground">
              I&apos;m a software engineer who likes making confusing things
              easy to understand.
            </p>
            <p>
              Lately that&apos;s health tools — most recently an app that turns
              a blood report into plain English.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <CtaButton href="#contact" variant="primary">
              <Sparkles className="h-3.5 w-3.5" />
              Get in touch
            </CtaButton>
            <CtaButton href={siteConfig.resumeUrl} variant="secondary" external>
              <FileText className="h-3.5 w-3.5" />
              Résumé
            </CtaButton>
          </div>

          <div className="flex items-center gap-5 pt-2 text-muted-foreground">
            {siteConfig.socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quiet scroll cue — a whisper, not a shout; still under reduced motion. */}
        <a
          href="#work"
          aria-label="Scroll to work"
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors hover:text-accent"
        >
          Scroll
          <ChevronDown className="h-3.5 w-3.5 motion-safe:animate-bounce" />
        </a>
      </section>

      {/* HOW I THINK — the belief, then what it means in practice. Placed high,
          so the projects below read as evidence rather than a list. */}
      <section
        id="approach"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24"
      >
        <FadeUp>
          <p className="font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
            <span className="text-muted-foreground">
              If someone&apos;s confused,{' '}
            </span>
            the software failed.
          </p>
        </FadeUp>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20">
        <FadeUp>
          <div className="space-y-10">
            <header className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="space-y-2">
                  <SectionLabel>work</SectionLabel>
                  <h2 className={sectionHeading}>Things I&apos;ve built.</h2>
                </div>
                <SectionAction href={GITHUB_URL}>All on GitHub</SectionAction>
              </div>
              <p className={sectionIntro}>
                Each one started with something that annoyed me. Click a card
                for the whole story.
              </p>
            </header>
            <div className="space-y-8">
              <FeaturedProject project={orderedProjects[0]} />
              <ProjectsList projects={orderedProjects.slice(1)} />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-2">
              <SectionLabel>experience</SectionLabel>
              <h2 className={sectionHeading}>Where I&apos;ve been.</h2>
            </header>
            <ExperienceTabs items={siteConfig.experience} />
          </div>
        </FadeUp>
      </section>

      {/* WRITING */}
      <section
        id="writing"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <SectionLabel>writing</SectionLabel>
                  <h2 className={sectionHeading}>Things I&apos;ve written.</h2>
                </div>
                <SectionAction href={MEDIUM_URL}>Read on Medium</SectionAction>
              </div>
              <p className={sectionIntro}>
                Usually I write something to understand it myself. Mostly math I
                keep circling back to.
              </p>
            </header>
            <ul className="divide-y divide-foreground/[0.06] border-t border-foreground/[0.06]">
              {siteConfig.writing.map((w) => (
                <li key={w.title}>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-3 py-8 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                        <span>{w.tag}</span>
                        <span aria-hidden="true">·</span>
                        <span>{w.date}</span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                        {w.title}
                      </h3>
                      <p className="max-w-2xl leading-relaxed text-muted-foreground">
                        {w.description}
                      </p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 shrink-0 translate-y-1 text-muted-foreground/40 transition group-hover:text-accent md:block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </section>

      {/* ABOUT — late, once you've decided you like the work */}
      <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20">
        <FadeUp>
          <div className="space-y-10">
            <header className="space-y-2">
              <SectionLabel>about</SectionLabel>
              <h2 className={sectionHeading}>A little about me.</h2>
            </header>
            <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-10">
              <Image
                src="/portrait.png"
                alt="Shaik Mohammed Suhaib"
                width={200}
                height={250}
                className="aspect-[4/5] w-full max-w-[200px] rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] object-cover"
              />
              <div className="space-y-5">
                <div className="space-y-4 text-base leading-relaxed text-foreground/75 md:text-lg">
                  {siteConfig.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <dl className="grid grid-cols-[110px_1fr] gap-y-2 pt-4 text-sm">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd>{siteConfig.location}</dd>
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd>{siteConfig.focus}</dd>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="text-positive">{siteConfig.status}</dd>
                </dl>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-4">
              <SectionLabel>contact</SectionLabel>
              <h2 className={sectionHeading}>Say hi.</h2>
              <p className={sectionIntro}>
                I&apos;m looking for internships, and I&apos;m always up for a
                good problem. Email&apos;s the best way to reach me — I actually
                read them.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
                {siteConfig.socials.map(
                  ({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {handle}
                    </a>
                  ),
                )}
              </div>
            </header>
            <ContactForm />
            <p className="pt-2 text-sm text-muted-foreground">
              Or just say what you&apos;re working on — if it&apos;s an
              interesting problem, I&apos;ll want to hear about it.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-foreground/[0.06]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2.5 px-6 py-14 text-center">
          <p className="text-sm text-muted-foreground">
            Built &amp; designed by{' '}
            <span className="font-display text-foreground">Suhaib</span>.
          </p>
          <p className="text-xs text-muted-foreground/70">
            All rights reserved. ©
          </p>
          <a
            href="#home"
            className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-accent"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  )
}

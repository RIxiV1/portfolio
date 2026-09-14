import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { ArrowUpRight, ArrowDown, Briefcase } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'
import { Stagger, StaggerItem } from '@/components/ui/reveal'
import { MagneticLink } from '@/components/ui/magnetic-link'
import { ContactForm } from '@/components/ui/contact-form'
import { FeaturedProject, ProjectsList } from '@/components/ui/work-stack-link'
import { SignalField } from '@/components/ui/signal-field'
import { Signature } from '@/components/ui/signature'
import { TechMarquee } from '@/components/ui/tech-marquee'

// Script face for the hand-written sign-off in About.
const signatureFont = Dancing_Script({ subsets: ['latin'], weight: '600' })

const sectionHeading =
  'font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl'
const sectionIntro = 'max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg'

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow text-accent">{index}</span>
      <span className="h-px w-8 bg-border" aria-hidden="true" />
      <span className="eyebrow text-muted-foreground">{label}</span>
    </div>
  )
}

function SectionAction({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap pb-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

const GITHUB_URL = 'https://github.com/RIxiV1'

// Feature the published product (InfoBlend); then the two strongest builds.
const PROJECT_ORDER = ['infoblend', 'caliber', 'subsentry']
const orderedProjects = [...siteConfig.projects].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.slug) - PROJECT_ORDER.indexOf(b.slug),
)

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      {/* HERO */}
      <section
        id="home"
        className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 pt-32 pb-24"
      >
        {/* Interactive warm ember particle mark — ambient on the right, coalesces on hover */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center justify-end pr-2 lg:flex">
          <SignalField size={440} className="pointer-events-auto opacity-85 transition-opacity hover:opacity-100" />
        </div>

        <Stagger className="relative z-10 max-w-2xl space-y-7">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-elevated/70 px-3.5 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-positive/60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
              </span>
              Available for internships
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Shaik Suhaib
            </h1>
          </StaggerItem>

          <StaggerItem className="max-w-xl">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Early in the journey — a software engineer building AI tools and web
              applications that make complicated systems{' '}
              <span className="italic font-display font-medium text-foreground">
                feel effortless
              </span>
              .
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-wrap items-center gap-3.5 pt-2">
            <MagneticLink
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-300 hover:bg-accent-strong hover:shadow-[0_10px_30px_-10px_var(--accent)]"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticLink>
            <MagneticLink
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-elevated/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-muted"
            >
              Résumé
            </MagneticLink>
            <span className="ml-1 flex items-center gap-4 border-l border-border/70 pl-4 text-muted-foreground">
              {siteConfig.socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </span>
          </StaggerItem>
        </Stagger>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="eyebrow absolute inset-x-6 bottom-8 mx-auto flex w-fit items-center gap-2 text-subtle-foreground transition-colors hover:text-accent"
        >
          Scroll
          <ArrowDown className="h-3.5 w-3.5 animate-float" />
        </a>
      </section>

      {/* TECH MARQUEE */}
      <TechMarquee />

      {/* WORK */}
      <section id="work" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
        <div className="space-y-12">
          <FadeUp>
            <header className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="space-y-2">
                  <SectionEyebrow index="01" label="Selected Work" />
                  <h2 className={sectionHeading}>Things I&apos;ve built.</h2>
                </div>
                <SectionAction href={GITHUB_URL}>Explore GitHub</SectionAction>
              </div>
              <p className={sectionIntro}>
                Each project tackles a real bottleneck — from multimodal video search
                to AI-powered meeting digests. Click any card for the full breakdown.
              </p>
            </header>
          </FadeUp>

          <div className="space-y-8">
            <FadeUp>
              <FeaturedProject project={orderedProjects[0]} />
            </FadeUp>
            <FadeUp delay={0.08}>
              <ProjectsList projects={orderedProjects.slice(1)} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-4xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-10">
            <header className="space-y-2">
              <SectionEyebrow index="02" label="Background" />
              <h2 className={sectionHeading}>Where I&apos;ve been.</h2>
            </header>

            {/* Visual Timeline */}
            <div className="relative border-l border-border/80 pl-6 ml-2 space-y-10 md:pl-8">
              {siteConfig.experience.map((item, i) => (
                <div key={i} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-accent md:-left-[39px]">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-elevated/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[var(--card-shadow)] md:p-7">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs text-subtle-foreground">
                        {item.period}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{item.org}</span>
                    </div>

                    <p className="mt-3 leading-relaxed text-muted-foreground text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="rounded-2xl border border-border/70 bg-elevated/40 p-6 backdrop-blur-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Education
                </span>
                <p className="font-medium text-foreground">
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
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-28">
        <FadeUp>
          <div className="space-y-10">
            <header className="space-y-2">
              <SectionEyebrow index="03" label="Perspective" />
              <h2 className={sectionHeading}>A little about me.</h2>
            </header>
            <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-elevated/80 shadow-[var(--card-shadow)]">
                  <Image
                    src="/portrait.png"
                    alt="Shaik Mohammed Suhaib"
                    width={280}
                    height={350}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-xl border border-border/60 bg-elevated/40 p-4 text-sm">
                  <div>
                    <dt className="eyebrow text-subtle-foreground">Location</dt>
                    <dd className="mt-1 font-medium text-foreground">
                      {siteConfig.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-subtle-foreground">Status</dt>
                    <dd className="mt-1 inline-flex items-center gap-1.5 font-medium text-positive">
                      <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                      Open
                    </dd>
                  </div>
                  <div className="col-span-2 border-t border-border/50 pt-3">
                    <dt className="eyebrow text-subtle-foreground">Focus</dt>
                    <dd className="mt-1 text-foreground">
                      {siteConfig.focus}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-6">
                <div className="space-y-5 text-lg leading-relaxed text-foreground/85 font-light">
                  {siteConfig.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="space-y-3 rounded-2xl border border-border/60 bg-elevated/40 p-6 backdrop-blur-sm">
                  <p className="eyebrow text-accent">In my spare time</p>
                  <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
                    I&apos;m usually making tweaks to codebases or chatting with fellow builders.
                    Beyond the keyboard, you&apos;ll find me playing football, gaming, or exploring new tech stacks.
                  </p>
                  <p className="pt-2 text-foreground font-medium">
                    Thanks for stopping by.
                  </p>
                  <Signature
                    name="Suhaib"
                    className={`${signatureFont.className} inline-block pt-1 text-5xl leading-none text-accent`}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-4">
              <SectionEyebrow index="04" label="Connect" />
              <h2 className={sectionHeading}>Say hi.</h2>
              <p className={sectionIntro}>
                I&apos;m looking for internships and engineering roles, and I&apos;m always up for
                a challenging problem. Send a note below or reach out directly.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline font-mono text-sm text-foreground transition-colors hover:text-accent"
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
                      className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {handle}
                    </a>
                  ),
                )}
              </div>
            </header>

            <div className="rounded-2xl border border-border/80 bg-elevated/50 p-6 backdrop-blur-sm shadow-[var(--card-shadow)] sm:p-8">
              <ContactForm />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Always glad to hear from fellow builders and discuss exciting projects.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-border/60 bg-elevated/30">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-14 text-center">
          <p className="text-sm text-muted-foreground">
            Designed &amp; built by{' '}
            <span className="font-display font-medium text-foreground">Shaik Suhaib</span>.
          </p>
          <p className="font-mono text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Shaik Suhaib · All rights reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            Crafted in Chennai
          </p>
          <a
            href="#home"
            className="group mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
          >
            Back to top{' '}
            <span className="inline-block transition-transform group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </div>
      </footer>
    </main>
  )
}

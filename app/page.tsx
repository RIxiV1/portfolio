import { ArrowUpRight, FileText, Sparkles } from "lucide-react"
import { siteConfig } from "@/data/site"
import { FadeUp } from "@/components/ui/fade-up"
import { ContactForm } from "@/components/ui/contact-form"
import { ExperienceTabs } from "@/components/ui/experience-tabs"
import { ScrambleText } from "@/components/ui/scramble-text"
import { ProjectArt } from "@/components/ui/project-art"
import { RecommendationLab } from "@/components/ui/recommendation-lab"
import { StatusPill } from "@/components/ui/status-pill"
import { CtaButton } from "@/components/ui/cta-button"

function projectDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

const sectionHeading = "text-3xl font-semibold tracking-tight md:text-4xl"
const sectionIntro = "max-w-xl leading-relaxed text-muted-foreground"

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

          <h1 className="text-6xl font-semibold leading-[0.92] tracking-tight md:text-8xl lg:text-[10rem]">
            <ScrambleText autoStart delay={150}>shaik suhaib</ScrambleText>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            IT undergrad in Chennai. I build and ship full-stack AI products
            end-to-end — React on the front, Supabase and n8n on the back,
            LLM agents for the heavy lifting. Recently shipped a consumer
            health AI tool at{" "}
            <span className="text-foreground">ForMen Digital Clinic</span>.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <CtaButton href="#contact" variant="primary">
              <Sparkles className="h-3.5 w-3.5" />
              Hire me
            </CtaButton>
            <CtaButton href={siteConfig.resumeUrl} variant="secondary" external>
              <FileText className="h-3.5 w-3.5" />
              Download résumé
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
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-10">
            <h2 className={sectionHeading}>A little about me.</h2>
            <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.png"
                alt="Shaik Mohammed Suhaib"
                className="aspect-[4/5] w-full max-w-[200px] rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] object-cover"
              />
              <div className="space-y-5">
                <div className="space-y-4 text-base leading-relaxed text-foreground/90 md:text-lg">
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
                  <dd className="text-accent">{siteConfig.status}</dd>
                </dl>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* WORK */}
      <section
        id="work"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-10">
            <header className="space-y-3">
              <h2 className={sectionHeading}>Selected projects.</h2>
              <p className={sectionIntro}>
                Side projects and small systems at the intersection of AI research and
                product engineering. Hover for details.
              </p>
            </header>
            <ul className="border-t border-foreground/[0.05]">
              {siteConfig.projects.map((p, i) => {
                const domain = projectDomain(p.href)
                return (
                  <li
                    key={p.title}
                    className="border-b border-foreground/[0.05] transition-colors hover:border-[color:var(--project-accent)]/30"
                    style={{ ['--project-accent' as string]: p.accent } as React.CSSProperties}
                  >
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
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
                            {p.tech.map((t) => (
                              <li
                                key={t}
                                className="rounded-full border border-foreground/[0.08] px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors group-hover:border-[color:var(--project-accent)]/30"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                          {domain && (
                            <span className="font-mono text-[10px] text-[color:var(--project-accent)]/70 opacity-0 transition-opacity group-hover:opacity-100">
                              ↗ {domain}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </FadeUp>
      </section>

      {/* LAB */}
      <section
        id="lab"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-3">
              <h2 className={sectionHeading}>A small lab.</h2>
              <p className={sectionIntro}>
                A small interactive — twelve items across three domains, edges
                weighted by similarity. Hover any node to see its 1-hop
                neighborhood. The kind of mechanic that powers product
                recommendations when you build with LLMs.
              </p>
            </header>
            <RecommendationLab />
          </div>
        </FadeUp>
      </section>

      {/* STACK */}
      <section
        id="stack"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <h2 className={sectionHeading}>What I work with.</h2>
            <div className="space-y-5">
              {siteConfig.stack.map((g) => (
                <div
                  key={g.group}
                  className="grid grid-cols-[120px_1fr] items-baseline gap-6 border-b border-foreground/[0.05] pb-4 last:border-b-0"
                >
                  <h3 className="text-sm text-muted-foreground">{g.group}</h3>
                  <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    {g.items.map((t, i) => (
                      <li key={t} className="flex items-center gap-3">
                        <span className={i === 0 ? "text-accent" : "text-foreground/85"}>
                          {t}
                        </span>
                        {i < g.items.length - 1 && (
                          <span aria-hidden="true" className="text-foreground/15">·</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* JOURNEY */}
      <section
        id="journey"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <h2 className={sectionHeading}>Where I&apos;ve been.</h2>
            <ExperienceTabs items={siteConfig.experience} />
          </div>
        </FadeUp>
      </section>

      {/* WRITING */}
      <section
        id="writing"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-3">
              <h2 className={sectionHeading}>Notes & research.</h2>
              <p className={sectionIntro}>
                Essays on the math I keep coming back to — recommendation systems,
                network theory, chaos.
              </p>
            </header>
            <ul className="border-t border-foreground/[0.05]">
              {siteConfig.writing.map((w) => (
                <li key={w.title} className="border-b border-foreground/[0.05]">
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 py-6"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="rounded-full bg-foreground/[0.04] px-2 py-0.5">{w.tag}</span>
                      <span>{w.date}</span>
                    </div>
                    <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {w.title}
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-60" />
                    </h3>
                    <p className="max-w-xl leading-relaxed text-muted-foreground">
                      {w.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
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
              <h2 className={sectionHeading}>Let&apos;s build something.</h2>
              <p className={sectionIntro}>
                Open to internships, freelance, and research collaborations. Drop a
                line — I read every email.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
                {siteConfig.socials.map(({ icon: Icon, href, label, handle }) => (
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
                ))}
              </div>
            </header>
            <ContactForm />
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-foreground/[0.05]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} — {siteConfig.name}
          </p>
          <a
            href="#home"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  )
}

import { ArrowUpRight, FileText, Sparkles } from "lucide-react"
import { siteConfig } from "@/data/site"
import { FadeUp } from "@/components/ui/fade-up"
import { ContactForm } from "@/components/ui/contact-form"
import { ExperienceTabs } from "@/components/ui/experience-tabs"
import { ScrambleText } from "@/components/ui/scramble-text"
import { RecommendationLab } from "@/components/ui/recommendation-lab"
import { StatusPill } from "@/components/ui/status-pill"
import { CtaButton } from "@/components/ui/cta-button"
import {
  CrossLinkProvider,
  ProjectsList,
  StackList,
} from "@/components/ui/work-stack-link"

const sectionHeading = "text-3xl font-semibold tracking-tight md:text-4xl"
const sectionIntro = "max-w-xl leading-relaxed text-muted-foreground"

const BIO_HIGHLIGHTS = [
  "React/TypeScript",
  "Supabase",
  "n8n",
  "LLMs",
  "ForMen Digital Clinic",
  "Product Management & Agentic AI",
  "recommendation systems",
]

function highlightTerms(text: string, terms: string[]) {
  if (!terms.length) return text
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "g")
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    terms.includes(part) ? (
      <span key={i} className="text-foreground">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

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
            IT undergrad in Chennai. I build AI products at{" "}
            <span className="text-foreground">ForMen Digital Clinic</span> by
            day and chase the math behind recommendation systems by night.
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
                <div className="space-y-4 text-base leading-relaxed text-foreground/75 md:text-lg">
                  {siteConfig.bio.map((p, i) => (
                    <p key={i}>{highlightTerms(p, BIO_HIGHLIGHTS)}</p>
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

      <CrossLinkProvider>
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
                  Stuff I&apos;ve built. Click a card for the case study.
                </p>
              </header>
              <ProjectsList projects={siteConfig.projects} />
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
                  Twelve items, three domains, cosine-similarity edges.
                  Hover a node to see its neighborhood. Not a real product
                  — a picture of the mechanic.
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
              <StackList
                stack={siteConfig.stack}
                projects={siteConfig.projects}
              />
            </div>
          </FadeUp>
        </section>
      </CrossLinkProvider>

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
                Essays on the math I keep coming back to.
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

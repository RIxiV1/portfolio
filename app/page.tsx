import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react"
import { siteConfig } from "@/data/site"
import { Cursor } from "@/components/ui/inverted-cursor"
import { FadeUp } from "@/components/ui/fade-up"
import { ContactForm } from "@/components/ui/contact-form"

const sectionLabel = "font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"

export default function Page() {
  return (
    <>
      <Cursor size={56} />
      <main className="relative">
        {/* HERO */}
        <section
          id="home"
          className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 pt-32 pb-24"
        >
          <div className="space-y-8">
            <p className={sectionLabel}>
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 align-middle shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              Portfolio · 2026
            </p>

            <h1 className="text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
              Shaik Mohammed
              <br />
              Suhaib<span className="text-cyan-400">.</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Product engineer building{" "}
              <span className="text-foreground">agentic AI tools</span> and{" "}
              <span className="text-foreground">recommendation systems</span>. Studying IT
              in Chennai, shipping side projects in between.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-cyan-400"
              >
                Selected Work
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Get in Touch
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>01 / About</p>
              <div className="space-y-6">
                {siteConfig.bio.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-foreground/90">
                    {p}
                  </p>
                ))}
                <dl className="grid grid-cols-[110px_1fr] gap-y-3 pt-6 text-sm">
                  <dt className={sectionLabel}>Location</dt>
                  <dd>{siteConfig.location}</dd>
                  <dt className={sectionLabel}>Focus</dt>
                  <dd>{siteConfig.focus}</dd>
                  <dt className={sectionLabel}>Status</dt>
                  <dd className="text-cyan-400">{siteConfig.status}</dd>
                </dl>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* WORK */}
        <section
          id="work"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="mb-12 grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>02 / Work</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                Selected projects.
              </h2>
            </div>
            <div className="md:pl-[136px]">
              <ul className="border-t border-foreground/10">
                {siteConfig.projects.map((p) => (
                  <li key={p.title} className="border-b border-foreground/10">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-3 py-8"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-2xl font-medium tracking-tight transition-colors group-hover:text-cyan-400">
                          {p.title}
                          <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-0.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-60" />
                        </h3>
                        <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest tabular-nums text-muted-foreground">
                          {p.year}
                        </span>
                      </div>
                      <p className="max-w-xl leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                      <ul className="flex flex-wrap gap-2 pt-2">
                        {p.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded border border-foreground/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </section>

        {/* STACK */}
        <section
          id="stack"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>03 / Stack</p>
              <div className="space-y-8">
                {siteConfig.stack.map((g) => (
                  <div
                    key={g.group}
                    className="grid grid-cols-[110px_1fr] items-baseline gap-6 border-b border-foreground/5 pb-5 last:border-b-0"
                  >
                    <h3 className={sectionLabel}>{g.group}</h3>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-foreground/90">
                      {g.items.map((t) => (
                        <li key={t}>{t}</li>
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
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>04 / Journey</p>
              <ul className="space-y-12">
                {siteConfig.experience.map((e) => (
                  <li key={e.role} className="space-y-2">
                    <span className={sectionLabel}>{e.period}</span>
                    <h3 className="text-xl font-medium tracking-tight">{e.role}</h3>
                    <p className="text-sm text-muted-foreground">{e.org}</p>
                    <p className="pt-1 leading-relaxed text-foreground/80">
                      {e.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </section>

        {/* WRITING */}
        <section
          id="writing"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="mb-10 grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>05 / Writing</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                Notes & research.
              </h2>
            </div>
            <div className="md:pl-[136px]">
              <ul className="border-t border-foreground/10">
                {siteConfig.writing.map((w) => (
                  <li key={w.title} className="border-b border-foreground/10">
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 py-6"
                    >
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>{w.tag}</span>
                        <span className="opacity-30">·</span>
                        <span>{w.date}</span>
                      </div>
                      <h3 className="flex items-center gap-2 text-xl font-medium tracking-tight transition-colors group-hover:text-cyan-400">
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
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32"
        >
          <FadeUp>
            <div className="mb-12 grid gap-8 md:grid-cols-[120px_1fr] md:gap-16">
              <p className={`${sectionLabel} pt-2`}>06 / Contact</p>
              <div className="space-y-5">
                <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Let&apos;s build something.
                </h2>
                <p className="max-w-xl leading-relaxed text-muted-foreground">
                  Open to internships, freelance, and research collaborations. Drop a
                  line — I read every email.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-sm">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-foreground transition-colors hover:text-cyan-400"
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
              </div>
            </div>
            <div className="mt-16 md:pl-[136px]">
              <ContactForm />
            </div>
            <div className="mt-16 md:pl-[136px]">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <FileText className="h-3.5 w-3.5" />
                Download Résumé
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeUp>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-foreground/5">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} — {siteConfig.name}
            </p>
            <a
              href="#home"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              ↑ Top
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}

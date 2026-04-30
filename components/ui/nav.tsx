"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

export function Nav() {
  const [active, setActive] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = siteConfig.navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((acc, e) =>
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc
        )
        setActive(`#${(top.target as HTMLElement).id}`)
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "bg-background/70 backdrop-blur-xl border-b border-foreground/5"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-mono text-sm tracking-tight text-foreground transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          shaik<span className="text-cyan-400">.</span>dev
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {siteConfig.navLinks.map((l) => {
            const isActive = active === l.href
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mr-1 text-cyan-400 transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    ›
                  </span>
                  {l.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { ScrambleText } from "@/components/ui/scramble-text"

export function Nav() {
  const [active, setActive] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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

  // Close menu on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        (scrolled || open) && "bg-background/70 backdrop-blur-xl border-b border-foreground/5"
      )}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-mono text-sm tracking-tight text-foreground transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          <Logo size={28} />
          shaik<span className="text-cyan-400">.</span>dev
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
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
                  <ScrambleText>{l.name}</ScrambleText>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded border border-foreground/10 text-foreground transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="md:hidden border-t border-foreground/[0.08] bg-background/95 backdrop-blur-xl"
          >
            <ul className="mx-auto flex max-w-3xl flex-col px-6 py-3">
              {siteConfig.navLinks.map((l) => {
                const isActive = active === l.href
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "text-cyan-400 transition-opacity",
                          isActive ? "opacity-100" : "opacity-30"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

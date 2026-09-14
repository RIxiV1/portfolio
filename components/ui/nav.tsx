'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Nav() {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const onHome = pathname === '/'
  const to = (hash: string) => (onHome ? hash : `/${hash}`)
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc,
        )
        setActive(`#${(top.target as HTMLElement).id}`)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 md:top-5 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={cn(
          'pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 rounded-full border border-border/80 bg-background/85 px-4 py-2 sm:px-5 sm:py-2 backdrop-blur-xl shadow-lg shadow-foreground/[0.04] transition-all duration-300 dark:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.7)]',
          scrolled && 'border-border bg-background/95 shadow-xl',
        )}
      >
        {/* Typographic wordmark — sharp and minimalist */}
        <a
          href={onHome ? '#home' : '/'}
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2 pr-2 font-mono text-xs font-semibold tracking-wider uppercase text-foreground transition-colors hover:text-accent"
          aria-label="Suhaib Dev Home"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-125" />
          <span>suhaib<span className="text-accent">.dev</span></span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {siteConfig.navLinks.map((l) => {
              const isActive = active === l.href
              return (
                <li key={l.href}>
                  <a
                    href={to(l.href)}
                    className={cn(
                      'relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActivePill"
                        className="absolute inset-0 rounded-full bg-foreground/[0.08] dark:bg-foreground/[0.12]"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 450, damping: 35 }
                        }
                      />
                    )}
                    <span className="relative z-10">{l.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="h-4 w-px bg-border/80 mx-1 hidden md:block" aria-hidden="true" />

          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-auto absolute top-14 inset-x-4 max-w-sm mx-auto overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-3 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {siteConfig.navLinks.map((l) => {
                const isActive = active === l.href
                return (
                  <li key={l.href}>
                    <a
                      href={to(l.href)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-accent/15 text-accent font-semibold'
                          : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground',
                      )}
                    >
                      <span>{l.name}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

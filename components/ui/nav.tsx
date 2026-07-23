'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Nav() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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

  // Close menu on Escape; lock body scroll while open.
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
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        (scrolled || open) &&
          'border-b border-foreground/5 bg-background/70 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
          aria-label="Home"
        >
          <Logo size={26} />
          <span>
            Shaik<span className="text-accent">.</span>dev
          </span>
        </a>

        <div className="flex items-center gap-2">
          {/* Desktop pill nav */}
          <ul className="hidden items-center gap-1 rounded-full border border-foreground/[0.06] bg-foreground/[0.02] p-1 md:flex">
            {siteConfig.navLinks.map((l) => {
              const isActive = active === l.href
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                      isActive
                        ? 'text-background'
                        : 'text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActivePill"
                        className="absolute inset-0 rounded-full bg-foreground"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 400, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-10">{l.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="md:hidden border-t border-foreground/[0.08] bg-background/95 backdrop-blur-xl"
          >
            <ul className="mx-auto flex max-w-5xl flex-col px-6 py-3">
              {siteConfig.navLinks.map((l) => {
                const isActive = active === l.href
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-foreground/[0.06] text-foreground'
                          : 'text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground',
                      )}
                    >
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

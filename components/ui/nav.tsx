'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Nav() {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/95 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        {/* Wordmark */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-muted-foreground"
          aria-label="Suhaib Dev Home"
        >
          suhaib<span className="text-muted-foreground">.dev</span>
        </Link>

        {/* Desktop links — right-aligned, clean text links (no pill) */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {siteConfig.navLinks.map((l) => {
              const isActive =
                l.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(l.href)
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      'font-mono text-xs uppercase tracking-widest transition-colors',
                      isActive
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {l.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          <ThemeToggle />
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-8 w-8 items-center justify-center text-foreground transition-colors hover:text-muted-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="border-b border-border/60 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-6 pb-4">
              {siteConfig.navLinks.map((l) => {
                const isActive =
                  l.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(l.href)
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between py-3 font-mono text-xs uppercase tracking-widest transition-colors border-b border-border/40 last:border-0',
                        isActive
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span>{l.name}</span>
                      {isActive && (
                        <span className="h-1 w-4 bg-foreground" />
                      )}
                    </Link>
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

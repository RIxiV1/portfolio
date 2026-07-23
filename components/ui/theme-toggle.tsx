'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  // Render nothing icon-wise until mounted so SSR (which can't know the
  // resolved theme) doesn't mismatch the client.
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Read the theme the pre-hydration inline script already applied to <html>
    // and sync it in. This is a deliberate external-system read on mount, not a
    // render-driven state update — hence the rule suppression.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains('dark'))
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-foreground/10 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={dark ? 'sun' : 'moon'}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { rotate: -90, scale: 0, opacity: 0 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { rotate: 90, scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

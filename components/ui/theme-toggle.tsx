'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored ? stored === 'dark' : true
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
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
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/80 text-foreground transition-all hover:border-foreground/40 hover:text-foreground hover:shadow-md"
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
            {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

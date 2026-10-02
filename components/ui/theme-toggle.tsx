'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun, Palette, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ThemePreset = 'obsidian' | 'stealth' | 'emerald' | 'sapphire'

const PRESETS: { id: ThemePreset; name: string; color: string; desc: string }[] = [
  { id: 'obsidian', name: 'Obsidian Iris', color: '#7170FF', desc: 'Linear & Raycast aesthetic' },
  { id: 'stealth', name: 'Monochrome Stealth', color: '#FFFFFF', desc: 'Apple Pro & Arc style' },
  { id: 'emerald', name: 'Aurora Mint', color: '#10B981', desc: 'Supabase & Cyberpunk carbon' },
  { id: 'sapphire', name: 'Midnight Sapphire', color: '#38BDF8', desc: 'Deep Ocean & Electric Cobalt' },
]

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(true)
  const [preset, setPreset] = useState<ThemePreset>('obsidian')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || true
    const savedPreset = (localStorage.getItem('theme-preset') as ThemePreset) || 'obsidian'
    
    setDark(isDark)
    setPreset(savedPreset)
    document.documentElement.setAttribute('data-theme', savedPreset)
    setMounted(true)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  const selectPreset = (newPreset: ThemePreset) => {
    setPreset(newPreset)
    document.documentElement.setAttribute('data-theme', newPreset)
    if (!dark) {
      setDark(true)
      document.documentElement.classList.add('dark')
      try {
        localStorage.setItem('theme', 'dark')
      } catch {}
    }
    try {
      localStorage.setItem('theme-preset', newPreset)
    } catch {}
    setMenuOpen(false)
  }

  return (
    <div className="relative inline-flex items-center gap-1" ref={menuRef}>
      {/* Palette Selector Button */}
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Customize theme palette"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-foreground transition-all hover:border-accent/50 hover:text-accent hover:shadow-md"
      >
        <Palette className="h-3.5 w-3.5" />
      </button>

      {/* Light / Dark Toggle */}
      <button
        type="button"
        onClick={toggleDark}
        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border/80 text-foreground transition-all hover:border-accent/50 hover:text-accent hover:shadow-md"
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

      {/* Interactive Theme Palette Popover */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-2xl border border-border/80 bg-elevated/95 p-2 backdrop-blur-2xl shadow-2xl"
          >
            <div className="px-3 py-2 border-b border-border/50 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                Theme Presets
              </span>
            </div>

            <div className="space-y-1">
              {PRESETS.map((p) => {
                const isSelected = preset === p.id && dark
                return (
                  <button
                    key={p.id}
                    onClick={() => selectPreset(p.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all',
                      isSelected
                        ? 'bg-foreground/[0.08] text-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-3 w-3 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: p.color }}
                      />
                      <div>
                        <span className="block text-foreground">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground block">{p.desc}</span>
                      </div>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 text-accent" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

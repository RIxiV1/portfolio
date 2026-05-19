"use client"

import { useEffect, useRef, useState } from "react"

const POOL = '!<>-_/[]{}=+*^?#01ABCDEF'

const scrambledOf = (str: string) =>
  str
    .split('')
    .map((ch) => (ch === ' ' ? ' ' : POOL[Math.floor(Math.random() * POOL.length)]))
    .join('')

export function ScrambleText({
  children,
  className,
  duration = 18,
  autoStart = false,
  delay = 0,
}: {
  children: string
  className?: string
  duration?: number
  autoStart?: boolean
  delay?: number
}) {
  // Initial render must be deterministic to match SSR — never random here.
  const [display, setDisplay] = useState(children)

  // Refs let the scramble loop see the latest values without restarting closures.
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef(children)
  const displayRef = useRef(children)

  // Keep displayRef synced with state so the no-op check sees fresh data.
  useEffect(() => {
    displayRef.current = display
  }, [display])

  // Cancel and snap on every children change — defends against races where
  // a target update lands while a loop is mid-flight (e.g. activeKey changes
  // during a pointer-driven scramble).
  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    targetRef.current = children
    if (!autoStart) {
      setDisplay(children)
      displayRef.current = children
    }
  }, [children, autoStart])

  const scramble = () => {
    const target = targetRef.current
    // No-op early return: already on target, nothing to animate.
    if (displayRef.current === target) return
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    let frame = 0
    const tick = () => {
      const cur = targetRef.current
      const out = cur
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          const charStart = (i / cur.length) * (duration * 0.45)
          const charEnd = charStart + duration * 0.55
          if (frame >= charEnd) return ch
          return POOL[Math.floor(Math.random() * POOL.length)]
        })
        .join('')
      setDisplay(out)
      displayRef.current = out
      frame++
      if (frame > duration) {
        setDisplay(cur)
        displayRef.current = cur
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  // autoStart: jump to a scrambled placeholder on mount, then resolve.
  // Initial paint still matches SSR (deterministic `children`); the scrambled
  // state is set client-only inside this effect, so no hydration mismatch.
  useEffect(() => {
    if (!autoStart) return
    const scrambled = scrambledOf(targetRef.current)
    setDisplay(scrambled)
    displayRef.current = scrambled
    const t = setTimeout(scramble, delay)
    return () => {
      clearTimeout(t)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, delay])

  // Unmount cleanup belt-and-suspenders (in case neither effect above ran).
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <span onMouseEnter={autoStart ? undefined : scramble} className={className}>
      {display}
    </span>
  )
}

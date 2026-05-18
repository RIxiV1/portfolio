"use client"

import { useEffect, useRef, useState } from "react"

const POOL = '!<>-_/[]{}=+*^?#01ABCDEF'

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
  const [display, setDisplay] = useState(children)
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef(children)

  useEffect(() => {
    targetRef.current = children
    if (!autoStart) setDisplay(children)
  }, [children, autoStart])

  const scramble = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const target = targetRef.current
    let frame = 0

    const tick = () => {
      const out = target
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          const charStart = (i / target.length) * (duration * 0.45)
          const charEnd = charStart + duration * 0.55
          if (frame >= charEnd) return ch
          return POOL[Math.floor(Math.random() * POOL.length)]
        })
        .join('')
      setDisplay(out)
      frame++
      if (frame > duration) {
        setDisplay(target)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
  }

  useEffect(() => {
    if (autoStart) {
      const t = setTimeout(scramble, delay)
      return () => {
        clearTimeout(t)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, delay])

  return (
    <span onMouseEnter={autoStart ? undefined : scramble} className={className}>
      {display}
    </span>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

const POOL = '!<>-_/[]{}=+*^?#01'

export function ScrambleText({
  children,
  className,
  duration = 18,
}: {
  children: string
  className?: string
  duration?: number
}) {
  const [display, setDisplay] = useState(children)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    setDisplay(children)
  }, [children])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scramble = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const target = children
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

  return (
    <span onMouseEnter={scramble} className={className}>
      {display}
    </span>
  )
}

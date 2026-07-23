'use client'

import { useRef, type PointerEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

// The masthead reacts to the cursor: each letter's weight (Fraunces' variable
// wght axis) and vertical lift scale with how close the pointer is, so a soft
// "bold spotlight" follows your mouse across the name. Reduced motion → a calm
// static masthead, no reactivity.
const RADIUS = 190
const BASE_WEIGHT = 600
const MAX_WEIGHT = 900
const MIN_WEIGHT = 300

function splitWord(text: string, letterClassName?: string) {
  return [...text].map((ch, i) => (
    <span
      key={i}
      data-letter
      className={cn(
        'inline-block transition-[font-variation-settings,transform] duration-200 ease-out',
        letterClassName,
      )}
      style={{ fontVariationSettings: `"wght" ${BASE_WEIGHT}` }}
    >
      {ch}
    </span>
  ))
}

export function KineticName() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const centers = useRef<{ x: number; y: number }[]>([])

  const cache = () => {
    const letters = ref.current?.querySelectorAll<HTMLElement>('[data-letter]')
    if (!letters) return
    // Read base positions with transforms cleared so the math never feeds back.
    letters.forEach((el) => {
      el.style.transform = 'none'
    })
    centers.current = [...letters].map((el) => {
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    })
  }

  const onMove = (e: PointerEvent<HTMLHeadingElement>) => {
    if (reduce) return
    const letters = ref.current?.querySelectorAll<HTMLElement>('[data-letter]')
    if (!letters) return
    if (centers.current.length !== letters.length) cache()
    letters.forEach((el, i) => {
      const c = centers.current[i]
      if (!c) return
      const d = Math.hypot(e.clientX - c.x, e.clientY - c.y)
      const t = Math.max(0, 1 - d / RADIUS)
      const w = Math.round(MIN_WEIGHT + t * (MAX_WEIGHT - MIN_WEIGHT))
      el.style.fontVariationSettings = `"wght" ${w}`
      el.style.transform = `translateY(${(-t * 10).toFixed(2)}px)`
    })
  }

  const reset = () => {
    const letters = ref.current?.querySelectorAll<HTMLElement>('[data-letter]')
    letters?.forEach((el) => {
      el.style.fontVariationSettings = `"wght" ${BASE_WEIGHT}`
      el.style.transform = 'translateY(0)'
    })
  }

  return (
    <h1
      ref={ref}
      onPointerEnter={cache}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="font-display text-7xl font-semibold leading-[0.86] tracking-tight md:text-8xl lg:text-[9.5rem]"
    >
      <span className="block">{splitWord('Shaik')}</span>
      <span className="block">{splitWord('Suhaib', 'name-gilt')}</span>
    </h1>
  )
}

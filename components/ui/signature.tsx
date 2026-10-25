'use client'

import { motion, useReducedMotion } from 'motion/react'

const VIEWPORT = { once: true, margin: '0px 0px -40px 0px' } as const
const EASE = [0.22, 0.61, 0.36, 1] as const

// A pen-flourish underline that sits under the signature at any width.
function Flourish({ draw }: { draw: boolean }) {
  const path = (
    <path
      d="M4 10 C 55 3, 150 3, 216 9"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  )
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1 left-0 w-full"
      style={{ height: '0.4em' }}
    >
      {draw ? (
        <motion.path
          d="M4 10 C 55 3, 150 3, 216 9"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ delay: 0.85, duration: 0.55, ease: 'easeOut' }}
        />
      ) : (
        path
      )}
    </svg>
  )
}

/** A signature that "writes itself" in on scroll, then underlines with a flourish. */
export function Signature({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span className="relative inline-block">
        <span className={className}>{name}</span>
        <Flourish draw={false} />
      </span>
    )
  }

  return (
    <span className="relative inline-block">
      <motion.span
        className={className}
        style={{ display: 'inline-block' }}
        initial={{ clipPath: 'inset(0 100% -14% 0)' }}
        whileInView={{ clipPath: 'inset(0 0% -14% 0)' }}
        viewport={VIEWPORT}
        transition={{ duration: 1.05, ease: EASE }}
      >
        {name}
      </motion.span>
      <Flourish draw />
    </span>
  )
}

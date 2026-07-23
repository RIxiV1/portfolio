'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

const EASE = [0.21, 0.47, 0.32, 0.98] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

/** Staggers its direct <StaggerItem> children in on mount. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

type Segment = { text: string; className?: string }

/** Reveals a statement word-by-word as it scrolls into view. */
export function WordReveal({
  segments,
  className,
}: {
  segments: Segment[]
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <p className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
            {i < segments.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    )
  }

  const words = segments.flatMap((s) =>
    s.text.split(' ').map((w) => ({ w, className: s.className })),
  )

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055 } },
      }}
    >
      {words.map((it, i) => (
        <motion.span
          key={i}
          className={cn('inline-block', it.className)}
          style={{ marginRight: '0.25em' }}
          variants={{
            hidden: { opacity: 0, y: '0.4em' },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE },
            },
          }}
        >
          {it.w}
        </motion.span>
      ))}
    </motion.p>
  )
}

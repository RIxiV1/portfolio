'use client'

import { useRef, type ReactNode } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'

type MagneticLinkProps = {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  innerStrength?: number
  [key: string]: unknown
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.22,
  innerStrength = 0.12,
  ...rest
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ix = useMotionValue(0)
  const iy = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const isx = useSpring(ix, { stiffness: 260, damping: 20, mass: 0.3 })
  const isy = useSpring(iy, { stiffness: 260, damping: 20, mass: 0.3 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
    )
      return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    x.set(dx * strength)
    y.set(dy * strength)
    ix.set(dx * innerStrength)
    iy.set(dy * innerStrength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    ix.set(0)
    iy.set(0)
  }

  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('//')

  const innerContent = (
    <motion.span
      style={{
        x: isx,
        y: isy,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'inherit',
      }}
    >
      {children}
    </motion.span>
  )

  if (isExternal) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ x: sx, y: sy }}
        className={className}
        {...rest}
      >
        {innerContent}
      </motion.a>
    )
  }

  return (
    <motion.div
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        {...rest}
      >
        {innerContent}
      </Link>
    </motion.div>
  )
}

"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react"

type MagneticLinkProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode
  /** How strongly the button tracks the cursor (0–1). Default 0.22. */
  strength?: number
  /** Inner content gets a softer pull for a layered, liquid feel. Default 0.12. */
  innerStrength?: number
}

export function MagneticLink({
  children,
  className,
  strength = 0.22,
  innerStrength = 0.12,
  ...rest
}: MagneticLinkProps) {
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

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      <motion.span style={{ x: isx, y: isy, display: "inline-flex", alignItems: "center", gap: "inherit" }}>
        {children}
      </motion.span>
    </motion.a>
  )
}

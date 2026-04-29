"use client"

import { motion, useMotionValue, useSpring } from "motion/react"
import { MouseEvent, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  children: ReactNode
  className?: string
  color?: string
}

export function Spotlight({ children, className, color = "rgba(34, 211, 238, 0.05)" }: SpotlightProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Use a softer spring for the spotlight to reduce GPU paint updates
  const springConfig = { damping: 30, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 80%)`,
          willChange: "background",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

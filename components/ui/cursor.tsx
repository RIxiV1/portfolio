"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

const INTERACTIVE_SEL =
  'a, button, [role="button"], input, textarea, select, label, summary'

export function Cursor() {
  const [isTouch, setIsTouch] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Almost no spring — a crosshair needs to track precisely.
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 40, stiffness: 900, mass: 0.2 })
  const sy = useSpring(y, { damping: 40, stiffness: 900, mass: 0.2 })

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    let firstMove = true

    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      x.set(e.clientX)
      y.set(e.clientY)
      if (firstMove) {
        firstMove = false
        setIsReady(true)
        document.documentElement.classList.add('cursor-hidden')
      }
    }

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      setIsHovering(!!target?.closest(INTERACTIVE_SEL))
    }

    const down = () => setIsPressed(true)
    const up = () => setIsPressed(false)
    const leave = () => {
      setIsReady(false)
      document.documentElement.classList.remove('cursor-hidden')
    }
    const enter = () => {
      setIsReady(true)
      document.documentElement.classList.add('cursor-hidden')
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('cursor-hidden')
    }
  }, [x, y])

  if (isTouch) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x: sx, y: sy, opacity: isReady ? 1 : 0 }}
    >
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          display: 'block',
          willChange: 'transform',
        }}
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isPressed ? 0.85 : isHovering ? 1.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        {/* Top arm */}
        <line
          x1="14"
          y1="2"
          x2="14"
          y2="10"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Bottom arm */}
        <line
          x1="14"
          y1="18"
          x2="14"
          y2="26"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Left arm */}
        <line
          x1="2"
          y1="14"
          x2="10"
          y2="14"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Right arm */}
        <line
          x1="18"
          y1="14"
          x2="26"
          y2="14"
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Center pixel */}
        <circle cx="14" cy="14" r="1" fill="#22d3ee" />
      </motion.svg>
    </motion.div>
  )
}

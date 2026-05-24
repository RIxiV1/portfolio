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
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          display: 'block',
          willChange: 'transform',
        }}
        animate={{
          scale: isPressed ? 0.7 : isHovering ? 1.55 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      >
        {/* Corner brackets — viewfinder framing the cursor target */}
        <path
          d="M4 10 L4 4 L10 4"
          stroke="#22d3ee"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        <path
          d="M22 4 L28 4 L28 10"
          stroke="#22d3ee"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        <path
          d="M4 22 L4 28 L10 28"
          stroke="#22d3ee"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        <path
          d="M22 28 L28 28 L28 22"
          stroke="#22d3ee"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
        {/* Precision dot — always marks exact pointer position */}
        <circle cx="16" cy="16" r="1.25" fill="#22d3ee" />
      </motion.svg>
    </motion.div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

interface CursorProps {
  size?: number
  className?: string
}

export function Cursor({ size = 60, className }: CursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const isVisibleRef = useRef(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Add a slight spring for "premium" feel and performance shielding
  const springConfig = { damping: 25, stiffness: 250 }
  const edgeX = useSpring(cursorX, springConfig)
  const edgeY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouchDevice(true)
      return
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2)
      cursorY.set(e.clientY - size / 2)
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const hideCursor = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }
    const showCursor = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", hideCursor)
    document.addEventListener("mouseenter", showCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", hideCursor)
      document.removeEventListener("mouseenter", showCursor)
    }
  }, [size, cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed z-[9999] rounded-full bg-white mix-blend-difference hidden md:block",
        className
      )}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        width: size,
        height: size,
        x: edgeX,
        y: edgeY,
        opacity: isVisible ? 1 : 0,
        willChange: "transform, opacity",
      }}
    />
  )
}

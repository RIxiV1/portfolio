"use client"

import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useMouseMove } from "@/hooks/use-mouse-move"

interface SpecialTextProps {
  children: string
  className?: string
  delay?: number
  inView?: boolean // Added back for compatibility
}

export function SpecialText({
  children,
  className,
  delay = 0,
  inView: inViewProp,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const inViewHook = useInView(containerRef, { once: true, margin: "-10%" })
  const isInView = inViewProp !== undefined ? inViewProp : inViewHook
  const prefersReduced = useReducedMotion()
  
  const letters = children.split("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Slightly faster stagger for better feel
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 15, 
      filter: "blur(8px)",
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  if (prefersReduced) {
    return (
      <span className={cn("font-bold tracking-tight", className)}>
        {children}
      </span>
    )
  }

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative inline-flex flex-wrap justify-center py-4 px-2 cursor-default group/text",
        className
      )}
      style={{ willChange: "opacity" }}
    >
      {/* Light Scan Effect */}
      <motion.div
        animate={{
          left: ["-100%", "200%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4
        }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent w-1/3 -skew-x-12 pointer-events-none"
        style={{ willChange: "left" }}
      />

      {letters.map((char, i) => {
        if (char === " ") {
          return <span key={`space-${i}`} className="w-[0.3em]" />
        }
        
        return (
          <motion.span
            key={`${char}-${i}`}
            variants={letterVariants}
            whileHover={{
              y: -4,
              scale: 1.15,
              color: "#22d3ee",
              transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            className={cn(
              "inline-block relative text-white transition-colors duration-300",
            )}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Subtle Glow Layer */}
            <motion.span
              animate={{ 
                opacity: [0, 0.3, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="absolute inset-0 bg-cyan-400/5 blur-xl rounded-full pointer-events-none opacity-0 group-hover/text:opacity-100 transition-opacity"
            />
            <span className="relative z-10">{char}</span>
          </motion.span>
        )
      })}
    </motion.span>
  )
}

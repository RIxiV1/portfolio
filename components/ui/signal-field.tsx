'use client'

import { motion } from 'motion/react'

export function SignalField({
  size = 420,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className || ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Ambient gradient spotlight */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent blur-3xl opacity-70" />

      {/* Outer subtle orbital ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-dashed border-accent/20"
      />

      {/* Inner geometric accent ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-20 rounded-full border border-accent/15"
      />

      {/* Center glowing monogram / mark */}
      <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-elevated/80 backdrop-blur-xl shadow-2xl shadow-accent/20">
        <span className="font-display text-5xl font-bold tracking-tight text-gradient">S</span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent" />
      </div>
    </div>
  )
}

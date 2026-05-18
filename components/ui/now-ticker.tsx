"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

export function NowTicker({ items, interval = 2800 }: { items: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  return (
    <span className="relative inline-block min-h-[1em] overflow-hidden align-middle">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="block text-foreground/85"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

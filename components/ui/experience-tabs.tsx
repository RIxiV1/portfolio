"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

type Item = {
  role: string
  org: string
  period: string
  description: string
}

export function ExperienceTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
      {/* Tab rail */}
      <ul className="border-l border-foreground/[0.08]" role="tablist" aria-label="Experience">
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <li key={i}>
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={cn(
                  "block w-full -ml-px border-l py-3 pl-4 text-left transition-colors",
                  isActive
                    ? "border-cyan-400"
                    : "border-transparent hover:border-foreground/30"
                )}
              >
                <span
                  className={cn(
                    "block font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-cyan-400" : "text-muted-foreground"
                  )}
                >
                  {item.org.split(',')[0].split('—')[0].trim()}
                </span>
                <span className="mt-1 block font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground/70">
                  {item.period}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Panel */}
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-3"
          >
            <h3 className="text-xl font-medium tracking-tight">
              {current.role} <span className="text-cyan-400">@</span>{" "}
              <span className="text-muted-foreground">{current.org}</span>
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {current.period}
            </p>
            <p className="pt-1 leading-relaxed text-foreground/80">{current.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

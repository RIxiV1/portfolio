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
      {/* Tab rail — horizontal scroll on mobile, vertical rail on md+ */}
      <ul
        role="tablist"
        aria-label="Experience"
        className={cn(
          "flex snap-x snap-mandatory gap-2 overflow-x-auto border-b border-foreground/[0.08] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:flex-col md:gap-0 md:overflow-visible md:border-b-0 md:border-l md:border-foreground/[0.08] md:pb-0"
        )}
      >
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <li key={i} className="snap-start shrink-0 md:shrink">
              <button
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={cn(
                  "block w-full whitespace-nowrap border-b px-3 py-2 text-left transition-colors -mb-px",
                  "md:whitespace-normal md:border-b-0 md:border-l md:py-3 md:pl-4 md:pr-0 md:-ml-px md:mb-0",
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

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const RAIL = [
  { id: "home", label: "home", index: "00" },
  { id: "about", label: "about", index: "01" },
  { id: "work", label: "work", index: "02" },
  { id: "lab", label: "lab", index: "03" },
  { id: "stack", label: "stack", index: "04" },
  { id: "journey", label: "journey", index: "05" },
  { id: "writing", label: "writing", index: "06" },
  { id: "contact", label: "contact", index: "07" },
]

export function ScrollRail() {
  const [active, setActive] = useState<string>("home")

  useEffect(() => {
    const sections = RAIL.map((r) => document.getElementById(r.id)).filter(
      Boolean,
    ) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((acc, e) =>
          e.boundingClientRect.top < acc.boundingClientRect.top ? e : acc,
        )
        setActive((top.target as HTMLElement).id)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {RAIL.map((r) => {
          const isActive = active === r.id
          return (
            <li key={r.id} className="pointer-events-auto">
              <a
                href={`#${r.id}`}
                aria-label={`${r.label} section`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.25em] tabular-nums opacity-0 transition-opacity duration-200",
                    isActive
                      ? "text-cyan-400/80 opacity-100"
                      : "text-muted-foreground group-hover:opacity-100",
                  )}
                >
                  <span className="text-muted-foreground/40">{r.index}</span>{" "}
                  {r.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px transition-all duration-300",
                    isActive
                      ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                      : "w-3 bg-foreground/25 group-hover:w-5 group-hover:bg-foreground/60",
                  )}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

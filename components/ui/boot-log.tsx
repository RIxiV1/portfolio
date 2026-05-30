"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type BootLogProps = {
  lines: string[]
  className?: string
  charDelay?: number
  lineDelay?: number
}

export function BootLog({
  lines,
  className,
  charDelay = 16,
  lineDelay = 150,
}: BootLogProps) {
  const [activeLine, setActiveLine] = useState(0)
  const [activeText, setActiveText] = useState("")
  const done = activeLine >= lines.length

  useEffect(() => {
    if (done) return
    const target = lines[activeLine]
    if (activeText.length < target.length) {
      const t = setTimeout(
        () => setActiveText(target.slice(0, activeText.length + 1)),
        charDelay,
      )
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setActiveLine((l) => l + 1)
      setActiveText("")
    }, lineDelay)
    return () => clearTimeout(t)
  }, [activeLine, activeText, lines, done, charDelay, lineDelay])

  return (
    <pre
      aria-hidden="true"
      className={cn(
        "font-mono text-[10px] leading-[1.7] text-muted-foreground/55",
        className,
      )}
    >
      {lines.slice(0, activeLine).map((l, i) => (
        <div key={i}>
          <span className="text-cyan-400/60">›</span> {l}
        </div>
      ))}
      {!done && (
        <div>
          <span className="text-cyan-400/60">›</span> {activeText}
          <span className="ml-0.5 inline-block h-[0.85em] w-[0.45em] translate-y-[0.12em] animate-pulse bg-cyan-400/70" />
        </div>
      )}
      {done && (
        <div className="text-foreground/40">
          <span className="text-cyan-400/60">›</span> _
        </div>
      )}
    </pre>
  )
}

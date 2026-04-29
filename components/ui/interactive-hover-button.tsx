"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps {
  text?: string
  className?: string
}

export function InteractiveHoverButton({
  text = "Explore",
  className,
}: InteractiveHoverButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-transparent px-8 py-3 text-center font-medium text-white transition-all duration-300 hover:border-cyan-500",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
        {text}
      </span>
      <span className="absolute right-8 top-1/2 -translate-y-1/2 translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRight className="h-5 w-5 text-cyan-500" />
      </span>
    </button>
  )
}

"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("h-8 w-16 rounded-full bg-slate-800", className)} />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative z-50 flex h-8 w-16 items-center rounded-full bg-slate-800 p-1 transition-colors",
        className
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "absolute h-6 w-6 rounded-full bg-white transition-transform duration-300",
          isDark ? "translate-x-0" : "translate-x-8"
        )}
      />
      <span className="relative z-10 flex w-full justify-between px-1">
        <Moon
          className={cn(
            "h-4 w-4 transition-colors",
            isDark ? "text-slate-900" : "text-slate-500"
          )}
        />
        <Sun
          className={cn(
            "h-4 w-4 transition-colors",
            isDark ? "text-slate-500" : "text-slate-900"
          )}
        />
      </span>
    </button>
  )
}

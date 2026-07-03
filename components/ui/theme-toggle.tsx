"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  // Render nothing icon-wise until mounted so SSR (which can't know the
  // resolved theme) doesn't mismatch the client.
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:border-accent/40 hover:text-accent"
    >
      {mounted && (dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
    </button>
  )
}

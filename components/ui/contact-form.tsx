"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [honeypot, setHoneypot] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: honeypot }),
      })
      if (!response.ok) throw new Error("Failed to submit")
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const fieldClass =
    "w-full bg-transparent border-b border-foreground/15 px-0 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-cyan-400 transition-colors"
  const labelClass =
    "block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2"

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Honeypot — hidden from humans, filled by bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          required
          maxLength={4000}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          placeholder="What's on your mind?"
          className={cn(fieldClass, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-50",
          status === "success" && "text-cyan-400",
          status === "error" && "text-red-400",
          (status === "idle" || status === "loading") && "text-foreground hover:text-cyan-400"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span
              key="l"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending
            </motion.span>
          ) : status === "success" ? (
            <motion.span
              key="s"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="h-3.5 w-3.5" />
              Message sent
            </motion.span>
          ) : status === "error" ? (
            <motion.span
              key="e"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Try again
            </motion.span>
          ) : (
            <motion.span
              key="i"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              Send message
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, AlertCircle, Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; reason: string }

const fieldClass =
  "w-full bg-transparent border-b border-foreground/15 px-0 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
const labelClass =
  "block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2"

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [honeypot, setHoneypot] = useState("")

  const submitting = state.kind === "submitting"

  const send = async () => {
    // Belt-and-suspenders: ignore additional submits while one is in flight.
    if (submitting) return
    setState({ kind: "submitting" })
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: honeypot }),
      })

      if (!response.ok) {
        let reason = `Failed to send (HTTP ${response.status}).`
        try {
          const body = await response.json()
          if (body && typeof body.error === "string") reason = body.error
        } catch {
          // response wasn't JSON — keep the HTTP fallback message
        }
        setState({ kind: "error", reason })
        return
      }

      setState({ kind: "success" })
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Network error — check your connection and try again."
      setState({ kind: "error", reason: `Network error: ${message}` })
    }
  }

  const acknowledgeSuccess = () => {
    setFormData({ name: "", email: "", message: "" })
    setState({ kind: "idle" })
  }

  const dismissError = () => setState({ kind: "idle" })

  // Success replaces the form entirely — persistent until user acknowledges.
  // Form data is preserved underneath so a user who wants to copy/edit can
  // hit "Send another" and start clean.
  if (state.kind === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        role="status"
        aria-live="polite"
        className="space-y-5 border border-cyan-400/30 bg-cyan-400/[0.04] p-6"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
          <Check className="h-3.5 w-3.5" />
          Message sent
        </div>
        <p className="leading-relaxed text-foreground/90">
          Thanks for reaching out — I&apos;ll get back to you within a couple of days.
        </p>
        <button
          type="button"
          onClick={acknowledgeSuccess}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-cyan-400"
        >
          Send another
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
      className="space-y-10"
      noValidate
    >
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
            disabled={submitting}
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
            disabled={submitting}
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
          disabled={submitting}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          placeholder="What's on your mind?"
          className={cn(fieldClass, "resize-none")}
        />
      </div>

      {/* Persistent error — stays until the user dismisses or fixes & resubmits. */}
      <AnimatePresence>
        {state.kind === "error" && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="alert"
            className="flex items-start gap-3 border border-red-400/30 bg-red-400/[0.05] p-4 text-sm"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1 space-y-2">
              <p className="text-red-300/90">{state.reason}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Adjust your input and resubmit, or dismiss this message.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissError}
              aria-label="Dismiss error"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className={cn(
          "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
          submitting
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground hover:text-cyan-400"
        )}
      >
        {submitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  )
}

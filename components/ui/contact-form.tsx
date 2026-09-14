'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ArrowUpRight, AlertCircle, Check, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type FormState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; reason: string; input: boolean }

const fieldClass =
  'w-full rounded-xl border border-border/80 bg-elevated/80 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 transition-[border-color,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-50'
const labelClass = 'eyebrow mb-2 block text-muted-foreground'

const FIELDS = ['name', 'email', 'message'] as const
type Field = (typeof FIELDS)[number]
const errorClass = 'border-error focus:border-error focus:ring-error/15'

export function ContactForm() {
  const [state, setState] = useState<FormState>({ kind: 'idle' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const reduce = useReducedMotion()

  const submitting = state.kind === 'submitting'

  // Client-side validation mirrors the server's Zod rules so an invalid submit
  // never round-trips — and each failure is announced on its own field.
  const validate = (): Partial<Record<Field, string>> => {
    const e: Partial<Record<Field, string>> = {}
    if (formData.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      e.email = 'Enter a valid email address.'
    if (formData.message.trim().length < 10)
      e.message = 'A bit more detail helps — 10 characters or more.'
    return e
  }

  const clearError = (f: Field) =>
    setErrors((p) => (p[f] ? { ...p, [f]: undefined } : p))

  const send = async () => {
    // Belt-and-suspenders: ignore additional submits while one is in flight.
    if (submitting) return
    setState({ kind: 'submitting' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hp_field: honeypot }),
      })

      if (!response.ok) {
        let reason = `Failed to send (HTTP ${response.status}).`
        try {
          const body = await response.json()
          if (body && typeof body.error === 'string') reason = body.error
        } catch {
          // response wasn't JSON — keep the HTTP fallback message
        }
        setState({ kind: 'error', reason, input: response.status === 400 })
        return
      }

      setState({ kind: 'success' })
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Network error — check your connection and try again.'
      setState({
        kind: 'error',
        reason: `Network error: ${message}`,
        input: false,
      })
    }
  }

  const acknowledgeSuccess = () => {
    setFormData({ name: '', email: '', message: '' })
    setState({ kind: 'idle' })
  }

  const dismissError = () => setState({ kind: 'idle' })

  // Success replaces the form entirely — persistent until user acknowledges.
  // Form data is preserved underneath so a user who wants to copy/edit can
  // hit "Send another" and start clean.
  if (state.kind === 'success') {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        role="status"
        aria-live="polite"
        className="space-y-5 border border-accent/30 bg-accent/[0.04] p-6"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          <Check className="h-3.5 w-3.5" />
          Message sent
        </div>
        <p className="leading-relaxed text-foreground/90">
          Thanks for reaching out — I&apos;ll get back to you within a couple of
          days.
        </p>
        <button
          type="button"
          onClick={acknowledgeSuccess}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
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
        const next = validate()
        setErrors(next)
        const firstInvalid = FIELDS.find((f) => next[f])
        if (firstInvalid) {
          document.getElementById(firstInvalid)?.focus()
          return
        }
        send()
      }}
      className="space-y-10"
      noValidate
    >
      {/* Honeypot — hidden from humans, filled by bots. Field name is
          deliberately non-semantic so browser autofill never fills it. */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="hp_field">Leave this field empty</label>
        <input
          id="hp_field"
          name="hp_field"
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
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={formData.name}
            onChange={(e) => {
              setFormData((p) => ({ ...p, name: e.target.value }))
              clearError('name')
            }}
            placeholder="Your name"
            className={cn(fieldClass, errors.name && errorClass)}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-error">
              {errors.name}
            </p>
          )}
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            value={formData.email}
            onChange={(e) => {
              setFormData((p) => ({ ...p, email: e.target.value }))
              clearError('email')
            }}
            placeholder="you@example.com"
            className={cn(fieldClass, errors.email && errorClass)}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-error">
              {errors.email}
            </p>
          )}
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
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          value={formData.message}
          onChange={(e) => {
            setFormData((p) => ({ ...p, message: e.target.value }))
            clearError('message')
          }}
          placeholder="What's on your mind?"
          className={cn(
            fieldClass,
            'resize-none',
            errors.message && errorClass,
          )}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Persistent error — stays until the user dismisses or fixes & resubmits. */}
      <AnimatePresence>
        {state.kind === 'error' && (
          <motion.div
            key="err"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="alert"
            className="flex items-start gap-3 border border-error/30 bg-error/[0.06] p-4 text-sm"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
            <div className="flex-1 space-y-2">
              <p className="text-foreground/90">{state.reason}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {state.input
                  ? 'Adjust your input and resubmit, or dismiss this message.'
                  : 'This one’s on my end — you can also email me directly.'}
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
          'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
          submitting
            ? 'cursor-not-allowed bg-muted text-muted-foreground'
            : 'bg-accent text-accent-foreground hover:bg-accent-strong hover:shadow-[0_10px_30px_-10px_var(--accent)]',
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

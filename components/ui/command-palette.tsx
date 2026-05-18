"use client"

import { useMemo, useState } from "react"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

type Command = {
  hint: string
  run: () => string | void
}

const scrollTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return `→ jumping to #${id}`
}

const COMMANDS: Record<string, Command> = {
  about:   { hint: 'about',   run: scrollTo('about') },
  work:    { hint: 'work',    run: scrollTo('work') },
  stack:   { hint: 'stack',   run: scrollTo('stack') },
  journey: { hint: 'journey', run: scrollTo('journey') },
  writing: { hint: 'writing', run: scrollTo('writing') },
  contact: { hint: 'contact', run: scrollTo('contact') },
  email:   { hint: 'email',   run: () => { window.location.href = `mailto:${siteConfig.email}`; return `→ opening mail client` } },
  resume:  { hint: 'resume',  run: () => { window.open(siteConfig.resumeUrl, '_blank'); return `→ opening résumé` } },
  github:  { hint: 'github',  run: () => { window.open('https://github.com/RIxiV1', '_blank'); return `→ opening github` } },
  clear:   { hint: 'clear',   run: () => '' },
}

const COMMAND_KEYS = Object.keys(COMMANDS).concat(['help'])

export function CommandPalette() {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null)

  // Best autocomplete match for the current input.
  const suggestion = useMemo(() => {
    const cmd = value.trim().toLowerCase()
    if (!cmd) return ''
    const match = COMMAND_KEYS.find((k) => k.startsWith(cmd) && k !== cmd)
    return match ? match.slice(cmd.length) : ''
  }, [value])

  const exec = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'help' || cmd === '?') {
      setFeedback({
        msg: Object.keys(COMMANDS).join(' · '),
        ok: true,
      })
      setValue('')
      return
    }

    const command = COMMANDS[cmd]
    if (command) {
      const result = command.run()
      if (result === '') {
        setFeedback(null)
      } else {
        setFeedback({ msg: result || `→ ${command.hint}`, ok: true })
      }
      setValue('')
    } else {
      setFeedback({ msg: `?? unknown command: "${cmd}" — try 'help'`, ok: false })
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      exec(value)
    } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
      // Only autocomplete on ArrowRight if caret is at the end.
      if (e.key === 'ArrowRight') {
        const input = e.currentTarget
        if (input.selectionStart !== value.length) return
      }
      e.preventDefault()
      setValue(value + suggestion)
    }
  }

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center gap-2 border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-2 transition-colors focus-within:border-cyan-400/40">
        <span className="select-none text-cyan-400">$</span>

        {/* Input layered over ghost suggestion text */}
        <div className="relative flex-1">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type 'help' to interact"
            aria-label="Command input"
            spellCheck={false}
            autoComplete="off"
            className="relative z-10 w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground/40"
          />
          {suggestion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 whitespace-pre text-muted-foreground/35"
            >
              <span className="invisible">{value}</span>
              {suggestion}
            </span>
          )}
        </div>

        <kbd className="rounded border border-foreground/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">
          {suggestion ? '⇥' : '↵'}
        </kbd>
      </div>
      {feedback && (
        <p
          className={cn(
            "mt-2 text-[11px]",
            feedback.ok ? "text-muted-foreground" : "text-red-400/80"
          )}
        >
          {feedback.msg}
        </p>
      )}
    </div>
  )
}

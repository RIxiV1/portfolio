"use client"

import { useState } from "react"
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

export function CommandPalette() {
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null)

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

  return (
    <div className="font-mono text-xs">
      <div className="flex items-center gap-2 border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-2 transition-colors focus-within:border-cyan-400/40">
        <span className="text-cyan-400 select-none">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') exec(value) }}
          placeholder="type 'help' to interact"
          aria-label="Command input"
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/40"
        />
        <kbd className="rounded border border-foreground/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">↵</kbd>
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

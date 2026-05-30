"use client"

import { useMemo, useState } from "react"
import { siteConfig } from "@/data/site"
import { cn } from "@/lib/utils"

type Command = {
  hint: string
  run: () => string | Promise<string> | void
  // Hidden commands work but don't appear in `help` or autocomplete — easter eggs.
  hidden?: boolean
}

const scrollTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return `→ jumping to #${id}`
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(siteConfig.email)
    return `→ copied ${siteConfig.email} to clipboard`
  } catch {
    return `?? clipboard blocked — email: ${siteConfig.email}`
  }
}

const COMMANDS: Record<string, Command> = {
  about:   { hint: 'about',   run: scrollTo('about') },
  work:    { hint: 'work',    run: scrollTo('work') },
  stack:   { hint: 'stack',   run: scrollTo('stack') },
  journey: { hint: 'journey', run: scrollTo('journey') },
  writing: { hint: 'writing', run: scrollTo('writing') },
  contact: { hint: 'contact', run: scrollTo('contact') },
  email:   { hint: 'email',   run: () => { window.location.href = `mailto:${siteConfig.email}`; return `→ opening mail client` } },
  copy:    { hint: 'copy',    run: copyEmail },
  resume:  { hint: 'resume',  run: () => { window.open(siteConfig.resumeUrl, '_blank'); return `→ opening résumé` } },
  github:  { hint: 'github',  run: () => { window.open('https://github.com/RIxiV1', '_blank'); return `→ opening github` } },
  clear:   { hint: 'clear',   run: () => '' },

  // Easter eggs — discovery is the reward; keep them out of help & autocomplete.
  whoami:  { hint: 'whoami',  hidden: true, run: () => `→ ${siteConfig.name.toLowerCase().replace(/\s+/g, '_')} (uid=1000)` },
  sudo:    { hint: 'sudo',    hidden: true, run: () => `?? ${siteConfig.name.split(' ')[0].toLowerCase()} is not in the sudoers file. This incident will be reported.` },
  ls:      { hint: 'ls',      hidden: true, run: () => `about/  work/  stack/  journey/  writing/  contact/` },
  pwd:     { hint: 'pwd',     hidden: true, run: () => `/home/visitor/shaik.dev` },
  coffee:  { hint: 'coffee',  hidden: true, run: () => `→ brewing... (HTTP 418 I'm a teapot)` },
  exit:    { hint: 'exit',    hidden: true, run: () => `?? nice try — you're stuck here with me` },
}

const COMMAND_KEYS = Object.keys(COMMANDS).filter((k) => !COMMANDS[k].hidden).concat(['help'])
const VISIBLE_KEYS = Object.keys(COMMANDS).filter((k) => !COMMANDS[k].hidden)

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

  const exec = async (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'help' || cmd === '?') {
      setFeedback({
        msg: VISIBLE_KEYS.join(' · '),
        ok: true,
      })
      setValue('')
      return
    }

    const command = COMMANDS[cmd]
    if (command) {
      const result = await command.run()
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
      {/* macOS-style window chrome */}
      <div className="overflow-hidden rounded-md border border-foreground/[0.08] bg-foreground/[0.02] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-colors focus-within:border-cyan-400/40">
        <div className="flex items-center gap-2 border-b border-foreground/[0.06] bg-foreground/[0.015] px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span
              aria-hidden="true"
              className="relative h-2.5 w-2.5 rounded-full bg-[#28c840]/80"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#28c840]/60" />
            </span>
          </div>
          <span className="flex-1 select-none text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            shaik@portfolio: ~/now — zsh — 80×24
          </span>
          {/* Spacer to balance the traffic lights so title centers visually */}
          <div aria-hidden="true" className="w-[42px]" />
        </div>

        <div className="flex items-center gap-2 px-3 py-2.5">
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
                className="pointer-events-none absolute inset-0 z-0 whitespace-pre text-muted-foreground/55"
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
      </div>
      {feedback && (
        <p
          className={cn(
            "mt-2 px-1 text-[11px]",
            feedback.ok ? "text-muted-foreground" : "text-red-400/80"
          )}
        >
          {feedback.msg}
        </p>
      )}
    </div>
  )
}

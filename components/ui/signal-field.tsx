'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Sample a clean typographic 'S' outline as particle targets.
 * The drifting ambient warm ember noise coalesces into a luminous monogram on hover.
 */
function monogramEdges(): [number, number][] {
  const W = 240
  const H = 280
  const oc = document.createElement('canvas')
  oc.width = W
  oc.height = H
  const g = oc.getContext('2d')
  if (!g) return []

  g.fillStyle = '#ffffff'
  g.font = '700 240px "Playfair Display", Georgia, serif'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText('S', W / 2, H / 2 + 10)

  const img = g.getImageData(0, 0, W, H).data
  const on = (x: number, y: number) =>
    x >= 0 && x < W && y >= 0 && y < H && img[(y * W + x) * 4 + 3] > 140

  const edges: [number, number][] = []
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (
        on(x, y) &&
        (!on(x - 2, y) || !on(x + 2, y) || !on(x, y - 2) || !on(x, y + 2))
      ) {
        edges.push([x, y])
      }
    }
  }
  return edges
}

/**
 * Ambient ember particle field: warm drifting particles that gently coalesce
 * into the 'S' monogram on interaction.
 */
export function SignalField({
  size = 420,
  className,
}: {
  size?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = size * dpr
    cv.height = size * dpr
    cv.style.width = `${size}px`
    cv.style.height = `${size}px`
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const col = {
      accent: [129, 140, 248],
      fg: [243, 241, 248],
      noise: [155, 148, 176],
    }

    const hexRgb = (h: string): number[] => {
      h = h.trim().replace('#', '')
      if (h.length === 3) {
        h = h
          .split('')
          .map((c) => c + c)
          .join('')
      }
      return [
        parseInt(h.slice(0, 2), 16) || 196,
        parseInt(h.slice(2, 4), 16) || 93,
        parseInt(h.slice(4, 6), 16) || 44,
      ]
    }

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      const a = s.getPropertyValue('--accent').trim()
      const f = s.getPropertyValue('--foreground').trim()
      const n = s.getPropertyValue('--muted-foreground').trim()
      if (a && a.startsWith('#')) col.accent = hexRgb(a)
      if (f && f.startsWith('#')) col.fg = hexRgb(f)
      if (n && n.startsWith('#')) col.noise = hexRgb(n)
    }
    readColors()

    const rgba = (c: number[], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`

    const edges = monogramEdges()
    const scale = (size * 0.88) / 280
    const ox = (size - 240 * scale) / 2
    const oy = (size - 280 * scale) / 2
    const N = 260
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const dot = size / 260 + 1.2

    const core = Array.from({ length: N }, (_, i) => {
      const e = edges.length
        ? edges[Math.floor((i * edges.length) / N)]
        : [120, 140]
      return {
        x: rnd(0, size),
        y: rnd(0, size),
        tx: ox + e[0] * scale,
        ty: oy + e[1] * scale,
        ph: rnd(0, 6.28),
      }
    })

    if (reduce) {
      ctx.clearRect(0, 0, size, size)
      ctx.fillStyle = rgba(col.accent, 0.9)
      for (const p of core) {
        ctx.beginPath()
        ctx.arc(p.tx, p.ty, dot, 0, 6.283)
        ctx.fill()
      }
      return
    }

    const noiseN = Math.round(size / 6)
    const noise = Array.from({ length: noiseN }, () => ({
      x: rnd(0, size),
      y: rnd(0, size),
      vx: rnd(-0.2, 0.2),
      vy: rnd(-0.2, 0.2),
      a: rnd(0.15, 0.45),
      rr: rnd(size / 220, size / 110),
    }))

    const base = 0.28
    let hoverV = 0
    let hoverT = 0
    let inView = true
    let raf = 0
    const t0 = performance.now()

    const onEnter = () => (hoverT = 1)
    const onLeave = () => (hoverT = 0)
    cv.addEventListener('pointerenter', onEnter)
    cv.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting
        if (inView && !raf) raf = requestAnimationFrame(frame)
      },
      { threshold: 0.05 },
    )
    io.observe(cv)

    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    function frame(now: number) {
      if (!inView) {
        raf = 0
        return
      }
      const g = ctx as CanvasRenderingContext2D
      const t = (now - t0) / 1000
      hoverV += (hoverT - hoverV) * 0.08
      const coh = Math.min(1, base + hoverV * (1 - base))
      g.clearRect(0, 0, size, size)

      // Ambient warm drifting noise
      for (const p of noise) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x += size
        if (p.x > size) p.x -= size
        if (p.y < 0) p.y += size
        if (p.y > size) p.y -= size
        g.globalAlpha = p.a * (1 - hoverV * 0.8)
        g.fillStyle = rgba(col.noise, 1)
        g.beginPath()
        g.arc(p.x, p.y, p.rr, 0, 6.283)
        g.fill()
      }
      g.globalAlpha = 1

      // Monogram targets
      const k = 0.05 + coh * 0.15
      const jit = (1 - coh) * 7
      g.fillStyle = rgba(col.accent, 0.9)
      g.shadowColor = rgba(col.accent, 0.6)
      g.shadowBlur = 4 + hoverV * 12

      for (const p of core) {
        p.x += (p.tx - p.x) * k + Math.cos(t * 1.5 + p.ph) * jit * 0.05
        p.y += (p.ty - p.y) * k + Math.sin(t * 1.5 + p.ph) * jit * 0.05
        g.beginPath()
        g.arc(p.x, p.y, dot, 0, 6.283)
        g.fill()
      }
      g.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      cv.removeEventListener('pointerenter', onEnter)
      cv.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, size])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}

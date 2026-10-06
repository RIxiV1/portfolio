'use client'

import { useEffect, useRef } from 'react'

/**
 * ScanlineCat — A pixel-art style cat rendered via SVG with a
 * CSS scanline / halftone overlay, inspired by the Meow AI Agent
 * site aesthetic. Works in both light (black cat on white) and
 * dark (white cat on black) via CSS `currentColor` / theme vars.
 */
export function ScanlineCat({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Subtle glitch: randomly shift a few scanlines every few seconds
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof window === 'undefined') return
    const lines = svg.querySelectorAll<SVGRectElement>('.scan-stripe')
    let raf: number

    const glitch = () => {
      const count = Math.floor(Math.random() * 3) + 1
      const picked: SVGRectElement[] = []
      for (let i = 0; i < count; i++) {
        const el = lines[Math.floor(Math.random() * lines.length)]
        if (el) {
          el.style.transform = `translateX(${(Math.random() - 0.5) * 18}px)`
          el.style.opacity = String(Math.random() * 0.4 + 0.1)
          picked.push(el)
        }
      }
      raf = window.setTimeout(() => {
        picked.forEach((el) => {
          el.style.transform = ''
          el.style.opacity = ''
        })
      }, 120)
    }

    const id = window.setInterval(glitch, 2600)
    return () => {
      clearInterval(id)
      clearTimeout(raf)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 440"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pixel art cat mascot"
      role="img"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Scanline mask — fills inside cat silhouette with horizontal stripes */}
        <pattern
          id="scanlines"
          x="0"
          y="0"
          width="400"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="400" height="2" fill="currentColor" opacity="0.9" />
          <rect y="2" width="400" height="2" fill="transparent" />
        </pattern>

        {/* Clip the cat body shape */}
        <clipPath id="cat-clip">
          <path d="
            M 120 380
            L 100 340 L 90 290 L 85 240
            L 80 200 L 70 160
            L 60 100 L 80 60 L 110 40
            L 130 30 L 148 10
            L 160 30 L 170 50
            L 200 45 L 220 25
            L 240 10 L 260 30
            L 270 50
            L 295 40 L 320 55 L 330 90
            L 325 140 L 315 180
            L 310 220 L 308 265
            L 305 310 L 300 350 L 280 380
            L 260 390 L 200 395 L 140 390
            Z
          " />
        </clipPath>
      </defs>

      {/* ── Background fill (makes scanlines visible) ── */}
      <rect
        x="65"
        y="5"
        width="275"
        height="395"
        rx="8"
        fill="currentColor"
        opacity="0.08"
      />

      {/* ── Cat body — pixel-block style ── */}
      {/* Main body */}
      <rect x="100" y="210" width="200" height="170" rx="6" fill="currentColor" />
      {/* Neck / lower head join */}
      <rect x="130" y="165" width="140" height="60" rx="4" fill="currentColor" />
      {/* Head */}
      <rect x="110" y="90" width="180" height="120" rx="14" fill="currentColor" />

      {/* Left ear */}
      <polygon points="118,112 138,60 168,105" fill="currentColor" />
      {/* Right ear */}
      <polygon points="282,112 262,60 232,105" fill="currentColor" />

      {/* Inner ear details */}
      <polygon points="126,108 142,72 164,104" fill="currentColor" opacity="0.3" />
      <polygon points="274,108 258,72 236,104" fill="currentColor" opacity="0.3" />

      {/* ── Face ── */}
      {/* Eyes — big pixel squares */}
      <rect x="138" y="125" width="36" height="30" rx="4" fill="var(--background)" />
      <rect x="226" y="125" width="36" height="30" rx="4" fill="var(--background)" />
      {/* Pupils */}
      <rect x="148" y="130" width="16" height="20" rx="2" fill="currentColor" />
      <rect x="236" y="130" width="16" height="20" rx="2" fill="currentColor" />
      {/* Eye shine */}
      <rect x="158" y="133" width="5" height="5" fill="var(--background)" />
      <rect x="246" y="133" width="5" height="5" fill="var(--background)" />

      {/* Nose */}
      <rect x="192" y="166" width="16" height="10" rx="3" fill="var(--background)" opacity="0.5" />

      {/* Whiskers left */}
      <line x1="105" y1="172" x2="145" y2="176" stroke="var(--background)" strokeWidth="2" opacity="0.6" />
      <line x1="105" y1="182" x2="145" y2="182" stroke="var(--background)" strokeWidth="2" opacity="0.6" />

      {/* Whiskers right */}
      <line x1="255" y1="176" x2="295" y2="172" stroke="var(--background)" strokeWidth="2" opacity="0.6" />
      <line x1="255" y1="182" x2="295" y2="182" stroke="var(--background)" strokeWidth="2" opacity="0.6" />

      {/* ── Paws ── */}
      <rect x="108" y="355" width="65" height="35" rx="8" fill="currentColor" />
      <rect x="227" y="355" width="65" height="35" rx="8" fill="currentColor" />
      {/* Paw toe lines */}
      <line x1="130" y1="358" x2="130" y2="388" stroke="var(--background)" strokeWidth="2" opacity="0.35" />
      <line x1="148" y1="358" x2="148" y2="388" stroke="var(--background)" strokeWidth="2" opacity="0.35" />
      <line x1="249" y1="358" x2="249" y2="388" stroke="var(--background)" strokeWidth="2" opacity="0.35" />
      <line x1="267" y1="358" x2="267" y2="388" stroke="var(--background)" strokeWidth="2" opacity="0.35" />

      {/* ── Tail — curves to the right, pixel-chunky ── */}
      <path
        d="M 295 340 Q 360 300 370 240 Q 375 190 340 180 Q 330 178 325 185 Q 345 195 338 240 Q 332 285 285 320 Z"
        fill="currentColor"
      />
      {/* Tail tip extends as scanline artifact */}
      <rect x="340" y="176" width="55" height="4" fill="currentColor" opacity="0.5" className="scan-stripe" style={{ transition: 'transform 0.1s, opacity 0.1s' }} />
      <rect x="345" y="184" width="50" height="3" fill="currentColor" opacity="0.4" className="scan-stripe" style={{ transition: 'transform 0.1s, opacity 0.1s' }} />
      <rect x="338" y="192" width="58" height="3" fill="currentColor" opacity="0.3" className="scan-stripe" style={{ transition: 'transform 0.1s, opacity 0.1s' }} />

      {/* ── Scanline overlay clipped to cat body ── */}
      <g clipPath="url(#cat-clip)" opacity="0.55">
        <rect x="65" y="5" width="340" height="430" fill="url(#scanlines)" />
      </g>

      {/* ── Extended scanline bleed — lines that escape the cat silhouette ── */}
      {/* These simulate the Meow site effect where lines extend past the shape */}
      {[60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380].map((y, i) => {
        const rightBleed = 60 + ((i % 3) * 18) + (i % 7) * 6
        const opacity = 0.12 + (i % 5) * 0.05
        return (
          <rect
            key={y}
            x={300 + (i % 4) * 4}
            y={y}
            width={rightBleed}
            height="2"
            fill="currentColor"
            opacity={opacity}
            className="scan-stripe"
            style={{ transition: 'transform 0.1s, opacity 0.1s' }}
          />
        )
      })}

      {/* Left bleed lines (fewer) */}
      {[100,120,140,160,180,200,220,240,260,280,300,320].map((y, i) => {
        const leftBleed = 20 + (i % 4) * 12
        return (
          <rect
            key={`l-${y}`}
            x={100 - leftBleed}
            y={y}
            width={leftBleed}
            height="2"
            fill="currentColor"
            opacity={0.1 + (i % 3) * 0.04}
            className="scan-stripe"
            style={{ transition: 'transform 0.1s, opacity 0.1s' }}
          />
        )
      })}
    </svg>
  )
}

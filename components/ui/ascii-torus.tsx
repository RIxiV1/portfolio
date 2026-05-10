'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * A rotating 3D ASCII torus rendered onto a <pre> element
 * using the classic "donut.c" algorithm by Andy Sloane.
 *
 * This renders to a character grid (like a terminal) so the
 * shape is crisp and immediately recognizable as a 3D object.
 */
export function AsciiTorus() {
  const preRef = useRef<HTMLPreElement>(null)
  const frameRef = useRef<number>(0)
  const angleARef = useRef(0)
  const angleBRef = useRef(0)

  const render = useCallback(() => {
    const pre = preRef.current
    if (!pre) return

    // Grid dimensions — how many characters wide and tall
    const cols = 80
    const rows = 44

    const A = angleARef.current
    const B = angleBRef.current

    const sinA = Math.sin(A)
    const cosA = Math.cos(A)
    const sinB = Math.sin(B)
    const cosB = Math.cos(B)

    // ASCII luminance ramp from dark → bright
    const luminanceChars = '.,-~:;=!*#$@'

    // Output buffer (characters) and Z-buffer (depth)
    const output: string[] = new Array(cols * rows).fill(' ')
    const zbuffer: number[] = new Array(cols * rows).fill(0)

    // Torus parameters
    const R1 = 1    // tube radius
    const R2 = 2    // center-to-tube distance
    const K2 = 5    // distance of the torus from the viewer
    // K1 controls how large the torus appears on screen.
    // We scale it relative to the grid size so it fills nicely.
    const K1 = cols * K2 * 3 / (8 * (R1 + R2))

    // theta: angle around the cross-section of the tube
    for (let theta = 0; theta < 6.28; theta += 0.07) {
      const costheta = Math.cos(theta)
      const sintheta = Math.sin(theta)

      // phi: angle around the center of the torus
      for (let phi = 0; phi < 6.28; phi += 0.02) {
        const cosphi = Math.cos(phi)
        const sinphi = Math.sin(phi)

        // 3D (x,y,z) of the point on the torus surface
        const circlex = R2 + R1 * costheta
        const circley = R1 * sintheta

        // Final 3D coords after rotation by A and B
        const x =
          circlex * (cosB * cosphi + sinA * sinB * sinphi) -
          circley * cosA * sinB
        const y =
          circlex * (sinB * cosphi - sinA * cosB * sinphi) +
          circley * cosA * cosB
        const z = K2 + cosA * circlex * sinphi + circley * sinA
        const ooz = 1 / z // "one over z"

        // Project to 2D
        const xp = Math.floor(cols / 2 + K1 * ooz * x)
        const yp = Math.floor(rows / 2 - K1 * ooz * y * 0.5) // 0.5 because chars are ~2x taller than wide

        // Bounds check
        if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue

        const idx = yp * cols + xp

        // Compute luminance (surface normal dot light direction)
        const L =
          cosphi * costheta * sinB -
          cosA * costheta * sinphi -
          sinA * sintheta +
          cosB * (cosA * sintheta - costheta * sinA * sinphi)

        // Only render if the surface faces the light and is closer than what's already in zbuffer
        if (L > 0 && ooz > zbuffer[idx]) {
          zbuffer[idx] = ooz
          const luminanceIndex = Math.max(
            0,
            Math.min(luminanceChars.length - 1, Math.floor(L * 8))
          )
          output[idx] = luminanceChars[luminanceIndex]
        }
      }
    }

    // Build the string with line breaks
    let result = ''
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        result += output[y * cols + x]
      }
      result += '\n'
    }

    pre.textContent = result

    // Slowly rotate
    angleARef.current += 0.04
    angleBRef.current += 0.02

    frameRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frameRef.current)
  }, [render])

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage:
          'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%)',
      }}
    >
      <pre
        ref={preRef}
        className="select-none font-mono leading-none"
        style={{
          fontSize: 'clamp(6px, 1vw, 12px)',
          color: '#22d3ee',
          opacity: 0.35,
          letterSpacing: '0.05em',
          lineHeight: 1.1,
          whiteSpace: 'pre',
        }}
      />
    </div>
  )
}

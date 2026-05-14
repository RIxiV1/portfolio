'use client'

import { useEffect, useRef } from 'react'

const TAU = Math.PI * 2
const R1 = 1      // tube radius
const R2 = 2.4    // center-to-tube radius

type P3 = { x: number; y: number; z: number }

function generateTorus(): P3[] {
  const points: P3[] = []
  // theta: around the tube cross-section
  // phi:   around the donut center
  for (let theta = 0; theta < TAU; theta += 0.28) {
    const ct = Math.cos(theta)
    const st = Math.sin(theta)
    for (let phi = 0; phi < TAU; phi += 0.08) {
      const cp = Math.cos(phi)
      const sp = Math.sin(phi)
      points.push({
        x: (R2 + R1 * ct) * cp,
        y: (R2 + R1 * ct) * sp,
        z: R1 * st,
      })
    }
  }
  return points
}

export function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const points = generateTorus()
    const proj = new Float32Array(points.length * 3) // sx, sy, depth

    // Randomized starting angles so the shape doesn't look identical every load
    let angleA = Math.random() * TAU
    let angleB = Math.random() * TAU
    const targetVel = { a: 0.003, b: 0.005 }
    const vel = { a: 0.003, b: 0.005 }
    const mouse = { x: 0, y: 0 }
    let inView = true
    let raf = 0
    let dpr = 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    }
    resize()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      // -1 .. 1 relative to canvas center
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const render = () => {
      if (!inView) {
        raf = requestAnimationFrame(render)
        return
      }

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const scale = Math.min(w, h) * 0.18

      ctx.clearRect(0, 0, w, h)

      const sinA = Math.sin(angleA), cosA = Math.cos(angleA)
      const sinB = Math.sin(angleB), cosB = Math.cos(angleB)

      // Project all points & track depth for shading
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        // Rotate around Y by B
        const x1 = p.x * cosB + p.z * sinB
        const z1 = -p.x * sinB + p.z * cosB
        // Rotate around X by A
        const y2 = p.y * cosA - z1 * sinA
        const z2 = p.y * sinA + z1 * cosA

        // Perspective (camera at z = -K)
        const K = 5
        const persp = K / (K + z2)
        proj[i * 3]     = cx + x1 * scale * persp
        proj[i * 3 + 1] = cy + y2 * scale * persp
        proj[i * 3 + 2] = z2  // depth (-R2-R1 .. R2+R1)
      }

      // Render back-to-front for proper occlusion feel.
      // Sort indices by depth (ascending z = far first).
      const order = new Array(points.length)
      for (let i = 0; i < points.length; i++) order[i] = i
      order.sort((a, b) => proj[a * 3 + 2] - proj[b * 3 + 2])

      const maxZ = R2 + R1
      for (let k = 0; k < order.length; k++) {
        const i = order[k]
        const sx = proj[i * 3]
        const sy = proj[i * 3 + 1]
        const z = proj[i * 3 + 2]
        // depth-based alpha: front (low z) brighter, back dimmer
        const t = (maxZ - z) / (2 * maxZ) // 0..1, front=1
        const alpha = 0.15 + t * 0.65
        const size = (1 + t * 1.2) * dpr
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, TAU)
        ctx.fill()
      }

      if (!reducedMotion) {
        // Mouse pulls rotation speed; ease toward target for smooth feel.
        targetVel.a = 0.003 + mouse.y * 0.012
        targetVel.b = 0.005 + mouse.x * 0.018
        vel.a += (targetVel.a - vel.a) * 0.06
        vel.b += (targetVel.b - vel.b) * 0.06
        angleA += vel.a
        angleB += vel.b
      }

      raf = requestAnimationFrame(render)
    }

    if (reducedMotion) {
      // Single static frame, no animation loop.
      render()
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block overflow-hidden"
      aria-hidden="true"
      style={{
        maskImage:
          'radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 65% 65% at 50% 50%, black 25%, transparent 75%)',
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

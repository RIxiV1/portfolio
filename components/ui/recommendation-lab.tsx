"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type LabNode = {
  id: number
  label: string
  cluster: number
  x: number
  y: number
  vx: number
  vy: number
}

const CLUSTERS = [
  { hue: 75, label: "agents" },    // amber — primary
  { hue: 25, label: "rec.sys" },   // coral
  { hue: 145, label: "infra" },    // warm sage
]

const NODES_DATA: Array<{ label: string; cluster: number }> = [
  { label: "GPT", cluster: 0 },
  { label: "Claude", cluster: 0 },
  { label: "LangGraph", cluster: 0 },
  { label: "Embed", cluster: 0 },
  { label: "Item2Vec", cluster: 1 },
  { label: "ALS", cluster: 1 },
  { label: "Two-Tower", cluster: 1 },
  { label: "kNN", cluster: 1 },
  { label: "Postgres", cluster: 2 },
  { label: "Redis", cluster: 2 },
  { label: "Vercel", cluster: 2 },
  { label: "Docker", cluster: 2 },
]

const W = 400
const H = 280
const CENTER_X = W / 2
const CENTER_Y = H / 2

function buildEdges(): Array<[number, number]> {
  const edges: Array<[number, number]> = []
  const byCluster: Record<number, number[]> = {}
  NODES_DATA.forEach((n, i) => {
    if (!byCluster[n.cluster]) byCluster[n.cluster] = []
    byCluster[n.cluster].push(i)
  })
  Object.values(byCluster).forEach((ids) => {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        edges.push([ids[i], ids[j]])
      }
    }
  })
  // Inter-cluster bridges hint at the cross-pollination between domains.
  edges.push([0, 4]) // GPT — Item2Vec
  edges.push([3, 4]) // Embed — Item2Vec
  edges.push([7, 8]) // kNN — Postgres
  edges.push([2, 6]) // LangGraph — Two-Tower
  return edges
}

function initialNodes(): LabNode[] {
  return NODES_DATA.map((n, i) => {
    const angle = (i / NODES_DATA.length) * Math.PI * 2
    return {
      ...n,
      id: i,
      x: CENTER_X + Math.cos(angle) * 90,
      y: CENTER_Y + Math.sin(angle) * 70,
      vx: 0,
      vy: 0,
    }
  })
}

export function RecommendationLab() {
  const [nodes, setNodes] = useState<LabNode[]>(initialNodes)
  const [hover, setHover] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const edges = useMemo(buildEdges, [])
  const frameRef = useRef<number | null>(null)
  const settledRef = useRef(false)

  useEffect(() => {
    const damping = 0.88
    let lastWake = 0

    const step = () => {
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }))
        // Pairwise repulsion — keeps nodes from collapsing.
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const dx = next[j].x - next[i].x
            const dy = next[j].y - next[i].y
            const d = Math.sqrt(dx * dx + dy * dy) || 0.01
            const f = 900 / (d * d)
            const fx = (dx / d) * f
            const fy = (dy / d) * f
            next[i].vx -= fx
            next[i].vy -= fy
            next[j].vx += fx
            next[j].vy += fy
          }
        }
        // Spring along edges — pulls connected nodes together.
        const rest = 56
        const k = 0.05
        edges.forEach(([a, b]) => {
          const dx = next[b].x - next[a].x
          const dy = next[b].y - next[a].y
          const d = Math.sqrt(dx * dx + dy * dy) || 0.01
          const f = k * (d - rest)
          const fx = (dx / d) * f
          const fy = (dy / d) * f
          next[a].vx += fx
          next[a].vy += fy
          next[b].vx -= fx
          next[b].vy -= fy
        })
        // Mild centering — keeps the graph in frame.
        next.forEach((n) => {
          n.vx += (CENTER_X - n.x) * 0.004
          n.vy += (CENTER_Y - n.y) * 0.004
        })
        let energy = 0
        next.forEach((n) => {
          n.vx *= damping
          n.vy *= damping
          n.x += n.vx
          n.y += n.vy
          n.x = Math.max(28, Math.min(W - 28, n.x))
          n.y = Math.max(24, Math.min(H - 24, n.y))
          energy += Math.abs(n.vx) + Math.abs(n.vy)
        })
        // Park the sim when it settles to save CPU.
        if (energy < 0.6 && performance.now() - lastWake > 500) {
          settledRef.current = true
        }
        return next
      })
      if (!settledRef.current) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    lastWake = performance.now()
    frameRef.current = requestAnimationFrame(step)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [edges])

  const focused = pinned ?? hover
  const neighbors = useMemo(() => {
    if (focused === null) return new Set<number>()
    const s = new Set<number>()
    edges.forEach(([a, b]) => {
      if (a === focused) s.add(b)
      if (b === focused) s.add(a)
    })
    return s
  }, [focused, edges])

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border border-foreground/[0.06] bg-foreground/[0.015]">
        <div className="flex items-center justify-between border-b border-foreground/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/55">
          <span>lab.graph · n=12 · k=3</span>
          <span className="flex items-center gap-3">
            {CLUSTERS.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: `oklch(0.75 0.17 ${c.hue})` }}
                />
                {c.label}
              </span>
            ))}
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="block aspect-[10/7] w-full">
          {edges.map(([a, b], i) => {
            const na = nodes[a]
            const nb = nodes[b]
            const active = focused !== null && (a === focused || b === focused)
            const dimmed = focused !== null && !active
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="currentColor"
                strokeWidth={active ? 1 : 0.5}
                strokeOpacity={dimmed ? 0.04 : active ? 0.7 : 0.18}
                className="text-foreground transition-[stroke-opacity,stroke-width] duration-300"
              />
            )
          })}
          {nodes.map((n) => {
            const isHover = focused === n.id
            const isNeighbor = neighbors.has(n.id)
            const dimmed = focused !== null && !isHover && !isNeighbor
            const hue = CLUSTERS[n.cluster].hue
            const color = `oklch(0.78 0.17 ${hue})`
            return (
              <g
                key={n.id}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover(null)}
                onClick={() => setPinned(pinned === n.id ? null : n.id)}
                className="cursor-pointer transition-opacity duration-300"
                style={{ opacity: dimmed ? 0.2 : 1 }}
              >
                {isHover && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={11}
                    fill={color}
                    fillOpacity={0.12}
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isHover ? 5.5 : isNeighbor ? 4.5 : 3.8}
                  fill={color}
                  className="transition-[r] duration-300"
                />
                <text
                  x={n.x}
                  y={n.y - 9}
                  textAnchor="middle"
                  fontSize={7.5}
                  fill="currentColor"
                  fillOpacity={isHover || isNeighbor ? 0.9 : 0.4}
                  className="pointer-events-none select-none font-mono uppercase tracking-wider text-foreground transition-[fill-opacity] duration-300"
                >
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
        {focused === null ? (
          <span>// hover any node to see its neighborhood · click to pin</span>
        ) : (
          <span>
            // query <span className="text-foreground">{nodes[focused].label}</span>{" "}
            <span className="text-muted-foreground/40">↦</span>{" "}
            <span className="text-foreground">{neighbors.size}</span> recs ·{" "}
            {pinned !== null ? "pinned (click to release)" : "hovering"}
          </span>
        )}
      </div>
    </div>
  )
}

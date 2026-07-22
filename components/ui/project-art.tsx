import { cn } from '@/lib/utils'

type Node = { x: number; y: number; r: number; primary: boolean }

function seedFromString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let state = seed | 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateGraph(seed: string) {
  const rand = mulberry32(seedFromString(seed))
  const nodeCount = 6 + Math.floor(rand() * 3)
  const nodes: Node[] = []
  const minDist = 20
  let tries = 0
  while (nodes.length < nodeCount && tries < 400) {
    tries++
    const x = 14 + rand() * 72
    const y = 14 + rand() * 72
    if (nodes.every((n) => Math.hypot(n.x - x, n.y - y) >= minDist)) {
      nodes.push({ x, y, r: 1.4 + rand() * 1.2, primary: false })
    }
  }

  // Primary node = node nearest the center, drawn slightly larger and filled.
  let primaryIdx = 0
  let bestD = Infinity
  nodes.forEach((n, i) => {
    const d = Math.hypot(n.x - 50, n.y - 50)
    if (d < bestD) {
      bestD = d
      primaryIdx = i
    }
  })
  if (nodes[primaryIdx]) {
    nodes[primaryIdx].primary = true
    nodes[primaryIdx].r = 2.6
  }

  // Each node connects to its k nearest neighbors (k = 1..2), no duplicates.
  const edges: Array<[number, number]> = []
  nodes.forEach((n, i) => {
    const others = nodes
      .map((o, j) => ({ j, d: Math.hypot(o.x - n.x, o.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
    const k = 1 + Math.floor(rand() * 2)
    for (let m = 0; m < Math.min(k, others.length); m++) {
      const lo = Math.min(i, others[m].j)
      const hi = Math.max(i, others[m].j)
      if (!edges.some(([a, b]) => a === lo && b === hi)) {
        edges.push([lo, hi])
      }
    }
  })
  return { nodes, edges }
}

type ProjectArtProps = {
  seed: string
  className?: string
}

export function ProjectArt({ seed, className }: ProjectArtProps) {
  const { nodes, edges } = generateGraph(seed)

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn(
        'text-[color:var(--project-accent)] transition-opacity duration-500',
        className,
      )}
    >
      <g className="opacity-40 transition-opacity duration-500 group-hover:opacity-100">
        {edges.map(([a, b], i) => {
          const na = nodes[a]
          const nb = nodes[b]
          if (!na || !nb) return null
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="currentColor"
              strokeOpacity={0.45}
              strokeWidth={0.4}
              strokeLinecap="round"
            />
          )
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.primary ? 'currentColor' : 'transparent'}
            stroke="currentColor"
            strokeWidth={0.5}
          >
            {n.primary && (
              <animate
                attributeName="r"
                values={`${n.r};${n.r + 0.6};${n.r}`}
                dur="2.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </g>
    </svg>
  )
}

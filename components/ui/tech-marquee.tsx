'use client'

const TECH_ITEMS = [
  'TypeScript',
  'Next.js',
  'Python',
  'PyTorch',
  'React',
  'PostgreSQL',
  'Tailwind CSS',
  'Fastify',
  'LangChain',
  'Docker',
  'Node.js',
  'Redis',
  'REST APIs',
  'Machine Learning',
  'Git',
  'Full Stack Engineering',
]

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/60 bg-elevated/40 py-4 backdrop-blur-sm">
      {/* Gradient edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee flex items-center">
        {/* Set 1 */}
        <div className="marquee-content flex items-center gap-8">
          {TECH_ITEMS.map((item, index) => (
            <div
              key={`tech-1-${index}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs tracking-wider uppercase"
            >
              <span className="font-mono font-medium text-muted-foreground transition-colors hover:text-accent">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Set 2 (for seamless loop) */}
        <div className="marquee-content flex items-center gap-8" aria-hidden="true">
          {TECH_ITEMS.map((item, index) => (
            <div
              key={`tech-2-${index}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs tracking-wider uppercase"
            >
              <span className="font-mono font-medium text-muted-foreground transition-colors hover:text-accent">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

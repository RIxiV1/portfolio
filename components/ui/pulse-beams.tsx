"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Twitter } from "lucide-react"
import { SpecialText } from "@/components/ui/special-text"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

interface Beam {
  path: string
  gradientConfig: {
    x1: string
    y1: string
    x2: string
    y2: string
  }
}

const defaultBeams: Beam[] = [
  {
    path: "M100 250 Q 150 200 200 200 T 300 150 T 400 100",
    gradientConfig: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  },
  {
    path: "M100 250 Q 180 230 250 200 T 400 180",
    gradientConfig: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  },
  {
    path: "M100 250 L 400 250",
    gradientConfig: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  },
  {
    path: "M100 250 Q 180 270 250 300 T 400 320",
    gradientConfig: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  },
  {
    path: "M100 250 Q 150 300 200 300 T 300 350 T 400 400",
    gradientConfig: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
  },
]

interface PulseBeamsProps {
  beams?: Beam[]
  gradientColors?: { start: string; middle: string; end: string }
  width?: number
  height?: number
  className?: string
  children?: React.ReactNode
}

export function PulseBeams({
  beams = defaultBeams,
  gradientColors = { start: "#18CCFC", middle: "#6344F5", end: "#AE48FF" },
  width = 500,
  height = 500,
  className,
  children,
}: PulseBeamsProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="absolute inset-0"
      >
        <defs>
          {beams.map((beam, i) => (
            <linearGradient
              key={`gradient-${i}`}
              id={`pulse-gradient-${i}`}
              x1={beam.gradientConfig.x1}
              y1={beam.gradientConfig.y1}
              x2={beam.gradientConfig.x2}
              y2={beam.gradientConfig.y2}
            >
              <stop offset="0%" stopColor={gradientColors.start} stopOpacity="0" />
              <stop offset="50%" stopColor={gradientColors.middle} stopOpacity="1" />
              <stop offset="100%" stopColor={gradientColors.end} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {beams.map((beam, i) => (
          <g key={i}>
            <path
              d={beam.path}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              fill="none"
            />
            <motion.path
              d={beam.path}
              stroke={`url(#pulse-gradient-${i})`}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.3, 0],
                pathOffset: [0, 0.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.4,
              }}
            />
          </g>
        ))}
      </svg>
      {children && (
        <div className="relative z-10">{children}</div>
      )}
    </div>
  )
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/RIxiV1" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shaiksuhaib" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/suhaibX0" },
]

export function PulseBeamsDemo() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden py-16 md:py-24">
      <PulseBeams 
        className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        gradientColors={{ start: "#18CCFC", middle: "#6344F5", end: "#AE48FF" }}
      >
        <div className="text-center space-y-6 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            <SpecialText inView>Get In Touch</SpecialText>
          </h2>
          <p className="text-muted-foreground font-mono text-sm tracking-tight truncate max-w-[280px] md:max-w-none">
            shaiksuhaib360@gmail.com
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground/5 border border-foreground/10 text-muted-foreground hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                  aria-label={link.name}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              )
            })}
          </div>
          <div className="pt-4">
            <a href="mailto:shaiksuhaib360@gmail.com">
              <InteractiveHoverButton text="Send Email" />
            </a>
          </div>
        </div>
      </PulseBeams>
    </div>
  )
}

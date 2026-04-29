"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { 
  Code2, 
  Boxes, 
  Wind, 
  Link, 
  Sparkles, 
  Terminal, 
  GitBranch, 
  Palette, 
  Lightbulb,
  Braces,
  Puzzle,
  Workflow,
  type LucideIcon
} from "lucide-react"

interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  pauseOnHover?: boolean
  fade?: boolean
  className?: string
}

export function Marquee({
  children,
  direction = "left",
  duration = 25,
  pauseOnHover = true,
  fade = true,
  className,
}: MarqueeProps) {
  const isHorizontal = direction === "left" || direction === "right"
  const isReverse = direction === "right" || direction === "down"

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
    >
      {fade && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute z-10",
              isHorizontal
                ? "left-0 top-0 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent"
                : "left-0 top-0 w-full h-24 bg-gradient-to-b from-slate-950 to-transparent"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute z-10",
              isHorizontal
                ? "right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent"
                : "bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent"
            )}
          />
        </>
      )}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0",
            isHorizontal ? "flex-row" : "flex-col",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `marquee-${isHorizontal ? "x" : "y"} ${duration}s linear infinite`,
            animationDirection: isReverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
      <style jsx>{`
        @keyframes marquee-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  )
}

interface Skill {
  name: string
  icon: LucideIcon
}

const skills: Skill[] = [
  { name: "TypeScript", icon: Braces },
  { name: "React / Next.js", icon: Boxes },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Python", icon: Terminal },
  { name: "LangChain / LangGraph", icon: Link },
  { name: "OpenAI API", icon: Sparkles },
  { name: "LLM Integration", icon: Sparkles },
  { name: "JavaScript", icon: Code2 },
  { name: "Chrome Extensions", icon: Puzzle },
  { name: "n8n", icon: Workflow },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "UI/UX Basics", icon: Palette },
  { name: "Product Thinking", icon: Lightbulb },
]

export function SkillsMarquee() {
  return (
    <Marquee duration={25} pauseOnHover fade>
      {skills.map((skill) => {
        const Icon = skill.icon
        return (
          <div
            key={skill.name}
            className="mx-3 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
          >
            <Icon className="w-4 h-4 text-cyan-400" />
            <span>{skill.name}</span>
          </div>
        )
      })}
    </Marquee>
  )
}

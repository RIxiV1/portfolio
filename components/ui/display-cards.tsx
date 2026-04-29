"use client"

import { Chrome, CreditCard, FileSearch } from "lucide-react"
import { cn } from "@/lib/utils"

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  titleClassName?: string
  description?: string
}

function DisplayCard({
  className,
  icon = <Chrome className="size-4 text-cyan-300" />,
  title = "Featured",
  titleClassName = "text-cyan-500",
  description = "A sophisticated product engineering achievement.",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm px-5 py-4 transition-all duration-700 hover:border-slate-700 hover:bg-slate-900",
        className
      )}
    >
      <div className="flex justify-end">
        <span className={titleClassName}>{icon}</span>
      </div>
      <div>
        <span className={cn("text-lg font-medium", titleClassName)}>
          {title}
        </span>
      </div>
      <div>
        <p className="text-xs text-slate-400 leading-relaxed font-mono tracking-tight">{description}</p>
      </div>
    </div>
  )
}

const displayCards = [
  {
    className: "[--x-offset:-1rem] [--y-offset:1rem] [--rotation:-10deg] hover:[--y-offset:0.5rem]",
    title: "InfoBlend AI",
    icon: <Chrome className="size-4" />,
    titleClassName: "text-cyan-400",
    description: "Built semantic clustering to process web data 30% faster."
  },
  {
    className: "[--x-offset:0] [--y-offset:0] [--rotation:0deg] hover:[--y-offset:-0.5rem]",
    title: "SubSentry",
    icon: <CreditCard className="size-4" />,
    titleClassName: "text-violet-400",
    description: "Architected a secure, encrypted billing sync pipeline."
  },
  {
    className: "[--x-offset:1rem] [--y-offset:-1rem] [--rotation:10deg] hover:[--y-offset:-1.5rem]",
    title: "Resume Agent",
    icon: <FileSearch className="size-4" />,
    titleClassName: "text-emerald-400",
    description: "Deployed agentic RAG for ultra-low latency parsing."
  },
]

export function DisplayCards() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-12">
      <div className="relative h-60 w-96">
        {displayCards.map((cardProps, index) => (
          <DisplayCard
            key={index}
            {...cardProps}
            className={cn(
              cardProps.className,
              "absolute left-1/2 top-1/2 transition-all duration-700",
              "translate-x-[calc(-50%+var(--x-offset,0px))]",
              "translate-y-[calc(-50%+var(--y-offset,0px))]",
              "rotate-[var(--rotation,0deg)]",
              index === 0 && "z-10",
              index === 1 && "z-20",
              index === 2 && "z-30"
            )}
          />
        ))}
      </div>
    </div>
  )
}

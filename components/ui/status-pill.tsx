import { cn } from "@/lib/utils"

type StatusPillProps = {
  children: React.ReactNode
  className?: string
}

export function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-3 py-1 text-xs text-muted-foreground shadow-[0_0_30px_-10px_oklch(0.78_0.16_75/0.35)]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  )
}

import { cn } from '@/lib/utils'

type StatusPillProps = {
  children: React.ReactNode
  className?: string
}

export function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-1 text-xs text-muted-foreground',
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-positive/60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
      </span>
      {children}
    </span>
  )
}

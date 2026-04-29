import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

const GLASS_BASE =
  "backdrop-blur-xl bg-foreground/[0.02] border border-foreground/10 border-t-foreground/20 rounded-[2.5rem]"

export function GlassCard({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(GLASS_BASE, className)} {...props} />
}

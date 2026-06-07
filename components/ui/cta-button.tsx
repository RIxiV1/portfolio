"use client"

import { cn } from "@/lib/utils"
import { MagneticLink } from "./magnetic-link"

type CtaButtonProps = {
  href: string
  variant?: "primary" | "secondary"
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function CtaButton({
  href,
  variant = "primary",
  children,
  className,
  external,
}: CtaButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,box-shadow,border-color,color] duration-300"
  const styles =
    variant === "primary"
      ? "bg-accent text-background shadow-[0_0_40px_-8px_oklch(0.78_0.16_75/0.55)] hover:bg-accent/90 hover:shadow-[0_0_60px_-4px_oklch(0.78_0.16_75/0.75)]"
      : "border border-foreground/15 text-foreground hover:border-accent/50 hover:text-accent"

  return (
    <MagneticLink
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, styles, className)}
    >
      {children}
    </MagneticLink>
  )
}

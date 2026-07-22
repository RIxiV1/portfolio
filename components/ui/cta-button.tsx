'use client'

import { cn } from '@/lib/utils'
import { MagneticLink } from './magnetic-link'

type CtaButtonProps = {
  href: string
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function CtaButton({
  href,
  variant = 'primary',
  children,
  className,
  external,
}: CtaButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,box-shadow,border-color,color] duration-300'
  const styles =
    variant === 'primary'
      ? 'bg-accent text-background shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-accent/90'
      : 'border border-foreground/15 text-foreground hover:border-accent/50 hover:text-accent'

  return (
    <MagneticLink
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(base, styles, className)}
    >
      {children}
    </MagneticLink>
  )
}

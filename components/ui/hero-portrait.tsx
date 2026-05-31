import { cn } from "@/lib/utils"

type HeroPortraitProps = {
  /** When set, renders the image. When unset, renders the empty "portrait pending" frame. */
  src?: string
  alt?: string
  className?: string
}

export function HeroPortrait({ src, alt = "", className }: HeroPortraitProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/5] w-full max-w-[300px]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, oklch(0.78 0.16 75 / 0.25), transparent 70%)",
        }}
      />

      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="relative h-full w-full object-contain object-bottom drop-shadow-[0_20px_40px_oklch(0.78_0.16_75/0.25)]"
        />
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-foreground/[0.12]">
          <span className="h-12 w-12 rounded-full border border-dashed border-foreground/15" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/45">
            portrait pending
          </span>
        </div>
      )}
    </div>
  )
}

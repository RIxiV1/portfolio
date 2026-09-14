// Typographic Monogram "S" for Shaik Suhaib.
// Sleek, modern editorial lettermark with warm accent gem.
// Compatible with Satori (ImageResponse for favicon and OpenGraph) and inline SVG.

export const MONOGRAM_S =
  'M 70 28 C 65 20 57 16 48 16 C 34 16 26 25 26 38 C 26 50 36 55 52 59 C 67 63 74 69 74 80 C 74 91 65 98 49 98 C 35 98 26 91 22 80'

export function Logo({
  size = 28,
  color = 'currentColor',
  accent = 'var(--accent)',
  plate,
  className,
}: {
  size?: number
  /** Outline / stroke colour. Defaults to currentColor. */
  color?: string
  /** Accent dot. Defaults to the accent token. */
  accent?: string
  /** Optional rounded background tile (favicon / app-icon contexts). */
  plate?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {plate && (
        <rect x="4" y="4" width="92" height="92" rx="24" fill={plate} />
      )}
      <path
        d={MONOGRAM_S}
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="76" cy="22" r="6" fill={accent} />
    </svg>
  )
}

export function Logo({
  size = 32,
  className = '',
  showBackground = false,
  hideAnimation = false,
}: {
  size?: number
  className?: string
  showBackground?: boolean
  hideAnimation?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))',
      }}
    >
      {/* Optional rounded dark background — used for favicon / app icon contexts */}
      {showBackground && <rect width="100" height="100" rx="20" fill="#0a0a0a" />}

      {/*
        Single focal dot + a thin orbit ring around it.
        Conceptually: a point in embedding space + its semantic neighborhood —
        the entire premise of recommendation systems.
        Visually: simple enough to remember at one glance, deliberate enough
        not to read as "missing logo."
      */}

      {/* Orbit ring */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="4"
        strokeOpacity="0.4"
      />

      {/* Focal dot */}
      <circle cx="50" cy="50" r="14" fill="#fbbf24">
        {!hideAnimation && (
          <animate
            attributeName="r"
            values="14;16;14"
            dur="2.6s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  )
}

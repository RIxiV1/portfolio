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
        Bold custom S — the system.
        A single dot floats in the upper pocket — the thing the system found.
        One mark, two parts, one idea: discovery + recommendation.
      */}

      {/* The S */}
      <path
        d="M 78 28 C 78 18, 65 13, 50 13 C 33 13, 22 22, 22 33 C 22 43, 30 48, 50 52 C 70 56, 78 60, 78 70 C 78 81, 65 87, 50 87 C 35 87, 22 82, 22 72"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The found item — pulses gently */}
      <circle cx="56" cy="30" r="6" fill="#fbbf24">
        {!hideAnimation && (
          <animate
            attributeName="r"
            values="6;7.5;6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  )
}

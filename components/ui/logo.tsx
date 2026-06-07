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
        filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.45))',
      }}
    >
      {/* Optional rounded dark background — used for favicon / app icon contexts */}
      {showBackground && <rect width="100" height="100" rx="20" fill="#0a0a0a" />}

      {/*
        Isometric cube — three faces of a 3D module.
        Reads as a building block / shipped unit / stack primitive.
        Light from upper-front-left: top face brightest, left mid, right shadow.
      */}
      <g style={{ transformOrigin: '50px 50px' }}>
        {/* Left face (mid amber) */}
        <path d="M 22 34 L 50 50 L 50 82 L 22 66 Z" fill="#d97706" />

        {/* Right face (deep shadow amber) */}
        <path d="M 78 34 L 50 50 L 50 82 L 78 66 Z" fill="#92400e" />

        {/* Top face (bright amber) — catches the light */}
        <path d="M 50 18 L 78 34 L 50 50 L 22 34 Z" fill="#fbd457" />

        {/* Subtle highlight on the top vertex for premium depth */}
        <circle cx="50" cy="18" r="2" fill="#fef3c7" opacity="0.9" />

        {!hideAnimation && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-2 50 50; 2 50 50; -2 50 50"
            dur="6s"
            repeatCount="indefinite"
          />
        )}
      </g>
    </svg>
  )
}

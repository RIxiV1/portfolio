export function Logo({
  size = 32,
  className = '',
  showBackground = true,
  hideAnimation = false
}: {
  size?: number;
  className?: string;
  showBackground?: boolean;
  hideAnimation?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      {showBackground && <rect width="100" height="100" rx="16" fill="#0a0a0a" />}

      {/* The "S" — a single kinetic path representing a signal routing through a system */}
      <path
        d="M30 25
           C70 25, 70 45, 50 50
           C30 55, 30 75, 70 75"
        stroke="url(#cyan-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Arrow tip at the bottom exit — completion of the 'agentic' loop */}
      <path
        d="M70 75 L78 75 M78 75 L74 71 M78 75 L74 79"
        stroke="#22d3ee"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Cursor dot at the top entry — indicating active input/agent */}
      <circle cx="30" cy="25" r="4" fill="#22d3ee">
        {!hideAnimation && (
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      <defs>
        <linearGradient id="cyan-gradient" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}

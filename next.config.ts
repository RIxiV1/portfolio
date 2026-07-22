import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't pick up the stray
  // package-lock.json in the home directory (C:\Users\shaik\).
  turbopack: {
    root: __dirname,
  },
  // Allow loading the dev server over the LAN (e.g. testing on a phone).
  // Without this, Next blocks cross-origin HMR and client hydration stalls,
  // leaving scroll-reveal sections stuck invisible. Dev-only; no prod effect.
  allowedDevOrigins: ['172.16.0.2'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig

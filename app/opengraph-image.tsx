import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/site'

export const alt = `${siteConfig.name} — ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '68px 72px',
        background: '#000000',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#FFFFFF',
            }}
          />
          <span
            style={{
              fontSize: 24,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            suhaib<span style={{ color: '#71717A' }}>.dev</span>
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 18,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A1A1AA',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#22C55E',
            }}
          />
          Available for internships
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#FFFFFF',
          }}
        >
          Shaik Suhaib
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 400,
            color: '#A1A1AA',
            letterSpacing: '-0.01em',
          }}
        >
          {`${siteConfig.role} · ${siteConfig.focus}`}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 20,
          color: '#71717A',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span>{siteConfig.location}</span>
        <span style={{ fontFamily: 'monospace' }}>suhaib.dev</span>
      </div>
    </div>,
    { ...size },
  )
}

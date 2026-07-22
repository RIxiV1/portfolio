import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/site'

export const alt = `${siteConfig.name} — ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background:
          'radial-gradient(ellipse at top left, rgba(140,106,67,0.10), transparent 55%), #f5f1ea',
        color: '#1d1b18',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 22,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#8c6a43',
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: '#8c6a43',
          }}
        />
        Available for internships
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 160,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 300,
            color: '#6b665e',
            letterSpacing: '-0.01em',
          }}
        >
          {siteConfig.focus}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 22,
          color: '#8a857c',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <span>{siteConfig.role}</span>
        <span>{siteConfig.location}</span>
      </div>
    </div>,
    { ...size },
  )
}

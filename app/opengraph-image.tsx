import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'radial-gradient(ellipse at top left, rgba(16,185,129,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(37,106,244,0.18), transparent 55%), #000',
          color: '#fff',
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
            color: '#34d399',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#34d399',
              boxShadow: '0 0 16px rgba(52,211,153,0.8)',
            }}
          />
          Available for work
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
              color: '#a1a1aa',
              letterSpacing: '-0.01em',
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#71717a',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <span>{siteConfig.role}</span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 30% 30%, rgba(16,185,129,0.35), transparent 60%), #000',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: '-0.05em',
          textTransform: 'uppercase',
        }}
      >
        {siteConfig.name.charAt(0)}
      </div>
    ),
    { ...size },
  );
}

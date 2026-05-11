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
          background: '#000',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: 80,
          fontWeight: 600,
        }}
      >
        <span style={{ color: '#22d3ee' }}>&gt;</span> _
      </div>
    ),
    { ...size },
  );
}

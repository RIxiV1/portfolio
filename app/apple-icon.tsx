import { ImageResponse } from 'next/og';
import { Logo } from '@/components/ui/logo';

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
          background: '#0a0a0a',
          borderRadius: 36,
        }}
      >
        <Logo size={120} showBackground={false} hideAnimation={true} />
      </div>
    ),
    { ...size },
  );
}

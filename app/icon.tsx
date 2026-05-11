import { ImageResponse } from 'next/og';
import { Logo } from '@/components/ui/logo';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: 6,
        }}
      >
        <Logo size={24} showBackground={false} hideAnimation={true} />
      </div>
    ),
    { ...size },
  );
}

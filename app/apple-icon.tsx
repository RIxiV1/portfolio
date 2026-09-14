import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111110',
        borderRadius: 40,
        color: '#F5EDE6',
        fontSize: 110,
        fontWeight: 700,
        fontFamily: 'sans-serif',
      }}
    >
      s<span style={{ color: '#E8885A' }}>.</span>
    </div>,
    { ...size },
  )
}

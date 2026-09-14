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
        background: '#09080E',
        borderRadius: 40,
        color: '#F3F1F8',
        fontSize: 110,
        fontWeight: 700,
        fontFamily: 'sans-serif',
      }}
    >
      s<span style={{ color: '#818CF8' }}>.</span>
    </div>,
    { ...size },
  )
}

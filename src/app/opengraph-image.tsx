import { ImageResponse } from 'next/og';

export const alt = 'nijoow | portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at 30% 20%, #443483 0%, #111111 60%)',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #c0a8eb 0%, #8458b3 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          nijoow
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 40,
            color: '#c0a8eb',
            opacity: 0.9,
          }}
        >
          Frontend Developer · Portfolio
        </div>
      </div>
    ),
    { ...size },
  );
}

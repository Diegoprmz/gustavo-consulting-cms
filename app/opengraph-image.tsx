import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Gustavo Martínez — Consultoría Estratégica Internacional';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#243A4D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '4px', background: '#C9A84C', marginRight: '20px' }} />
          <span style={{ color: '#6A8F7B', fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
            gustavo.consulting
          </span>
        </div>
        <h1 style={{ color: '#ffffff', fontSize: '64px', fontWeight: 700, margin: '0 0 24px', lineHeight: 1.1, fontFamily: 'serif' }}>
          Gustavo Martínez
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '28px', margin: 0, fontFamily: 'sans-serif', lineHeight: 1.4 }}>
          Consultoría Estratégica Internacional
        </p>
        <p style={{ color: '#C9A84C', fontSize: '20px', margin: '24px 0 0', fontFamily: 'sans-serif' }}>
          Customer Centricity · Estrategia · LATAM
        </p>
      </div>
    ),
    { ...size }
  );
}

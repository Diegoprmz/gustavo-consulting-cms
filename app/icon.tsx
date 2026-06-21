import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import { join } from 'path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const cropped = await sharp(join(process.cwd(), 'public/assets/gustavo-25.jpeg'))
    .resize(64, 64, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90 })
    .toBuffer();

  const src = `data:image/jpeg;base64,${cropped.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#243A4D',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={64} height={64} style={{ width: '100%', height: '100%' }} />
      </div>
    ),
    { ...size },
  );
}

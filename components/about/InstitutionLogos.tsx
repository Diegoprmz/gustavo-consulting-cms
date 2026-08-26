'use client';

import { useState } from 'react';
import Image from 'next/image';

const LOGOS = [
  { src: 'stanford', alt: 'Stanford University' },
  { src: 'kellogg', alt: 'Kellogg School of Management' },
  { src: 'notredame', alt: 'University of Notre Dame — Mendoza College of Business' },
  { src: 'georgetown', alt: 'Georgetown University' },
  { src: 'mcgill', alt: 'McGill University' },
  { src: 'cincinnati', alt: 'University of Cincinnati' },
  { src: 'huntsman', alt: 'Jon M. Huntsman School of Business — Utah State University' },
  { src: 'itam', alt: 'ITAM — Instituto Tecnológico Autónomo de México' },
  { src: 'anahuac', alt: 'Universidad Anáhuac México' },
  { src: 'seminarium', alt: 'SEMINARIUM' },
  { src: 'wobi', alt: 'WOBI — World of Business Ideas' },
];

const doubled = [...LOGOS, ...LOGOS];

export default function InstitutionLogos() {
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ marginTop: '72px' }}>
      <p
        className="font-sans font-semibold"
        style={{
          fontSize: '11px',
          color: '#6A8F7B',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        Instituciones donde se ha formado
      </p>

      <div
        className="overflow-hidden"
        style={{ cursor: paused ? 'default' : 'grab' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: '170px', height: '80px', marginRight: '56px' }}
            >
              <Image
                src={`/assets/credenciales/${logo.src}.png`}
                alt={logo.alt}
                width={150}
                height={60}
                className="object-contain"
                style={{ maxWidth: '150px', maxHeight: '58px', width: 'auto', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

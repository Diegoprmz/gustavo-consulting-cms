'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDots from '@/components/ui/GoldDots';

const logos = [
  { name: 'ADO',       src: '/images/logos/ADO.webp',          w: 120 },
  { name: 'HSBC',      src: '/images/logos/HSBC.webp',         w: 110 },
  { name: 'Ford',      src: '/images/logos/ford.webp',         w: 100 },
  { name: 'Coppel',    src: '/images/logos/coppel.webp',       w: 130 },
  { name: 'Fandeli',   src: '/images/logos/fandeli.webp',      w: 130 },
  { name: 'Alimás',    src: '/images/logos/alimas.webp',       w: 140 },
  { name: 'The Anglo', src: '/images/logos/anglo.webp',        w: 130 },
  { name: 'Ammmec',    src: '/images/logos/ammmec.webp',       w: 140 },
  { name: 'Fonatur',   src: '/images/logos/fonatur.webp',      w: 130 },
  { name: 'Bühler',    src: '/images/logos/buhler.webp',       w: 130 },
  { name: 'Prendamex', src: '/images/logos/prendamex.webp',   w: 130 },
  { name: 'Poliflex',  src: '/images/logos/poliflex.webp',     w: 130 },
  { name: 'Noviagro',  src: '/images/logos/logonoviagro.webp', w: 140 },
  { name: 'MEGAPRO',   src: '/images/logos/MEGAPRO.webp',      w: 130 },
  { name: 'Cenapyme',  src: '/images/logos/cenapyme.webp',     w: 140 },
  { name: 'Express',   src: '/images/logos/express.webp',      w: 130 },
  { name: 'GMDZ',      src: '/images/logos/GMDZ.webp',         w: 120 },
  { name: 'Cana',      src: '/images/logos/cana.webp',         w: 120 },
  { name: 'ITD',       src: '/images/logos/ITD.webp',          w: 110 },
  { name: 'LBA',       src: '/images/logos/LBA.webp',          w: 110 },
  { name: 'MHS',       src: '/images/logos/MHS.webp',          w: 110 },
  { name: 'CB',        src: '/images/logos/CB.webp',           w: 100 },
  { name: 'TID',       src: '/images/logos/TID.webp',          w: 110 },
  { name: 'SC',        src: '/images/logos/SC.webp',           w: 100 },
  { name: 'PDH',       src: '/images/logos/PDH.webp',          w: 110 },
  { name: 'Guerr',     src: '/images/logos/Guerr.webp',        w: 130 },
  { name: 'ILP',       src: '/images/logos/ilp.webp',          w: 110 },
];

const doubled = [...logos, ...logos];

export default function Clientes() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="clientes"
      style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '60px', overflow: 'hidden' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection delay={0.1}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 700, color: '#243A4D', lineHeight: 1, marginBottom: '10px' }}
            >
              Clientes
            </h2>
            <p
              className="font-serif"
              style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontStyle: 'italic', fontWeight: 400, color: '#6A8F7B' }}
            >
              con los que he trabajado
            </p>
          </div>
        </AnimatedSection>

      </div>

      {/* Marquee full-width — sin marcos */}
      <div
        className="overflow-hidden"
        style={{ marginBottom: '0', cursor: paused ? 'default' : 'grab' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ animation: 'marquee 50s linear infinite', animationPlayState: paused ? 'paused' : 'running', display: 'flex', width: 'max-content' }}>
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: '200px', height: '105px', marginRight: '60px' }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.w}
                height={60}
                className="object-contain"
                style={{ maxWidth: '180px', maxHeight: '80px' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <GoldDots my="40px" />

        <AnimatedSection delay={0.2}>
          <div className="text-center">
            <motion.a
              href="/resultados"
              whileHover={{ backgroundColor: '#6A8F7B', scale: 1.04, boxShadow: '0 10px 28px rgba(106,143,123,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="btn-shimmer font-sans font-semibold text-white"
              style={{
                padding: '15px 36px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Mirar resultados →
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

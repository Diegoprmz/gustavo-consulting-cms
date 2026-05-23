'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

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

const mobileGrid = logos.slice(0, 12);
const doubled = [...logos, ...logos];

function LogoItem({ logo }: { logo: typeof logos[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, filter: 'grayscale(0%) opacity(1)' }}
      transition={{ duration: 0.28 }}
      className="logo-item flex items-center justify-center flex-shrink-0"
      style={{ width: '160px', height: '90px', marginRight: '64px' }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.w}
        height={60}
        className="object-contain"
        style={{ maxWidth: '150px', maxHeight: '80px' }}
      />
    </motion.div>
  );
}

export default function Clientes() {
  return (
    <section
      id="clientes"
      className="bg-white overflow-hidden"
      style={{ paddingTop: '110px', paddingBottom: '110px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Heading */}
        <AnimatedSection>
          <div style={{ marginBottom: '12px' }}>
            <span className="label-olive">Empresas que han confiado en este enfoque</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(52px, 7vw, 88px)',
              fontWeight: 700,
              color: '#243A4D',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Clientes
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(17px, 2vw, 22px)',
              color: '#6B7280',
              fontStyle: 'italic',
              fontWeight: 400,
              marginBottom: '72px',
              maxWidth: '600px',
              lineHeight: 1.5,
            }}
          >
            Resultados generados enfocándose en{' '}
            <span style={{ color: '#C9A84C' }}>el cliente</span>{' '}
            como eje de la estrategia.
          </p>
        </AnimatedSection>

        {/* Separator line */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(106,143,123,0.15)', marginBottom: '52px' }} />

        {/* Marquee — desktop */}
        <div className="hidden md:block overflow-hidden" style={{ marginBottom: '52px' }}>
          <div className="marquee-track-slow" style={{ width: 'max-content' }}>
            {doubled.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* Grid — mobile */}
        <div className="grid grid-cols-3 gap-6 md:hidden" style={{ marginBottom: '48px' }}>
          {mobileGrid.map((logo) => (
            <div key={logo.name} className="logo-item flex items-center justify-center" style={{ height: '64px' }}>
              <Image src={logo.src} alt={logo.name} width={logo.w} height={50}
                className="object-contain" style={{ maxWidth: '90px', maxHeight: '48px' }} />
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(106,143,123,0.15)', marginBottom: '52px' }} />

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
                borderRadius: '8px',
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

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const logos = [
  { name: 'ADO',         src: '/images/logos/ADO.webp',          width: 120, height: 60 },
  { name: 'Alimás',      src: '/images/logos/alimas.webp',        width: 140, height: 60 },
  { name: 'Ammmec',      src: '/images/logos/ammmec.webp',        width: 140, height: 60 },
  { name: 'The Anglo',   src: '/images/logos/anglo.webp',         width: 130, height: 60 },
  { name: 'Asociarse',   src: '/images/logos/asociarse.webp',     width: 140, height: 60 },
  { name: 'Bühler',      src: '/images/logos/buhler.webp',        width: 130, height: 60 },
  { name: 'Cana',        src: '/images/logos/cana.webp',          width: 120, height: 60 },
  { name: 'CB',          src: '/images/logos/CB.webp',            width: 100, height: 60 },
  { name: 'Cen1',        src: '/images/logos/cen1_edited.webp',   width: 130, height: 60 },
  { name: 'Cenapyme',    src: '/images/logos/cenapyme.webp',      width: 140, height: 60 },
  { name: 'Coppel',      src: '/images/logos/coppel.webp',        width: 130, height: 60 },
  { name: 'Express',     src: '/images/logos/express.webp',       width: 130, height: 60 },
  { name: 'Fandeli',     src: '/images/logos/fandeli.webp',       width: 130, height: 60 },
  { name: 'Fonatur',     src: '/images/logos/fonatur.webp',       width: 130, height: 60 },
  { name: 'Ford',        src: '/images/logos/ford.webp',          width: 100, height: 60 },
  { name: 'GMDZ',        src: '/images/logos/GMDZ.webp',          width: 120, height: 60 },
  { name: 'Guerr',       src: '/images/logos/Guerr.webp',         width: 130, height: 60 },
  { name: 'HSBC',        src: '/images/logos/HSBC.webp',          width: 110, height: 60 },
  { name: 'ILP',         src: '/images/logos/ilp.webp',           width: 110, height: 60 },
  { name: 'ITD',         src: '/images/logos/ITD.webp',           width: 110, height: 60 },
  { name: 'LBA',         src: '/images/logos/LBA.webp',           width: 110, height: 60 },
  { name: 'Noviagro',    src: '/images/logos/logonoviagro.webp',  width: 140, height: 60 },
  { name: 'MEGAPRO',     src: '/images/logos/MEGAPRO.webp',       width: 130, height: 60 },
  { name: 'MHS',         src: '/images/logos/MHS.webp',           width: 110, height: 60 },
  { name: 'P&B',         src: '/images/logos/P&B.webp',           width: 110, height: 60 },
  { name: 'PDH',         src: '/images/logos/PDH.webp',           width: 110, height: 60 },
  { name: 'Poliflex',    src: '/images/logos/poliflex.webp',      width: 130, height: 60 },
  { name: 'Prendamex',   src: '/images/logos/prendamex.webp',     width: 130, height: 60 },
  { name: 'SC',          src: '/images/logos/SC.webp',            width: 100, height: 60 },
  { name: 'TID',         src: '/images/logos/TID.webp',           width: 110, height: 60 },
  { name: '1-23',        src: '/images/logos/1-23.webp',          width: 120, height: 60 },
];

function LogoItem({ logo }: { logo: typeof logos[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: '160px', height: '100px', marginRight: '56px', opacity: 0.75 }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        className="object-contain"
        style={{ maxWidth: '160px', maxHeight: '90px' }}
        unoptimized={false}
      />
    </motion.div>
  );
}

export default function Clientes() {
  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      id="clientes"
      className="bg-white overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="label-olive" style={{ justifyContent: 'center' }}>
              Empresas que han confiado en este enfoque
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif text-center mx-auto"
            style={{
              fontSize: 'clamp(24px, 3vw, 34px)',
              color: '#243A4D',
              lineHeight: 1.35,
              maxWidth: '680px',
              fontWeight: 700,
              marginBottom: '64px',
              marginTop: '18px',
            }}
          >
            He generado resultados en distintas empresas enfocándome 100% en sus clientes.
          </h2>
        </AnimatedSection>

        {/* Marquee — desktop */}
        <div className="hidden md:block overflow-hidden" style={{ marginBottom: '64px' }}>
          <div className="marquee-track" style={{ width: 'max-content' }}>
            {doubled.map((logo, i) => <LogoItem key={`${logo.name}-${i}`} logo={logo} />)}
          </div>
        </div>

        {/* Grid 2×2 — mobile */}
        <div className="grid grid-cols-2 gap-8 md:hidden" style={{ marginBottom: '48px' }}>
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center" style={{ height: '80px' }}>
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height}
                className="object-contain" style={{ maxWidth: '130px', maxHeight: '65px' }} unoptimized />
            </div>
          ))}
        </div>

        {/* Olive divider line */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(106,143,123,0.2)', marginBottom: '48px' }} />

        <AnimatedSection delay={0.2}>
          <div className="text-center">
            <a
              href="/resultados"
              className="btn-shimmer font-sans font-semibold text-white"
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Mirar resultados →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

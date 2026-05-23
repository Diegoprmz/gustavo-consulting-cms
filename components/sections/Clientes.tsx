'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const logos = [
  { name: 'ADO',      src: '/images/logos/ado.svg',     width: 120, height: 60 },
  { name: 'Alimás',   src: '/images/logos/alimas.svg',  width: 140, height: 60 },
  { name: 'Ámarmoc',  src: '/images/logos/amarmoc.svg', width: 140, height: 60 },
  { name: 'The Anglo',src: '/images/logos/anglo.svg',   width: 130, height: 60 },
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
        unoptimized
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

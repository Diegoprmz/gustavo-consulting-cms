'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const logos = [
  { name: 'ADO', src: '/images/logos/ado.svg', width: 120, height: 60 },
  { name: 'Alimás', src: '/images/logos/alimas.svg', width: 140, height: 60 },
  { name: 'Ámarmoc', src: '/images/logos/amarmoc.svg', width: 140, height: 60 },
  { name: 'The Anglo', src: '/images/logos/anglo.svg', width: 130, height: 60 },
];

function LogoItem({ logo }: { logo: typeof logos[0] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: '160px',
        height: '100px',
        marginRight: '48px',
        opacity: 0.85,
      }}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        className="object-contain"
        style={{ maxWidth: '160px', maxHeight: '100px' }}
        unoptimized
      />
    </motion.div>
  );
}

export default function Clientes() {
  const doubled = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      className="bg-white overflow-hidden"
      style={{ paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Label */}
        <AnimatedSection>
          <p
            className="text-center font-sans font-semibold mb-5"
            style={{
              fontSize: '12px',
              color: '#6A8F7B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            EMPRESAS QUE HAN CONFIADO EN ESTE ENFOQUE
          </p>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif text-navy text-center mx-auto mb-16"
            style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              color: '#243A4D',
              lineHeight: 1.4,
              maxWidth: '720px',
              fontWeight: 700,
            }}
          >
            He generado resultados en distintas empresas enfocándome 100% en sus
            clientes, con un enfoque de obsesión por el cliente.
          </h2>
        </AnimatedSection>

        {/* Carrusel — desktop */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="marquee-track"
            style={{ width: 'max-content' }}
          >
            {doubled.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* Grid 2x2 — mobile */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center"
              style={{ height: '80px' }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="object-contain"
                style={{ maxWidth: '140px', maxHeight: '70px' }}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mt-12">
            <motion.a
              href="/resultados"
              whileHover={{ backgroundColor: '#6A8F7B', scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-block font-sans font-semibold text-white cursor-pointer"
              style={{
                backgroundColor: '#243A4D',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '14px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
            >
              MIRAR RESULTADOS →
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

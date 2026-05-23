'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const companies = [
  'Bimbo', 'FEMSA', 'Banorte', 'Telcel', 'Soriana',
  'CEMEX', 'Walmart', 'Alsea', 'Coppel', 'Liverpool',
  'Banorte', 'BBVA', 'Citibanamex', 'American Express', 'Grupo Lala',
];

export default function Trayectoria() {
  return (
    <section
      id="trayectoria"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '120px', paddingBottom: '0' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8" style={{ paddingBottom: '80px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(36,58,77,0.18)',
                maxWidth: '460px',
                outline: '1.5px solid rgba(106,143,123,0.2)',
                outlineOffset: '8px',
              }}
            >
              <Image
                src="/assets/gustavo_americana_azul.jpg"
                alt="Gustavo Martínez Pellón"
                width={460}
                height={580}
                className="block w-full object-cover"
              />
            </motion.div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.15}>
            <div style={{ maxWidth: '520px' }}>
              <span className="label-olive" style={{ marginBottom: '20px', display: 'inline-flex' }}>
                Trayectoria
              </span>

              <div className="olive-divider" style={{ marginTop: '20px', marginBottom: '28px' }} />

              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  lineHeight: 1.18,
                  color: '#243A4D',
                  fontWeight: 700,
                  marginBottom: '24px',
                }}
              >
                Más de tres décadas conectando
                <span style={{ color: '#6A8F7B', fontStyle: 'italic', fontWeight: 400 }}> estrategia </span>
                con ejecución.
              </h2>

              <p
                className="font-sans"
                style={{ fontSize: '16px', lineHeight: 1.82, color: '#4A5568', marginBottom: '36px' }}
              >
                Trabajo con empresas en México y Latinoamérica desde tres perspectivas
                complementarias: como consejero corporativo en decisiones estratégicas,
                como consultor empresarial en procesos de transformación, y como profesor
                en programas de educación ejecutiva.
              </p>

              <motion.a
                href="/about"
                whileHover={{ backgroundColor: '#243A4D', color: '#ffffff' }}
                transition={{ duration: 0.25 }}
                className="inline-block font-sans font-semibold"
                style={{
                  border: '2px solid #243A4D',
                  color: '#243A4D',
                  padding: '14px 28px',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                Trayectoria completa →
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Company logo marquee strip */}
      <div
        style={{
          borderTop: '1px solid rgba(106,143,123,0.15)',
          borderBottom: '1px solid rgba(106,143,123,0.15)',
          backgroundColor: '#EBEBEB',
          padding: '20px 0',
          overflow: 'hidden',
        }}
      >
        <div className="marquee-track-slow" style={{ gap: '0' }}>
          {[...companies, ...companies].map((name, i) => (
            <div
              key={i}
              className="font-sans font-semibold"
              style={{
                flexShrink: 0,
                padding: '0 40px',
                fontSize: '12px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(36,58,77,0.35)',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
              }}
            >
              {name}
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(201,168,76,0.4)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

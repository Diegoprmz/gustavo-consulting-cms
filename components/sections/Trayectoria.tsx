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
      style={{ backgroundColor: '#ffffff', paddingTop: '120px', paddingBottom: '0' }}
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
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  lineHeight: 1,
                  color: '#243A4D',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Trayectoria
              </p>

              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  lineHeight: 1.5,
                  color: '#6A8F7B',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginBottom: '32px',
                }}
              >
                Más de tres décadas acompañando decisiones estratégicas, transformación organizacional y desarrollo directivo.
              </h2>

              <p
                className="font-sans"
                style={{ fontSize: '16px', lineHeight: 1.82, color: '#4A5568', marginBottom: '36px' }}
              >
                A lo largo de mi trayectoria he trabajado junto a empresas, consejos de administración y líderes en México y Latinoamérica, acompañando procesos de transformación estratégica, crecimiento organizacional y desarrollo de liderazgo ejecutivo.
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
    </section>
  );
}

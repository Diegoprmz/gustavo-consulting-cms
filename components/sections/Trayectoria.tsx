'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Trayectoria() {
  return (
    <section
      id="trayectoria"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(36,58,77,0.13)',
                maxWidth: '420px',
                outline: '1.5px solid rgba(106,143,123,0.2)',
                outlineOffset: '8px',
              }}
            >
              <Image
                src="/images/gustavo.svg"
                alt="Gustavo Martínez Pellón"
                width={420}
                height={530}
                className="block w-full object-cover"
                unoptimized
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
                  fontSize: 'clamp(28px, 3.2vw, 40px)',
                  lineHeight: 1.2,
                  color: '#243A4D',
                  fontWeight: 700,
                  marginBottom: '24px',
                }}
              >
                Más de tres décadas conectando estrategia con ejecución.
              </h2>

              <p
                className="font-sans"
                style={{ fontSize: '16px', lineHeight: 1.82, color: '#333333', marginBottom: '36px' }}
              >
                Trabajo con empresas en México y Latinoamérica desde tres perspectivas
                complementarias: como consejero corporativo en decisiones estratégicas,
                como consultor empresarial en procesos de transformación, y como profesor
                en programas de educación ejecutiva. Esta integración permite conectar
                la estrategia con la ejecución real.
              </p>

              <motion.a
                href="#conversemos"
                whileHover={{ backgroundColor: '#243A4D', color: '#ffffff' }}
                transition={{ duration: 0.25 }}
                className="inline-block font-sans font-semibold"
                style={{
                  border: '2px solid #243A4D',
                  color: '#243A4D',
                  padding: '14px 28px',
                  borderRadius: '8px',
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

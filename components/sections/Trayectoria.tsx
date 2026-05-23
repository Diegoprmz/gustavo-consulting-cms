'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Trayectoria() {
  return (
    <section
      style={{ backgroundColor: '#F5F5F5', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Photo */}
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 35px rgba(36,58,77,0.12)',
                maxWidth: '420px',
                cursor: 'default',
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

          {/* Right: Text */}
          <AnimatedSection delay={0.15}>
            <div style={{ maxWidth: '520px' }}>
              {/* Label */}
              <p
                className="font-sans font-semibold mb-4"
                style={{
                  fontSize: '12px',
                  color: '#6A8F7B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                TRAYECTORIA
              </p>

              {/* Headline */}
              <h2
                className="font-serif text-navy mb-6"
                style={{
                  fontSize: 'clamp(28px, 3.2vw, 40px)',
                  lineHeight: 1.3,
                  color: '#243A4D',
                  fontWeight: 700,
                  maxWidth: '520px',
                }}
              >
                Más de tres décadas conectando estrategia con ejecución.
              </h2>

              {/* Paragraph */}
              <p
                className="font-sans mb-8"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#333333',
                  maxWidth: '600px',
                }}
              >
                Trabajo con empresas en México y Latinoamérica desde tres perspectivas
                complementarias: como consejero corporativo en decisiones estratégicas,
                como asesor de negocios en procesos de transformación, y como formador
                en programas de educación ejecutiva. Esta integración permite conectar
                la estrategia con la ejecución real.
              </p>

              {/* Button */}
              <motion.a
                href="#conversemos"
                whileHover={{ backgroundColor: '#243A4D', color: '#ffffff' }}
                transition={{ duration: 0.3 }}
                className="inline-block font-sans font-semibold"
                style={{
                  border: '2px solid #243A4D',
                  color: '#243A4D',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                TRAYECTORIA COMPLETA →
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

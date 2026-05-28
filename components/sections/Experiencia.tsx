'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDots from '@/components/ui/GoldDots';

const roles = [
  {
    label: 'CONSEJERO',
    description:
      'Las decisiones más importantes de una empresa no deberían tomarse lejos del cliente. Acompaño a consejos y alta dirección a convertir la visión estratégica del cliente en una ventaja competitiva, crecimiento sostenible y rentabilidad.',
  },
  {
    label: 'CONSULTOR',
    description:
      'Trabajo con equipos directivos en procesos de transformación estratégica que convierten la orientación al cliente en creación de valor, crecimiento sostenible y mayor rentabilidad.',
  },
  {
    label: 'EDUCACIÓN EJECUTIVA',
    description:
      'La transformación de una empresa comienza por la transformación de sus líderes. Diseño programas de educación ejecutiva para desarrollar directivos con visión estratégica, orientación al cliente y capacidad de transformación.',
  },
];

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '60px',
        paddingBottom: '40px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <div style={{ marginBottom: '36px' }}>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                lineHeight: 0.95,
                fontWeight: 700,
                color: '#243A4D',
                maxWidth: '640px',
                marginTop: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              Áreas de 
              <br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>
                Especialización.
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <GoldDots my="0px" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0" style={{ marginTop: '8px' }}>
          {roles.map((role, i) => (
            <AnimatedSection key={role.label} delay={i * 0.12}>
              <motion.div
                className="relative md:px-8"
                whileHover={{ backgroundColor: 'rgba(36,58,77,0.08)', translateY: -4, color: '#C9A84C' }}
                transition={{ duration: 0.25 }}
                style={{ padding: '24px 16px', cursor: 'default' }}
              >
                <p
                  className="font-sans font-semibold"
                  style={{ fontSize: '13px', color: '#C9A84C', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '16px' }}
                >
                  {role.label}
                </p>
                <p className="font-sans" style={{ fontSize: '17px', lineHeight: 1.82, color: '#4A5568' }}>
                  {role.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        <GoldDots />
      </div>
    </section>
  );
}

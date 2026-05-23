'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const roles = [
  {
    label: 'CONSEJERO CORPORATIVO',
    description:
      'Acompañamiento a consejos de administración y comités directivos en la toma de decisiones estratégicas. Integro la perspectiva del cliente en la agenda del consejo, asegurando que las decisiones de alto nivel estén alineadas con la realidad del mercado.',
  },
  {
    label: 'CONSULTOR EMPRESARIAL',
    description:
      'Diagnóstico y rediseño de la propuesta de valor, modelo de negocio y estrategia comercial. Trabajo directamente con equipos directivos en procesos de transformación, aportando metodología y perspectiva externa para acelerar resultados.',
  },
  {
    label: 'PROFESOR EJECUTIVO',
    description:
      'Diseño e impartición de programas de alta dirección en estrategia centrada en el cliente, liderazgo y transformación organizacional. Colaboro con la Universidad Anáhuac para desarrollar directivos con visión estratégica integrada.',
  },
];

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      style={{
        backgroundColor: '#ECECEC',
        paddingTop: '110px',
        paddingBottom: '110px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <div style={{ marginBottom: '72px' }}>
            <span className="label-olive" style={{ marginBottom: '20px', display: 'inline-flex' }}>
              Trayectoria profesional
            </span>
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
              Experiencia aplicada
              <br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>
                en decisiones reales.
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {roles.map((role, i) => (
            <AnimatedSection key={role.label} delay={i * 0.12}>
              <motion.div
                className="relative md:px-8"
                whileHover={{ backgroundColor: 'rgba(36,58,77,0.04)', translateY: -4 }}
                transition={{ duration: 0.25 }}
                style={{ padding: '24px 16px', cursor: 'default' }}
              >
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(106,143,123,0.3), transparent)' }}
                  />
                )}
                <div style={{ width: '32px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))', marginBottom: '20px' }} />
                <p
                  className="font-sans font-semibold"
                  style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '16px' }}
                >
                  {role.label}
                </p>
                <p className="font-sans" style={{ fontSize: '15px', lineHeight: 1.82, color: '#4A5568' }}>
                  {role.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ElProblema() {
  return (
    <section
      id="enfoque"
      style={{
        backgroundColor: '#243A4D',
        paddingTop: '100px',
        paddingBottom: '0',
        borderTop: '4px solid #6A8F7B',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <span className="label-olive" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            El problema
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              lineHeight: 1.2,
              fontWeight: 700,
              maxWidth: '820px',
              marginTop: '16px',
            }}
          >
            Llevar al cliente al centro no es discurso.{' '}
            <span style={{ color: '#6A8F7B' }}>Es transformación estratégica.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p
            className="font-sans text-white"
            style={{ fontSize: '16px', lineHeight: 1.82, opacity: 0.88, maxWidth: '680px', marginTop: '24px' }}
          >
            Cinco dimensiones del negocio deben alinearse para convertir al cliente
            en el motor real de la rentabilidad.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

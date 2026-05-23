'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ElProblema() {
  return (
    <section
      style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '0' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Label */}
        <AnimatedSection>
          <p
            className="font-sans font-semibold mb-4"
            style={{
              fontSize: '12px',
              color: '#6A8F7B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            EL PROBLEMA
          </p>
        </AnimatedSection>

        {/* Headline */}
        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.3,
              fontWeight: 700,
              maxWidth: '800px',
            }}
          >
            Llevar al cliente al centro no es discurso. Es transformación estratégica.
          </h2>
        </AnimatedSection>

        {/* Explanation */}
        <AnimatedSection delay={0.2}>
          <p
            className="font-sans text-white mt-6"
            style={{
              fontSize: '16px',
              lineHeight: 1.8,
              opacity: 0.95,
              maxWidth: '720px',
            }}
          >
            Cinco dimensiones del negocio deben alinearse para convertir al cliente
            en el motor real de la rentabilidad.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

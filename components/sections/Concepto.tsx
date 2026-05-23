'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Concepto() {
  return (
    <section
      style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[760px] mx-auto px-5 md:px-8 text-center">
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
            EL CONCEPTO
          </p>
        </AnimatedSection>

        {/* Headline — mixed style */}
        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif mb-6"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 38px)',
              lineHeight: 1.4,
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#243A4D' }}>
              Muchas empresas dicen estar centradas en el cliente.
            </span>
            <br />
            <em style={{ color: '#6B7280', fontStyle: 'italic', fontWeight: 400 }}>
              Pocas lo están en su estrategia.
            </em>
          </h2>
        </AnimatedSection>

        {/* Explanation */}
        <AnimatedSection delay={0.2}>
          <p
            className="font-sans mx-auto"
            style={{
              fontSize: '16px',
              color: '#333333',
              lineHeight: 1.8,
              maxWidth: '680px',
            }}
          >
            En la práctica, el cliente suele quedar fuera de las decisiones clave:
            la estrategia se define desde finanzas, la operación desde eficiencia y
            la cultura desde inercias históricas. El resultado: crecimiento limitado,
            desconexión con el mercado y rentabilidad presionada.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

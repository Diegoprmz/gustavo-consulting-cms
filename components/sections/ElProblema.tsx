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
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">

          <AnimatedSection>
            <span className="label-olive-light" style={{ marginBottom: '20px', display: 'inline-flex' }}>
              El problema
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2
              className="font-serif text-white"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 50px)',
                lineHeight: 1.18,
                fontWeight: 700,
                maxWidth: '800px',
                marginTop: '16px',
              }}
            >
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Customer Centricity</span>
              {': '}
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
                Cinco dimensiones que deben alinearse
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p
              className="font-sans text-white"
              style={{ fontSize: '17px', lineHeight: 1.82, opacity: 0.72, maxWidth: '660px', marginTop: '28px' }}
            >
              Cinco dimensiones del negocio deben alinearse para convertir al cliente
              en el motor real de la rentabilidad: estrategia, cultura, operación,
              experiencia y métricas.
            </p>
          </AnimatedSection>
        </div>
      </section>
    );
}

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const cards = [
  {
    icon: '◎',
    titulo: 'El cliente ausente',
    texto: 'La estrategia se define desde finanzas. La operación desde eficiencia. La cultura desde inercias históricas. El cliente queda fuera.',
  },
  {
    icon: '◈',
    titulo: 'El resultado',
    texto: 'Crecimiento limitado, desconexión con el mercado y rentabilidad presionada. La empresa trabaja duro pero no en lo correcto.',
  },
  {
    icon: '◉',
    titulo: 'La transformación',
    texto: 'Llevar al cliente al centro requiere alinear cinco dimensiones del negocio: estrategia, cultura, operación, experiencia y métricas.',
  },
];

export default function Concepto() {
  return (
    <section
      id="concepto"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">

        {/* Header — centered */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
          <AnimatedSection>
            <span className="label-olive" style={{ justifyContent: 'center' }}>El concepto</span>
            <div className="olive-divider" style={{ margin: '20px auto 28px' }} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.3, fontWeight: 700, marginBottom: '14px' }}
            >
              <span style={{ color: '#243A4D' }}>Muchas empresas dicen estar centradas en el cliente.</span>
              <br />
              <em style={{ color: '#6A8F7B', fontStyle: 'italic', fontWeight: 400 }}>Pocas lo están en su estrategia.</em>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <p className="font-sans" style={{ fontSize: '16px', color: '#333333', lineHeight: 1.82 }}>
              En la práctica, el cliente suele quedar fuera de las decisiones clave.
              El resultado: crecimiento limitado, desconexión con el mercado y rentabilidad presionada.
            </p>
          </AnimatedSection>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <AnimatedSection key={c.titulo} delay={i * 0.12}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '36px 28px',
                  boxShadow: '0 2px 16px rgba(36,58,77,0.06)',
                  borderTop: '3px solid #6A8F7B',
                  height: '100%',
                }}
              >
                <div style={{ fontSize: '22px', color: '#6A8F7B', marginBottom: '16px' }}>{c.icon}</div>
                <h3
                  className="font-serif"
                  style={{ fontSize: '19px', color: '#243A4D', fontWeight: 600, marginBottom: '12px', lineHeight: 1.3 }}
                >
                  {c.titulo}
                </h3>
                <p className="font-sans" style={{ fontSize: '14px', color: '#333333', lineHeight: 1.75 }}>
                  {c.texto}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

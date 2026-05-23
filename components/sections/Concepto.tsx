'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const cards = [
  {
    num: '01',
    titulo: 'El cliente ausente',
    texto: 'La estrategia se define desde finanzas. La operación desde eficiencia. La cultura desde inercias históricas. El cliente queda fuera de las decisiones que importan.',
  },
  {
    num: '02',
    titulo: 'El resultado',
    texto: 'Crecimiento limitado, desconexión con el mercado y rentabilidad presionada. La empresa trabaja duro pero no en lo correcto.',
  },
  {
    num: '03',
    titulo: 'La transformación',
    texto: 'Llevar al cliente al centro requiere alinear cinco dimensiones del negocio: estrategia, cultura, operación, experiencia y métricas.',
  },
];

export default function Concepto() {
  return (
    <section
      id="concepto"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '110px', paddingBottom: '110px' }}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 72px' }}>
          <AnimatedSection>
            <span className="label-olive" style={{ justifyContent: 'center' }}>El concepto</span>
            <div className="gold-divider" style={{ margin: '20px auto 28px' }} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif" style={{ lineHeight: 1.25, fontWeight: 700, marginBottom: '18px' }}>
              <span style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#243A4D', display: 'block' }}>
                Muchas empresas dicen estar centradas
              </span>
              <span style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#243A4D', display: 'block' }}>
                en el{' '}
                <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>cliente</span>.
              </span>
              <em style={{ fontSize: 'clamp(22px, 2.8vw, 36px)', color: '#6A8F7B', fontStyle: 'italic', fontWeight: 400, display: 'block', marginTop: '8px' }}>
                Pocas lo están en su estrategia.
              </em>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.82 }}>
              En la práctica, el <span style={{ color: '#243A4D', fontWeight: 500 }}>cliente</span> suele quedar fuera de las decisiones clave.
              El resultado: crecimiento limitado, desconexión con el mercado y rentabilidad presionada.
            </p>
          </AnimatedSection>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <AnimatedSection key={c.num} delay={i * 0.12}>
              <motion.div
                whileHover={{ translateY: -7, boxShadow: '0 22px 48px rgba(36,58,77,0.12)' }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  padding: '36px 28px',
                  boxShadow: '0 2px 16px rgba(36,58,77,0.06)',
                  borderTop: '3px solid #C9A84C',
                  height: '100%',
                  cursor: 'default',
                }}
              >
                <p className="font-sans font-bold" style={{ fontSize: '12px', color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '14px' }}>
                  {c.num}
                </p>
                <h3
                  className="font-serif"
                  style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', color: '#243A4D', fontWeight: 600, marginBottom: '14px', lineHeight: 1.25 }}
                >
                  {c.titulo}
                </h3>
                <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.78 }}>
                  {c.texto}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const columns = [
  {
    label: 'No es',
    color: '#6B7280',
    items: [
      'Un programa de servicio al cliente',
      'Una campaña de marketing',
      'Un slogan corporativo',
      'Una iniciativa aislada',
    ],
  },
  {
    label: 'Es',
    color: '#6A8F7B',
    items: [
      'Una decisión estratégica',
      'Un modelo de negocio completo',
      'Una cultura organizacional',
      'El motor de la rentabilidad',
    ],
  },
  {
    label: 'Se mide',
    color: '#C9A84C',
    items: [
      'En retención de clientes',
      'En rentabilidad por cliente',
      'En crecimiento sostenible',
      'En coherencia de la propuesta',
    ],
  },
];

export default function Concepto() {
  return (
    <section
      id="concepto"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-8">

        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '80px' }}>
          <AnimatedSection>
            <span className="label-olive" style={{ marginBottom: '20px', display: 'inline-flex' }}>
              El concepto
            </span>
            <div className="gold-divider" style={{ marginTop: '20px', marginBottom: '32px' }} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-serif" style={{ lineHeight: 1.2, marginBottom: '24px' }}>
              <span
                style={{
                  fontSize: 'clamp(30px, 4vw, 52px)',
                  fontWeight: 700,
                  color: '#243A4D',
                  display: 'block',
                }}
              >
                <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Customer Centricity</span>
                {' '}es una decisión estratégica
              </span>
              <span
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 46px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#6A8F7B',
                  display: 'block',
                  marginTop: '6px',
                }}
              >
                que define la rentabilidad.
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <p className="font-sans" style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.82, maxWidth: '680px' }}>
              No es un eslogan ni una iniciativa de experiencia de cliente. Es la decisión de
              colocar al <span style={{ color: '#243A4D', fontWeight: 600 }}>cliente</span>{' '}
              en el centro de cada decisión estratégica, operativa y cultural de la organización.
            </p>
          </AnimatedSection>
        </div>

        {/* No es / Es / Se mide columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col, i) => (
            <AnimatedSection key={col.label} delay={i * 0.12}>
              <motion.div
                whileHover={{ translateY: -6, boxShadow: '0 20px 48px rgba(36,58,77,0.1)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '36px 28px',
                  height: '100%',
                  cursor: 'default',
                  borderBottom: `3px solid ${col.color}`,
                  boxShadow: '0 2px 16px rgba(36,58,77,0.05)',
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: col.color,
                    marginBottom: '28px',
                    lineHeight: 1,
                    fontStyle: 'italic',
                  }}
                >
                  {col.label}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: col.color, marginTop: '9px', flexShrink: 0 }} />
                      <span className="font-sans" style={{ fontSize: '15px', color: '#4A5568', lineHeight: 1.65 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

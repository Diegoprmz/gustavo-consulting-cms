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
            <span className="label-olive" style={{ marginBottom: '32px', display: 'inline-flex' }}>
              El concepto
            </span>
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

        {/* Gold dots accent — large / small / large */}
        <AnimatedSection delay={0.25}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            marginTop: '72px',
            paddingTop: '48px',
          }}>
            {/* Large dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#C9A84C',
                boxShadow: '0 0 24px rgba(201,168,76,0.5)',
              }}
            />
            {/* Small dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#C9A84C',
                boxShadow: '0 0 16px rgba(201,168,76,0.4)',
              }}
            />
            {/* Large dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#C9A84C',
                boxShadow: '0 0 24px rgba(201,168,76,0.5)',
              }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

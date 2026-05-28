'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const formas = [
  {
    num: '01',
    titulo: 'Acompañamiento a dirección y consejo',
    descripcion:
      'Presencia continua en decisiones de alto impacto. Trabajo junto a la dirección general y el consejo de administración como contraparte estratégica, integrando la voz del cliente donde se define el rumbo de la empresa.',
  },
  {
    num: '02',
    titulo: 'Intervención en procesos de transformación',
    descripcion:
      'Participación activa en proyectos de transformación estratégica, comercial u organizacional. Aporto metodología, estructura y perspectiva externa para acelerar resultados cuando la empresa enfrenta un punto de inflexión.',
  },
  {
    num: '03',
    titulo: 'Programas de educación ejecutiva',
    descripcion:
      'Diseño e impartición de programas formativos para equipos directivos y de alta dirección. Combinan marco conceptual riguroso con aplicación práctica inmediata.',
  },
];

export default function Colaboracion() {
  return (
    <section
      id="colaboracion"
      style={{ backgroundColor: '#3D5C4A', paddingTop: '110px', paddingBottom: '110px', marginTop: '-2px', position: 'relative', zIndex: 1 }}
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(40px, 5vw, 62px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '2px',
            }}
          >
            Formas de <span style={{ color: '#C9A84C' }}>colaboración</span>
          </h2>
          <p className="font-sans text-white" style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '56px', maxWidth: '520px', opacity: 0.8 }}>
            Cada intervención se diseña en función del contexto del negocio.
          </p>
        </AnimatedSection>

        <div>
          {formas.map((f, i) => (
            <AnimatedSection key={f.num} delay={i * 0.12}>
              <motion.div
                whileHover={{
                  backgroundColor: '#1F3630',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
                  y: -5,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  padding: '36px 28px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-start gap-7 md:gap-10">
                  <span
                    className="font-serif font-bold flex-shrink-0"
                    style={{ fontSize: '32px', color: '#C9A84C', minWidth: '48px', lineHeight: 1, fontWeight: 800 }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <h3
                      className="font-serif"
                      style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', lineHeight: 1.3, fontWeight: 700, marginBottom: '14px', color: '#C9A84C' }}
                    >
                      {f.titulo}
                    </h3>
                    <p className="font-sans text-white" style={{ fontSize: '16px', lineHeight: 1.8, fontWeight: 500, opacity: 0.9 }}>
                      {f.descripcion}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <motion.a
              href="/contact"
              whileHover={{ backgroundColor: '#C9A84C', borderColor: '#C9A84C', color: '#243A4D', scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="font-sans font-semibold text-white inline-block"
              style={{
                border: '1.5px solid rgba(255,255,255,0.35)',
                padding: '15px 36px',
                fontSize: '13px',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                backgroundColor: '#243A4D',
              }}
            >
              Hablemos de tu caso →
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

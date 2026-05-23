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
      style={{ backgroundColor: '#3D5C4A', paddingTop: '110px', paddingBottom: '110px' }}
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <span className="label-olive-light" style={{ marginBottom: '20px', display: 'inline-flex' }} />
          <div style={{ width: '28px', height: '1.5px', background: 'rgba(201,168,76,0.6)', marginBottom: '20px' }} />
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(40px, 5vw, 62px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
            }}
          >
            Formas de
          </h2>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(40px, 5vw, 62px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#C9A84C',
              marginBottom: '20px',
            }}
          >
            trabajo
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '56px', maxWidth: '520px' }}>
            Cada intervención se diseña en función del contexto del negocio.
          </p>
        </AnimatedSection>

        <div>
          {formas.map((f, i) => (
            <AnimatedSection key={f.num} delay={i * 0.12}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', paddingLeft: '12px' }}
                transition={{ duration: 0.25 }}
                style={{
                  borderTop: '1px solid rgba(201,168,76,0.2)',
                  borderBottom: i === formas.length - 1 ? '1px solid rgba(201,168,76,0.2)' : 'none',
                  paddingTop: '36px',
                  paddingBottom: '36px',
                  borderRadius: '4px',
                  transition: 'all 0.25s ease',
                }}
              >
                <div className="flex items-start gap-7 md:gap-10">
                  <span
                    className="font-serif font-bold flex-shrink-0"
                    style={{ fontSize: '24px', color: '#C9A84C', minWidth: '36px', lineHeight: 1 }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <h3
                      className="font-serif text-white"
                      style={{ fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: 1.25, fontWeight: 600, marginBottom: '12px' }}
                    >
                      {f.titulo}
                    </h3>
                    <p className="font-sans" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.78 }}>
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

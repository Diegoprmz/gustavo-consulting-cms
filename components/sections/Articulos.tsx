'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const articulos = [
  {
    fecha: 'Abril 2026',
    categoria: 'Estrategia',
    titulo: 'El cliente como ventaja competitiva sostenible',
    extracto: 'En un mercado donde los productos se copian y los precios se igualan, la experiencia del cliente se convierte en el único diferenciador verdaderamente difícil de replicar.',
    slug: 'cliente-ventaja-competitiva',
  },
  {
    fecha: 'Marzo 2026',
    categoria: 'Cultura',
    titulo: 'Cultura organizacional: el verdadero habilitador de la estrategia',
    extracto: 'Ninguna estrategia sobrevive si la cultura no la respalda. Cómo lograr que los valores declarados se traduzcan en comportamientos reales de cara al cliente.',
    slug: 'cultura-habilitador-estrategia',
  },
  {
    fecha: 'Febrero 2026',
    categoria: 'Métricas',
    titulo: 'Más allá del NPS: métricas que conectan cliente y rentabilidad',
    extracto: 'El Net Promoter Score es un punto de partida, no un destino. Los indicadores que conectan genuinamente la satisfacción del cliente con la rentabilidad del negocio.',
    slug: 'metricas-nps-rentabilidad',
  },
];

export default function Articulos() {
  return (
    <section
      id="articulos"
      style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <span className="label-olive" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            Artículos
          </span>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', color: '#243A4D', fontWeight: 700, lineHeight: 1.2, marginBottom: '10px' }}
          >
            Artículos
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, marginBottom: '56px' }}>
            Reflexiones sobre estrategia, cultura y transformación.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articulos.map((a, i) => (
            <AnimatedSection key={a.slug} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(36,58,77,0.12)' }}
                transition={{ duration: 0.28 }}
                className="bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(36,58,77,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {/* Olive top bar */}
                <div style={{ height: '4px', backgroundColor: '#6A8F7B' }} />

                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span
                      className="font-sans font-semibold"
                      style={{
                        fontSize: '10px',
                        color: '#6A8F7B',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        backgroundColor: 'rgba(106,143,123,0.1)',
                        padding: '4px 10px',
                        borderRadius: '100px',
                      }}
                    >
                      {a.categoria}
                    </span>
                    <span className="font-sans" style={{ fontSize: '12px', color: '#6B7280' }}>{a.fecha}</span>
                  </div>

                  <h3
                    className="font-serif"
                    style={{ fontSize: '19px', color: '#243A4D', fontWeight: 700, lineHeight: 1.35, marginBottom: '12px' }}
                  >
                    {a.titulo}
                  </h3>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: '14px',
                      color: '#333333',
                      lineHeight: 1.7,
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '20px',
                    }}
                  >
                    {a.extracto}
                  </p>

                  <a
                    href={`/blog/${a.slug}`}
                    className="font-sans font-semibold"
                    style={{ fontSize: '13px', color: '#6A8F7B', textDecoration: 'none', letterSpacing: '0.04em' }}
                  >
                    Leer más →
                  </a>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-14">
            <a
              href="/blog"
              className="btn-shimmer font-sans font-semibold text-white"
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Ver todos los artículos →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

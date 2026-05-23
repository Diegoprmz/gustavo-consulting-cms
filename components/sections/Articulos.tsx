'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const articulos = [
  {
    fecha: 'Abril 2026',
    titulo: 'El cliente como ventaja competitiva sostenible',
    extracto:
      'En un mercado donde los productos se copian y los precios se igualan, la experiencia del cliente se convierte en el único diferenciador verdaderamente difícil de replicar.',
    slug: 'cliente-ventaja-competitiva',
  },
  {
    fecha: 'Marzo 2026',
    titulo: 'Cultura organizacional: el verdadero habilitador de la estrategia',
    extracto:
      'Ninguna estrategia sobrevive si la cultura no la respalda. Cómo lograr que los valores declarados se traduzcan en comportamientos reales de cara al cliente.',
    slug: 'cultura-habilitador-estrategia',
  },
  {
    fecha: 'Febrero 2026',
    titulo: 'Métricas que importan: del NPS a la rentabilidad real',
    extracto:
      'El Net Promoter Score es un punto de partida, no un destino. Los indicadores que conectan genuinamente la satisfacción del cliente con la rentabilidad del negocio.',
    slug: 'metricas-nps-rentabilidad',
  },
];

export default function Articulos() {
  return (
    <section
      style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <AnimatedSection>
          <h2
            className="font-serif text-navy mb-3"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              color: '#243A4D',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Artículos
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <p
            className="font-sans mb-12"
            style={{
              fontSize: '16px',
              color: '#6B7280',
              lineHeight: 1.6,
            }}
          >
            Reflexiones sobre estrategia, cultura y transformación.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articulos.map((a, i) => (
            <AnimatedSection key={a.slug} delay={i * 0.1}>
              <motion.article
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(36,58,77,0.1)' }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-7 cursor-pointer"
                style={{ boxShadow: '0 2px 12px rgba(36,58,77,0.06)' }}
              >
                {/* Date */}
                <p
                  className="font-sans mb-3"
                  style={{ fontSize: '12px', color: '#6B7280' }}
                >
                  {a.fecha}
                </p>

                {/* Title */}
                <h3
                  className="font-sans font-bold text-navy mb-3"
                  style={{
                    fontSize: '20px',
                    color: '#243A4D',
                    lineHeight: 1.4,
                  }}
                >
                  {a.titulo}
                </h3>

                {/* Excerpt */}
                <p
                  className="font-sans mb-5"
                  style={{
                    fontSize: '15px',
                    color: '#333333',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {a.extracto}
                </p>

                {/* Read more */}
                <a
                  href={`/blog/${a.slug}`}
                  className="font-sans font-bold"
                  style={{ fontSize: '14px', color: '#6A8F7B', textDecoration: 'none' }}
                >
                  Leer más →
                </a>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12">
            <motion.a
              href="/blog"
              whileHover={{ backgroundColor: '#6A8F7B' }}
              transition={{ duration: 0.3 }}
              className="inline-block font-sans font-semibold text-white"
              style={{
                backgroundColor: '#243A4D',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '14px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
            >
              VER TODOS LOS ARTÍCULOS →
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

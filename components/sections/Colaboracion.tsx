'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const formas = [
  {
    num: '01',
    titulo: 'Acompañamiento a dirección y consejo',
    descripcion:
      'Presencia continua en decisiones de alto impacto. Trabajo junto a la dirección general y el consejo de administración como contraparte estratégica, integrando la voz del cliente en los momentos donde se define el rumbo de la empresa.',
  },
  {
    num: '02',
    titulo: 'Intervención en procesos de transformación',
    descripcion:
      'Participación activa en proyectos de transformación estratégica, comercial u organizacional. Aporto metodología, estructura y perspectiva externa para acelerar resultados cuando la empresa enfrenta un punto de inflexión o requiere redefinir su propuesta de valor.',
  },
  {
    num: '03',
    titulo: 'Programas de educación ejecutiva',
    descripcion:
      'Diseño e impartición de programas formativos para equipos directivos y de alta dirección. Estos programas combinan marco conceptual riguroso con aplicación práctica inmediata, desarrollando capacidades para liderar la transformación centrada en el cliente.',
  },
];

export default function Colaboracion() {
  return (
    <section
      className="bg-white"
      style={{ paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-8">
        {/* Title */}
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
            Formas de trabajo
          </h2>
        </AnimatedSection>

        {/* Subtitle */}
        <AnimatedSection delay={0.1}>
          <p
            className="font-sans mb-12"
            style={{
              fontSize: '16px',
              color: '#6B7280',
              lineHeight: 1.6,
            }}
          >
            Cada intervención se diseña en función del contexto del negocio.
          </p>
        </AnimatedSection>

        {/* List of formas */}
        <div>
          {formas.map((f, i) => (
            <AnimatedSection key={f.num} delay={i * 0.12}>
              <div
                style={{
                  borderTop: i === 0 ? '1px solid rgba(106,143,123,0.3)' : undefined,
                  borderBottom: '1px solid rgba(106,143,123,0.3)',
                  paddingTop: '40px',
                  paddingBottom: '40px',
                }}
              >
                <div className="flex items-start gap-6 md:gap-8">
                  {/* Number */}
                  <span
                    className="font-sans font-bold flex-shrink-0"
                    style={{ fontSize: '18px', color: '#6A8F7B', minWidth: '32px' }}
                  >
                    {f.num}
                  </span>

                  <div>
                    {/* Title */}
                    <h3
                      className="font-serif text-navy mb-2"
                      style={{
                        fontSize: '22px',
                        color: '#243A4D',
                        lineHeight: 1.3,
                        fontWeight: 600,
                      }}
                    >
                      {f.titulo}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-sans"
                      style={{
                        fontSize: '15px',
                        color: '#333333',
                        lineHeight: 1.7,
                      }}
                    >
                      {f.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

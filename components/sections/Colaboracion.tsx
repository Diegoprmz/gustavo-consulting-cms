'use client';

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
      className="bg-white"
      style={{ paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1000px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <span className="label-olive" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            Formas de trabajo
          </span>
          <div className="olive-divider" style={{ marginTop: '20px', marginBottom: '24px' }} />
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 3.2vw, 40px)',
              color: '#243A4D',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '10px',
            }}
          >
            Formas de trabajo
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, marginBottom: '52px' }}>
            Cada intervención se diseña en función del contexto del negocio.
          </p>
        </AnimatedSection>

        <div>
          {formas.map((f, i) => (
            <AnimatedSection key={f.num} delay={i * 0.12}>
              <div
                style={{
                  borderTop: i === 0 ? '1px solid rgba(106,143,123,0.25)' : undefined,
                  borderBottom: '1px solid rgba(106,143,123,0.25)',
                  paddingTop: '36px',
                  paddingBottom: '36px',
                }}
              >
                <div className="flex items-start gap-7 md:gap-10">
                  <span
                    className="font-serif font-bold flex-shrink-0"
                    style={{ fontSize: '22px', color: '#6A8F7B', minWidth: '36px', lineHeight: 1 }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <h3
                      className="font-serif"
                      style={{ fontSize: '21px', color: '#243A4D', lineHeight: 1.3, fontWeight: 600, marginBottom: '10px' }}
                    >
                      {f.titulo}
                    </h3>
                    <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
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

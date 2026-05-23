'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const dimensiones = [
  {
    num: '01',
    titulo: 'Estrategia',
    descripcion: 'Definición del rumbo con el cliente al centro.',
  },
  {
    num: '02',
    titulo: 'Cultura',
    descripcion: 'Organización alineada en torno al valor entregado.',
  },
  {
    num: '03',
    titulo: 'Operación',
    descripcion: 'Procesos diseñados desde la experiencia, no desde la inercia.',
  },
  {
    num: '04',
    titulo: 'Experiencia',
    descripcion: 'Coherencia en cada punto de contacto.',
  },
  {
    num: '05',
    titulo: 'Métricas',
    descripcion: 'Indicadores que conectan cliente y rentabilidad.',
  },
];

export default function ElEnfoque() {
  return (
    <section
      style={{ backgroundColor: '#243A4D', paddingTop: '80px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Grid — 5 columns desktop / 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
          {dimensiones.map((d, i) => (
            <AnimatedSection key={d.num} delay={i * 0.1}>
              <div
                className="relative md:px-6"
                style={{ paddingTop: '0' }}
              >
                {/* Vertical divider — between columns only */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{
                      width: '1px',
                      backgroundColor: '#6A8F7B',
                      opacity: 0.2,
                    }}
                  />
                )}

                {/* Number */}
                <p
                  className="font-sans font-bold mb-3"
                  style={{ fontSize: '16px', color: '#6A8F7B' }}
                >
                  {d.num}
                </p>

                {/* Title */}
                <p
                  className="font-sans font-bold text-white mb-2"
                  style={{ fontSize: '18px' }}
                >
                  {d.titulo}
                </p>

                {/* Description */}
                <p
                  className="font-sans text-white"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  {d.descripcion}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

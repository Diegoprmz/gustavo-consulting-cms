'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const dimensiones = [
  { num: '01', titulo: 'Estrategia',   descripcion: 'Definición del rumbo con el cliente al centro.' },
  { num: '02', titulo: 'Cultura',      descripcion: 'Organización alineada en torno al valor entregado.' },
  { num: '03', titulo: 'Operación',    descripcion: 'Procesos diseñados desde la experiencia, no desde la inercia.' },
  { num: '04', titulo: 'Experiencia',  descripcion: 'Coherencia en cada punto de contacto.' },
  { num: '05', titulo: 'Métricas',     descripcion: 'Indicadores que conectan cliente y rentabilidad.' },
];

export default function ElEnfoque() {
  return (
    <section
      style={{ backgroundColor: '#243A4D', paddingTop: '72px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Full-width olive separator */}
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(106,143,123,0.25)', marginBottom: '64px' }} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-0">
          {dimensiones.map((d, i) => (
            <AnimatedSection key={d.num} delay={i * 0.1}>
              <div
                className="relative"
                style={{
                  paddingLeft: i === 0 ? '0' : undefined,
                  paddingRight: '24px',
                }}
              >
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{ width: '1px', backgroundColor: '#6A8F7B', opacity: 0.18 }}
                  />
                )}
                <div className="md:px-5">
                  <p className="font-serif font-bold" style={{ fontSize: '28px', color: '#6A8F7B', marginBottom: '12px', lineHeight: 1 }}>
                    {d.num}
                  </p>
                  <p className="font-sans font-bold text-white" style={{ fontSize: '17px', marginBottom: '10px' }}>
                    {d.titulo}
                  </p>
                  <p className="font-sans text-white" style={{ fontSize: '13px', lineHeight: 1.65, opacity: 0.78 }}>
                    {d.descripcion}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const roles = [
  {
    label: 'CONSEJERO CORPORATIVO',
    description:
      'Acompañamiento a consejos de administración y comités directivos en la toma de decisiones estratégicas. Integro la perspectiva del cliente en la agenda del consejo, asegurando que las decisiones de alto nivel estén alineadas con la realidad del mercado.',
  },
  {
    label: 'CONSULTOR EMPRESARIAL',
    description:
      'Diagnóstico y rediseño de la propuesta de valor, modelo de negocio y estrategia comercial. Trabajo directamente con equipos directivos en procesos de transformación, aportando metodología y perspectiva externa para acelerar resultados.',
  },
  {
    label: 'PROFESOR EJECUTIVO',
    description:
      'Diseño e impartición de programas de alta dirección en estrategia centrada en el cliente, liderazgo y transformación organizacional. Colaboro con la Universidad Anáhuac para desarrollar directivos con visión estratégica integrada.',
  },
];

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      style={{
        backgroundColor: '#243A4D',
        paddingTop: '100px',
        paddingBottom: '100px',
        borderTop: '4px solid #6A8F7B',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <AnimatedSection>
          <div style={{ marginBottom: '64px' }}>
            <span className="label-olive" style={{ marginBottom: '18px', display: 'inline-flex' }}>
              Trayectoria profesional
            </span>
            <h2
              className="font-serif text-white"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.2,
                fontWeight: 700,
                maxWidth: '580px',
                marginTop: '16px',
              }}
            >
              Experiencia aplicada en decisiones reales.
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {roles.map((role, i) => (
            <AnimatedSection key={role.label} delay={i * 0.12}>
              <div className="relative md:px-8">
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{ width: '1px', backgroundColor: '#6A8F7B', opacity: 0.22 }}
                  />
                )}
                <div style={{ width: '30px', height: '2px', backgroundColor: '#6A8F7B', marginBottom: '18px' }} />
                <p
                  className="font-sans font-semibold"
                  style={{ fontSize: '11px', color: '#6A8F7B', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: '14px' }}
                >
                  {role.label}
                </p>
                <p className="font-sans text-white" style={{ fontSize: '15px', lineHeight: 1.78, opacity: 0.9 }}>
                  {role.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

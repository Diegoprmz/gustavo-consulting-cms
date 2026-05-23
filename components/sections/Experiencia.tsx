'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';

const roles = [
  {
    label: 'CONSEJERO CORPORATIVO',
    description:
      'Acompañamiento a consejos de administración y comités directivos en la toma de decisiones estratégicas. Integro la perspectiva del cliente en la agenda del consejo, asegurando que las decisiones de alto nivel estén alineadas con la realidad del mercado y la experiencia del cliente.',
  },
  {
    label: 'ASESOR DE NEGOCIOS',
    description:
      'Diagnóstico y rediseño de la propuesta de valor, modelo de negocio y estrategia comercial. Trabajo directamente con equipos directivos en procesos de transformación, aportando metodología, estructura y perspectiva externa para acelerar resultados con el cliente al centro.',
  },
  {
    label: 'FORMADOR EN EDUCACIÓN EJECUTIVA',
    description:
      'Diseño e impartición de programas de alta dirección en temas de estrategia centrada en el cliente, liderazgo y transformación organizacional. Colaboro con instituciones como la Universidad Anáhuac para desarrollar directivos con visión estratégica e integrada.',
  },
];

export default function Experiencia() {
  return (
    <section
      className="bg-navy"
      style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Headline */}
        <AnimatedSection>
          <h2
            className="font-serif text-white mb-16"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.3,
              maxWidth: '640px',
              fontWeight: 700,
            }}
          >
            Experiencia aplicada en decisiones reales.
          </h2>
        </AnimatedSection>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {roles.map((role, i) => (
            <AnimatedSection key={role.label} delay={i * 0.12}>
              <div
                className="relative md:px-8"
                style={{
                  borderLeft: i > 0 ? undefined : undefined,
                }}
              >
                {/* Vertical divider — only show between columns */}
                {i > 0 && (
                  <div
                    className="hidden md:block absolute left-0 top-0 h-full"
                    style={{
                      width: '1px',
                      backgroundColor: '#6A8F7B',
                      opacity: 0.3,
                    }}
                  />
                )}

                <p
                  className="font-sans font-semibold mb-4"
                  style={{
                    fontSize: '12px',
                    color: '#6A8F7B',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {role.label}
                </p>
                <p
                  className="font-sans text-white"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.7,
                    opacity: 0.95,
                  }}
                >
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

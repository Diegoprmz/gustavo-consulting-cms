'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const clientes = [
  {
    nombre: 'ADO',
    sector: 'Transporte y Movilidad',
    descripcion:
      'Acompañamiento estratégico para redefinir la propuesta de valor orientada al pasajero. Trabajo con la dirección general y el consejo en la integración del cliente como eje central de las decisiones operativas y comerciales.',
    impacto: [
      'Redefinición de la propuesta de valor al pasajero',
      'Alineación de cultura organizacional hacia el servicio',
      'Nuevos indicadores de experiencia integrados a la estrategia',
    ],
  },
  {
    nombre: 'Alimás',
    sector: 'Consumo y Distribución',
    descripcion:
      'Intervención en procesos de transformación comercial para centrar la estrategia de crecimiento en las necesidades reales del cliente final. Reestructuración de la propuesta comercial con enfoque en valor percibido.',
    impacto: [
      'Rediseño de la propuesta comercial',
      'Programas de formación directiva en customer centricity',
      'Mejora en métricas de satisfacción y lealtad',
    ],
  },
  {
    nombre: 'Ámarmoc',
    sector: 'Servicios Empresariales',
    descripcion:
      'Consultoría en el rediseño de la experiencia del cliente en puntos de contacto clave. Trabajo con equipos directivos para identificar brechas entre la promesa de valor y la experiencia real del cliente.',
    impacto: [
      'Mapeo y rediseño de journey del cliente',
      'Alineación entre área comercial y operaciones',
      'Indicadores de experiencia integrados al balanced scorecard',
    ],
  },
  {
    nombre: 'The Anglo',
    sector: 'Educación',
    descripcion:
      'Asesoría estratégica para redefinir la propuesta de valor educativa centrada en el alumno y la familia. Acompañamiento a la dirección general en la transformación de la cultura organizacional hacia un enfoque de servicio educativo de alto valor.',
    impacto: [
      'Redefinición de la propuesta de valor educativa',
      'Programas formativos para personal docente y administrativo',
      'Nuevo modelo de experiencia del alumno y la familia',
    ],
  },
];

export default function Resultados() {
  return (
    <main style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#243A4D', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans mb-8"
            style={{ fontSize: '14px', color: '#6A8F7B', textDecoration: 'none' }}
          >
            ← Volver al inicio
          </Link>

          <p
            className="font-sans font-semibold mb-4"
            style={{
              fontSize: '12px',
              color: '#6A8F7B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            RESULTADOS
          </p>

          <h1
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.2,
              fontWeight: 700,
              maxWidth: '640px',
            }}
          >
            Empresas que han confiado en este enfoque
          </h1>

          <p
            className="font-sans text-white mt-5"
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              opacity: 0.9,
              maxWidth: '640px',
            }}
          >
            Cada intervención parte del contexto específico del negocio. Estos son
            algunos de los proyectos donde el enfoque de customer centricity se
            tradujo en transformación estratégica real.
          </p>
        </div>
      </div>

      {/* Client cards */}
      <div
        className="max-w-[1200px] mx-auto px-5 md:px-8"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {clientes.map((c, i) => (
            <motion.div
              key={c.nombre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
              className="bg-white rounded-xl p-8"
              style={{ boxShadow: '0 4px 20px rgba(36,58,77,0.08)' }}
            >
              {/* Sector */}
              <p
                className="font-sans font-semibold mb-2"
                style={{
                  fontSize: '11px',
                  color: '#6A8F7B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {c.sector}
              </p>

              {/* Company name */}
              <h2
                className="font-serif text-navy mb-4"
                style={{
                  fontSize: '28px',
                  color: '#243A4D',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {c.nombre}
              </h2>

              {/* Divider */}
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  backgroundColor: '#6A8F7B',
                  marginBottom: '20px',
                }}
              />

              {/* Description */}
              <p
                className="font-sans mb-6"
                style={{ fontSize: '15px', color: '#333333', lineHeight: 1.7 }}
              >
                {c.descripcion}
              </p>

              {/* Impact */}
              <ul className="space-y-2">
                {c.impacto.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans"
                    style={{ fontSize: '14px', color: '#333333', lineHeight: 1.5 }}
                  >
                    <span style={{ color: '#6A8F7B', fontWeight: 700, flexShrink: 0 }}>
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/#conversemos"
            className="inline-block font-sans font-semibold text-white"
            style={{
              backgroundColor: '#243A4D',
              padding: '16px 32px',
              borderRadius: '6px',
              fontSize: '14px',
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            CONVERSEMOS →
          </Link>
        </div>
      </div>
    </main>
  );
}

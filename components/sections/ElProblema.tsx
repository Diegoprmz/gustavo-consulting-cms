'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const dimensiones = [
  { num: '01', titulo: 'Estrategia',  descripcion: 'Definición del rumbo con el cliente al centro.' },
  { num: '02', titulo: 'Cultura',     descripcion: 'Organización alineada en torno al valor entregado.' },
  { num: '03', titulo: 'Operación',   descripcion: 'Procesos diseñados desde la experiencia, no desde la inercia.' },
  { num: '04', titulo: 'Experiencia', descripcion: 'Coherencia en cada punto de contacto.' },
  { num: '05', titulo: 'Métricas',    descripcion: 'Indicadores que conectan cliente y rentabilidad.' },
];

function DimensionCard({ num, titulo, descripcion }: { num: string; titulo: string; descripcion: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: hovered ? '#0D2E5C' : 'rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.35)' : '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <span style={{
        display: 'block',
        fontSize: '44px',
        color: '#C9A84C',
        fontWeight: 800,
        fontFamily: 'Georgia, serif',
        lineHeight: 1,
        marginBottom: '18px',
      }}>
        {num}
      </span>

      <h3 style={{
        fontSize: '24px',
        fontWeight: 700,
        fontFamily: 'Georgia, serif',
        lineHeight: 1.3,
        margin: '0 0 12px 0',
        color: '#ffffff',
      }}>
        {titulo}
      </h3>

      <p style={{
        fontSize: '16px',
        lineHeight: 1.8,
        fontWeight: 500,
        margin: 0,
        color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
        transition: 'color 0.3s ease',
      }}>
        {descripcion}
      </p>
    </div>
  );
}

export default function ElProblema() {
  return (
    <section
      id="enfoque"
      style={{
        backgroundColor: '#243A4D',
        paddingTop: '100px',
        paddingBottom: '100px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Header */}
        <AnimatedSection delay={0.1}>
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 50px)',
              lineHeight: 1.18,
              fontWeight: 700,
              maxWidth: '800px',
              marginTop: '16px',
            }}
          >
            <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Customer Centricity</span>
            {': '}
            <span style={{ fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              Cinco dimensiones que deben alinearse
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p
            className="font-sans text-white"
            style={{ fontSize: '17px', lineHeight: 1.82, opacity: 0.72, maxWidth: '660px', marginTop: '28px', marginBottom: '64px' }}
          >
            Cinco dimensiones del negocio deben alinearse para convertir al cliente
            en el motor real de la rentabilidad: estrategia, cultura, operación,
            experiencia y métricas.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {dimensiones.map((d, i) => (
            <AnimatedSection key={d.num} delay={0.1 + i * 0.08} className="h-full">
              <DimensionCard {...d} />
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}

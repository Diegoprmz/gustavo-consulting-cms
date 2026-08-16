'use client';

import { useState } from 'react';

type Item = { title: string; detail?: string };
type Category = { key: string; label: string; count: string; items: Item[] };

const CATEGORIES: Category[] = [
  {
    key: 'academica',
    label: 'Formación académica',
    count: '3 grados',
    items: [
      { title: 'Licenciatura en Administración de Empresas', detail: 'ITAM' },
      { title: 'Maestría en Administración', detail: 'ITAM · especialidad en Dirección General' },
      {
        title: 'Doctorado en Innovación en Responsabilidad Social y Sostenibilidad',
        detail: 'Universidad Anáhuac · egresado',
      },
    ],
  },
  {
    key: 'diplomados',
    label: 'Diplomados y especialidades',
    count: '3 programas',
    items: [
      { title: 'Especialidad en Dirección General', detail: 'ITAM' },
      { title: 'Diplomado en Mercadotecnia' },
      { title: 'Diplomado en Calidad Gerencial' },
    ],
  },
  {
    key: 'seminarios',
    label: 'Seminarios internacionales',
    count: 'SEMINARIUM · WOBI · Executive Workshops',
    items: [
      { title: 'Customer Centricity', detail: 'con Don Peppers' },
      { title: 'Competitive Strategy — Three Circle Model' },
      { title: 'Strategic Thinking — Create Value' },
      { title: 'Innovation Strategy & Management' },
      { title: 'Strategic Talent Management' },
      { title: 'Digital Mindset' },
      { title: 'Grow by Focusing on What Matters' },
      { title: 'Cracked It — How to solve big problems and sell the solutions' },
      { title: 'Innovación y Estrategia', detail: 'con Gary Hamel' },
      { title: 'Innovation for Growth', detail: 'con Guy Kawasaki' },
      { title: 'Creativity', detail: 'con Seth Godin' },
      { title: 'Emotional Intelligence', detail: 'con Daniel Goleman' },
      { title: 'Leadership', detail: 'con Carly Fiorina' },
      { title: 'Self Management', detail: 'con Marshall Goldsmith' },
      { title: 'Customer Experience Strategy', detail: 'con Martin Lindstrom' },
      { title: 'Digital Future', detail: 'con Nicholas Negroponte' },
      { title: 'Programas ejecutivos en Stanford, Kellogg, Notre Dame, Georgetown, McGill y Deusto' },
    ],
  },
  {
    key: 'certificaciones',
    label: 'Certificaciones',
    count: '3 certificaciones',
    items: [
      { title: 'Certified Customer Service Trainer (CCST)', detail: 'Service Quality Institute' },
      { title: 'Certified Customer Service Leader (CCSL)', detail: 'Service Quality Institute' },
      {
        title: 'Speaker profesional certificado',
        detail: 'LATAM Speakers Association · Global Speakers Federation',
      },
    ],
  },
  {
    key: 'coaching',
    label: 'Coaching',
    count: '2 certificados',
    items: [
      { title: 'Habilidades de coaching para líderes y gerentes' },
      { title: 'Cómo hacer coaching a tu personal para obtener resultados' },
    ],
  },
  {
    key: 'consejeria',
    label: 'Consejería profesional',
    count: 'Consejero certificado',
    items: [
      {
        title: 'Programa de Desarrollo para Consejeros Profesionales Independientes',
        detail: 'Universidad Anáhuac · 2022',
      },
      {
        title: 'Miembro del Colegio Nacional de Consejeros Profesionales Independientes de Empresas, A.C.',
      },
    ],
  },
];

export default function CredentialsAccordion() {
  const [open, setOpen] = useState<string | null>(CATEGORIES[0].key);

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {CATEGORIES.map((cat) => {
        const isOpen = open === cat.key;
        return (
          <div
            key={cat.key}
            style={{
              borderBottom: '1px solid rgba(36,58,77,0.12)',
              backgroundColor: isOpen ? '#ffffff' : 'transparent',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : cat.key)}
              aria-expanded={isOpen}
              className="font-sans"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '26px 8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  className="font-serif"
                  style={{ fontSize: 'clamp(19px, 2.1vw, 24px)', fontWeight: 700, color: '#243A4D', lineHeight: 1.2 }}
                >
                  {cat.label}
                </span>
                <span
                  className="font-sans font-semibold"
                  style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                >
                  {cat.count}
                </span>
              </span>
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1.5px solid #6A8F7B',
                  color: '#6A8F7B',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '18px',
                  lineHeight: 1,
                  transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  backgroundColor: isOpen ? '#6A8F7B' : 'transparent',
                  ...(isOpen ? { color: '#ffffff' } : {}),
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.35s ease',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '0 8px 30px' }}>
                  {cat.items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '12px 0',
                        borderTop: i === 0 ? '1px solid rgba(106,143,123,0.18)' : '1px solid rgba(106,143,123,0.10)',
                      }}
                    >
                      <span aria-hidden style={{ color: '#C9A84C', fontSize: '15px', lineHeight: 1.6, flexShrink: 0 }}>
                        ◆
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className="font-sans" style={{ fontSize: '16px', color: '#243A4D', lineHeight: 1.5, fontWeight: 500 }}>
                          {item.title}
                        </span>
                        {item.detail && (
                          <span className="font-sans" style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                            {item.detail}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

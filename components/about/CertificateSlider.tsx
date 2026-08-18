'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { EffectCoverflow, Navigation, Pagination, Keyboard, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';

type Cert = { src: string; title: string; sub?: string; tag: Tag };
type Tag =
  | 'Grado académico'
  | 'Diplomado'
  | 'Seminario internacional'
  | 'Certificación'
  | 'Coaching'
  | 'Consejería';

// Orden por categoría: cada tag es contiguo, para que el filtro salte a su inicio.
const CERTS: Cert[] = [
  { src: 'licenciatura-itam', title: 'Licenciatura en Administración de Empresas', sub: 'ITAM · 1999', tag: 'Grado académico' },
  { src: 'maestria-itam', title: 'Maestría en Administración', sub: 'ITAM · Dirección General · 1999', tag: 'Grado académico' },
  { src: 'diplomado-mercadotecnia', title: 'Diplomado en Mercadotecnia', sub: 'UNAM · Facultad de Contaduría y Administración', tag: 'Diplomado' },
  { src: 'diplomado-calidad', title: 'Diplomado en Calidad Gerencial', sub: 'UNAM · Facultad de Contaduría y Administración', tag: 'Diplomado' },
  { src: 'stanford-design-thinking', title: 'Design Thinking Workshop', sub: 'Stanford Center for Professional Development', tag: 'Seminario internacional' },
  { src: 'kellogg-business-innovation', title: 'Business Innovation', sub: 'Kellogg School of Management', tag: 'Seminario internacional' },
  { src: 'seminarium-marketing', title: 'Seminarium on Marketing', sub: 'SEMINARIUM · IESE Business School', tag: 'Seminario internacional' },
  { src: 'seminarium-talent', title: 'Strategic Talent Management', sub: 'SEMINARIUM · Michigan Ross', tag: 'Seminario internacional' },
  { src: 'seminarium-grow', title: 'Grow by Focusing on What Matters', sub: 'SEMINARIUM · Competitive Strategy in 3 Circles', tag: 'Seminario internacional' },
  { src: 'seminarium-innovation', title: 'Innovation Strategy & Management', sub: 'SEMINARIUM · Kellogg', tag: 'Seminario internacional' },
  { src: 'seminarium-strategic-thinking', title: 'Strategic Thinking — Create Value', sub: 'SEMINARIUM · Emory University', tag: 'Seminario internacional' },
  { src: 'seminarium-customer-centricity', title: 'Customer Centricity', sub: 'SEMINARIUM · Kellogg', tag: 'Seminario internacional' },
  { src: 'seminarium-competitive-strategy', title: 'Competitive Strategy — Three-Circle Model', sub: 'SEMINARIUM · Huntsman School of Business', tag: 'Seminario internacional' },
  { src: 'seminarium-digital-mindset', title: 'Digital Mindset', sub: 'SEMINARIUM', tag: 'Seminario internacional' },
  { src: 'seminarium-cracked-it', title: 'Cracked It — Solve big problems and sell the solutions', sub: 'SEMINARIUM', tag: 'Seminario internacional' },
  { src: 'seminarium-innovacion', title: 'Innovación y Estrategia — Breakthroughs by Design', sub: 'SEMINARIUM', tag: 'Seminario internacional' },
  { src: 'wobi-customer-centricity', title: 'WOBI on Customer Centricity', sub: 'con Don Peppers · 2020', tag: 'Seminario internacional' },
  { src: 'wobi-innovation', title: 'WOBI on Innovation', sub: 'con Gary Hamel · 2021', tag: 'Seminario internacional' },
  { src: 'wobi-creativity', title: 'WOBI on Marketing & Creativity', sub: 'con Seth Godin · 2021', tag: 'Seminario internacional' },
  { src: 'wobi-leadership', title: 'WOBI on Leadership', sub: 'con Carly Fiorina · 2021', tag: 'Seminario internacional' },
  { src: 'wobi-strategy-innovation', title: 'WOBI on Strategy and Innovation', sub: 'con Nathan Furr · 2022', tag: 'Seminario internacional' },
  { src: 'wobi-digital-future', title: 'WOBI on Digital Future', sub: 'con Nicholas Negroponte · 2022', tag: 'Seminario internacional' },
  { src: 'wobi-cx-strategy', title: 'WOBI on Customer Experience Strategy', sub: 'con Martin Lindstrom · 2022', tag: 'Seminario internacional' },
  { src: 'wobi-inclusive-leadership', title: 'WOBI on Inclusive Leadership', sub: 'con Francesca Gino · 2022', tag: 'Seminario internacional' },
  { src: 'wobi-strategy-management', title: 'WOBI on Strategy & Management', sub: 'con Roger Martin · 2022', tag: 'Seminario internacional' },
  { src: 'wobi-creative-leadership', title: 'WOBI on Creative Leadership', sub: 'con Kevin Roberts · 2023', tag: 'Seminario internacional' },
  { src: 'wobi-self-management', title: 'WOBI on Self-Management', sub: 'con Marshall Goldsmith · 2023', tag: 'Seminario internacional' },
  { src: 'notredame-senior-pm', title: 'Senior Project Management', sub: 'University of Notre Dame · Mendoza', tag: 'Seminario internacional' },
  { src: 'notredame-advanced-pm', title: 'Advanced Project Management', sub: 'University of Notre Dame · Mendoza', tag: 'Seminario internacional' },
  { src: 'ccst-service-quality', title: 'Certified Customer Service Trainer (CCST)', sub: 'Service Quality Institute · 2018', tag: 'Certificación' },
  { src: 'ccsl-service-quality', title: 'Certified Customer Service Leader (CCSL)', sub: 'Service Quality Institute · 2018', tag: 'Certificación' },
  { src: 'coaching-lideres', title: 'Habilidades de coaching para líderes y gerentes', sub: 'Certificado', tag: 'Coaching' },
  { src: 'coaching-personal', title: 'Cómo hacer coaching a tu personal para obtener resultados', sub: 'Certificado', tag: 'Coaching' },
  { src: 'consejeria-cncpie', title: 'Consejero Profesional Independiente', sub: 'Universidad Anáhuac · CNCPIE · 2022', tag: 'Consejería' },
];

const TAG_STYLE: Record<Tag, { text: string; tint: string; dot: string }> = {
  'Grado académico': { text: '#243A4D', tint: 'rgba(36,58,77,0.10)', dot: '#243A4D' },
  Diplomado: { text: '#3D5C4A', tint: 'rgba(106,143,123,0.18)', dot: '#6A8F7B' },
  'Seminario internacional': { text: '#8A6D1F', tint: 'rgba(201,168,76,0.20)', dot: '#C9A84C' },
  Certificación: { text: '#3D5C4A', tint: 'rgba(61,92,74,0.14)', dot: '#3D5C4A' },
  Coaching: { text: '#8A6438', tint: 'rgba(176,132,66,0.16)', dot: '#B08442' },
  Consejería: { text: '#3E5871', tint: 'rgba(91,123,154,0.16)', dot: '#5B7B9A' },
};

const CATEGORIES = ['Grado académico', 'Diplomado', 'Seminario internacional', 'Certificación', 'Coaching', 'Consejería'] as Tag[];

const url = (src: string) => `/assets/certificados/${src}.jpg`;

function TagBadge({ tag, small }: { tag: Tag; small?: boolean }) {
  const s = TAG_STYLE[tag];
  return (
    <span
      className="font-sans font-semibold"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: small ? '10px' : '11px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: s.text,
        backgroundColor: s.tint,
        padding: small ? '4px 9px' : '5px 11px',
        borderRadius: '100px',
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.dot }} />
      {tag}
    </span>
  );
}

export default function CertificateSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeCat, setActiveCat] = useState<Tag>(CERTS[0].tag);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = lightbox !== null;

  // Índice y conteo de cada categoría (para la barra de filtros).
  const cats = useMemo(() => {
    const first: Partial<Record<Tag, number>> = {};
    const count: Record<Tag, number> = {
      'Grado académico': 0, Diplomado: 0, 'Seminario internacional': 0, Certificación: 0, Coaching: 0, Consejería: 0,
    };
    CERTS.forEach((c, i) => {
      if (first[c.tag] === undefined) first[c.tag] = i;
      count[c.tag] += 1;
    });
    return CATEGORIES.map((tag) => ({ tag, index: first[tag]!, count: count[tag] }));
  }, []);

  const goTo = useCallback((index: number, tag: Tag) => {
    swiperRef.current?.slideTo(index);
    setActiveCat(tag);
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <div className="cert-slider">
      {/* Filtros */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '36px' }}>
        <span
          className="font-sans font-semibold"
          style={{ fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.12em', textTransform: 'uppercase', alignSelf: 'center', marginRight: '4px' }}
        >
          Filtros
        </span>
        {cats.map(({ tag, index, count }) => {
          const isActive = activeCat === tag;
          const s = TAG_STYLE[tag];
          return (
            <button
              key={tag}
              type="button"
              onClick={() => goTo(index, tag)}
              aria-pressed={isActive}
              className="font-sans font-semibold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '12px',
                padding: '9px 15px',
                borderRadius: '100px',
                cursor: 'pointer',
                border: `1px solid ${isActive ? s.dot : 'rgba(36,58,77,0.16)'}`,
                backgroundColor: isActive ? s.dot : 'transparent',
                color: isActive ? '#ffffff' : '#243A4D',
                transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#ffffff' : s.dot,
                }}
              />
              {tag}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>{count}</span>
            </button>
          );
        })}
      </div>

      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveCat(CERTS[s.activeIndex]?.tag ?? activeCat)}
        modules={[EffectCoverflow, Navigation, Pagination, Keyboard]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        spaceBetween={24}
        grabCursor
        keyboard={{ enabled: true }}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: false }}
        style={{ padding: '10px 0 8px' }}
      >
        {CERTS.map((cert, i) => (
          <SwiperSlide key={cert.src} style={{ width: 'min(420px, 78vw)' }}>
            <button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Ampliar: ${cert.title}`}
              style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
            >
              <span style={{ display: 'block', backgroundColor: '#ffffff', borderRadius: '10px', padding: '14px', boxShadow: '0 14px 40px rgba(36,58,77,0.16)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url(cert.src)} alt={cert.title} loading="lazy" style={{ width: '100%', height: '300px', objectFit: 'contain', display: 'block' }} />
              </span>
              <span style={{ display: 'block', textAlign: 'center', marginTop: '16px', padding: '0 8px' }}>
                <TagBadge tag={cert.tag} />
                <span className="font-serif" style={{ display: 'block', fontSize: '17px', fontWeight: 700, color: '#243A4D', lineHeight: 1.3, marginTop: '10px' }}>
                  {cert.title}
                </span>
                {cert.sub && (
                  <span className="font-sans" style={{ display: 'block', fontSize: '13px', color: '#6B7280', marginTop: '5px' }}>
                    {cert.sub}
                  </span>
                )}
              </span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="font-sans" style={{ textAlign: 'center', fontSize: '12px', color: '#9CA3AF', marginTop: '10px' }}>
        {CERTS.length} documentos · haz clic en cualquiera para ampliarlo
      </p>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,30,40,0.94)', display: 'flex', flexDirection: 'column' }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            style={{
              position: 'absolute', top: '20px', right: '24px', zIndex: 1002, width: '44px', height: '44px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '22px', cursor: 'pointer',
            }}
          >
            ✕
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, minHeight: 0 }}>
            <Swiper
              modules={[Navigation, Zoom, Keyboard]}
              initialSlide={lightbox}
              navigation
              zoom={{ maxRatio: 3 }}
              keyboard={{ enabled: true }}
              spaceBetween={40}
              style={{ height: '100%' }}
            >
              {CERTS.map((cert) => (
                <SwiperSlide key={cert.src} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="swiper-zoom-container" style={{ flex: 1, minHeight: 0, padding: '64px 16px 8px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url(cert.src)} alt={cert.title} style={{ objectFit: 'contain' }} />
                  </div>
                  <p className="font-sans" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '15px', padding: '10px 16px 28px' }}>
                    <strong style={{ fontWeight: 600 }}>{cert.title}</strong>
                    {cert.sub ? ` · ${cert.sub}` : ''}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <p className="font-sans" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '12px', paddingBottom: '16px' }}>
            Doble clic para acercar · Esc para cerrar
          </p>
        </div>
      )}

      <style jsx global>{`
        .cert-slider .swiper-button-next,
        .cert-slider .swiper-button-prev {
          color: #243a4d;
          background: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 6px 18px rgba(36, 58, 77, 0.18);
        }
        .cert-slider .swiper-button-next::after,
        .cert-slider .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 700;
        }
        .cert-slider .swiper-pagination-bullet-active {
          background: #6a8f7b;
        }
      `}</style>
    </div>
  );
}

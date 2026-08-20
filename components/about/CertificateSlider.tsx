'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Keyboard, Zoom } from 'swiper/modules';

import InstitutionLogos from '@/components/about/InstitutionLogos';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';

type Tag = 'Grado académico' | 'Diplomado' | 'Seminario internacional' | 'Certificación' | 'Coaching' | 'Consejería';
type Doc = { src: string; title: string; tag: Tag };
type Row = Doc | { sep: string };

const D = (src: string, title: string, tag: Tag): Doc => ({ src, title, tag });

const ACADEMICO: Doc[] = [
  D('licenciatura-itam', 'Licenciatura en Administración de Empresas', 'Grado académico'),
  D('maestria-itam', 'Maestría en Administración', 'Grado académico'),
];
const DIPLOMADOS: Doc[] = [
  D('diplomado-mercadotecnia', 'Diplomado en Mercadotecnia', 'Diplomado'),
  D('diplomado-calidad', 'Diplomado en Calidad Gerencial', 'Diplomado'),
];
const SEMINARIUM: Doc[] = [
  D('seminarium-marketing', 'Seminarium on Marketing', 'Seminario internacional'),
  D('seminarium-customer-centricity', 'Customer Centricity', 'Seminario internacional'),
  D('seminarium-strategic-thinking', 'Strategic Thinking — Create Value', 'Seminario internacional'),
  D('seminarium-competitive-strategy', 'Competitive Strategy — Three-Circle Model', 'Seminario internacional'),
  D('seminarium-innovation', 'Innovation Strategy & Management', 'Seminario internacional'),
  D('seminarium-talent', 'Strategic Talent Management', 'Seminario internacional'),
  D('seminarium-grow', 'Grow by Focusing on What Matters', 'Seminario internacional'),
  D('seminarium-digital-mindset', 'Digital Mindset', 'Seminario internacional'),
  D('seminarium-cracked-it', 'Cracked It', 'Seminario internacional'),
  D('seminarium-innovacion', 'Innovación y Estrategia', 'Seminario internacional'),
];
const WOBI: Doc[] = [
  D('wobi-customer-centricity', 'WOBI on Customer Centricity', 'Seminario internacional'),
  D('wobi-innovation', 'WOBI on Innovation', 'Seminario internacional'),
  D('wobi-creativity', 'WOBI on Marketing & Creativity', 'Seminario internacional'),
  D('wobi-leadership', 'WOBI on Leadership', 'Seminario internacional'),
  D('wobi-strategy-innovation', 'WOBI on Strategy and Innovation', 'Seminario internacional'),
  D('wobi-digital-future', 'WOBI on Digital Future', 'Seminario internacional'),
  D('wobi-cx-strategy', 'WOBI on Customer Experience Strategy', 'Seminario internacional'),
  D('wobi-inclusive-leadership', 'WOBI on Inclusive Leadership', 'Seminario internacional'),
  D('wobi-strategy-management', 'WOBI on Strategy & Management', 'Seminario internacional'),
  D('wobi-creative-leadership', 'WOBI on Creative Leadership', 'Seminario internacional'),
  D('wobi-self-management', 'WOBI on Self-Management', 'Seminario internacional'),
];
const OTROS: Doc[] = [
  D('stanford-design-thinking', 'Design Thinking Workshop — Stanford', 'Seminario internacional'),
  D('kellogg-business-innovation', 'Business Innovation — Kellogg', 'Seminario internacional'),
  D('notredame-senior-pm', 'Senior Project Management — Notre Dame', 'Seminario internacional'),
  D('notredame-advanced-pm', 'Advanced Project Management — Notre Dame', 'Seminario internacional'),
];
const CERT_PROF: Doc[] = [
  D('ccst-service-quality', 'Certified Customer Service Trainer (CCST)', 'Certificación'),
  D('ccsl-service-quality', 'Certified Customer Service Leader (CCSL)', 'Certificación'),
];
const COACHING: Doc[] = [
  D('coaching-lideres', 'Habilidades de coaching para líderes y gerentes', 'Coaching'),
  D('coaching-personal', 'Cómo hacer coaching a tu personal para obtener resultados', 'Coaching'),
];
const CONSEJERIA: Doc[] = [D('consejeria-cncpie', 'Consejero Profesional Independiente', 'Consejería')];

const SEMINARIOS: Row[] = [
  { sep: 'SEMINARIUM' }, ...SEMINARIUM,
  { sep: 'WOBI' }, ...WOBI,
  { sep: 'Otros programas' }, ...OTROS,
];

// Lista plana de TODOS los documentos para el lightbox.
const ALL: Doc[] = [...ACADEMICO, ...DIPLOMADOS, ...SEMINARIUM, ...WOBI, ...OTROS, ...CERT_PROF, ...COACHING, ...CONSEJERIA];

const TAG_STYLE: Record<Tag, { text: string; tint: string; dot: string }> = {
  'Grado académico': { text: '#243A4D', tint: 'rgba(36,58,77,0.10)', dot: '#243A4D' },
  Diplomado: { text: '#3D5C4A', tint: 'rgba(106,143,123,0.18)', dot: '#6A8F7B' },
  'Seminario internacional': { text: '#8A6D1F', tint: 'rgba(201,168,76,0.20)', dot: '#C9A84C' },
  Certificación: { text: '#3D5C4A', tint: 'rgba(61,92,74,0.14)', dot: '#3D5C4A' },
  Coaching: { text: '#8A6438', tint: 'rgba(176,132,66,0.16)', dot: '#B08442' },
  Consejería: { text: '#3E5871', tint: 'rgba(91,123,154,0.16)', dot: '#5B7B9A' },
};

const url = (src: string) => `/assets/certificados/${src}.jpg`;
const isSep = (r: Row): r is { sep: string } => 'sep' in r;

function TagBadge({ tag }: { tag: Tag }) {
  const s = TAG_STYLE[tag];
  return (
    <span
      className="font-sans font-semibold"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: s.text, backgroundColor: s.tint, padding: '4px 10px', borderRadius: '100px' }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: s.dot }} />
      {tag}
    </span>
  );
}

/** Marco negro con bisel plateado, pegado a los bordes reales de la imagen. */
function FramedSlide({ doc, onOpen }: { doc: Doc; onOpen: (src: string) => void }) {
  return (
    <button type="button" onClick={() => onOpen(doc.src)} aria-label={`Ampliar: ${doc.title}`} className="fslide">
      <span className="bframe">
        <span className="bevel">
          <span className="blackmat">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url(doc.src)} alt={doc.title} loading="lazy" />
          </span>
        </span>
      </span>
      <span style={{ display: 'block', textAlign: 'center', marginTop: '18px' }}>
        <TagBadge tag={doc.tag} />
        <span className="font-serif" style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: '#243A4D', lineHeight: 1.3, marginTop: '10px', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
          {doc.title}
        </span>
      </span>
    </button>
  );
}

function Separator({ label }: { label: string }) {
  return (
    <span className="sep">
      <span className="sep-line" />
      <span className="font-serif sep-txt">{label}</span>
      <span className="sep-line" />
    </span>
  );
}

function Carousel({ title, rows, onOpen }: { title: string; rows: Row[]; onOpen: (src: string) => void }) {
  return (
    <div style={{ marginBottom: '72px' }}>
      <h3 className="font-serif" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, color: '#243A4D', textAlign: 'center', marginBottom: '32px' }}>
        {title}
      </h3>
      <Swiper
        modules={[EffectCoverflow, Navigation, Keyboard]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        spaceBetween={28}
        grabCursor
        keyboard={{ enabled: true }}
        navigation
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 110, modifier: 2, slideShadows: false }}
        style={{ padding: '10px 0' }}
      >
        {rows.map((r, i) =>
          isSep(r) ? (
            <SwiperSlide key={`sep-${i}`} style={{ width: 'auto' }}>
              <Separator label={r.sep} />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={r.src} style={{ width: 'auto' }}>
              <FramedSlide doc={r} onOpen={onOpen} />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
}

export default function CertificateSlider() {
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const open = openSrc !== null;
  const startIndex = useMemo(() => (openSrc ? Math.max(0, ALL.findIndex((d) => d.src === openSrc)) : 0), [openSrc]);
  const close = useCallback(() => setOpenSrc(null), []);

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
    <div className="cred">
      <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trayectoria personal</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Estudios</h2>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '640px', margin: '18px auto 0' }}>
              Formación continua durante más de tres décadas en las principales escuelas de negocio del mundo.
            </p>
          </div>
          <Carousel title="Formación académica" rows={ACADEMICO} onOpen={setOpenSrc} />
          <Carousel title="Diplomados" rows={DIPLOMADOS} onOpen={setOpenSrc} />
          <Carousel title="Seminarios internacionales" rows={SEMINARIOS} onOpen={setOpenSrc} />
          <InstitutionLogos />
        </div>
      </section>

      <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Acreditaciones profesionales</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Certificaciones</h2>
          </div>
          <Carousel title="Certificaciones profesionales" rows={CERT_PROF} onOpen={setOpenSrc} />
          <Carousel title="Coaching" rows={COACHING} onOpen={setOpenSrc} />
          <Carousel title="Consejería" rows={CONSEJERIA} onOpen={setOpenSrc} />
        </div>
      </section>

      {open && (
        <div role="dialog" aria-modal="true" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,30,40,0.94)', display: 'flex', flexDirection: 'column' }}>
          <button type="button" onClick={close} aria-label="Cerrar" style={{ position: 'absolute', top: '20px', right: '24px', zIndex: 1002, width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
          <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, minHeight: 0 }}>
            <Swiper modules={[Navigation, Zoom, Keyboard]} initialSlide={startIndex} navigation zoom={{ maxRatio: 3 }} keyboard={{ enabled: true }} spaceBetween={40} style={{ height: '100%' }}>
              {ALL.map((doc) => (
                <SwiperSlide key={doc.src} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="swiper-zoom-container" style={{ flex: 1, minHeight: 0, padding: '64px 16px 8px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url(doc.src)} alt={doc.title} style={{ objectFit: 'contain' }} />
                  </div>
                  <p className="font-sans" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '15px', padding: '10px 16px 28px' }}>{doc.title}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <p className="font-sans" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '12px', paddingBottom: '16px' }}>Doble clic para acercar · Esc para cerrar</p>
        </div>
      )}

      <style jsx global>{`
        .cred .fslide { display:block; border:none; padding:0; background:none; cursor:zoom-in; }
        /* Marco pegado a la imagen: alto fijo, ancho según la proporción real del certificado */
        .cred .bframe { display:inline-block; padding:16px; border-radius:2px;
          background:linear-gradient(160deg,#2c2c2c,#0b0b0b 62%);
          box-shadow: inset 0 2px 2px rgba(255,255,255,.14), inset 0 -3px 6px rgba(0,0,0,.6), 0 30px 55px -18px rgba(0,0,0,.55); }
        .cred .bevel { display:block; padding:5px; border-radius:1px;
          background:linear-gradient(135deg,#eff1f3 0%,#a9abb0 36%,#f7f8fa 52%,#7c7e84 68%,#cccdd2 100%);
          box-shadow: inset 0 1px 2px rgba(255,255,255,.7); }
        .cred .blackmat { display:block; padding:12px; background:#0a0a0a; box-shadow: inset 0 2px 7px rgba(0,0,0,.75); }
        .cred .blackmat img { display:block; height:290px; width:auto; box-shadow:0 1px 4px rgba(0,0,0,.5); }
        .cred .sep { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; height:322px; width:96px; }
        .cred .sep-line { width:1.5px; flex:1; background:linear-gradient(#C9A84C, rgba(201,168,76,0)); }
        .cred .sep-line:last-child { background:linear-gradient(rgba(201,168,76,0), #C9A84C); }
        .cred .sep-txt { writing-mode:vertical-rl; text-orientation:mixed; transform:rotate(180deg); font-size:15px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:#8A6D1F; }
        .cred .swiper-button-next, .cred .swiper-button-prev { color:#243a4d; background:#fff; width:44px; height:44px; border-radius:50%; box-shadow:0 6px 18px rgba(36,58,77,.18); }
        .cred .swiper-button-next::after, .cred .swiper-button-prev::after { font-size:15px; font-weight:700; }
      `}</style>
    </div>
  );
}

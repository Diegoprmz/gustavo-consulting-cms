'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import InstitutionLogos from '@/components/about/InstitutionLogos';
import { ThreeDImageRing, type ThreeDImageRingHandle } from '@/components/lightswind/draggable-3d-image-ring';
import {
  ACADEMICO, DIPLOMADOS, SEMINARIOS, CERT_PROF, COACHING, CONSEJERIA,
  TAG_STYLE, certUrl, type Doc, type Tag,
} from '@/components/about/certificates-data';

const FRAME = '#3A3A3A';
const ESTUDIOS: Doc[] = [...ACADEMICO, ...DIPLOMADOS, ...SEMINARIOS];
const CERTIFICACIONES: Doc[] = [...CERT_PROF, ...COACHING, ...CONSEJERIA];
const ESTUDIOS_TAGS: Tag[] = ['Grado académico', 'Diplomado', 'Seminario internacional'];
const CERTIFICACIONES_TAGS: Tag[] = ['Certificación', 'Coaching', 'Consejería'];

function TagBadge({ tag, big }: { tag: Tag; big?: boolean }) {
  const s = TAG_STYLE[tag];
  return (
    <span
      className="font-sans font-semibold"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: big ? '13px' : '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: s.text, backgroundColor: s.tint, padding: big ? '7px 16px' : '4px 10px', borderRadius: '100px' }}
    >
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: s.dot }} />
      {tag}
    </span>
  );
}

function FilterChips({ tags, value, onChange }: { tags: Tag[]; value: Tag | 'Todos'; onChange: (v: Tag | 'Todos') => void }) {
  const options: Array<Tag | 'Todos'> = ['Todos', ...tags];
  return (
    <div className="filterchips">
      {options.map((f) => {
        const active = f === value;
        const s = f === 'Todos' ? { text: '#243A4D', tint: 'rgba(36,58,77,0.08)', dot: '#243A4D' } : TAG_STYLE[f];
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            className="chip font-sans"
            style={{ color: active ? '#fff' : s.text, backgroundColor: active ? s.dot : s.tint, borderColor: active ? s.dot : 'transparent' }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: active ? '#fff' : s.dot }} />
            {f}
          </button>
        );
      })}
    </div>
  );
}

/** Certificado único, sin ring (no tiene sentido girar un solo elemento). */
function SingleFrame({ doc, onOpen }: { doc: Doc; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} aria-label={`Ampliar: ${doc.title}`} className="fslide">
      <span className="ringmat" style={{ ['--frame-c' as string]: FRAME }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={certUrl(doc.src)} alt={doc.title} style={{ height: '640px' }} />
      </span>
    </button>
  );
}

const ZOOM_STEPS = [1, 1.8, 3];

/* ─── Desktop lightbox ─────────────────────────────────────────────────────── */
function Lightbox({ docs, startIndex, onClose }: { docs: Doc[]; startIndex: number; onClose: () => void }) {
  const [i, setI] = useState(startIndex);
  const [zoomStep, setZoomStep] = useState(0);
  const pan = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const doc = docs[i];
  const zoom = ZOOM_STEPS[zoomStep];
  const next = useCallback(() => { setI((v) => (v + 1) % docs.length); setZoomStep(0); }, [docs.length]);
  const prev = useCallback(() => { setI((v) => (v - 1 + docs.length) % docs.length); setZoomStep(0); }, [docs.length]);

  useEffect(() => { setI(startIndex); setZoomStep(0); }, [startIndex]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && zoom === 1) next();
      if (e.key === 'ArrowLeft' && zoom === 1) prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, next, prev, zoom]);

  if (!doc) return null;

  const toggleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (zoomStep < ZOOM_STEPS.length - 1) {
      const container = e.currentTarget.parentElement;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setZoomStep((s) => s + 1);
      requestAnimationFrame(() => {
        if (!container) return;
        container.scrollLeft = px * container.scrollWidth - container.clientWidth / 2;
        container.scrollTop = py * container.scrollHeight - container.clientHeight / 2;
      });
    } else { setZoomStep(0); }
  };

  const startPan = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom === 1) return;
    pan.current = { x: e.clientX, y: e.clientY, left: e.currentTarget.scrollLeft, top: e.currentTarget.scrollTop };
    e.currentTarget.style.cursor = 'grabbing';
  };
  const doPan = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pan.current) return;
    e.currentTarget.scrollLeft = pan.current.left - (e.clientX - pan.current.x);
    e.currentTarget.scrollTop = pan.current.top - (e.clientY - pan.current.y);
  };
  const endPan = (e: React.MouseEvent<HTMLDivElement>) => { pan.current = null; e.currentTarget.style.cursor = ''; };

  const arrowBtn: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 2,
    width: '48px', height: '48px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.07)',
    color: '#fff', fontSize: '26px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,30,40,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 72px 20px' }}>
      <button type="button" onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: '16px', right: '20px', zIndex: 3, width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.28)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      {docs.length > 1 && zoom === 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior" style={{ ...arrowBtn, left: '12px' }}>‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente" style={{ ...arrowBtn, right: '12px' }}>›</button>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()} onMouseDown={startPan} onMouseMove={doPan} onMouseUp={endPan} onMouseLeave={endPan} className="lightbox-scroller" style={{ overflow: zoom > 1 ? 'auto' : 'hidden', maxWidth: '100%', maxHeight: '100%', display: 'flex', alignItems: zoom > 1 ? 'flex-start' : 'center', justifyContent: zoom > 1 ? 'flex-start' : 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img onClick={toggleZoom} src={certUrl(doc.src)} alt={doc.title} style={{ display: 'block', maxWidth: zoom > 1 ? 'none' : '100%', maxHeight: zoom > 1 ? 'none' : '100%', width: zoom > 1 ? `${zoom * 86}vw` : 'auto', objectFit: 'contain', boxShadow: '0 24px 56px rgba(0,0,0,0.55)', cursor: zoomStep < ZOOM_STEPS.length - 1 ? 'zoom-in' : 'zoom-out' }} />
      </div>
      {zoom === 1 && <p className="font-sans" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.88)', fontSize: '15px', marginTop: '14px', maxWidth: '640px' }}>{doc.title}</p>}
    </div>
  );
}

/* ─── Mobile lightbox ──────────────────────────────────────────────────────── */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const touchDist = (a: React.Touch, b: React.Touch) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

function MobileLightbox({ docs, startIndex, onClose }: { docs: Doc[]; startIndex: number; onClose: () => void }) {
  const [i, setI] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const pan = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const doc = docs[i];
  const zoomed = scale > 1.02;

  const resetZoom = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };
  const next = useCallback(() => { setI((v) => (v + 1) % docs.length); resetZoom(); }, [docs.length]);
  const prev = useCallback(() => { setI((v) => (v - 1 + docs.length) % docs.length); resetZoom(); }, [docs.length]);

  useEffect(() => { setI(startIndex); resetZoom(); }, [startIndex]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!doc) return null;

  // Un dedo: si no hay zoom, desliza a la siguiente/anterior; si hay zoom, arrastra la imagen.
  // Dos dedos: pellizco para hacer zoom. Nunca un toque para (des)ampliar.
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinch.current = { dist: touchDist(e.touches[0], e.touches[1]), scale };
      swipe.current = null;
    } else if (e.touches.length === 1) {
      if (zoomed) pan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: translate.x, ty: translate.y };
      else swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      const ratio = touchDist(e.touches[0], e.touches[1]) / pinch.current.dist;
      setScale(clamp(pinch.current.scale * ratio, 1, 4));
    } else if (e.touches.length === 1 && pan.current) {
      setTranslate({ x: pan.current.tx + (e.touches[0].clientX - pan.current.x), y: pan.current.ty + (e.touches[0].clientY - pan.current.y) });
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pinch.current) { pinch.current = null; if (scale < 1.05) resetZoom(); }
    if (pan.current) pan.current = null;
    if (swipe.current && !zoomed) {
      const dx = e.changedTouches[0].clientX - swipe.current.x;
      if (Math.abs(dx) > 48) { dx < 0 ? next() : prev(); }
    }
    swipe.current = null;
  };

  const navBtn: React.CSSProperties = { width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,30,40,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '52px 12px 20px' }}>
      {/* Cerrar */}
      <button type="button" onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.28)', backgroundColor: 'rgba(255,255,255,0.09)', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

      {/* Tarjeta con la imagen */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ overflow: 'hidden', width: '100%', maxHeight: '68vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', touchAction: 'none' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={certUrl(doc.src)}
          alt={doc.title}
          style={{
            display: 'block', width: '100%', maxWidth: '100%', maxHeight: '68vh', objectFit: 'contain',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)', userSelect: 'none',
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: pinch.current || pan.current ? 'none' : 'transform 0.2s ease-out',
          }}
        />
      </div>

      {/* Hint de zoom */}
      <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', marginTop: '-6px' }}>
        {zoomed ? 'Pellizca para reducir · Arrastra para mover' : 'Pellizca con dos dedos para ampliar · Desliza para cambiar'}
      </p>

      {/* Navegación + contador */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button type="button" onClick={prev} aria-label="Anterior" style={navBtn}>‹</button>
        <span className="font-sans" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', minWidth: '48px', textAlign: 'center' }}>{i + 1} / {docs.length}</span>
        <button type="button" onClick={next} aria-label="Siguiente" style={navBtn}>›</button>
      </div>

      {/* Título */}
      <p className="font-sans" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: '13px', maxWidth: '92vw', lineHeight: 1.4 }}>
        {doc.title}
      </p>
    </div>
  );
}

function CarouselSection({ docsAll, tags }: { docsAll: Doc[]; tags: Tag[] }) {
  const [filter, setFilter] = useState<Tag | 'Todos'>('Todos');
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ringRef = useRef<ThreeDImageRingHandle>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const docs = useMemo(() => (filter === 'Todos' ? docsAll : docsAll.filter((d) => d.tag === filter)), [filter, docsAll]);
  const items = useMemo(() => docs.map((d) => ({ src: certUrl(d.src), alt: d.title })), [docs]);
  const activeDoc = docs[active] ?? docs[0];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <FilterChips tags={tags} value={filter} onChange={(v) => { setFilter(v); setActive(0); }} />
      </div>

      {docs.length <= 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '360px', justifyContent: 'center' }}>
          {docs[0] && <SingleFrame doc={docs[0]} onOpen={() => setOpenIndex(0)} />}
        </div>
      ) : (
        <>
          <p className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#8A9199', marginBottom: '8px' }}>Arrastra para girar · Toca para ampliar</p>
          <div key={filter} className="ring-stage" style={{ position: 'relative' }}>
            <ThreeDImageRing ref={ringRef} items={items} frameColor={FRAME} stageHeight={610} initialRotation={0} onActiveChange={setActive} onOpen={(i) => setOpenIndex(i)} />
          </div>
          <div className="stepnav">
            <button type="button" onClick={() => ringRef.current?.step(-1)} aria-label="Anterior">‹</button>
            <button type="button" onClick={() => ringRef.current?.step(1)} aria-label="Siguiente">›</button>
          </div>
        </>
      )}

      {activeDoc && (
        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <TagBadge tag={activeDoc.tag} big />
          <p className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: '#243A4D', marginTop: '14px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.3 }}>{activeDoc.title}</p>
        </div>
      )}

      {openIndex !== null && (isMobile
        ? <MobileLightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
        : <Lightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  );
}

export default function CertificateSlider() {
  return (
    <div className="cred">
      <section className="cert-section" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="cert-header" style={{ textAlign: 'center' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trayectoria personal</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Estudios</h2>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '640px', margin: '18px auto 0' }}>
              Formación continua durante más de tres décadas en las principales escuelas de negocio del mundo.
            </p>
          </div>
          <CarouselSection docsAll={ESTUDIOS} tags={ESTUDIOS_TAGS} />
          <InstitutionLogos />
        </div>
      </section>

      <section className="cert-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="cert-header" style={{ textAlign: 'center' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Acreditaciones profesionales</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Certificaciones</h2>
          </div>
          <CarouselSection docsAll={CERTIFICACIONES} tags={CERTIFICACIONES_TAGS} />
        </div>
      </section>

      <style jsx global>{`
        .cred .filterchips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
        .cred .chip { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600;
          letter-spacing: .02em; padding: 8px 16px; border-radius: 100px; border: 1px solid transparent; cursor: pointer;
          transition: transform .15s ease, background-color .2s ease, color .2s ease; }
        .cred .chip:hover { transform: translateY(-1px); }
        .cred .stepnav { display: flex; justify-content: center; gap: 16px; margin-top: 10px; }
        .cred .stepnav button { width: 48px; height: 48px; border-radius: 50%; font-size: 24px; line-height: 1;
          color: #243A4D; background: #fff; border: 1px solid rgba(36,58,77,.16);
          box-shadow: 0 4px 14px rgba(36,58,77,.10); cursor: pointer; padding-bottom: 3px;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease; }
        .cred .stepnav button:hover { background: #243A4D; color: #fff; border-color: #243A4D; transform: scale(1.06); }
        .cred .fslide { display: block; border: none; padding: 0; background: none; cursor: zoom-in; }
        .cred .ringmat { display: inline-block; padding: 6px; background: #FDFDFC; border: 11px solid var(--frame-c); box-shadow: 0 18px 48px -6px rgba(0,0,0,.55), 0 6px 16px -4px rgba(0,0,0,.28); }
        .cred .ringmat img { display: block; width: auto; }
        .cred .cert-section { padding-top: 72px; padding-bottom: 72px; }
        .cred .cert-header { margin-bottom: 48px; }
        .ring-stage { height: 614px; }
        .lightbox-scroller { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.4) transparent; }
        .lightbox-scroller::-webkit-scrollbar { width: 8px; height: 8px; }
        .lightbox-scroller::-webkit-scrollbar-thumb { background: rgba(255,255,255,.4); border-radius: 100px; }
        .lightbox-scroller::-webkit-scrollbar-track { background: transparent; }
        @media (max-width: 767px) {
          .cred .cert-section { padding-top: 40px; padding-bottom: 40px; }
          .cred .cert-header { margin-bottom: 28px; }
          .ring-stage { height: 330px; }
        }
      `}</style>
    </div>
  );
}

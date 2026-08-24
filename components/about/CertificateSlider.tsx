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

function Lightbox({ docs, startIndex, onClose }: { docs: Doc[]; startIndex: number; onClose: () => void }) {
  const [i, setI] = useState(startIndex);
  const doc = docs[i];
  const next = useCallback(() => setI((v) => (v + 1) % docs.length), [docs.length]);
  const prev = useCallback(() => setI((v) => (v - 1 + docs.length) % docs.length), [docs.length]);

  useEffect(() => setI(startIndex), [startIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, next, prev]);

  if (!doc) return null;

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(20,30,40,0.94)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 16px' }}>
      <button type="button" onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: '20px', right: '24px', width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
      {docs.length > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>›</button>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        onClick={(e) => e.stopPropagation()}
        src={certUrl(doc.src)}
        alt={doc.title}
        style={{ maxWidth: '90vw', maxHeight: '72vh', objectFit: 'contain', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
      />
      <p className="font-sans" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '15px', padding: '18px 16px 0' }}>{doc.title}</p>
    </div>
  );
}

function CarouselSection({ docsAll, tags }: { docsAll: Doc[]; tags: Tag[] }) {
  const [filter, setFilter] = useState<Tag | 'Todos'>('Todos');
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ringRef = useRef<ThreeDImageRingHandle>(null);

  const docs = useMemo(() => (filter === 'Todos' ? docsAll : docsAll.filter((d) => d.tag === filter)), [filter, docsAll]);
  const items = useMemo(() => docs.map((d) => ({ src: certUrl(d.src), alt: d.title })), [docs]);
  const activeDoc = docs[active] ?? docs[0];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <FilterChips tags={tags} value={filter} onChange={(v) => { setFilter(v); setActive(0); }} />
      </div>

      {docs.length <= 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '360px', justifyContent: 'center' }}>
          {docs[0] && <SingleFrame doc={docs[0]} onOpen={() => setOpenIndex(0)} />}
        </div>
      ) : (
        <>
          <p className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#8A9199', marginBottom: '8px' }}>Arrastra para girar</p>
          <div key={filter} style={{ height: '700px', position: 'relative' }}>
            <ThreeDImageRing ref={ringRef} items={items} frameColor={FRAME} stageHeight={680} onActiveChange={setActive} onOpen={(i) => setOpenIndex(i)} />
          </div>
          <div className="stepnav">
            <button type="button" onClick={() => ringRef.current?.step(-1)} aria-label="Anterior">‹</button>
            <button type="button" onClick={() => ringRef.current?.step(1)} aria-label="Siguiente">›</button>
          </div>
        </>
      )}

      {activeDoc && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <TagBadge tag={activeDoc.tag} big />
          <p className="font-serif" style={{ fontSize: '24px', fontWeight: 700, color: '#243A4D', marginTop: '14px', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.3 }}>{activeDoc.title}</p>
        </div>
      )}

      {openIndex !== null && <Lightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}
    </div>
  );
}

export default function CertificateSlider() {
  return (
    <div className="cred">
      <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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

      <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
        .cred .stepnav { display: flex; justify-content: center; gap: 16px; margin-top: 20px; }
        .cred .stepnav button { width: 48px; height: 48px; border-radius: 50%; font-size: 24px; line-height: 1;
          color: #243A4D; background: #fff; border: 1px solid rgba(36,58,77,.16);
          box-shadow: 0 4px 14px rgba(36,58,77,.10); cursor: pointer; padding-bottom: 3px;
          display: flex; align-items: center; justify-content: center;
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease; }
        .cred .stepnav button:hover { background: #243A4D; color: #fff; border-color: #243A4D; transform: scale(1.06); }
        .cred .fslide { display: block; border: none; padding: 0; background: none; cursor: zoom-in; }
        .cred .ringmat { display: inline-block; padding: 6px; background: #FDFDFC; border: 8px solid var(--frame-c); box-shadow: 0 10px 24px -8px rgba(0,0,0,.4); }
        .cred .ringmat img { display: block; width: auto; }
      `}</style>
    </div>
  );
}

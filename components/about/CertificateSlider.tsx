'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import InstitutionLogos from '@/components/about/InstitutionLogos';
import { ThreeDImageRing } from '@/components/lightswind/draggable-3d-image-ring';
import { ALL, TAG_STYLE, certUrl, type Doc, type Tag } from '@/components/about/certificates-data';

const FRAME = '#3A3A3A';
const FILTERS: Array<Tag | 'Todos'> = ['Todos', 'Grado académico', 'Diplomado', 'Seminario internacional', 'Certificación', 'Coaching', 'Consejería'];

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

function FilterChips({ value, onChange }: { value: Tag | 'Todos'; onChange: (v: Tag | 'Todos') => void }) {
  return (
    <div className="filterchips">
      {FILTERS.map((f) => {
        const active = f === value;
        const s = f === 'Todos' ? { text: '#243A4D', tint: 'rgba(36,58,77,0.08)', dot: '#243A4D' } : TAG_STYLE[f];
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            className="chip font-sans"
            style={{
              color: active ? '#fff' : s.text,
              backgroundColor: active ? s.dot : s.tint,
              borderColor: active ? s.dot : 'transparent',
            }}
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
        <img src={certUrl(doc.src)} alt={doc.title} style={{ height: '220px' }} />
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

export default function CertificateSlider() {
  const [filter, setFilter] = useState<Tag | 'Todos'>('Todos');
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const docs = useMemo(() => (filter === 'Todos' ? ALL : ALL.filter((d) => d.tag === filter)), [filter]);
  const items = useMemo(() => docs.map((d) => ({ src: certUrl(d.src), alt: d.title })), [docs]);
  const activeDoc = docs[active] ?? docs[0];

  return (
    <div className="cred">
      <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trayectoria personal</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Estudios y certificaciones</h2>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '640px', margin: '18px auto 0' }}>
              Formación continua durante más de tres décadas en las principales escuelas de negocio del mundo.
            </p>
            <FilterChips value={filter} onChange={(v) => { setFilter(v); setActive(0); }} />
          </div>

          {docs.length <= 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '340px', justifyContent: 'center' }}>
              {docs[0] && <SingleFrame doc={docs[0]} onOpen={() => setOpenIndex(0)} />}
            </div>
          ) : (
            <>
              <p className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#8A9199', marginBottom: '8px' }}>Arrastra para girar</p>
              <div key={filter} style={{ height: '400px', position: 'relative' }}>
                <ThreeDImageRing items={items} frameColor={FRAME} onActiveChange={setActive} onOpen={(i) => setOpenIndex(i)} />
              </div>
            </>
          )}

          {activeDoc && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <TagBadge tag={activeDoc.tag} />
              <p className="font-serif" style={{ fontSize: '17px', fontWeight: 700, color: '#243A4D', marginTop: '10px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>{activeDoc.title}</p>
            </div>
          )}

          <InstitutionLogos />
        </div>
      </section>

      {openIndex !== null && <Lightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}

      <style jsx global>{`
        .cred .filterchips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 28px; }
        .cred .chip { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600;
          letter-spacing: .02em; padding: 8px 16px; border-radius: 100px; border: 1px solid transparent; cursor: pointer;
          transition: transform .15s ease, background-color .2s ease, color .2s ease; }
        .cred .chip:hover { transform: translateY(-1px); }
        .cred .fslide { display: block; border: none; padding: 0; background: none; cursor: zoom-in; }
        .cred .ringmat { display: inline-block; padding: 6px; background: #FDFDFC; border: 4px solid var(--frame-c); box-shadow: 0 16px 32px -18px rgba(0,0,0,.5); }
        .cred .ringmat img { display: block; width: auto; }
      `}</style>
    </div>
  );
}

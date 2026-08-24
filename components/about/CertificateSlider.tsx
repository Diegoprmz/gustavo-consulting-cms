'use client';

import { useCallback, useEffect, useState } from 'react';

import InstitutionLogos from '@/components/about/InstitutionLogos';
import { ThreeDImageRing } from '@/components/lightswind/draggable-3d-image-ring';
import {
  ACADEMICO, DIPLOMADOS, SEMINARIOS, CERT_PROF, COACHING, CONSEJERIA,
  ALL, TAG_STYLE, certUrl, type Doc, type Tag,
} from '@/components/about/certificates-data';

const FRAME = '#3A3A3A';

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

/** Certificado único, sin ring (no tiene sentido girar un solo elemento). */
function SingleFrame({ doc, onOpen }: { doc: Doc; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} aria-label={`Ampliar: ${doc.title}`} className="fslide">
      <span className="ringmat" style={{ ['--frame-c' as string]: FRAME }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={certUrl(doc.src)} alt={doc.title} style={{ height: '220px' }} />
      </span>
      <span style={{ display: 'block', textAlign: 'center', marginTop: '18px' }}>
        <TagBadge tag={doc.tag} />
        <span className="font-serif" style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: '#243A4D', lineHeight: 1.3, marginTop: '10px' }}>{doc.title}</span>
      </span>
    </button>
  );
}

function RingGroup({ id, title, docs, height = 340 }: { id: string; title: string; docs: Doc[]; height?: number }) {
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = docs.map((d) => ({ src: certUrl(d.src), alt: d.title }));
  const activeDoc = docs[active] ?? docs[0];

  if (docs.length <= 1) {
    return (
      <div id={id} style={{ marginBottom: '84px', scrollMarginTop: '96px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 className="font-serif" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, color: '#243A4D', textAlign: 'center', marginBottom: '30px' }}>{title}</h3>
        <SingleFrame doc={docs[0]} onOpen={() => setOpenIndex(0)} />
        {openIndex !== null && <Lightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}
      </div>
    );
  }

  return (
    <div id={id} style={{ marginBottom: '84px', scrollMarginTop: '96px' }}>
      <h3 className="font-serif" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, color: '#243A4D', textAlign: 'center', marginBottom: '10px' }}>{title}</h3>
      <p className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#8A9199', marginBottom: '20px' }}>Arrastra para girar</p>
      <div style={{ height, position: 'relative' }}>
        <ThreeDImageRing items={items} width={260} frameColor={FRAME} onActiveChange={setActive} onOpen={(i) => setOpenIndex(i)} />
      </div>
      {activeDoc && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <TagBadge tag={activeDoc.tag} />
          <p className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#243A4D', marginTop: '10px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>{activeDoc.title}</p>
        </div>
      )}
      {openIndex !== null && <Lightbox docs={docs} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}
    </div>
  );
}

function Lightbox({ docs, startIndex, onClose }: { docs: Doc[]; startIndex: number; onClose: () => void }) {
  const [i, setI] = useState(startIndex);
  const doc = docs[i];
  const next = useCallback(() => setI((v) => (v + 1) % docs.length), [docs.length]);
  const prev = useCallback(() => setI((v) => (v - 1 + docs.length) % docs.length), [docs.length]);

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
  void ALL; // lista completa disponible para futura búsqueda/índice global
  return (
    <div className="cred">
      <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trayectoria personal</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Estudios</h2>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '640px', margin: '18px auto 0' }}>
              Formación continua durante más de tres décadas en las principales escuelas de negocio del mundo.
            </p>
          </div>
          <RingGroup id="c-academico" title="Formación académica" docs={ACADEMICO} height={300} />
          <RingGroup id="c-diplomados" title="Diplomados" docs={DIPLOMADOS} height={320} />
          <RingGroup id="c-seminarios" title="Seminarios internacionales" docs={SEMINARIOS} height={380} />
          <InstitutionLogos />
        </div>
      </section>

      <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Acreditaciones profesionales</span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.2 }}>Certificaciones</h2>
          </div>
          <RingGroup id="c-certprof" title="Certificaciones profesionales" docs={CERT_PROF} height={320} />
          <RingGroup id="c-coaching" title="Coaching" docs={COACHING} height={300} />
          <RingGroup id="c-consejeria" title="Consejería" docs={CONSEJERIA} />
        </div>
      </section>

      <style jsx global>{`
        .cred .fslide { display: block; border: none; padding: 0; background: none; cursor: zoom-in; }
        .cred .ringmat { display: inline-block; padding: 6px; background: #FDFDFC; border: 4px solid var(--frame-c); box-shadow: 0 16px 32px -18px rgba(0,0,0,.5); }
        .cred .ringmat img { display: block; width: auto; }
      `}</style>
    </div>
  );
}

import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <main>
        <article>
          {/* Hero */}
          <section style={{ backgroundColor: '#243A4D', paddingTop: '140px', paddingBottom: '80px' }}>
            <div className="max-w-[760px] mx-auto px-5 md:px-8">
              <Link
                href="/blog"
                className="font-sans"
                style={{ fontSize: '13px', color: '#6A8F7B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}
              >
                ← Volver al blog
              </Link>
              <span
                className="font-sans font-semibold"
                style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6A8F7B', display: 'block', marginBottom: '20px' }}
              >
                Estrategia
              </span>
              <h1
                className="font-serif text-white"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                Customer Centricity no es un programa,
                <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}> es una decisión estratégica</span>
              </h1>
              <p className="font-sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '24px' }}>
                Gustavo Martínez &nbsp;·&nbsp; 15 Mayo, 2026
              </p>
            </div>
          </section>

          {/* Content */}
          <section style={{ backgroundColor: '#ffffff', paddingTop: '72px', paddingBottom: '120px' }}>
            <div className="max-w-[760px] mx-auto px-5 md:px-8">
              <p className="font-sans" style={{ fontSize: '18px', lineHeight: 1.85, color: '#333333', marginBottom: '28px' }}>
                Muchas empresas confunden centrar al cliente con mejorar su servicio al cliente.
                La diferencia radica en quién toma las decisiones y con qué información se toman.
              </p>
              <p className="font-sans" style={{ fontSize: '17px', lineHeight: 1.85, color: '#4A5568', marginBottom: '28px' }}>
                Cuando la estrategia se define desde finanzas, la operación desde eficiencia y la
                cultura desde inercias históricas, el cliente queda fuera de las decisiones que
                importan. El resultado es predecible: crecimiento limitado, desconexión con el
                mercado y rentabilidad presionada.
              </p>
              <div style={{ margin: '48px 0', padding: '28px 32px', borderLeft: '3px solid #C9A84C', backgroundColor: '#F9F7F2' }}>
                <p className="font-serif" style={{ fontSize: '22px', fontStyle: 'italic', color: '#243A4D', lineHeight: 1.5 }}>
                  &ldquo;La pregunta no es si tu empresa se preocupa por el cliente.
                  La pregunta es si el cliente define tu estrategia.&rdquo;
                </p>
              </div>
              <p className="font-sans" style={{ fontSize: '17px', lineHeight: 1.85, color: '#4A5568', marginBottom: '28px' }}>
                Customer Centricity como decisión estratégica significa que el cliente aparece en
                la agenda del consejo de administración, en el diseño del modelo de negocio y en
                los indicadores de desempeño de la organización completa.
              </p>

              <div style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid rgba(106,143,123,0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <p className="font-sans font-semibold" style={{ fontSize: '15px', color: '#243A4D' }}>Gustavo Martínez Pellón</p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#6B7280' }}>Consejero Corporativo · Consultor Empresarial · Profesor Ejecutivo</p>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

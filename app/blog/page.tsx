'use client';

import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Link from 'next/link';

const posts = [
  {
    slug: 'customer-centricity-decision-estrategica',
    fecha: '15 Mayo, 2026',
    categoria: 'Estrategia',
    titulo: 'Customer Centricity no es un programa, es una decisión estratégica',
    resumen: 'Muchas empresas confunden centrar al cliente con mejorar su servicio al cliente. La diferencia radica en quién toma las decisiones y con qué información.',
  },
  {
    slug: 'consejo-administracion-perspectiva-cliente',
    fecha: '3 Abril, 2026',
    categoria: 'Consejos',
    titulo: 'La perspectiva del cliente en la agenda del consejo de administración',
    resumen: 'Los consejos de administración toman decisiones estratégicas con información financiera y operativa. ¿Dónde está la voz del cliente?',
  },
  {
    slug: 'cinco-dimensiones-negocio-centrado-cliente',
    fecha: '18 Marzo, 2026',
    categoria: 'Consultoría',
    titulo: 'Las cinco dimensiones de un negocio centrado en el cliente',
    resumen: 'Estrategia, cultura, operación, experiencia y métricas: las cinco dimensiones que deben alinearse para que el cliente sea el motor real de la rentabilidad.',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{
            backgroundColor: '#243A4D',
            paddingTop: '140px',
            paddingBottom: '80px',
          }}
        >
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <span
              className="font-sans font-semibold"
              style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6A8F7B', display: 'block', marginBottom: '20px' }}
            >
              Artículos
            </span>
            <h1
              className="font-serif text-white"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              Reflexiones sobre<br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>estrategia y cliente</span>
            </h1>
          </div>
        </section>

        {/* Posts grid */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '80px', paddingBottom: '120px' }}>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <article
                    style={{
                      backgroundColor: '#ffffff',
                      padding: '32px 28px',
                      height: '100%',
                      boxShadow: '0 2px 16px rgba(36,58,77,0.06)',
                      borderTop: '2px solid #C9A84C',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(36,58,77,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(36,58,77,0.06)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span
                        className="font-sans"
                        style={{ fontSize: '11px', color: '#6A8F7B', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}
                      >
                        {p.categoria}
                      </span>
                      <span className="font-sans" style={{ fontSize: '12px', color: '#9CA3AF' }}>{p.fecha}</span>
                    </div>
                    <h2
                      className="font-serif"
                      style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', color: '#243A4D', fontWeight: 700, lineHeight: 1.3, marginBottom: '14px' }}
                    >
                      {p.titulo}
                    </h2>
                    <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.75 }}>
                      {p.resumen}
                    </p>
                    <p
                      className="font-sans font-semibold"
                      style={{ fontSize: '13px', color: '#C9A84C', marginTop: '24px', letterSpacing: '0.06em' }}
                    >
                      Leer artículo →
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

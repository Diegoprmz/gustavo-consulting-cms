import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';

import CertificateSlider from '@/components/about/CertificateSlider';
import InstitutionLogos from '@/components/about/InstitutionLogos';

export const metadata = {
  title: 'Trayectoria',
  description:
    'Estudios, certificaciones y trayectoria de Gustavo Martínez Pellón: formación en Stanford, Kellogg, Notre Dame, Georgetown, ITAM y Anáhuac.',
  openGraph: {
    title: 'Trayectoria | Gustavo Martínez Business Consulting',
    description:
      'Estudios, certificaciones y trayectoria de Gustavo Martínez Pellón: formación en las principales escuelas de negocio del mundo.',
    url: 'https://gustavo.consulting/about',
  },
};

/** Marca de sección aún sin contenido definitivo (visible en el PR para revisión). */
function Placeholder({ nota }: { nota: string }) {
  return (
    <div
      style={{
        border: '1px dashed rgba(106,143,123,0.5)',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        backgroundColor: 'rgba(106,143,123,0.04)',
      }}
    >
      <p className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
        Contenido en preparación
      </p>
      <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
        {nota}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-white flex items-center" style={{ paddingTop: '140px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span
                  className="font-sans font-semibold block"
                  style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}
                >
                  Trayectoria
                </span>
                <h1
                  className="font-serif font-bold"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#243A4D', lineHeight: 1.2, marginBottom: '24px' }}
                >
                  Estrategia, educación y dirección empresarial
                </h1>
                <p className="font-sans" style={{ fontSize: '17px', color: '#333333', lineHeight: 1.8, marginBottom: '16px' }}>
                  Más de tres décadas formando líderes y asesorando empresas en la intersección de estrategia, marketing y orientación al cliente.
                </p>
                <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.8, marginBottom: '36px' }}>
                  Con experiencia en distintos roles — consejero, consultor y formador en educación ejecutiva — mi trabajo se concentra en un punto: conectar al cliente con la estrategia, no como discurso, sino como transformación real.
                </p>
                <a
                  href="/contact"
                  className="inline-block font-sans font-semibold text-white"
                  style={{
                    backgroundColor: '#243A4D',
                    padding: '14px 32px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  Solicitar asesoría →
                </a>
              </div>

              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '-16px',
                    right: '16px',
                    bottom: '16px',
                    backgroundColor: 'rgba(106,143,123,0.08)',
                    borderRadius: '16px',
                  }}
                />
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(36,58,77,0.14)' }}>
                  <Image
                    src="/assets/gustavo-arizona-CeKj84jk.jpg"
                    alt="Gustavo Martínez Pellón"
                    width={520}
                    height={600}
                    className="block w-full object-cover"
                    priority
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '-12px',
                    backgroundColor: '#243A4D',
                    color: '#ffffff',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(36,58,77,0.25)',
                  }}
                >
                  <p className="font-sans font-bold" style={{ fontSize: '22px', lineHeight: 1 }}>30+</p>
                  <p className="font-sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', marginTop: '4px' }}>
                    AÑOS DE EXPERIENCIA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Trayectoria personal — Estudios y certificaciones */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Trayectoria personal
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Estudios y certificaciones
              </h2>
              <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.7, maxWidth: '620px', margin: '18px auto 0' }}>
                Formación continua durante más de tres décadas en las principales escuelas de negocio del mundo y con referentes globales del pensamiento estratégico.
              </p>
            </div>

            <CertificateSlider />

            <p
              className="font-sans"
              style={{ textAlign: 'center', fontSize: '15px', color: '#6B7280', lineHeight: 1.8, maxWidth: '760px', margin: '64px auto 0' }}
            >
              Además, seminarios internacionales en Stanford, Kellogg, Notre Dame, Georgetown, McGill y Deusto, y
              programas ejecutivos con referentes globales como <strong style={{ color: '#243A4D', fontWeight: 600 }}>Gary Hamel</strong>,{' '}
              <strong style={{ color: '#243A4D', fontWeight: 600 }}>Seth Godin</strong>,{' '}
              <strong style={{ color: '#243A4D', fontWeight: 600 }}>Guy Kawasaki</strong>,{' '}
              <strong style={{ color: '#243A4D', fontWeight: 600 }}>Daniel Goleman</strong> y{' '}
              <strong style={{ color: '#243A4D', fontWeight: 600 }}>Marshall Goldsmith</strong>.
            </p>

            <InstitutionLogos />
          </div>
        </section>

        {/* 2. Trayectoria empresarial — PENDIENTE DE CONTENIDO */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1000px] mx-auto px-5 md:px-8">
            <div style={{ marginBottom: '40px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Trayectoria empresarial
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Recorrido en empresas y consejos
              </h2>
            </div>
            <Placeholder nota="Aquí irá la carrera empresarial de Gustavo: empresas, cargos directivos, consejos de administración y años. Pendiente de recibir el CV / listado." />
          </div>
        </section>

        {/* 3. Gustos y hobbies — PENDIENTE DE CONTENIDO */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1000px] mx-auto px-5 md:px-8">
            <div style={{ marginBottom: '40px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                En lo personal
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Gustos y pasatiempos
              </h2>
            </div>
            <Placeholder nota="Aquí irá el lado personal de Gustavo: familia, deportes, viajes, lecturas o aficiones. Pendiente de definir el contenido." />
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-[720px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ¿Trabajamos juntos?
            </span>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginTop: '16px', marginBottom: '28px', lineHeight: 1.25 }}>
              Si este enfoque resuena con los retos de tu organización, podemos conversar.
            </h2>
            <a
              href="/contact"
              className="inline-block font-sans font-semibold"
              style={{
                backgroundColor: '#C9A84C',
                color: '#243A4D',
                padding: '16px 36px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              Solicitar asesoría →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

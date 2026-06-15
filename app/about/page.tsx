import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'Trayectoria | Gustavo Martínez Business Consulting',
  description: 'Más de tres décadas conectando estrategia con ejecución en empresas de México y Latinoamérica.',
  openGraph: {
    title: 'Trayectoria | Gustavo Martínez Business Consulting',
    description: 'Más de tres décadas conectando estrategia con ejecución en empresas de México y Latinoamérica.',
    url: 'https://gustavo.consulting/about',
  },
};

const timeline = [
  {
    category: 'Formación Académica',
    items: [
      'Licenciatura en Administración de Empresas — ITAM',
      'MBA — Universidad Anáhuac México',
      'Programas ejecutivos internacionales de estrategia y liderazgo',
    ],
  },
  {
    category: 'Experiencia Profesional',
    items: [
      'Director de programas ejecutivos en instituciones de alto nivel',
      'Consultor estratégico en procesos de transformación organizacional',
      'Consejero independiente en consejos de administración',
      'Más de 30 años asesorando a empresas en México y Latinoamérica',
    ],
  },
  {
    category: 'Participación Internacional',
    items: [
      'Conferencista en foros de estrategia y Customer Centricity',
      'Asesor de empresas multinacionales en LATAM',
      'Autor del libro "Customer Centricity — El Foco en el Cliente"',
    ],
  },
];

const impactAreas = [
  {
    number: '01',
    title: 'Dirección Académica',
    description: 'Liderazgo de programas ejecutivos en instituciones de alto nivel, formando directivos con visión estratégica y orientación al cliente.',
  },
  {
    number: '02',
    title: 'Asesoría Estratégica',
    description: 'Acompañamiento en procesos de transformación empresarial, conectando estrategia con ejecución real en empresas de distintos sectores.',
  },
  {
    number: '03',
    title: 'Consejero Independiente',
    description: 'Participación en consejos de administración aportando perspectiva externa, rigor analítico y enfoque en la creación de valor sostenible.',
  },
  {
    number: '04',
    title: 'Alcance Internacional',
    description: 'Conferencias, asesorías y programas formativos con alcance en México, Centroamérica y Sudamérica, adaptados a cada contexto de negocio.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="bg-white flex items-center"
          style={{ paddingTop: '140px', paddingBottom: '100px' }}
        >
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
                  Con experiencia en distintos roles — consultor, consejero, académico y conferencista — mi trabajo se concentra en un punto: conectar al cliente con la estrategia, no como discurso, sino como transformación real.
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
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 16px 48px rgba(36,58,77,0.14)',
                  }}
                >
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
                  <p className="font-sans font-bold" style={{ fontSize: '22px', lineHeight: 1 }}>20+</p>
                  <p className="font-sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', marginTop: '4px' }}>
                    AÑOS DE EXPERIENCIA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas de Impacto */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Especialización
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(28px, 3vw, 38px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Áreas de impacto
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {impactAreas.map((area) => (
                <div
                  key={area.number}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    padding: '36px',
                    boxShadow: '0 2px 16px rgba(36,58,77,0.06)',
                  }}
                >
                  <p className="font-sans font-bold" style={{ fontSize: '13px', color: '#6A8F7B', marginBottom: '14px' }}>
                    {area.number}
                  </p>
                  <h3 className="font-serif font-bold" style={{ fontSize: '22px', color: '#243A4D', marginBottom: '12px' }}>
                    {area.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div style={{ marginBottom: '64px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Recorrido profesional
              </span>
              <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(28px, 3vw, 38px)', marginTop: '16px', lineHeight: 1.25 }}>
                Formación y experiencia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {timeline.map((block, i) => (
                <div key={i}>
                  <div style={{ borderTop: '2px solid #6A8F7B', paddingTop: '24px' }}>
                    <h3 className="font-sans font-semibold" style={{ fontSize: '14px', color: '#6A8F7B', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '20px' }}>
                      {block.category}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {block.items.map((item, j) => (
                        <li key={j} className="font-sans" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '12px', paddingLeft: '16px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#6A8F7B' }}>·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-[720px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ¿Trabajamos juntos?
            </span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(28px, 3vw, 40px)', color: '#243A4D', marginTop: '16px', marginBottom: '20px', lineHeight: 1.25 }}>
              Si este enfoque resuena con los retos de tu organización, podemos conversar.
            </h2>
            <a
              href="/contact"
              className="inline-block font-sans font-semibold text-white"
              style={{
                backgroundColor: '#243A4D',
                padding: '16px 36px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                marginTop: '12px',
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

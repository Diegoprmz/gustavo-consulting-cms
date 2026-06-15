import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Servicios | Gustavo Martínez Business Consulting',
  description: 'Consultoría estratégica, educación ejecutiva, conferencias y advisory board para empresas en crecimiento.',
  openGraph: {
    title: 'Servicios | Gustavo Martínez Business Consulting',
    description: 'Consultoría estratégica, educación ejecutiva, conferencias y advisory board para empresas en crecimiento.',
    url: 'https://gustavo.consulting/services',
  },
};

const services = [
  {
    number: '01',
    title: 'Consultoría Estratégica',
    for: 'Empresas en crecimiento o transformación',
    problem: 'Falta de claridad estratégica, desalineación entre áreas o pérdida de foco en el cliente.',
    approach: 'Diagnóstico profundo, diseño estratégico e implementación acompañada.',
    result: 'Decisiones más claras, equipos alineados y crecimiento sostenible centrado en el cliente.',
  },
  {
    number: '02',
    title: 'Educación Ejecutiva',
    for: 'Líderes y equipos directivos',
    problem: 'Necesidad de actualizar competencias de liderazgo y visión estratégica en un entorno cambiante.',
    approach: 'Programas formativos adaptables, diseñados para el contexto específico de cada organización.',
    result: 'Mayor capacidad analítica, liderazgo más sólido y equipos con visión orientada al cliente.',
  },
  {
    number: '03',
    title: 'Conferencias & Keynotes',
    for: 'Organizaciones y eventos corporativos',
    problem: 'Inspirar, alinear y movilizar audiencias en torno a temas de estrategia y Customer Centricity.',
    approach: 'Ponencias diseñadas para generar impacto real, adaptadas al contexto y la audiencia.',
    result: 'Perspectiva clara con herramientas aplicables desde el primer día.',
  },
  {
    number: '04',
    title: 'Advisory Board',
    for: 'Empresas con decisiones estratégicas clave',
    problem: 'Necesidad de perspectiva externa independiente en decisiones de alto impacto.',
    approach: 'Participación como consejero independiente, aportando rigor y visión desde afuera.',
    result: 'Mejor gobernanza, decisiones más informadas y mayor credibilidad ante inversores y socios.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section
          style={{ backgroundColor: '#243A4D', paddingTop: '160px', paddingBottom: '100px' }}
        >
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              Servicios
            </span>
            <h1 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, maxWidth: '720px', marginBottom: '24px' }}>
              Soluciones diseñadas para crecer con claridad.
            </h1>
            <p className="font-sans text-white" style={{ fontSize: '18px', lineHeight: 1.75, maxWidth: '600px', opacity: 0.85 }}>
              Cada intervención se diseña en función del contexto del negocio, con un objetivo claro: conectar la estrategia con el cliente.
            </p>
          </div>
        </section>

        {/* Services */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {services.map((service, i) => (
                <div
                  key={service.number}
                  style={{
                    borderTop: '1px solid rgba(106,143,123,0.2)',
                    paddingTop: '56px',
                    paddingBottom: '56px',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                    <div className="md:col-span-1">
                      <p className="font-sans font-bold" style={{ fontSize: '14px', color: '#6A8F7B' }}>
                        {service.number}
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#243A4D', lineHeight: 1.2, marginBottom: '8px' }}>
                        {service.title}
                      </h2>
                      <p className="font-sans font-medium" style={{ fontSize: '13px', color: '#6A8F7B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        Para: {service.for}
                      </p>
                    </div>
                    <div className="md:col-span-7">
                      <div style={{ marginBottom: '20px' }}>
                        <p className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                          El reto
                        </p>
                        <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                          {service.problem}
                        </p>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <p className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                          El enfoque
                        </p>
                        <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                          {service.approach}
                        </p>
                      </div>
                      <div>
                        <p className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                          El resultado
                        </p>
                        <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                          {service.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(106,143,123,0.2)' }} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ¿Cuál aplica a tu situación?
            </span>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: '#243A4D', marginTop: '16px', marginBottom: '20px', lineHeight: 1.25 }}>
              Conversemos y definimos juntos el mejor punto de entrada.
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
              }}
            >
              Agendar conversación →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

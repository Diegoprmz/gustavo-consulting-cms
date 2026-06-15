import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Conferencias | Gustavo Martínez Business Consulting',
  description: 'Conferencias y keynotes diseñados para generar impacto real en organizaciones y eventos corporativos.',
  openGraph: {
    title: 'Conferencias | Gustavo Martínez Business Consulting',
    description: 'Conferencias y keynotes diseñados para generar impacto real en organizaciones y eventos corporativos.',
    url: 'https://gustavo.consulting/speaking',
  },
};

const topics = [
  {
    title: 'Customer Centricity',
    description: 'Cómo colocar al cliente en el centro de la estrategia empresarial. Un enfoque estructurado con cinco dimensiones: estrategia, cultura, operación, experiencia y métricas.',
  },
  {
    title: 'Estrategia Empresarial',
    description: 'Diseño e implementación de estrategias de crecimiento sostenible. Cómo tomar decisiones con claridad cuando el entorno es complejo e incierto.',
  },
  {
    title: 'Liderazgo',
    description: 'Desarrollo del liderazgo estratégico para equipos directivos. El líder que conecta visión con ejecución y construye equipos orientados al resultado.',
  },
  {
    title: 'Crecimiento Sostenible',
    description: 'Modelos empresariales que generan valor a largo plazo. Cómo construir una organización rentable sin sacrificar la relación con el cliente ni la cultura interna.',
  },
];

const formats = [
  {
    number: '01',
    title: 'Keynotes',
    description: 'Ponencias de alto impacto para eventos corporativos y congresos. Duración: 45–90 minutos. Adaptables al tamaño y perfil de la audiencia.',
  },
  {
    number: '02',
    title: 'Talleres',
    description: 'Sesiones interactivas para equipos directivos. Combina exposición, análisis de casos y discusión guiada. Duración: medio día o día completo.',
  },
  {
    number: '03',
    title: 'Programas Ejecutivos',
    description: 'Programas formativos de mayor duración diseñados junto con la organización. Ideal para procesos de transformación con seguimiento continuo.',
  },
];

export default function SpeakingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ backgroundColor: '#243A4D', paddingTop: '160px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              Conferencias
            </span>
            <h1 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.15, maxWidth: '720px', marginBottom: '24px' }}>
              Conferencias diseñadas para generar impacto real.
            </h1>
            <p className="font-sans text-white" style={{ fontSize: '18px', lineHeight: 1.75, maxWidth: '600px', opacity: 0.85 }}>
              No solo inspiración momentánea. Claridad, perspectiva y acción — adaptadas al contexto de tu audiencia.
            </p>
          </div>
        </section>

        {/* Topics */}
        <section style={{ backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div style={{ marginBottom: '64px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Temáticas
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Temas de conferencias
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topics.map((topic) => (
                <div
                  key={topic.title}
                  style={{
                    borderLeft: '3px solid #6A8F7B',
                    paddingLeft: '28px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                  }}
                >
                  <h3 className="font-serif font-bold" style={{ fontSize: '22px', color: '#243A4D', marginBottom: '12px' }}>
                    {topic.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formats */}
        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
          <div className="max-w-[1000px] mx-auto px-5 md:px-8">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Formatos
              </span>
              <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: '#243A4D', marginTop: '16px', lineHeight: 1.25 }}>
                Formas de entrega
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {formats.map((format, i) => (
                <div
                  key={format.number}
                  style={{
                    borderTop: '1px solid rgba(106,143,123,0.25)',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                    display: 'flex',
                    gap: '32px',
                    alignItems: 'flex-start',
                  }}
                >
                  <p className="font-sans font-bold flex-shrink-0" style={{ fontSize: '14px', color: '#6A8F7B', width: '32px' }}>
                    {format.number}
                  </p>
                  <div>
                    <h3 className="font-serif font-bold" style={{ fontSize: '22px', color: '#243A4D', marginBottom: '12px' }}>
                      {format.title}
                    </h3>
                    <p className="font-sans" style={{ fontSize: '15px', color: '#333333', lineHeight: 1.75 }}>
                      {format.description}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(106,143,123,0.25)' }} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8">
            <span className="font-sans font-semibold" style={{ fontSize: '12px', color: '#6A8F7B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ¿Tienes un evento?
            </span>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(26px, 3vw, 38px)', marginTop: '16px', marginBottom: '20px', lineHeight: 1.25 }}>
              Platiquemos y diseñamos la conferencia que tu audiencia necesita.
            </h2>
            <a
              href="/contact"
              className="inline-block font-sans font-semibold"
              style={{
                border: '2px solid #ffffff',
                color: '#ffffff',
                padding: '16px 36px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              Solicitar conferencia →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

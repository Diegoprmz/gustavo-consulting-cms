import Image from 'next/image';

const LOGOS = [
  { src: 'stanford', alt: 'Stanford University' },
  { src: 'kellogg', alt: 'Kellogg School of Management' },
  { src: 'notredame', alt: 'University of Notre Dame — Mendoza College of Business' },
  { src: 'georgetown', alt: 'Georgetown University' },
  { src: 'mcgill', alt: 'McGill University' },
  { src: 'cincinnati', alt: 'University of Cincinnati' },
  { src: 'itam', alt: 'ITAM — Instituto Tecnológico Autónomo de México' },
  { src: 'anahuac', alt: 'Universidad Anáhuac México' },
  { src: 'seminarium', alt: 'SEMINARIUM' },
  { src: 'wobi', alt: 'WOBI — World of Business Ideas' },
];

export default function InstitutionLogos() {
  return (
    <div style={{ maxWidth: '980px', margin: '64px auto 0' }}>
      <p
        className="font-sans font-semibold"
        style={{
          fontSize: '11px',
          color: '#6A8F7B',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        Instituciones donde se ha formado
      </p>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        style={{ gap: '28px 24px', alignItems: 'center', justifyItems: 'center' }}
      >
        {LOGOS.map((logo) => (
          <div key={logo.src} style={{ position: 'relative', width: '100%', height: '46px' }}>
            <Image
              src={`/assets/credenciales/${logo.src}.png`}
              alt={logo.alt}
              fill
              sizes="180px"
              style={{ objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.65 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

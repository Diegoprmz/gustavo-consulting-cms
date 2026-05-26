'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

const unis = [
  { name: 'Anáhuac',      src: '/images/universidades/anahuac.webp' },
  { name: 'EGADE',        src: '/images/universidades/egade.webp' },
  { name: 'ITAM',         src: '/images/universidades/itam.webp' },
  { name: 'Ibero',        src: '/images/universidades/ibero.webp' },
  { name: 'La Salle',     src: '/images/universidades/laSalle.webp' },
  { name: 'UNAM',         src: '/images/universidades/unam.webp' },
  { name: 'Tec de Monterrey', src: '/images/universidades/tecM.webp' },
  { name: 'UNITEC',       src: '/images/universidades/unitec.webp' },
  { name: 'UVM',          src: '/images/universidades/uvm.webp' },
  { name: 'UIC',          src: '/images/universidades/uic.webp' },
  { name: 'UFM',          src: '/images/universidades/ufm.webp' },
  { name: 'UDESINLOA',    src: '/images/universidades/uDeSinaloa.webp' },
  { name: 'EPG',          src: '/images/universidades/epg.webp' },
  { name: 'PBS',          src: '/images/universidades/pbs.webp' },
  { name: 'UAB',          src: '/images/universidades/uab.webp' },
  { name: 'UIP',          src: '/images/universidades/uip.webp' },
  { name: 'UNMSM',        src: '/images/universidades/unmsm.webp' },
  { name: 'UPC',          src: '/images/universidades/upc.webp' },
  { name: 'USIL',         src: '/images/universidades/usil.webp' },
  { name: 'UNIS',         src: '/images/universidades/unis.webp' },
  { name: 'QROO',         src: '/images/universidades/qroo.webp' },
];

const doubled = [...unis, ...unis];

export default function Universidades() {
  return (
    <section
      style={{ backgroundColor: '#F5F5F5', paddingTop: '90px', paddingBottom: '90px', overflow: 'hidden' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 700,
                color: '#243A4D',
                marginTop: '16px',
                marginBottom: '10px',
                lineHeight: 1.2,
              }}
            >
              Instituciones en las que{' '}
              <span style={{ color: '#6A8F7B', fontStyle: 'italic', fontWeight: 400 }}>he colaborado</span>
            </h2>
            <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', maxWidth: '520px', margin: '0 auto' }}>
              Formando directivos con visión estratégica en México y Latinoamérica.
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width marquee */}
      <div className="overflow-hidden" style={{ marginBottom: '0' }}>
        <div style={{ animation: 'marquee 36.8s linear infinite', display: 'flex', width: 'max-content' }}>
          {doubled.map((uni, i) => (
            <motion.div
              key={`${uni.name}-${i}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '180px',
                height: '90px',
                marginRight: '64px',
                cursor: 'pointer'
              }}
            >
              <Image
                src={uni.src}
                alt={uni.name}
                width={140}
                height={70}
                className="object-contain"
                style={{ maxWidth: '140px', maxHeight: '70px' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

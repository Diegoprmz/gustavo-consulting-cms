'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GoldDots from '@/components/ui/GoldDots';

const unis = [
  { name: 'Anáhuac',        src: '/images/universidades/anahuac.webp' },
  { name: 'EGADE',          src: '/images/universidades/egade.webp' },
  { name: 'ITAM',           src: '/images/universidades/itam.webp' },
  { name: 'Ibero',          src: '/images/universidades/ibero.webp' },
  { name: 'La Salle',       src: '/images/universidades/laSalle.webp' },
  { name: 'UNAM',           src: '/images/universidades/unam.webp' },
  { name: 'Tec de Monterrey', src: '/images/universidades/tecM.webp' },
  { name: 'UNITEC',         src: '/images/universidades/unitec.webp' },
  { name: 'UVM',            src: '/images/universidades/uvm.webp' },
  { name: 'UIC',            src: '/images/universidades/uic.webp' },
  { name: 'UFM',            src: '/images/universidades/ufm.webp' },
  { name: 'UDESINLOA',      src: '/images/universidades/uDeSinaloa.webp' },
  { name: 'EPG',            src: '/images/universidades/epg.webp' },
  { name: 'PBS',            src: '/images/universidades/pbs.webp' },
  { name: 'UAB',            src: '/images/universidades/uab.webp' },
  { name: 'UIP',            src: '/images/universidades/uip.webp' },
  { name: 'UNMSM',          src: '/images/universidades/unmsm.webp' },
  { name: 'UPC',            src: '/images/universidades/upc.webp' },
  { name: 'USIL',           src: '/images/universidades/usil.webp' },
  { name: 'UNIS',           src: '/images/universidades/unis.webp' },
  { name: 'QROO',           src: '/images/universidades/qroo.webp' },
];

const doubled = [...unis, ...unis];

export default function Universidades() {
  const [paused, setPaused] = useState(false);
  return (
    <section style={{ backgroundColor: '#ffffff', paddingTop: '40px', paddingBottom: '40px', overflow: 'hidden' }}>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <GoldDots />

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 700, color: '#243A4D', lineHeight: 1, marginBottom: '10px' }}
            >
              Instituciones
            </h2>
            <p
              className="font-serif"
              style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontStyle: 'italic', fontWeight: 400, color: '#6A8F7B' }}
            >
              en las que he colaborado
            </p>
          </div>
        </AnimatedSection>
      </div>

      {/* Marquee full-width */}
      <div
        className="overflow-hidden"
        style={{ cursor: paused ? 'default' : 'grab' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ animation: 'marquee 36.8s linear infinite', animationPlayState: paused ? 'paused' : 'running', display: 'flex', width: 'max-content' }}>
          {doubled.map((uni, i) => (
            <motion.div
              key={`${uni.name}-${i}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: '180px', height: '95px', marginRight: '64px', cursor: 'pointer' }}
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

      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <GoldDots />
      </div>
    </section>
  );
}

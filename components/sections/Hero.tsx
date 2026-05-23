'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      className="bg-white flex items-center justify-center"
      style={{ paddingTop: '140px', paddingBottom: '140px' }}
    >
      <div
        className="w-full max-w-[720px] mx-auto px-5 flex flex-col items-center text-center"
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-serif font-bold text-navy"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.2,
            color: '#243A4D',
          }}
        >
          GUSTAVO MARTÍNEZ
        </motion.h1>

        {/* Roles */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          className="font-sans font-medium text-charcoal mt-6"
          style={{
            fontSize: 'clamp(11px, 1.5vw, 16px)',
            letterSpacing: '0.04em',
            lineHeight: 1.5,
            color: '#333333',
          }}
        >
          CONSEJERO CORPORATIVO · ASESOR DE NEGOCIOS · FORMADOR EN EDUCACIÓN EJECUTIVA
        </motion.p>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.24 }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 15px 40px rgba(106,143,123,0.18)',
          }}
          className="mt-12 cursor-default"
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(36,58,77,0.1)',
            transition: 'box-shadow 0.4s ease-out',
            maxWidth: '320px',
            width: '100%',
          }}
        >
          <Image
            src="/images/gustavo.svg"
            alt="Gustavo Martínez Pellón — Consultor Estratégico Internacional"
            width={320}
            height={400}
            className="block w-full object-cover"
            style={{ display: 'block' }}
            unoptimized
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

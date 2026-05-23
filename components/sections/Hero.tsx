'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      className="relative bg-white overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}
    >
      {/* Faint olive grid pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(106,143,123,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(106,143,123,0.05) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          pointerEvents: 'none',
        }}
      />

      <div className="relative w-full max-w-[720px] mx-auto px-6 flex flex-col items-center text-center">

        {/* Kicker label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginBottom: '24px' }}
        >
          <span className="label-olive">Consultoría Estratégica Internacional</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-serif font-bold"
          style={{
            fontSize: 'clamp(44px, 7.5vw, 80px)',
            lineHeight: 1.04,
            color: '#243A4D',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Gustavo<br />Martínez
        </motion.h1>

        {/* Olive divider bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.28 }}
          style={{
            width: '52px',
            height: '3px',
            backgroundColor: '#6A8F7B',
            borderRadius: '2px',
            marginBottom: '22px',
            transformOrigin: 'left center',
          }}
        />

        {/* Roles */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
          className="font-sans font-medium"
          style={{
            fontSize: 'clamp(10px, 1.3vw, 13px)',
            letterSpacing: '0.24em',
            lineHeight: 1.9,
            color: '#6B7280',
            textTransform: 'uppercase',
            marginBottom: '52px',
          }}
        >
          Consejero Corporativo&nbsp;&nbsp;·&nbsp;&nbsp;Consultor Empresarial&nbsp;&nbsp;·&nbsp;&nbsp;Profesor Ejecutivo
        </motion.p>

        {/* Photo with olive glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.42 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          {/* Glow ring behind photo */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-40px',
              background: 'radial-gradient(circle, rgba(106,143,123,0.2) 0%, transparent 65%)',
              borderRadius: '50%',
              animation: 'glow-pulse 7s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 14px 44px rgba(36,58,77,0.14)',
              maxWidth: '300px',
              width: '100%',
              outline: '1.5px solid rgba(106,143,123,0.22)',
              outlineOffset: '7px',
            }}
          >
            <Image
              src="/images/gustavo.svg"
              alt="Gustavo Martínez Pellón — Consultor Estratégico Internacional"
              width={300}
              height={380}
              className="block w-full object-cover"
              unoptimized
              priority
            />
          </motion.div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.62 }}
          style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}
        >
          <a
            href="#conversemos"
            className="btn-shimmer font-sans font-semibold text-white"
            style={{
              padding: '15px 36px',
              borderRadius: '8px',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'inline-block',
            }}
          >
            Agendar conversación
          </a>

          <motion.a
            href="#trayectoria"
            whileHover={{ borderColor: '#243A4D', color: '#243A4D' }}
            transition={{ duration: 0.2 }}
            className="font-sans font-medium"
            style={{
              padding: '15px 32px',
              borderRadius: '8px',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '1.5px solid rgba(106,143,123,0.55)',
              color: '#6A8F7B',
              display: 'inline-block',
            }}
          >
            Conocer más →
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{ marginTop: '60px', animation: 'scroll-bounce 2.2s ease-in-out infinite' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6A8F7B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>

      </div>
    </section>
  );
}

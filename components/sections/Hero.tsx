'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0 },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY     = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.55], ['0%', '-8%']);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* ── Desktop: split layout ── */}
      <div className="hidden md:flex w-full" style={{ minHeight: '100vh' }}>

        {/* Left — text column */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, width: '46%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 56px 80px 80px', position: 'relative', zIndex: 2 }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-serif"
              style={{
                fontSize: 'clamp(64px, 7.5vw, 112px)',
                lineHeight: 0.92,
                fontWeight: 700,
                color: '#243A4D',
                letterSpacing: '-0.025em',
                marginBottom: '20px',
              }}
            >
              Gustavo<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: '#6A8F7B' }}>Martínez</span>
            </motion.h1>

            {/* Gold rule */}
            <motion.div
              variants={itemVariants}
              style={{
                width: '64px',
                height: '2px',
                background: 'linear-gradient(90deg, #C9A84C 0%, rgba(201,168,76,0.2) 100%)',
                marginBottom: '28px',
                borderRadius: '2px',
              }}
            />

            {/* Roles */}
            <motion.p
              variants={itemVariants}
              className="font-sans"
              style={{
                fontSize: 'clamp(10px, 1.05vw, 12px)',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#6B7280',
                lineHeight: 2,
                marginBottom: '44px',
              }}
            >
              Consejero Corporativo&nbsp;&nbsp;·&nbsp;&nbsp;Consultor Empresarial
              <br />
              Profesor Ejecutivo
            </motion.p>

            {/* Gold tagline */}
            <motion.p
              variants={itemVariants}
              className="font-serif"
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#243A4D',
                lineHeight: 1.5,
                maxWidth: '420px',
                marginBottom: '48px',
              }}
            >
              Conectando{' '}
              <span style={{ color: '#C9A84C' }}>estrategia</span>{' '}
              y{' '}
              <span style={{ color: '#C9A84C' }}>cliente</span>{' '}
              en decisiones que transforman organizaciones.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(36,58,77,0.22)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="btn-shimmer font-sans font-semibold text-white"
                style={{
                  padding: '16px 38px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                }}
              >
                Agendar conversación
              </motion.a>

              <motion.a
                href="#trayectoria"
                whileHover={{ color: '#243A4D', borderColor: '#243A4D' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="font-sans font-medium link-slide"
                style={{
                  padding: '16px 28px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  border: '1.5px solid rgba(106,143,123,0.5)',
                  color: '#6A8F7B',
                  display: 'inline-block',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                Conocer más →
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '60px',
                paddingTop: '36px',
                borderTop: '1px solid rgba(106,143,123,0.18)',
              }}
            >
              {[
                { n: '30+', label: 'Años de trayectoria' },
                { n: '3',   label: 'Perspectivas integradas' },
                { n: 'LATAM', label: 'Alcance regional' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{n}</p>
                  <p className="font-sans" style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.08em', marginTop: '5px', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — parallax photo */}
        <div style={{ width: '54%', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            style={{
              y: photoY,
              position: 'absolute',
              inset: 0,
              bottom: '-20%',
            }}
          >
            <Image
              src="/assets/gustavo_americana_SBG.png"
              alt="Gustavo Martínez Pellón — Consultor Estratégico Internacional"
              fill
              className="object-cover object-top"
              priority
              sizes="54vw"
            />
          </motion.div>

          {/* Decorative vertical rule on left edge */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '20%',
              bottom: '20%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.35), transparent)',
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="flex md:hidden flex-col w-full" style={{ minHeight: '100vh' }}>
        {/* Photo */}
        <div style={{ position: 'relative', height: '55vh', overflow: 'hidden' }}>
          <Image
            src="/assets/gustavo_americana_SBG.png"
            alt="Gustavo Martínez Pellón"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #ffffff)' }} />
        </div>

        {/* Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: '32px 24px 60px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif"
            style={{ fontSize: '54px', lineHeight: 0.92, fontWeight: 700, color: '#243A4D', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Gustavo<br />
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: '#6A8F7B' }}>Martínez</span>
          </motion.h1>

          <motion.div variants={itemVariants} style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))', marginBottom: '18px', borderRadius: '2px' }} />

          <motion.p
            variants={itemVariants}
            className="font-sans"
            style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B7280', lineHeight: 1.9, marginBottom: '28px' }}
          >
            Consejero Corporativo · Consultor · Profesor Ejecutivo
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-serif"
            style={{ fontSize: '19px', fontStyle: 'italic', color: '#243A4D', lineHeight: 1.5, marginBottom: '32px' }}
          >
            Conectando <span style={{ color: '#C9A84C' }}>estrategia</span> y <span style={{ color: '#C9A84C' }}>cliente</span> en decisiones que transforman.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/contact" className="btn-shimmer font-sans font-semibold text-white text-center" style={{ padding: '16px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase', display: 'block' }}>
              Agendar conversación
            </a>
            <a href="#trayectoria" className="font-sans font-medium text-center" style={{ padding: '15px', borderRadius: '8px', fontSize: '13px', letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase', border: '1.5px solid rgba(106,143,123,0.5)', color: '#6A8F7B', display: 'block' }}>
              Conocer más →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="hidden md:block"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'scroll-bounce 2.4s ease-in-out infinite',
          zIndex: 10,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}

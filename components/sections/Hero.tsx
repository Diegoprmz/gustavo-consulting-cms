'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY      = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5],  [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.5],  ['0%', '-10%']);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #243A4D 0%, #31485B 50%, #4A6174 100%)',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* ── Desktop: split layout ── */}
      <div className="hidden md:flex w-full" style={{ minHeight: '100vh' }}>

        {/* Left — text column */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            width: '46%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '120px 56px 80px 80px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div variants={containerVariants} initial="hidden" animate="visible">

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="font-serif"
              style={{
                fontSize: 'clamp(60px, 7vw, 108px)',
                lineHeight: 0.92,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.025em',
                marginBottom: '22px',
              }}
            >
              Gustavo<br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>Martínez</span>
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
                fontSize: 'clamp(11px, 1.0vw, 12px)',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.80)',
                lineHeight: 2,
                marginBottom: '44px',
              }}
            >
              Consejero Corporativo&nbsp;&nbsp;·&nbsp;&nbsp;Consultor Empresarial
              <br />
              Profesor Ejecutivo
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="font-serif"
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.55,
                maxWidth: '420px',
                marginBottom: '52px',
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
                whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(201,168,76,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="btn-shimmer font-sans font-semibold text-white"
                style={{
                  padding: '16px 38px',
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
                whileHover={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="font-sans font-medium editorial-link"
                style={{
                  padding: '16px 28px',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  border: '1.5px solid rgba(106,143,123,0.45)',
                  color: '#6A8F7B',
                  display: 'inline-block',
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
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {[
                { n: '30+',  label: 'Años de trayectoria' },
                { n: '3',    label: 'Perspectivas integradas' },
                { n: 'LATAM', label: 'Alcance regional' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, color: '#C9A84C', lineHeight: 1 }}>{n}</p>
                  <p className="font-sans" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', marginTop: '5px', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — parallax photo with gold glow */}
        <div style={{ width: '54%', position: 'relative', overflow: 'hidden' }}>
          {/* Radial gold glow behind photo */}
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '440px',
              height: '440px',
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, transparent 70%)',
              animation: 'glow-pulse 4s ease-in-out infinite',
              zIndex: 1,
            }}
          />

          <motion.div
            style={{
              y: photoY,
              position: 'absolute',
              inset: 0,
              bottom: '-20%',
              zIndex: 2,
            }}
          >
            <Image
              src="/assets/gustavo-25.jpeg"
              alt="Gustavo Martínez Pellón — Consultor Estratégico Internacional"
              fill
              className="object-cover object-center"
              priority
              sizes="54vw"
            />
          </motion.div>

          {/* Vertical rule on left edge */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '18%',
              bottom: '18%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)',
              zIndex: 3,
            }}
          />
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="flex md:hidden flex-col w-full" style={{ minHeight: '100vh' }}>
        {/* Photo */}
        <div style={{ position: 'relative', height: '52vh', overflow: 'hidden' }}>
          {/* Gold glow */}
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.2) 0%, transparent 70%)',
              animation: 'glow-pulse 4s ease-in-out infinite',
              zIndex: 1,
            }}
          />
          <Image
            src="/assets/gustavo-25.jpeg"
            alt="Gustavo Martínez Pellón"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            style={{ zIndex: 2 }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, transparent, #31485B)', zIndex: 3 }} />
        </div>

        {/* Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: '32px 24px 72px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif"
            style={{ fontSize: '54px', lineHeight: 0.92, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Gustavo<br />
            <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>Martínez</span>
          </motion.h1>

          <motion.div variants={itemVariants} style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))', marginBottom: '18px' }} />

          <motion.p
            variants={itemVariants}
            className="font-sans"
            style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', lineHeight: 1.9, marginBottom: '28px' }}
          >
            Consejero Corporativo · Consultor · Profesor Ejecutivo
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="font-serif"
            style={{ fontSize: '19px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.55, marginBottom: '36px' }}
          >
            Conectando <span style={{ color: '#C9A84C' }}>estrategia</span> y <span style={{ color: '#C9A84C' }}>cliente</span> en decisiones que transforman.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="/contact"
              className="btn-shimmer font-sans font-semibold text-white text-center"
              style={{ padding: '16px', fontSize: '13px', letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase', display: 'block' }}
            >
              Agendar conversación
            </a>
            <a
              href="#trayectoria"
              className="font-sans font-medium text-center"
              style={{ padding: '15px', fontSize: '13px', letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase', border: '1.5px solid rgba(106,143,123,0.4)', color: '#6A8F7B', display: 'block' }}
            >
              Conocer más →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="hidden md:flex flex-col items-center gap-2"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <span
          className="font-sans"
          style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            marginBottom: '8px',
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}

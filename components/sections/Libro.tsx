'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Libro() {
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setRotation((prev) => {
      const newRotation = (prev + 180) % 360;
      setIsFlipped(!isFlipped);
      return newRotation;
    });
  };

  return (
    <section
      id="libro"
      style={{ background: 'linear-gradient(to bottom, #243A4D 0%, #243A4D 85%, #3D5C4A 100%)', paddingTop: '110px', paddingBottom: '110px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left: Animated Book */}
          <AnimatedSection>
            <div className="flex justify-center md:justify-start">
              {/* Perspective wrapper */}
              <div
                style={{ perspective: '1400px', cursor: 'pointer' }}
                onClick={handleFlip}
              >
                {/* Rotating book */}
                <motion.div
                  className="preserve-3d"
                  animate={{ rotateY: rotation }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
                  style={{
                    width: '280px',
                    height: '394px',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                    borderRadius: '6px',
                  }}
                >
                  {/* Front face — frame + floating image */}
                  <div
                    className="backface-hidden absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      borderRadius: '6px',
                      backgroundColor: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                    }}
                  >
                    <Image
                      src="/assets/libro_portada.jpg"
                      alt="Customer Centricity — portada"
                      width={248}
                      height={350}
                      className="block"
                      style={{ borderRadius: '3px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                      priority
                    />
                  </div>

                  {/* Back face — frame + floating image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: '6px',
                      backgroundColor: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                    }}
                  >
                    <Image
                      src="/assets/libro_contraportada.jpg"
                      alt="Customer Centricity — contraportada"
                      width={248}
                      height={350}
                      className="block"
                      style={{ borderRadius: '3px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text with hierarchy */}
          <AnimatedSection delay={0.15}>

            {/* Gold title */}
            <h2
              className="font-serif gold-shimmer"
              style={{
                fontSize: 'clamp(54px, 7vw, 88px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              Customer<br /><span style={{ fontStyle: 'italic' }}>Centricity</span>
            </h2>

            {/* Gold divider */}
            <div className="gold-divider" style={{ marginBottom: '24px' }} />

            {/* Subtitle */}
            <h3
              className="font-serif text-white"
              style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, marginBottom: '24px' }}
            >
              Un enfoque estructurado para integrar al{' '}
              <span style={{ color: '#C9A84C' }}>cliente</span>{' '}
              en la estrategia.
            </h3>

            {/* Description */}
            <p
              className="font-sans text-white"
              style={{ fontSize: '15px', lineHeight: 1.82, opacity: 0.88, marginBottom: '14px' }}
            >
              Este libro nace de más de treinta años de trabajo con empresas que buscaban
              crecer, pero que no lograban conectar genuinamente con sus clientes.
              Es una guía estructurada y práctica para directivos que quieren llevar al
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}> cliente al centro de la estrategia</span>,
              no como discurso, sino como transformación real.
            </p>
            <p
              className="font-sans text-white"
              style={{ fontSize: '15px', lineHeight: 1.82, opacity: 0.85, marginBottom: '36px' }}
            >
              A través de cinco dimensiones —
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}> estrategia, cultura, operación, experiencia y métricas</span>{' '}
              — el libro ofrece un marco integrador que permite alinear toda la organización.
            </p>

            {/* CTA */}
            <motion.a
              href="https://www.amazon.com.mx/Customer-Centricity-El-foco-cliente/dp/B0FYH6G6JS/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: '#C9A84C', borderColor: '#C9A84C', color: '#243A4D', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 font-sans font-semibold text-white"
              style={{
                border: '1.5px solid rgba(255,255,255,0.5)',
                padding: '14px 30px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              VER EN AMAZON
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </motion.a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

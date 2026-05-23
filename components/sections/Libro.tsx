'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function Libro() {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        setRotation((prev) => prev + 180);
      }
    }, 4600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{ backgroundColor: '#243A4D', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Animated Book */}
          <AnimatedSection>
            <div className="flex justify-center md:justify-start">
              <div
                style={{ perspective: '1200px' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <motion.div
                  className="relative preserve-3d"
                  animate={{ rotateY: rotation }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    width: '280px',
                    height: '392px',
                    transformStyle: 'preserve-3d',
                    cursor: 'default',
                    boxShadow: '0 15px 50px rgba(0,0,0,0.25)',
                    borderRadius: '4px',
                  }}
                >
                  {/* Front face */}
                  <div
                    className="backface-hidden absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src="/images/libro/portada.png"
                      alt="Customer Centricity — portada"
                      width={280}
                      height={392}
                      className="block w-full h-full object-cover"
                      priority
                    />
                  </div>

                  {/* Back face */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src="/images/libro/portada.png"
                      alt="Customer Centricity — contraportada"
                      width={280}
                      height={392}
                      className="block w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Text */}
          <AnimatedSection delay={0.15}>
            {/* Label */}
            <p
              className="font-sans font-semibold mb-4"
              style={{
                fontSize: '12px',
                color: '#6A8F7B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              PENSAMIENTO ESTRUCTURADO
            </p>

            {/* Book title */}
            <p
              className="font-sans font-bold text-white mb-3"
              style={{ fontSize: '24px' }}
            >
              Libro: Customer Centricity
            </p>

            {/* Headline */}
            <h2
              className="font-serif text-white mb-6"
              style={{
                fontSize: 'clamp(28px, 3.2vw, 38px)',
                lineHeight: 1.3,
                fontWeight: 700,
              }}
            >
              Un enfoque estructurado para integrar al cliente en la estrategia.
            </h2>

            {/* Description */}
            <p
              className="font-sans text-white mb-4"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                opacity: 0.9,
              }}
            >
              Este libro nace de más de treinta años de trabajo con empresas que buscaban
              crecer, pero que no lograban conectar genuinamente con sus clientes. Es una
              guía estructurada y práctica para directivos que quieren llevar al cliente
              al centro de la estrategia, no como discurso, sino como transformación real.
            </p>
            <p
              className="font-sans text-white mb-8"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                opacity: 0.9,
              }}
            >
              A través de cinco dimensiones — estrategia, cultura, operación, experiencia
              y métricas — el libro ofrece un marco integrador que permite alinear toda la
              organización en torno al valor que entrega al cliente.
            </p>

            {/* CTA Button */}
            <motion.a
              href="https://www.amazon.com.mx/Customer-Centricity-El-foco-cliente/dp/B0FYH6G6JS/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ backgroundColor: '#ffffff', color: '#243A4D' }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 font-sans font-semibold text-white cursor-pointer"
              style={{
                border: '2px solid #ffffff',
                padding: '14px 28px',
                borderRadius: '6px',
                fontSize: '14px',
                letterSpacing: '0.04em',
                textDecoration: 'none',
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

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GradientTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        backgroundColor: '#243A4D',
      }}
    >

      {/* Animated scroll line indicator */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '2px',
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
        }}
      />

      {/* Scroll text */}
      <motion.p
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#C9A84C',
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 600,
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          marginTop: '160px',
        }}
      >
        Continúa explorando
      </motion.p>
    </section>
  );
}

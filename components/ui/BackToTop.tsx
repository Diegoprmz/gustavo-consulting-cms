'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver al inicio"
          whileHover={{
            scale: 1.08,
            boxShadow: '0 8px 24px rgba(201,168,76,0.25)',
          }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '28px',
            width: '44px',
            height: '44px',
            background: 'linear-gradient(135deg, #243A4D 0%, #31485B 100%)',
            border: '1.5px solid rgba(201,168,76,0.45)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 490,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 12V4M8 4L3.5 8.5M8 4l4.5 4.5"
              stroke="#C9A84C"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

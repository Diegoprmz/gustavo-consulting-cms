'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#243A4D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      {/* Número 404 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span
          className="font-serif"
          style={{
            fontSize: 'clamp(100px, 20vw, 180px)',
            fontWeight: 700,
            color: 'transparent',
            WebkitTextStroke: '2px rgba(201,168,76,0.4)',
            lineHeight: 1,
            display: 'block',
            letterSpacing: '-4px',
          }}
        >
          404
        </span>
      </motion.div>

      {/* Línea dorada */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          width: '60px',
          height: '3px',
          background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))',
          margin: '0 auto 32px',
        }}
      />

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#ffffff',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          Página no encontrada
        </h1>
        <p
          className="font-sans"
          style={{
            fontSize: '17px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            maxWidth: '420px',
            margin: '0 auto 40px',
          }}
        >
          La página que buscas no existe o fue movida.
          Regresa al inicio y continúa explorando.
        </p>
      </motion.div>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link href="/">
          <motion.span
            whileHover={{ backgroundColor: '#C9A84C', color: '#1E293B' }}
            transition={{ duration: 0.22 }}
            className="font-sans font-semibold"
            style={{
              display: 'inline-block',
              backgroundColor: '#243A4D',
              color: '#ffffff',
              border: '1.5px solid rgba(201,168,76,0.5)',
              padding: '14px 32px',
              borderRadius: '8px',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Ir al inicio →
          </motion.span>
        </Link>
        <Link href="/contact">
          <motion.span
            whileHover={{ color: '#C9A84C' }}
            transition={{ duration: 0.22 }}
            className="font-sans"
            style={{
              display: 'inline-block',
              color: 'rgba(255,255,255,0.55)',
              padding: '14px 32px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Contacto
          </motion.span>
        </Link>
      </motion.div>
    </main>
  );
}

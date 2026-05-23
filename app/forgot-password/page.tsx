'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #243A4D 0%, #31485B 50%, #4A6174 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          backgroundColor: '#ffffff',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/">
            <Image src="/assets/gustavo_firma.png" alt="Gustavo Martínez" width={180} height={46} style={{ maxHeight: '40px', width: 'auto', marginBottom: '24px' }} />
          </Link>
          <h1 className="font-serif" style={{ fontSize: '28px', fontWeight: 700, color: '#243A4D' }}>
            Recuperar contraseña
          </h1>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(106,143,123,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6A8F7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-sans" style={{ fontSize: '15px', color: '#4A5568', lineHeight: 1.7 }}>
              Enviamos un enlace de recuperación a <strong>{email}</strong>. Revisa tu bandeja de entrada.
            </p>
            <Link href="/login" className="font-sans font-semibold" style={{ display: 'block', marginTop: '24px', color: '#6A8F7B', textDecoration: 'none', fontSize: '14px' }}>
              ← Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p className="font-sans" style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px', lineHeight: 1.7 }}>
              Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div>
              <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
                Correo electrónico
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-styled" placeholder="tu@correo.com" />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              className="btn-shimmer font-sans font-semibold text-white"
              style={{ padding: '16px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}
            >
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </motion.button>
            <Link href="/login" className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#6A8F7B', textDecoration: 'none', marginTop: '4px' }}>
              ← Volver
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
}

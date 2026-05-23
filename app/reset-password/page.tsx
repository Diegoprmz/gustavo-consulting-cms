'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [done, setDone]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
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
        style={{ backgroundColor: '#ffffff', padding: '48px 40px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link href="/">
            <Image src="/assets/gustavo_firma.png" alt="Gustavo Martínez" width={180} height={46} style={{ maxHeight: '40px', width: 'auto', marginBottom: '24px' }} />
          </Link>
          <h1 className="font-serif" style={{ fontSize: '28px', fontWeight: 700, color: '#243A4D' }}>
            Nueva contraseña
          </h1>
        </div>

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <p className="font-sans" style={{ fontSize: '15px', color: '#4A5568' }}>
              Contraseña actualizada con éxito.
            </p>
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="btn-shimmer font-sans font-semibold text-white"
                style={{ padding: '16px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginTop: '24px', cursor: 'pointer' }}
              >
                Iniciar sesión
              </motion.div>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
                Nueva contraseña
              </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-styled" placeholder="Mínimo 8 caracteres" />
            </div>
            <div>
              <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
                Confirmar contraseña
              </label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className={`input-styled${error ? ' error' : ''}`} placeholder="Repite la contraseña" />
              {error && <p className="font-sans" style={{ fontSize: '12px', color: '#E53E3E', marginTop: '6px' }}>{error}</p>}
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              className="btn-shimmer font-sans font-semibold text-white"
              style={{ padding: '16px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}
            >
              {loading ? 'Guardando...' : 'Guardar contraseña'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

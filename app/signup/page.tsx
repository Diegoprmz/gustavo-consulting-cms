'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
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
            <Image
              src="/assets/gustavo_firma.png"
              alt="Gustavo Martínez"
              width={180}
              height={46}
              style={{ maxHeight: '40px', width: 'auto', marginBottom: '24px' }}
            />
          </Link>
          <h1 className="font-serif" style={{ fontSize: '28px', fontWeight: 700, color: '#243A4D' }}>
            Crear cuenta
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
              Nombre completo
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-styled" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
              Correo electrónico
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-styled" placeholder="tu@correo.com" />
          </div>
          <div>
            <label className="font-sans" style={{ fontSize: '13px', fontWeight: 500, color: '#243A4D', display: 'block', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-styled" placeholder="Mínimo 8 caracteres" />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-shimmer font-sans font-semibold text-white"
            style={{ padding: '16px', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '8px' }}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </motion.button>
        </form>

        <p className="font-sans" style={{ textAlign: 'center', fontSize: '13px', color: '#9CA3AF', marginTop: '28px' }}>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" style={{ color: '#6A8F7B', textDecoration: 'none', fontWeight: 500 }}>
            Ingresar
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

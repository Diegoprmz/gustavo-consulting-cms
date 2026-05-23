'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'El Libro',    href: '#libro' },
  { label: 'Artículos',   href: '#articulos' },
  { label: 'Conversemos', href: '#conversemos' },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '0 40px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(106,143,123,0.14)' : 'none',
        transition: 'background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{ textDecoration: 'none' }}
      >
        <span
          className="font-serif"
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: scrolled ? '#243A4D' : '#243A4D',
            letterSpacing: '0.06em',
          }}
        >
          Gustavo Martínez
        </span>
        <span
          className="font-sans"
          style={{
            display: 'block',
            fontSize: '9px',
            fontWeight: 600,
            color: '#6A8F7B',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '1px',
          }}
        >
          Consultoría Estratégica
        </span>
      </a>

      {/* Desktop links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <motion.a
            key={l.label}
            href={l.href}
            whileHover={{ color: '#6A8F7B' }}
            transition={{ duration: 0.2 }}
            className="font-sans"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#243A4D',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            {l.label}
          </motion.a>
        ))}

        {/* CTA */}
        <motion.a
          href="#conversemos"
          whileHover={{ backgroundColor: '#6A8F7B', scale: 1.04 }}
          transition={{ duration: 0.25 }}
          className="font-sans font-semibold"
          style={{
            backgroundColor: '#243A4D',
            color: '#ffffff',
            padding: '10px 22px',
            borderRadius: '6px',
            fontSize: '13px',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          Agendar conversación
        </motion.a>
      </nav>

      {/* Hamburger — mobile */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="md:hidden flex flex-col gap-[5px] p-2"
        aria-label="Menú"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '22px',
              height: '2px',
              backgroundColor: '#243A4D',
              borderRadius: '2px',
              transition: 'transform 0.25s',
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid rgba(106,143,123,0.15)',
              padding: '24px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#243A4D',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#conversemos"
              onClick={() => setMenuOpen(false)}
              className="font-sans font-semibold text-white text-center"
              style={{
                backgroundColor: '#243A4D',
                padding: '14px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              Agendar conversación
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

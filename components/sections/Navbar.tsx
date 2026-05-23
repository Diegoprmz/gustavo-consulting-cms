'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const links = [
  { label: 'Trayectoria',  href: '/about' },
  { label: 'Servicios',    href: '/services' },
  { label: 'Blog',         href: '#articulos' },
  { label: 'Conferencias', href: '/speaking' },
  { label: 'Contacto',     href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = !scrolled;

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
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <Image
          src="/assets/gustavo_firma.png"
          alt="Gustavo Martínez Business Consulting"
          width={200}
          height={52}
          className="object-contain"
          style={{
            maxHeight: '44px',
            width: 'auto',
            filter: isDark ? 'brightness(0) invert(1)' : 'none',
            opacity: isDark ? 0.9 : 1,
            transition: 'filter 0.4s ease, opacity 0.4s ease',
          }}
          priority
        />
      </a>

      {/* Desktop links */}
      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <motion.a
            key={l.label}
            href={l.href}
            whileHover={{ color: '#6A8F7B' }}
            transition={{ duration: 0.2 }}
            className="font-sans editorial-link"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.85)' : '#243A4D',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.4s ease',
            }}
          >
            {l.label}
          </motion.a>
        ))}

        {/* CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="font-sans font-semibold"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : '#243A4D',
            color: '#ffffff',
            padding: '10px 22px',
            fontSize: '13px',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            border: isDark ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
            backdropFilter: isDark ? 'blur(8px)' : 'none',
            transition: 'background-color 0.4s ease, border-color 0.4s ease',
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
              backgroundColor: isDark ? 'rgba(255,255,255,0.85)' : '#243A4D',
              transition: 'background-color 0.4s ease',
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
              backgroundColor: 'rgba(36,58,77,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(106,143,123,0.2)',
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
                className="font-sans editorial-link"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.85)',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-sans font-semibold text-white text-center"
              style={{
                backgroundColor: '#C9A84C',
                padding: '14px',
                textDecoration: 'none',
                fontSize: '14px',
                letterSpacing: '0.06em',
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

'use client';

import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Trayectoria',   href: '/about' },
  { label: 'Servicios',     href: '/services' },
  { label: 'Blog',          href: '#articulos' },
  { label: 'Conferencias',  href: '/speaking' },
  { label: 'Contacto',      href: '/contact' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: '#6A8F7B', x: 3 }}
      transition={{ duration: 0.18 }}
      className="block font-sans"
      style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '11px' }}
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#243A4D' }}>
      {/* Olive top accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #6A8F7B 0%, rgba(106,143,123,0.3) 100%)' }} />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          {/* Branding */}
          <div>
            <p className="font-serif font-bold text-white" style={{ fontSize: '20px', marginBottom: '6px' }}>
              Gustavo Martínez
            </p>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: '10px', color: '#6A8F7B', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '18px' }}
            >
              Consultoría Estratégica
            </p>
            <p className="font-sans" style={{ fontSize: '14px', lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', maxWidth: '280px' }}>
              Asesoría estratégica para empresas que buscan crecimiento sostenible
              y transformación centrada en el cliente.
            </p>
            <div style={{ marginTop: '24px', width: '36px', height: '2px', backgroundColor: '#6A8F7B' }} />
          </div>

          {/* Navigation */}
          <div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: '11px', color: '#6A8F7B', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px' }}
            >
              Navegación
            </p>
            {navLinks.map((l) => <FooterLink key={l.label} href={l.href}>{l.label}</FooterLink>)}
          </div>

          {/* Contact */}
          <div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: '11px', color: '#6A8F7B', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '20px' }}
            >
              Contacto
            </p>
            <motion.a
              href="mailto:contacto@gustavo.consulting"
              whileHover={{ color: '#6A8F7B' }}
              transition={{ duration: 0.18 }}
              className="block font-sans"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '12px' }}
            >
              contacto@gustavo.consulting
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/gustavo-martinez-pellon/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#6A8F7B' }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2 font-sans"
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(106,143,123,0.2)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <p className="font-sans" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)' }}>
            © 2026 Gustavo Martínez Business Consulting. Todos los derechos reservados.
          </p>
          <motion.a
            href="/admin"
            whileHover={{ opacity: 1, color: '#6A8F7B' }}
            transition={{ duration: 0.18 }}
            className="font-sans"
            style={{ fontSize: '12px', color: '#6A8F7B', opacity: 0.5, textDecoration: 'none' }}
          >
            Administración
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

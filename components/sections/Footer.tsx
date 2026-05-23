'use client';

import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Servicios', href: '#colaboracion' },
  { label: 'Blog', href: '/blog' },
  { label: 'El Libro', href: '#libro' },
  { label: 'Contacto', href: '#conversemos' },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: '#6A8F7B' }}
      transition={{ duration: 0.2 }}
      className="block font-sans"
      style={{
        fontSize: '14px',
        color: 'rgba(255,255,255,0.8)',
        textDecoration: 'none',
        marginBottom: '10px',
      }}
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#243A4D' }}>
      <div
        className="max-w-[1200px] mx-auto px-5 md:px-8"
        style={{ paddingTop: '80px', paddingBottom: '40px' }}
      >
        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Col 1: Branding */}
          <div>
            <p
              className="font-sans font-bold text-white mb-4"
              style={{ fontSize: '18px' }}
            >
              Gustavo Martínez
            </p>
            <p
              className="font-sans text-white"
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                opacity: 0.8,
                maxWidth: '300px',
              }}
            >
              Asesoría estratégica para empresas que buscan crecimiento sostenible
              y transformación centrada en el cliente.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p
              className="font-sans font-semibold mb-4"
              style={{
                fontSize: '12px',
                color: '#6A8F7B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              NAVEGACIÓN
            </p>
            {navLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Col 3: Contact */}
          <div>
            <p
              className="font-sans font-semibold mb-4"
              style={{
                fontSize: '12px',
                color: '#6A8F7B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              CONTACTO
            </p>

            <motion.a
              href="mailto:contacto@gustavo.consulting"
              whileHover={{ color: '#6A8F7B' }}
              transition={{ duration: 0.2 }}
              className="block font-sans mb-3"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
              }}
            >
              contacto@gustavo.consulting
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gustavo-martínez-pellón-19a44238"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#6A8F7B' }}
              transition={{ duration: 0.2 }}
              className="block font-sans"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
              }}
            >
              LinkedIn →
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(106,143,123,0.25)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p
            className="font-sans text-center"
            style={{ fontSize: '12px', color: '#6B7280' }}
          >
            © 2026 Gustavo Martínez Business Consulting. Todos los derechos reservados.
          </p>
          <motion.a
            href="/admin"
            whileHover={{ color: '#6A8F7B', opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="font-sans"
            style={{
              fontSize: '12px',
              color: '#6A8F7B',
              opacity: 0.6,
              textDecoration: 'none',
            }}
          >
            Administración
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

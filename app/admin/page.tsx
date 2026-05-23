'use client';

import Link from 'next/link';

const sections = [
  { label: 'Artículos', href: '/admin/articles', icon: '📝', count: 3 },
  { label: 'Mensajes',  href: '/admin/messages',  icon: '💬', count: 12 },
  { label: 'Clientes',  href: '/admin/clients',   icon: '🏢', count: 31 },
  { label: 'Ajustes',   href: '/admin/settings',  icon: '⚙️', count: null },
];

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      {/* Top bar */}
      <header style={{ backgroundColor: '#243A4D', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="font-serif text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
          Admin — Gustavo Martínez
        </span>
        <Link href="/" className="font-sans" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
          ← Ver sitio
        </Link>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 className="font-serif" style={{ fontSize: '36px', fontWeight: 700, color: '#243A4D', marginBottom: '8px' }}>
          Panel de administración
        </h1>
        <p className="font-sans" style={{ fontSize: '15px', color: '#6B7280', marginBottom: '48px' }}>
          Gestiona el contenido del sitio desde aquí.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '32px 28px',
                  boxShadow: '0 2px 12px rgba(36,58,77,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(36,58,77,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(36,58,77,0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '28px' }}>{s.icon}</span>
                  <div>
                    <p className="font-sans font-semibold" style={{ fontSize: '16px', color: '#243A4D' }}>{s.label}</p>
                    {s.count !== null && (
                      <p className="font-sans" style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '2px' }}>
                        {s.count} registros
                      </p>
                    )}
                  </div>
                </div>
                <span style={{ color: '#C9A84C', fontSize: '20px' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

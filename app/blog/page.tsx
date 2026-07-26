import type { Metadata } from 'next';
import Link from 'next/link';

import PostCard from '@/components/blog/PostCard';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { getCategories, getPostsList } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Foro',
  description:
    'Reflexiones sobre estrategia, cultura y transformación centrada en el cliente, por Gustavo Martínez Pellón.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const [posts, categories] = await Promise.all([getPostsList(categoria), getCategories()]);

  return (
    <>
      <Navbar />
      <main>
        <section style={{ backgroundColor: '#243A4D', paddingTop: '140px', paddingBottom: '80px' }}>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            <span
              className="font-sans font-semibold"
              style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6A8F7B', display: 'block', marginBottom: '20px' }}
            >
              Foro
            </span>
            <h1
              className="font-serif text-white"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              Reflexiones para
              <br />
              <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#6A8F7B' }}>tu organización</span>
            </h1>
            <p
              className="font-sans"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '24px', maxWidth: '520px', lineHeight: 1.6 }}
            >
              Patient Centricity y Customer Centricity.
            </p>
          </div>
        </section>

        <section style={{ backgroundColor: '#F5F5F5', paddingTop: '56px', paddingBottom: '120px' }}>
          <div className="max-w-[1100px] mx-auto px-5 md:px-8">
            {categories.length > 0 && (
              <nav
                aria-label="Filtrar por categoría"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}
              >
                <CategoryChip label="Todos" href="/blog" active={!categoria} />
                {categories.map((c) => (
                  <CategoryChip
                    key={c}
                    label={c}
                    href={`/blog?categoria=${encodeURIComponent(c)}`}
                    active={categoria === c}
                  />
                ))}
              </nav>
            )}

            {posts.length === 0 ? (
              <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280' }}>
                Aún no hay artículos publicados en esta categoría.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                {posts.map((p) => (
                  <PostCard key={p._id} post={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function CategoryChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="font-sans font-semibold"
      style={{
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        borderRadius: '100px',
        textDecoration: 'none',
        border: `1px solid ${active ? '#243A4D' : 'rgba(36,58,77,0.2)'}`,
        backgroundColor: active ? '#243A4D' : 'transparent',
        color: active ? '#ffffff' : '#243A4D',
      }}
    >
      {label}
    </Link>
  );
}

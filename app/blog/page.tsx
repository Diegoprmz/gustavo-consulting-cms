import type { Metadata } from 'next';

import ForoBrowser from '@/components/blog/ForoBrowser';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { getPostsList } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Foro',
  description:
    'Reflexiones sobre estrategia, cultura y transformación centrada en el cliente, por Gustavo Martínez Pellón.',
};

export default async function BlogPage() {
  // Son ~30 artículos: se traen todos y el filtrado vive en el cliente, así la
  // búsqueda responde al instante y no hace una petición por cada tecla.
  const posts = await getPostsList();

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
            {posts.length === 0 ? (
              <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280' }}>
                Aún no hay artículos publicados.
              </p>
            ) : (
              <ForoBrowser posts={posts} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

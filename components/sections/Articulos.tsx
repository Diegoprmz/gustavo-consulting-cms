import Link from 'next/link';

import PostCard from '@/components/blog/PostCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getPostsPreview } from '@/sanity/lib/queries';

export default async function Articulos() {
  const posts = await getPostsPreview(3);

  if (posts.length === 0) return null;

  return (
    <section id="foro" style={{ backgroundColor: '#F5F5F5', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <AnimatedSection>
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(32px, 3.6vw, 48px)', color: '#243A4D', fontWeight: 700, lineHeight: 1.1, marginBottom: '12px' }}
          >
            Foro
          </h2>
          <p className="font-sans" style={{ fontSize: '16px', color: '#6B7280', lineHeight: 1.6, marginBottom: '48px' }}>
            Patient Centricity y Customer Centricity: reflexiones para tu organización.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {posts.map((post, i) => (
            <AnimatedSection key={post._id} delay={i * 0.1} className="h-full">
              <PostCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-14">
            <Link
              href="/blog"
              className="btn-shimmer font-sans font-semibold text-white"
              style={{
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                display: 'inline-block',
              }}
            >
              Ver todos los artículos →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

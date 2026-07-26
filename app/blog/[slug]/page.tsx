import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DownloadPdfButton from '@/components/blog/DownloadPdfButton';
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';
import PostVideo from '@/components/blog/PostVideo';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import { formatLongDate } from '@/lib/date';
import { urlFor } from '@/sanity/lib/image';
import { getAuthor, getPostBySlug, getPostSlugs } from '@/sanity/lib/queries';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artículo no encontrado' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://gustavo.consulting/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).fit('crop').url() }]
        : undefined,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [post, author] = await Promise.all([getPostBySlug(slug), getAuthor()]);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <article>
          <section style={{ backgroundColor: '#243A4D', paddingTop: '140px', paddingBottom: '80px' }}>
            <div className="max-w-[760px] mx-auto px-5 md:px-8">
              <Link
                href="/blog"
                className="font-sans no-print"
                style={{ fontSize: '13px', color: '#6A8F7B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}
              >
                ← Volver a artículos
              </Link>
              <span
                className="font-sans font-semibold"
                style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6A8F7B', display: 'block', marginBottom: '20px' }}
              >
                {post.category}
              </span>
              <h1
                className="font-serif text-white"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                {post.title}
              </h1>
              <p className="font-sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '24px' }}>
                {author?.name ?? 'Gustavo Martínez Pellón'} &nbsp;·&nbsp;{' '}
                <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
              </p>
            </div>
          </section>

          <section style={{ backgroundColor: '#ffffff', paddingTop: '72px', paddingBottom: '120px' }}>
            <div className="max-w-[760px] mx-auto px-5 md:px-8">
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(1400).fit('max').auto('format').url()}
                  alt={post.mainImage.alt ?? post.title}
                  width={760}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 760px"
                  priority
                  style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '48px' }}
                />
              )}

              <PostVideo post={post} />

              {/* El resumen no se repite aquí: vive en las tarjetas y en la metadata,
                  y su primer párrafo ya abre el cuerpo del artículo. */}
              <PortableTextRenderer value={post.body} />

              <div
                style={{ marginTop: '56px', paddingTop: '32px', borderTop: '1px solid rgba(106,143,123,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}
              >
                <div>
                  <p className="font-sans font-semibold" style={{ fontSize: '15px', color: '#243A4D' }}>
                    {author?.name ?? 'Gustavo Martínez Pellón'}
                  </p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#6B7280' }}>
                    {author?.title ?? 'Consejero Corporativo · Consultor Empresarial · Profesor Ejecutivo'}
                  </p>
                </div>
                {post.videoMode === 'none' && <DownloadPdfButton />}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

import type { Post } from '@/sanity/lib/types';

function toEmbedUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  }

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    const id = url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  }

  if (host === 'vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return /^\d+$/.test(id ?? '') ? `https://player.vimeo.com/video/${id}` : null;
  }

  return null;
}

export default function PostVideo({ post }: { post: Post }) {
  const wrapper = {
    margin: '0 0 48px',
    borderRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#000',
  } as const;

  if (post.videoMode === 'embed' && post.videoUrl) {
    const embed = toEmbedUrl(post.videoUrl);
    if (!embed) return null;
    return (
      <div className="print:hidden" style={{ ...wrapper, aspectRatio: '16 / 9' }}>
        <iframe
          src={embed}
          title={post.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      </div>
    );
  }

  if (post.videoMode === 'upload' && post.videoFileUrl) {
    return (
      <div className="print:hidden" style={wrapper}>
        <video controls preload="metadata" style={{ width: '100%', display: 'block' }}>
          <source src={post.videoFileUrl} />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    );
  }

  return null;
}

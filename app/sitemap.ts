import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gustavo.consulting';
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/speaking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/post/customer-centricity-decision-estrategica`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/post/consejo-administracion-perspectiva-cliente`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/post/cinco-dimensiones-negocio-centrado-cliente`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];
}

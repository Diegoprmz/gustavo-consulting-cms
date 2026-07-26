import type { PortableTextBlock } from '@portabletext/types';

export type SanityImage = {
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type PostPreview = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  mainImage: SanityImage | null;
};

export type Post = PostPreview & {
  body: PortableTextBlock[];
  videoMode: 'none' | 'embed' | 'upload';
  videoUrl: string | null;
  videoFileUrl: string | null;
};

export type Author = {
  name: string;
  title: string;
  photo: SanityImage | null;
};

import { client } from './client';
import { AUTHOR_DOC_ID } from './constants';
import type { Author, Post, PostPreview } from './types';

const REVALIDATE = 60;

const PREVIEW_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  mainImage
`;

const POSTS_LIST_QUERY = `*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) { ${PREVIEW_FIELDS} }`;

const POSTS_PREVIEW_QUERY = `*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)[0...$limit] { ${PREVIEW_FIELDS} }`;

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  ${PREVIEW_FIELDS},
  body,
  videoMode,
  videoUrl,
  "videoFileUrl": videoFile.asset->url
}`;

const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  publishedAt
}`;

const AUTHOR_QUERY = `*[_type == "author" && _id == $id][0] { name, title, photo }`;

const options = { next: { revalidate: REVALIDATE } };

export function getPostsPreview(limit = 3) {
  return client.fetch<PostPreview[]>(POSTS_PREVIEW_QUERY, { limit }, options);
}

export function getPostsList() {
  return client.fetch<PostPreview[]>(POSTS_LIST_QUERY, {}, options);
}

export function getPostBySlug(slug: string) {
  return client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, options);
}

export function getPostSlugs() {
  return client.fetch<{ slug: string; publishedAt: string }[]>(POST_SLUGS_QUERY, {}, options);
}

export function getAuthor() {
  return client.fetch<Author | null>(AUTHOR_QUERY, { id: AUTHOR_DOC_ID }, options);
}

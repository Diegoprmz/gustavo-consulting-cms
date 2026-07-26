import { defineField, defineType } from 'sanity';

export const CATEGORIES = ['Patient Centricity', 'Customer Centricity'] as const;

export const postType = defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'media', title: 'Imagen y video' },
    { name: 'meta', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Texto corto que aparece en las tarjetas del blog y en los resultados de búsqueda.',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo del artículo',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (rule) => rule.required(),
        },
      ],
    }),
    defineField({
      name: 'videoMode',
      title: 'Video destacado',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Sin video', value: 'none' },
          { title: 'Enlace (YouTube / Vimeo)', value: 'embed' },
          { title: 'Archivo subido', value: 'upload' },
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del video',
      type: 'url',
      group: 'media',
      hidden: ({ document }) => document?.videoMode !== 'embed',
      validation: (rule) =>
        rule.custom((value, context) => {
          const mode = (context.document as { videoMode?: string } | undefined)?.videoMode;
          if (mode === 'embed' && !value) return 'Agrega la URL del video de YouTube o Vimeo.';
          return true;
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Archivo de video',
      type: 'file',
      group: 'media',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.videoMode !== 'upload',
      validation: (rule) =>
        rule.custom((value, context) => {
          const mode = (context.document as { videoMode?: string } | undefined)?.videoMode;
          if (mode === 'upload' && !value) return 'Sube el archivo de video.';
          return true;
        }),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'meta',
      options: { list: [...CATEGORIES] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Más recientes',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, subtitle, media, date }) {
      const formatted = date
        ? new Date(date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Sin fecha';
      return { title, subtitle: `${subtitle ?? 'Sin categoría'} · ${formatted}`, media };
    },
  },
});

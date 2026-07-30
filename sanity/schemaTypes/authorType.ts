import { defineField, defineType } from 'sanity';

export const authorType = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      initialValue: 'Gustavo Martínez Pellón',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Cargo',
      type: 'string',
      description: 'Línea de firma que aparece al pie de cada artículo.',
      initialValue: 'Consejero · Consultor · Educación ejecutiva',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});

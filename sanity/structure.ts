import type { StructureResolver } from 'sanity/structure';

import { AUTHOR_DOC_ID } from './lib/constants';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.documentTypeListItem('post').title('Artículos'),
      S.divider(),
      S.listItem()
        .title('Autor')
        .id(AUTHOR_DOC_ID)
        .child(S.document().schemaType('author').documentId(AUTHOR_DOC_ID).title('Autor')),
    ]);

import type { SchemaTypeDefinition } from 'sanity';

import { authorType } from './authorType';
import { blockContentType } from './blockContentType';
import { postType } from './postType';

export const schemaTypes: SchemaTypeDefinition[] = [postType, authorType, blockContentType];

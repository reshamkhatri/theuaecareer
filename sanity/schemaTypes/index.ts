import { type SchemaTypeDefinition } from 'sanity';
import { articleType } from './articleType';
import { commentType } from './commentType';
import { jobType } from './jobType';
import { siteSettingsType } from './siteSettingsType';

export const schemaTypes: SchemaTypeDefinition[] = [articleType, commentType, jobType, siteSettingsType];

export const schema = {
  types: schemaTypes,
};

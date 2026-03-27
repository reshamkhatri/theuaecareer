import { type SchemaTypeDefinition } from 'sanity';
import { articleType } from './articleType';
import { jobType } from './jobType';
import { siteSettingsType } from './siteSettingsType';

export const schemaTypes: SchemaTypeDefinition[] = [articleType, jobType, siteSettingsType];

export const schema = {
  types: schemaTypes,
};

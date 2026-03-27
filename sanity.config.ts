import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId, studioBasePath } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'theuaecareer Studio',
  projectId,
  dataset,
  basePath: studioBasePath,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

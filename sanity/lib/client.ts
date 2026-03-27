import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';
import { urlFor as imageUrlFor } from './image';

const serverToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: serverToken,
  useCdn: !serverToken,
});

export const client = sanityClient;
export const urlForImage = imageUrlFor;

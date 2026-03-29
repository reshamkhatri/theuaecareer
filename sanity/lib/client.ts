import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';
import { urlFor as imageUrlFor } from './image';

const readToken = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: readToken || undefined,
  useCdn: false,
});

export const client = sanityClient;
export const urlForImage = imageUrlFor;

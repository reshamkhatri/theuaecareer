import 'server-only';
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

const serverToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !serverToken,
  perspective: 'published',
  token: serverToken,
});

const imageBuilder = createImageUrlBuilder(sanityClient);
type SanityImageSource = Parameters<typeof imageBuilder.image>[0];

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}

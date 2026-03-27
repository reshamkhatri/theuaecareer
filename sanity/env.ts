export const studioBasePath = '/';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-27';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
);

export function getSanitySetupMessage(): string {
  return 'Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to your environment before opening the content studio.';
}

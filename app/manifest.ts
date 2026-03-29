import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
const iconVersion = '20260329';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The UAE Career',
    short_name: 'UAE Career',
    description: 'Find walk-in interviews, Gulf-ready CV templates, and exclusive career tools globally focused on the UAE job market.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: `/icon-192x192.png?v=${iconVersion}`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `/icon-512x512.png?v=${iconVersion}`,
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: `/apple-icon.png?v=${iconVersion}`,
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

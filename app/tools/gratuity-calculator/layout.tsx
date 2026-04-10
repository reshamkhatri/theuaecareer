import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'UAE Gratuity Calculator',
  description:
    'Free UAE gratuity calculator 2026. Calculate your end-of-service gratuity based on UAE Labour Law. Supports limited and unlimited contracts. Instant PDF download.',
  keywords: [
    'UAE gratuity calculator',
    'end of service calculator UAE',
    'UAE gratuity calculator 2026',
    'MOHRE gratuity calculator',
    'how to calculate gratuity UAE',
    'Dubai end of service gratuity',
    'UAE labour law gratuity formula',
    'gratuity calculation UAE',
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/gratuity-calculator/`,
  },
  openGraph: {
    title: 'UAE Gratuity Calculator',
    description:
      'Calculate your UAE end-of-service gratuity instantly. Based on UAE Labour Law Federal Decree No. 33 of 2021. Free PDF download.',
    url: `${SITE_URL}/tools/gratuity-calculator/`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAE Gratuity Calculator',
    description: 'Free UAE end-of-service gratuity calculator. Instant result based on UAE Labour Law.',
  },
};

export default function GratuityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

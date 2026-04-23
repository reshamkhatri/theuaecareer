import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const defaultOgImage = {
  url: '/og-default.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} social share image`,
};

const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() || '';
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';
const iconVersion = '20260329';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/jobs?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon-512x512.png`,
    width: 512,
    height: 512,
  },
};

export const viewport: Viewport = {
  themeColor: '#6366f1',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  icons: {
    icon: `/favicon.ico?v=${iconVersion}`,
    shortcut: `/favicon.ico?v=${iconVersion}`,
    apple: `/apple-icon.png?v=${iconVersion}`,
  },
  title: {
    default: 'UAE Jobs 2026 | Walk-ins, Careers & Tools',
    template: '%s | theuaecareer',
  },
  description:
    'Find the latest jobs in UAE, Dubai, Abu Dhabi, Sharjah, and the Gulf region. Walk-in interviews, career guides, salary insights, and free tools for UAE job seekers.',
  keywords: [
    'jobs in UAE',
    'jobs in Dubai',
    'walk-in interview Dubai',
    'UAE careers',
    'Gulf jobs',
    'Dubai jobs 2026',
    'Abu Dhabi jobs',
    'UAE job portal',
  ],
  authors: [{ name: 'theuaecareer.com' }],
  creator: 'theuaecareer.com',
  publisher: 'theuaecareer.com',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: 'UAE Jobs 2026 | Walk-ins, Careers & Tools',
    description:
      'Find the latest jobs in UAE, Dubai, Abu Dhabi, Sharjah, and the Gulf region. Walk-in interviews, career guides, salary insights, and free tools.',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theuaecareer',
    creator: '@theuaecareer',
    title: 'UAE Jobs 2026 | theuaecareer.com',
    description: 'Find the latest jobs in UAE, Dubai, Abu Dhabi, and the Gulf region.',
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        {adsensePublisherId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteJsonLd, organizationJsonLd]) }}
        />
        {gaMeasurementId && (
          <Suspense fallback={null}>
            <GoogleAnalytics measurementId={gaMeasurementId} />
          </Suspense>
        )}
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

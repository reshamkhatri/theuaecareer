import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers | theuaecareer.com',
    template: '%s | theuaecareer.com',
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'theuaecareer.com',
    title: 'Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers',
    description:
      'Find the latest jobs in UAE, Dubai, Abu Dhabi, Sharjah, and the Gulf region. Walk-in interviews, career guides, salary insights, and free tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobs in UAE 2026 - theuaecareer.com',
    description: 'Find the latest jobs in UAE, Dubai, Abu Dhabi, and the Gulf region.',
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
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en">
      <body>
        {adsenseClient && (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Free UAE CV Builder',
  description:
    'Build a professional UAE CV online for free. Gulf-ready templates with photo, nationality, visa status, and languages - the fields UAE recruiters actually look for. Export as PDF.',
  keywords: [
    'UAE CV maker',
    'free CV builder Dubai',
    'Gulf CV format with photo',
    'UAE CV template free',
    'Dubai CV builder online',
    'Gulf CV maker 2026',
    'CV format for UAE jobs',
    'UAE resume builder free',
    'CV with photo UAE',
    'Dubai resume format',
  ],
  alternates: {
    canonical: `${SITE_URL}/tools/cv-maker/`,
  },
  openGraph: {
    title: 'Free UAE CV Builder',
    description:
      'Build a UAE-standard CV free online. Includes photo, nationality, visa status, and languages. 3 professional templates. Export PDF instantly.',
    url: `${SITE_URL}/tools/cv-maker/`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free UAE CV Builder',
    description: 'Build a Gulf-ready CV free online with photo, nationality, and visa status fields.',
  },
};

const faqs = [
  { q: 'Should a UAE CV include a photo?', a: 'Yes. Unlike Western markets, a professional headshot is standard and expected on CVs in the UAE and GCC. Place it in the top-right corner. Our CV builder includes the photo field automatically.' },
  { q: 'How long should a UAE CV be?', a: 'One page if you have under 5 years of experience. Two pages maximum if you have more. UAE recruiters skim - keep it tight and focused.' },
  { q: 'Do I need to include nationality on a UAE CV?', a: 'Yes. UAE employers look for nationality information immediately - it affects visa costs and processing. Always include it clearly near the top of your CV.' },
  { q: 'What is a Gulf-ready CV format?', a: 'A Gulf-ready CV includes a professional photo, nationality, visa status, date of birth, and languages spoken. It uses a clean layout compatible with ATS systems used by UAE companies.' },
  { q: 'Should I include my visa status on a UAE CV?', a: 'Yes. State whether you\'re on an employment visa, visit visa, or outside the UAE. Employers need to know your availability and visa processing requirements.' },
  { q: 'Is this CV builder really free?', a: 'Yes, completely free. Build your CV, choose a template, and download it as a PDF - no account required, no watermark, no payment.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function CvMakerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <div style={{ background: '#f8fafc', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '32px' }}>
            Everything you need to know about making a UAE CV
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', padding: '20px 24px', borderRadius: '10px' }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>{q}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '24px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '10px' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>Related guides</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link href="/blog/how-to-write-cv-for-gulf-jobs" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>How to Write a CV for Gulf Jobs</Link>
              <Link href="/blog/how-to-find-a-job-in-dubai-as-a-fresher" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>Finding a Job in Dubai as a Fresher</Link>
              <Link href="/blog/uae-interview-questions-and-answers" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>UAE Interview Questions & Answers</Link>
              <Link href="/blog/top-10-in-demand-jobs-uae-2026" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>Top 10 In-Demand Jobs UAE 2026</Link>
              <Link href="/tools/gratuity-calculator" style={{ fontSize: '0.875rem', color: '#6366f1', fontWeight: 600, textDecoration: 'underline' }}>Gratuity Calculator</Link>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

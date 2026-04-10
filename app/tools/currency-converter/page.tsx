import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiRepeat, FiShield, FiZap } from 'react-icons/fi';
import CurrencyConverterTool from '@/components/CurrencyConverterTool';

export const metadata: Metadata = {
  title: 'Gulf Currency Converter',
  description:
    'Free AED to INR currency converter with live rates. Also convert AED to PHP, AED to NPR, SAR to INR and all Gulf remittance corridors. Check exchange rate before sending money home.',
  keywords: [
    'AED to INR today',
    'UAE dirham to Indian rupee',
    'AED to INR converter',
    'AED exchange rate today',
    'UAE currency converter',
    'AED to PHP',
    'AED to NPR',
    'SAR to INR',
    'Gulf remittance calculator',
    'dirham to rupee today',
  ],
  alternates: {
    canonical: '/tools/currency-converter/',
  },
  openGraph: {
    title: 'Gulf Currency Converter',
    description:
      'Check live AED to INR, AED to PHP, AED to NPR and all Gulf remittance corridors. Free currency converter for UAE expats.',
    url: '/tools/currency-converter/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Currency Converter',
    description: 'Free AED to INR, PHP, NPR currency converter for Gulf expats.',
  },
};

export default function CurrencyConverterPage() {
  return (
    <section
      className="section"
      style={{ background: '#f8fafc' }}
    >
      <div className="container" style={{ display: 'grid', gap: '3rem' }}>
        {/* Header */}
        <div style={{ maxWidth: '720px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '100px',
              padding: '5px 14px',
              background: 'var(--accent-light)',
              color: 'var(--accent-dark)',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '16px',
            }}
          >
            <FiRepeat style={{ fontSize: '0.85rem' }} />
            Remittance planning
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              marginBottom: '16px',
              letterSpacing: '-0.025em',
            }}
          >
            Gulf Currency Converter
          </h1>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '58ch',
              margin: 0,
            }}
          >
            Check the latest market reference rate for popular remittance corridors
            like AED to INR, SAR to PHP, and QAR to NPR before you send money home.
          </p>
        </div>

        {/* Converter tool */}
        <CurrencyConverterTool />

        {/* Info cards */}
        <div className="converter-info-grid">
          <div className="converter-info-card">
            <div className="converter-info-icon" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>
              <FiShield />
            </div>
            <h2 className="converter-info-heading">Why this matters</h2>
            <p className="converter-info-text">
              A quick rate check helps you compare offers from banks, exchange houses, and salary apps before you send money.
            </p>
          </div>

          <div className="converter-info-card">
            <div className="converter-info-icon" style={{ background: '#ecfdf5', color: '#0f766e' }}>
              <FiRepeat />
            </div>
            <h2 className="converter-info-heading">What it is not</h2>
            <p className="converter-info-text">
              This is a market reference, not a bank quote. Final payout changes after provider margin, fees, and delivery method.
            </p>
          </div>

          <div className="converter-info-card">
            <div className="converter-info-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
              <FiZap />
            </div>
            <h2 className="converter-info-heading">Next step</h2>
            <p className="converter-info-text">
              Once you know the reference rate, compare the final payout with your chosen transfer provider before confirming.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="converter-cta-banner">
          <div>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '6px', color: '#fff' }}>
              Need interview prep too?
            </h2>
            <p style={{ margin: 0, color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.6, maxWidth: '50ch' }}>
              Move from salary planning to interview preparation with our sector-specific Gulf Interview Question Bank.
            </p>
          </div>
          <Link
            href="/resources/interview-question-bank/"
            className="btn"
            style={{
              textDecoration: 'none',
              background: '#fff',
              color: 'var(--primary)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Open Interview Bank <FiArrowRight />
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>Common questions about UAE currency and remittance</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[
            { q: 'What is today\'s AED to INR rate?', a: 'The AED to INR rate fluctuates daily. Use the converter above for the current mid-market reference rate. Exchange houses like Al Ansari and UAE Exchange typically offer rates within 0.3–0.5% of the mid-market rate.' },
            { q: 'Which is cheaper — exchange house or bank transfer?', a: 'Exchange houses are almost always cheaper for small to medium remittances. Banks charge higher fees and worse rates. For large transfers above AED 10,000, compare Wise or your bank directly.' },
            { q: 'Why is my bank rate different from this tool?', a: 'This tool shows the mid-market (interbank) reference rate. Banks and exchange houses add a margin on top. The difference is typically 0.5–2% depending on the provider and amount.' },
            { q: 'What is the best time to send money from UAE?', a: 'Mid-week (Tuesday to Thursday) tends to have slightly better rates than weekends. Avoid sending on UAE public holidays when exchange desks are closed or rates are less competitive.' },
            { q: 'Is it cheaper to send AED or convert first?', a: 'Send in AED and let the receiving end convert — most exchange houses and apps handle this automatically at the mid-market rate. Converting before sending often costs extra.' },
            { q: 'How do I find AED to NPR or SAR to PHP rates?', a: 'Use the currency dropdowns above. This tool covers all major Gulf remittance corridors including AED, SAR, QAR to INR, PHP, NPR, BDT, PKR and more.' },
          ].map(({ q, a }) => (
            <div key={q} style={{ background: '#f9fafb', border: '1px solid var(--border)', padding: '20px 24px', borderRadius: '10px' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '10px' }}>{q}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* Internal links */}
        <div style={{ padding: '24px', background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', marginBottom: '32px' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>Related guides</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link href="/blog/best-remittance-options-uae-2026/" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>Best Remittance Options from UAE 2026</Link>
            <Link href="/blog/cost-of-living-dubai-2026/" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>Cost of Living in Dubai 2026</Link>
            <Link href="/blog/salary-guide-uae-2026/" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>UAE Salary Guide 2026</Link>
            <Link href="/tools/gratuity-calculator/" style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}>Gratuity Calculator</Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is today\'s AED to INR exchange rate?', acceptedAnswer: { '@type': 'Answer', text: 'The AED to INR rate changes daily. Use our live converter for the current mid-market reference rate. Exchange houses typically offer rates within 0.3–0.5% of the mid-market rate.' } },
              { '@type': 'Question', name: 'Which is cheaper for remittance — exchange house or bank?', acceptedAnswer: { '@type': 'Answer', text: 'Exchange houses are almost always cheaper for small to medium remittances. Banks charge higher fees and worse rates.' } },
              { '@type': 'Question', name: 'Why is the bank rate different from this currency converter?', acceptedAnswer: { '@type': 'Answer', text: 'This tool shows the mid-market interbank reference rate. Banks and exchange houses add a margin on top, typically 0.5–2% depending on the provider.' } },
            ],
          }),
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .converter-info-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }

            .converter-info-card {
              background: #fff;
              border-radius: 16px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              padding: 24px;
              display: grid;
              gap: 12px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
              transition: box-shadow 0.2s ease, transform 0.2s ease;
            }

            .converter-info-card:hover {
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
              transform: translateY(-2px);
            }

            .converter-info-icon {
              width: 42px;
              height: 42px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
            }

            .converter-info-heading {
              font-size: 1.05rem;
              font-weight: 700;
              margin: 0;
            }

            .converter-info-text {
              margin: 0;
              color: var(--text-secondary);
              font-size: 0.92rem;
              line-height: 1.65;
            }

            .converter-cta-banner {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              border-radius: 18px;
              padding: 28px 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 20px;
              flex-wrap: wrap;
            }

            @media (max-width: 980px) {
              .converter-info-grid {
                grid-template-columns: 1fr;
              }
            }

            @media (max-width: 640px) {
              .converter-cta-banner {
                padding: 24px;
              }
            }
          `,
        }}
      />
    </section>
  );
}

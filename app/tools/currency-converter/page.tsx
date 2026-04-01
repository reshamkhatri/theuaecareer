import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiRepeat, FiShield, FiZap } from 'react-icons/fi';
import CurrencyConverterTool from '@/components/CurrencyConverterTool';

export const metadata: Metadata = {
  title: 'Currency Converter | AED, SAR, QAR to INR, NPR, PHP and more',
  description:
    'Use a Gulf-focused currency converter for AED to INR, SAR to PHP, QAR to NPR, and other common remittance corridors. Compare the latest market reference before you send money home.',
  alternates: {
    canonical: '/tools/currency-converter',
  },
  openGraph: {
    title: 'Currency Converter | Gulf salary and remittance checker',
    description:
      'Compare the latest market reference rate for common Gulf remittance corridors including AED to INR, SAR to PHP, and QAR to NPR.',
    url: '/tools/currency-converter',
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
            href="/resources/interview-question-bank"
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

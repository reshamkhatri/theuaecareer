import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiRepeat, FiShield, FiTrendingUp } from 'react-icons/fi';
import CurrencyConverterTool from '@/components/CurrencyConverterTool';
import { corridorPresets } from '@/lib/currency-converter';

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
      style={{
        background:
          'radial-gradient(circle at top left, rgba(99,102,241,0.16), transparent 34%), radial-gradient(circle at top right, rgba(45,212,191,0.14), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      }}
    >
      <div className="container" style={{ display: 'grid', gap: '2.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '1.5rem',
            alignItems: 'end',
          }}
          className="currency-hero-grid"
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '999px',
                padding: '6px 14px',
                background: 'rgba(99,102,241,0.1)',
                color: '#4338ca',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '14px',
              }}
            >
              <FiRepeat />
              Remittance planning
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 7vw, 3.8rem)', marginBottom: '14px', lineHeight: 1.05 }}>
              Currency Converter for Gulf salary corridors
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.12rem', lineHeight: 1.8, maxWidth: '62ch' }}>
              Built for UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman salary earners who need a fast reference for
              popular remittance routes like AED to INR, SAR to PHP, and QAR to NPR.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: '1.5rem',
              borderRadius: '28px',
              border: '1px solid rgba(15,23,42,0.08)',
              background: 'rgba(255,255,255,0.86)',
              boxShadow: '0 16px 32px rgba(15,23,42,0.06)',
              display: 'grid',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(45,212,191,0.14)',
                  color: '#0f766e',
                  fontSize: '1.2rem',
                }}
              >
                <FiTrendingUp />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem' }}>Latest market reference</strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Helpful for salary planning, family budgets, and comparing payout offers.
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {corridorPresets.slice(0, 4).map((preset) => (
                <div
                  key={preset.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid rgba(148,163,184,0.16)',
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{preset.label}</span>
                  <span style={{ color: 'var(--text-muted)', textAlign: 'right' }}>{preset.helper}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CurrencyConverterTool />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '18px',
          }}
          className="currency-insight-grid"
        >
          <div className="card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'grid', gap: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(99,102,241,0.12)',
                color: '#4338ca',
                fontSize: '1.15rem',
              }}
            >
              <FiShield />
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Why this tool matters</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              A quick rate check helps you compare offers from banks, exchange houses, and salary apps before you send money.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'grid', gap: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(45,212,191,0.14)',
                color: '#0f766e',
                fontSize: '1.15rem',
              }}
            >
              <FiRepeat />
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>What it is not</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              This is a market reference tool, not a bank quote. Final payout usually changes after provider margin, fees, or delivery method.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'grid', gap: '10px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(244,114,182,0.14)',
                color: '#be185d',
                fontSize: '1.15rem',
              }}
            >
              <FiArrowRight />
            </div>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Next step</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Once you know the reference rate, compare the final payout with your chosen transfer provider before you confirm the transfer.
            </p>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '18px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'white' }}>Need interview prep too?</h2>
            <p style={{ margin: 0, color: 'rgba(226,232,240,0.8)', maxWidth: '56ch', lineHeight: 1.7 }}>
              Move from salary planning to interview preparation with our sector-specific Gulf Interview Question Bank.
            </p>
          </div>
          <Link href="/resources/interview-question-bank" className="btn" style={{ textDecoration: 'none' }}>
            Open Interview Bank <FiArrowRight />
          </Link>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 980px) {
                .currency-hero-grid,
                .currency-converter-grid,
                .currency-insight-grid {
                  grid-template-columns: 1fr !important;
                }
              }

              @media (max-width: 720px) {
                .currency-input-grid,
                .currency-select-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `,
          }}
        />
      </div>
    </section>
  );
}

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

      {/* Deep-Dive Pillar Content for Currency & Remittance */}
      <section className="container" style={{ marginTop: '800ox', maxWidth: '1000px', lineHeight: 1.8, paddingTop: '80px', borderTop: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '24px', letterSpacing: '-1.5px', fontWeight: 800 }}>
          The Expat&apos;s Guide to Remittance & Currency Exchange (2026)
        </h2>
        
        <p style={{ fontSize: '1.25rem', color: '#444', marginBottom: '32px' }}>
          For the 9 million expats living in the UAE, &quot;sending money home&quot; is more than a monthly chore—it&apos;s a significant financial decision. With the <strong>UAE Dirham (AED) pegged to the US Dollar (USD)</strong> at a fixed rate of 3.6725, the volatility you see in rates like AED to INR or AED to PHP is driven entirely by the performance of the global economy. Understanding how to navigate this market can save you thousands of Dirhams every year.
        </p>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px', fontWeight: 700 }}>1. Mid-Market Rates vs. The &quot;Real&quot; Rate</h3>
        <p style={{ marginBottom: '20px' }}>
          When you search Google for &quot;AED to INR today,&quot; you are shown the <strong>Mid-Market Rate</strong> (also known as the Interbank Rate). This is the midpoint between the buy and sell prices of a currency on the global market. 
        </p>
        <p style={{ marginBottom: '20px' }}>
          Crucially, this is <strong>not the rate you will get</strong> at an exchange house in Satwa or a bank app in Business Bay. Banks and remittance providers add a &quot;markup&quot; or &quot;spread&quot; on top of this rate. A provider might claim &quot;Zero Fees,&quot; but they are often making their profit by giving you a rate that is 1% or 2% worse than the mid-market rate.
        </p>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px', fontWeight: 700 }}>2. Top Remittance Corridors from the UAE</h3>
        <div style={{ background: '#f8fafc', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', margin: '32px 0' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary)' }}>Key Corridors Explained:</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
            <li><strong>AED to INR (India):</strong> The largest corridor. Competition is fierce, meaning margins are often as low as 0.10 AED per Rupee. Look for instant-transfer options to major Indian banks.</li>
            <li><strong>AED to PHP (Philippines):</strong> High volume driven by personal remittances. Many providers offer &quot;Cash Pickup&quot; at locations like Palawan Pawnshop or Cebuana Lhuillier.</li>
            <li><strong>AED to PKR (Pakistan):</strong> Heavily influenced by government incentives like the PRI (Pakistan Remittance Initiative) which often eliminates fees for transfers above $100.</li>
            <li><strong>AED to NPR (Nepal):</strong> Rapidly growing corridor with a focus on bank account deposits and IME Pay integrations.</li>
          </ul>
        </div>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px', fontWeight: 700 }}>3. Hidden Costs: What to Watch For</h3>
        <p style={{ marginBottom: '20px' }}>
          To get the best value, you must look at the <strong>Total Payout Amount</strong>—the number of units the receiver actually gets after all deductions. Watch out for:
        </p>
        <ul style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Fixed Fees:</strong> AED 15 to AED 25 is standard for a physical exchange house visit.</li>
          <li><strong>The Spread:</strong> The difference between the market rate and the provider&apos;s rate. This is usually the largest &quot;hidden&quot; cost.</li>
          <li><strong>Correspondent Bank Charges:</strong> If you send via SWIFT (standard bank transfer), the receiving bank or an intermediary might deduct a &quot;lifting fee&quot; of $15-$30 from the final amount.</li>
        </ul>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px', fontWeight: 700 }}>4. Digital Apps vs. Physical Exchange Houses</h3>
        <p style={{ marginBottom: '20px' }}>
          The UAE has seen a digital revolution in remittance. Apps like <strong>Hubpay, Careem Pay, and Al Ansari Exchange App</strong> now often offer better rates than their physical counters to encourage digital adoption. However, for &quot;cash-to-cash&quot; transfers, physical branches like Lulu Exchange remain the standard.
        </p>

        <div style={{ padding: '32px', background: '#0f172a', color: 'white', borderRadius: '16px', textAlign: 'center', margin: '48px 0' }}>
           <h4 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Calculate your next transfer</h4>
           <p style={{ opacity: 0.8, marginBottom: '24px' }}>Use our live reference tool at the top of this page to check the latest mid-market rates.</p>
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn" style={{ background: 'var(--accent)', color: 'var(--primary)', border: 'none', fontWeight: 700 }}>
             Back to Converter
           </button>
        </div>

        <h2 style={{ fontSize: '2.25rem', color: 'var(--primary)', marginBottom: '32px', textAlign: 'center', letterSpacing: '-1px' }}>
           Common Currency & Remittance Questions
        </h2>

        <div className="gratuity-faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What is the best day to send money from UAE?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Historically, mid-week (Tuesday to Thursday) offers more stable rates. Markets are closed on weekends, so providers often add a &quot;safety margin&quot; to their rates to protect against Monday morning volatility.</p>
          </div>

          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Is the UAE Dirham (AED) pegged?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Yes, the AED has been pegged to the US Dollar at a rate of <strong>3.6725</strong> since 1997. This means the Dirham only gets stronger or weaker against other currencies (like the Euro or Rupee) when the US Dollar does.</p>
          </div>

          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What is a &quot;T-pin&quot; for remittance?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>A T-pin is a Transaction Pin assigned by exchange houses for your security. You should never share this with anyone except when verifying your identity with the official provider.</p>
          </div>

          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Why do rates differ between exchange houses?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Exchange houses have different operational costs and inventory. One house might have a surplus of INR and offer a better rate to &quot;sell&quot; it, while another might have a shortage and offer a lower rate.</p>
          </div>

          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Is there a limit on how much I can send?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>For standard transfers, there is no hard legal limit, but transfers above AED 35,000 usually require additional documentation like a salary certificate or proof of funds for AML compliance.</p>
          </div>

          <div style={{ background: '#fff', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
             <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Can I send money without a bank account?</h3>
             <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Yes. You can visit any physical exchange house with your <strong>Emirates ID</strong> and cash. They will process the transfer to a bank account or cash pickup location in your home country.</p>
          </div>
        </div>

        <div style={{ padding: '32px', background: '#F1F5F9', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: 700 }}>More Career & Finance Tools</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
               {[
                 { label: 'Gratuity Calculator', href: '/tools/gratuity-calculator' },
                 { label: 'Free CV Maker', href: '/tools/cv-maker' },
                 { label: 'Latest Walk-In Interviews', href: '/blog/walk-in-interviews-dubai-this-week' },
                 { label: 'UAE Labour Law Guide', href: '/blog/uae-labour-law-guide-for-expats' },
                 { label: 'Best Remittance Options 2026', href: '/blog/best-remittance-options-uae-2026' }
               ].map((link) => (
                 <Link key={link.href} href={link.href} style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, background: '#fff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', textDecoration: 'none' }}>
                   {link.label}
                 </Link>
               ))}
            </div>
        </div>
      </section>

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

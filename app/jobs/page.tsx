import type { Metadata } from 'next';
import Link from 'next/link';
import JobsListingClient from '@/components/JobsListingClient';
import { SITE_URL } from '@/lib/constants';
import { getAllPublicJobs } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'UAE Jobs in Dubai, Abu Dhabi & Gulf',
  description:
    'Browse current Gulf job openings across the UAE, Saudi Arabia, and Qatar, then filter by country, category, or job type before you apply today.',
  alternates: {
    canonical: '/jobs/',
  },
  openGraph: {
    title: 'UAE Jobs in Dubai, Abu Dhabi & Gulf',
    description:
      'Browse current Gulf job openings across the UAE, Saudi Arabia, and Qatar, then filter by country, category, or job type before you apply today.',
    url: '/jobs/',
  },
};

export default async function JobsPage() {
  const jobs = await getAllPublicJobs();
  const jobsCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Latest Gulf Jobs',
    description:
      'Browse current job openings in the UAE and Gulf region, including Dubai, Abu Dhabi, Sharjah, Saudi Arabia, and Qatar.',
    url: `${SITE_URL}/jobs/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: jobs.slice(0, 12).map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/jobs/${job.slug}/`,
        name: job.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsCollectionJsonLd) }}
      />
      <JobsListingClient initialJobs={jobs} />

      {/* SEO Pillar Content for Jobs Board */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid #e2e8f0', marginTop: '40px' }}>
        <div className="container" style={{ maxWidth: '1000px', lineHeight: 1.8 }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '24px', letterSpacing: '-1.2px', fontWeight: 800 }}>
            Proven Strategies for Finding Jobs in the UAE & Gulf (2026)
          </h2>
          
          <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '32px' }}>
            The Gulf job market is one of the most competitive in the world. With Dubai being a global magnet for talent and Saudi Arabia&apos;s <strong>Vision 2030</strong> creating millions of new roles in construction, hospitality, and tech, knowing how to stand out is critical. This guide breaks down the hiring ecosystem in the Middle East and how you can navigate it successfully.
          </p>

          <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '40px 0 20px', fontWeight: 700 }}>1. Direct Apply vs. The &quot;Hidden&quot; Job Market</h3>
          <p style={{ marginBottom: '20px' }}>
            While our jobs board lists verified roles, many positions in the UAE are filled through <strong>internal referrals and proactive networking</strong>. In the Middle East, &quot;Wasta&quot; (connections) is a real factor, but for the modern professional, this translates into <strong>LinkedIn networking</strong>.
          </p>
          <ul style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><strong>Proactive Outreach:</strong> Don&apos;t just apply and wait. Find the Hiring Manager at a company like NEOM or DP World on LinkedIn and send a professional, brief note expressing your interest.</li>
            <li><strong>Recruitment Agencies:</strong> Register with reputable firms like Michael Page, Hays, or Charterhouse. They often manage larger, executive-level placements that aren&apos;t always advertised on public boards.</li>
          </ul>

          <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '40px 0 20px', fontWeight: 700 }}>2. Identifying and Avoiding Job Scams</h3>
          <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '24px', borderRadius: '12px', margin: '40px 0' }}>
            <h4 style={{ color: '#991b1b', fontSize: '1.125rem', marginBottom: '12px', fontWeight: 700 }}>⚠️ Warning: Never Pay for a Job</h4>
            <p style={{ color: '#b91c1c', fontSize: '0.9375rem', margin: 0 }}>
              Under UAE Labour Law, it is <strong>illegal</strong> for a recruiter or employer to charge a candidate any fees for an offer, visa, or administrative costs. If an agency asks you for a &quot;processing fee&quot; or &quot;security deposit,&quot; it is almost certainly a scam.
            </p>
          </div>

          <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '40px 0 20px', fontWeight: 700 }}>3. Seasonal Hiring Trends in the Middle East</h3>
          <p style={{ marginBottom: '20px' }}>
            Hiring in the Gulf follows a specific calendar. Knowing when to double your efforts can significantly increase your success rate:
          </p>
          <ul style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><strong>Q4 Push (October - November):</strong> Companies look to exhaust their annual budgets and bring in new talent before the end-of-year holidays.</li>
            <li><strong>Post-Ramadan / Eid:</strong> There is usually a massive uptick in activity immediately after the Eid holidays as decision-makers return to the office.</li>
            <li><strong>The Summer Slowdown:</strong> July and August are traditionally slower for hiring in technical roles, though recruitment in the Retail and Hospitality sectors often remains active as they prepare for the winter tourist season.</li>
          </ul>

          <h3 style={{ fontSize: '1.75rem', color: '#0f172a', margin: '40px 0 20px', fontWeight: 700 }}>4. The Importance of Regional Certification</h3>
          <p style={{ marginBottom: '20px' }}>
            For roles in regulated sectors like <strong>Engineering (Dubai Municipality cards)</strong>, <strong>Real Estate (RERA certifications)</strong>, or <strong>Medicine (DHA/MOH licenses)</strong>, you cannot work without local credentials. Ensure you have started the attestation process for your degree at the Ministry of Foreign Affairs (MOFA) before you arrive.
          </p>

          <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', margin: '48px 0' }}>
             <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '16px', fontWeight: 700 }}>Gulf Job Hunting FAQ</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                   <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Which city is better for jobs—Dubai or Abu Dhabi?</h4>
                   <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0 }}>Dubai has more private sector roles in Tech, Real Estate, and Tourism. Abu Dhabi is the hub for Oil & Gas, Government, and heavy industry. Your choice should depend on your specific sector.</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>How do I find a job from my home country?</h4>
                   <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0 }}>Focus on LinkedIn and international recruiters. Stating your willingness to relocate and having an ATS-friendly CV (use our tool!) are essential for overseas applicants.</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Is it hard for freshers to find a job in Dubai?</h4>
                   <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0 }}>It is competitive but possible. Freshers should focus on internships or &quot;Junior&quot; level roles in large agencies to build their first year of &quot;UAE experience,&quot; which is highly valued by local employers.</p>
                </div>
                <div>
                   <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Should I use a professional CV writer?</h4>
                   <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0 }}>You don&apos;t need to. Our <strong>Free CV Maker</strong> is built based on current Gulf recruiter standards. Invest your time in the content of your bullets and your quantifiable achievements instead.</p>
                </div>
             </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
             <Link href="/blog/uae-labour-law-guide-for-expats" style={{ background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>Labour Law Guide</Link>
             <Link href="/tools/cv-maker" style={{ background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>CV Maker</Link>
             <Link href="/tools/gratuity-calculator" style={{ background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600 }}>Gratuity Calculator</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiExternalLink, FiFileText } from 'react-icons/fi';
import { interviewQuestionBankReferences, interviewResearchReviewedOn, interviewSectors } from '@/lib/interview-question-bank';

export const metadata: Metadata = {
  title: 'Interview Question Bank | Construction, Hospitality, Retail and Oil & Gas',
  description:
    'Prepare for Gulf-facing interviews with a researched question bank covering Construction, Hospitality, Retail, and Oil & Gas, now with practical sample answers.',
  alternates: {
    canonical: '/resources/interview-question-bank',
  },
  openGraph: {
    title: 'Interview Question Bank | Gulf sector interview prep',
    description:
      'Research-backed interview prep with common question patterns and sample answers for Construction, Hospitality, Retail, and Oil & Gas roles.',
    url: '/resources/interview-question-bank',
  },
};

export default function InterviewQuestionBankPage() {
  return (
    <section className="section" style={{ background: '#f8fafc' }}>
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        {/* Hero */}
        <div className="iqb-hero">
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 75% 15%, rgba(99, 102, 241, 0.14), transparent 45%), radial-gradient(circle at 25% 85%, rgba(45, 212, 191, 0.1), transparent 35%)',
              borderRadius: 'inherit',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }} className="iqb-hero-grid">
            <div>
              <div className="iqb-eyebrow">
                Reviewed {interviewResearchReviewedOn}
              </div>
              <h1 className="iqb-hero-title">
                Interview Question Bank
              </h1>
              <p className="iqb-hero-subtitle">with sample answers</p>
              <p className="iqb-hero-desc">
                Common recruiter themes, candidate-reported interview patterns, and sample answers
                you can adapt to your own background without sounding rehearsed.
              </p>
            </div>

            <div className="iqb-hero-tips">
              <h3 className="iqb-hero-tips-heading">How to use this page</h3>
              <p className="iqb-hero-tips-text">
                Pick one sector, read the sample answers, then rewrite them using your own numbers, responsibilities, and results.
              </p>
              <div className="iqb-hero-checks">
                <div className="iqb-hero-check">
                  <FiCheckCircle className="iqb-hero-check-icon" />
                  <span>Questions grouped by real hiring sectors, not generic categories.</span>
                </div>
                <div className="iqb-hero-check">
                  <FiCheckCircle className="iqb-hero-check-icon" />
                  <span>Each includes context, answer signals, and a practical sample.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sector nav */}
        <div className="iqb-sector-nav">
          <div className="iqb-sector-nav-header">
            <div>
              <h2 className="iqb-sector-nav-title">Jump to a sector</h2>
              <p className="iqb-sector-nav-subtitle">
                Start with the roles closest to the job you are applying for.
              </p>
            </div>
            <Link href="/resources" className="iqb-back-link">
              Back to Resources
            </Link>
          </div>

          <div className="iqb-sector-nav-grid">
            {interviewSectors.map((sector) => (
              <a
                key={sector.slug}
                href={`#${sector.slug}`}
                className="iqb-sector-nav-item"
              >
                <strong>{sector.title}</strong>
                <span className="iqb-sector-nav-roles">{sector.roles.slice(0, 2).join(' · ')}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Sectors */}
        {interviewSectors.map((sector) => (
          <section
            key={sector.slug}
            id={sector.slug}
            className="iqb-sector"
          >
            {/* Sector header */}
            <div className="iqb-sector-header">
              <div>
                <div className="iqb-sector-eyebrow">{sector.title}</div>
                <h2 className="iqb-sector-title">{sector.title}</h2>
                <p className="iqb-sector-summary">{sector.summary}</p>
              </div>

              <div className="iqb-sector-meta">
                <div>
                  <strong className="iqb-sector-meta-label">Roles covered</strong>
                  <div className="iqb-sector-roles">
                    {sector.roles.map((role) => (
                      <span key={role} className="iqb-role-tag">{role}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong className="iqb-sector-meta-label">What hiring managers notice</strong>
                  <ul className="iqb-sector-signals">
                    {sector.recruiterSignals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Prep checklist */}
            <div className="iqb-prep-box">
              <h3 className="iqb-prep-heading">Before you practice</h3>
              <div className="iqb-prep-grid">
                {sector.prepChecklist.map((item) => (
                  <div key={item} className="iqb-prep-item">
                    <FiCheckCircle className="iqb-prep-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="iqb-questions">
              {sector.questions.map((question, index) => (
                <article key={`${sector.slug}-${index}`} className="iqb-question">
                  <div className="iqb-question-header">
                    <span className="iqb-question-number">{index + 1}</span>
                    <h3 className="iqb-question-prompt">{question.prompt}</h3>
                  </div>

                  <div className="iqb-question-body">
                    <div className="iqb-question-context">
                      <div className="iqb-question-block">
                        <span className="iqb-question-block-label">Why this gets asked</span>
                        <p className="iqb-question-block-text">{question.whyItComesUp}</p>
                      </div>
                      <div className="iqb-question-block">
                        <span className="iqb-question-block-label">What a strong answer includes</span>
                        <p className="iqb-question-block-text">{question.strongAnswerSignals}</p>
                      </div>
                    </div>

                    <div className="iqb-sample-answer">
                      <div className="iqb-sample-answer-label">
                        <FiFileText />
                        Sample answer
                      </div>
                      <p className="iqb-sample-answer-text">{question.sampleAnswer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sources */}
            <div className="iqb-sources-box">
              <h3 className="iqb-sources-heading">Research basis for this sector</h3>
              <div className="iqb-sources-grid">
                {sector.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="iqb-source-card"
                  >
                    <div className="iqb-source-card-top">
                      <strong className="iqb-source-title">{source.title}</strong>
                      <FiExternalLink className="iqb-source-icon" />
                    </div>
                    <span className="iqb-source-note">{source.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA: Use answers properly */}
        <div className="iqb-cta-dark">
          <h2 className="iqb-cta-dark-title">Use the sample answers properly</h2>
          <p className="iqb-cta-dark-desc">
            Do not memorize these word for word. Replace the examples with your own projects, guest cases, sales numbers,
            shutdowns, or safety actions. The goal is to sound prepared and credible, not scripted.
          </p>
          <div className="iqb-cta-dark-actions">
            <Link href="/tools/cv-maker" className="btn" style={{ textDecoration: 'none', background: '#fff', color: 'var(--primary)' }}>
              Open CV Maker <FiArrowRight />
            </Link>
            <Link href="/blog" className="btn" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
              Read career guides
            </Link>
          </div>
        </div>

        {/* All references */}
        <div className="iqb-references">
          <h2 className="iqb-references-title">All sources reviewed for this page</h2>
          <div className="iqb-references-grid">
            {interviewQuestionBankReferences.map((source) => (
              <a
                key={`${source.sector}-${source.href}`}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="iqb-reference-card"
              >
                <span className="iqb-reference-sector">{source.sector}</span>
                <strong className="iqb-reference-title">{source.title}</strong>
                <span className="iqb-reference-note">{source.note}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Hero */
            .iqb-hero {
              position: relative;
              border-radius: 24px;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              padding: clamp(28px, 4vw, 48px);
              overflow: hidden;
            }

            .iqb-hero-grid {
              display: grid;
              grid-template-columns: 1.15fr 0.85fr;
              gap: 32px;
              align-items: end;
            }

            .iqb-eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              border-radius: 100px;
              padding: 5px 14px;
              background: rgba(255, 255, 255, 0.1);
              color: rgba(226, 232, 240, 0.8);
              font-weight: 700;
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.6px;
              margin-bottom: 18px;
            }

            .iqb-hero-title {
              font-size: clamp(2.2rem, 5vw, 3.6rem);
              color: #fff;
              line-height: 1.05;
              margin-bottom: 0;
              letter-spacing: -0.025em;
            }

            .iqb-hero-subtitle {
              font-size: clamp(1.1rem, 2.5vw, 1.4rem);
              color: rgba(99, 102, 241, 0.8);
              font-weight: 600;
              margin: 4px 0 16px;
            }

            .iqb-hero-desc {
              color: rgba(226, 232, 240, 0.65);
              font-size: 1rem;
              line-height: 1.7;
              max-width: 50ch;
              margin: 0;
            }

            .iqb-hero-tips {
              border-radius: 18px;
              padding: 22px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.06);
              display: grid;
              gap: 14px;
            }

            .iqb-hero-tips-heading {
              font-size: 0.92rem;
              font-weight: 700;
              color: #fff;
              margin: 0;
            }

            .iqb-hero-tips-text {
              color: rgba(226, 232, 240, 0.65);
              font-size: 0.9rem;
              line-height: 1.6;
              margin: 0;
            }

            .iqb-hero-checks {
              display: grid;
              gap: 10px;
            }

            .iqb-hero-check {
              display: flex;
              gap: 10px;
              align-items: flex-start;
              font-size: 0.88rem;
              color: rgba(226, 232, 240, 0.7);
              line-height: 1.5;
            }

            .iqb-hero-check-icon {
              color: rgba(99, 102, 241, 0.7);
              flex-shrink: 0;
              margin-top: 2px;
            }

            /* Sector nav */
            .iqb-sector-nav {
              background: #fff;
              border-radius: 18px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              padding: 22px;
              display: grid;
              gap: 16px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            }

            .iqb-sector-nav-header {
              display: flex;
              justify-content: space-between;
              gap: 12px;
              align-items: center;
              flex-wrap: wrap;
            }

            .iqb-sector-nav-title {
              font-size: 1.1rem;
              margin-bottom: 2px;
            }

            .iqb-sector-nav-subtitle {
              margin: 0;
              color: var(--text-secondary);
              font-size: 0.9rem;
            }

            .iqb-back-link {
              color: var(--accent);
              font-weight: 700;
              font-size: 0.88rem;
              text-decoration: none;
            }

            .iqb-back-link:hover {
              text-decoration: underline;
            }

            .iqb-sector-nav-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
            }

            .iqb-sector-nav-item {
              border-radius: 14px;
              padding: 14px 16px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              text-decoration: none;
              color: inherit;
              background: #f8fafc;
              display: grid;
              gap: 4px;
              transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }

            .iqb-sector-nav-item:hover {
              border-color: var(--accent);
              box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
            }

            .iqb-sector-nav-item strong {
              font-size: 0.95rem;
            }

            .iqb-sector-nav-roles {
              color: var(--text-muted);
              font-size: 0.82rem;
            }

            /* Sector */
            .iqb-sector {
              background: #fff;
              border-radius: 22px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              padding: clamp(24px, 3vw, 36px);
              display: grid;
              gap: 24px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            }

            .iqb-sector-header {
              display: grid;
              grid-template-columns: 1.15fr 0.85fr;
              gap: 28px;
              align-items: start;
            }

            .iqb-sector-eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              border-radius: 100px;
              padding: 4px 12px;
              background: var(--accent-light);
              color: var(--accent-dark);
              font-weight: 800;
              font-size: 0.72rem;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 12px;
            }

            .iqb-sector-title {
              font-size: clamp(1.6rem, 3.5vw, 2.2rem);
              margin-bottom: 10px;
              letter-spacing: -0.02em;
            }

            .iqb-sector-summary {
              margin: 0;
              color: var(--text-secondary);
              line-height: 1.7;
              font-size: 0.95rem;
            }

            .iqb-sector-meta {
              border-radius: 16px;
              padding: 22px;
              background: #f8fafc;
              border: 1px solid rgba(0, 0, 0, 0.04);
              display: grid;
              gap: 16px;
            }

            .iqb-sector-meta-label {
              display: block;
              font-size: 0.82rem;
              margin-bottom: 10px;
            }

            .iqb-sector-roles {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
            }

            .iqb-role-tag {
              padding: 6px 12px;
              border-radius: 100px;
              background: #fff;
              border: 1px solid rgba(0, 0, 0, 0.06);
              font-weight: 600;
              font-size: 0.82rem;
              color: var(--text-secondary);
            }

            .iqb-sector-signals {
              margin: 0;
              padding-left: 18px;
              color: var(--text-secondary);
              font-size: 0.88rem;
              line-height: 1.7;
              list-style: disc;
            }

            /* Prep checklist */
            .iqb-prep-box {
              border-radius: 16px;
              padding: 22px;
              background: #f8fafc;
              border: 1px solid rgba(0, 0, 0, 0.04);
            }

            .iqb-prep-heading {
              font-size: 0.95rem;
              font-weight: 700;
              margin-bottom: 14px;
            }

            .iqb-prep-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
            }

            .iqb-prep-item {
              display: flex;
              gap: 10px;
              align-items: flex-start;
              font-size: 0.88rem;
              color: var(--text-secondary);
              line-height: 1.55;
            }

            .iqb-prep-icon {
              color: var(--accent);
              flex-shrink: 0;
              margin-top: 2px;
            }

            /* Questions */
            .iqb-questions {
              display: grid;
              gap: 14px;
            }

            .iqb-question {
              border-radius: 18px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              background: #fff;
              overflow: hidden;
            }

            .iqb-question-header {
              padding: 20px 24px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.04);
              background: #fafbfc;
              display: flex;
              gap: 14px;
              align-items: flex-start;
            }

            .iqb-question-number {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              border-radius: 10px;
              background: var(--accent-light);
              color: var(--accent-dark);
              font-weight: 800;
              font-size: 0.85rem;
              flex-shrink: 0;
            }

            .iqb-question-prompt {
              font-size: 1.1rem;
              font-weight: 700;
              margin: 0;
              line-height: 1.45;
              padding-top: 4px;
            }

            .iqb-question-body {
              padding: 24px;
              display: grid;
              grid-template-columns: 0.9fr 1.1fr;
              gap: 20px;
            }

            .iqb-question-context {
              display: grid;
              gap: 18px;
            }

            .iqb-question-block {
              display: grid;
              gap: 4px;
            }

            .iqb-question-block-label {
              font-size: 0.72rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: var(--text-muted);
            }

            .iqb-question-block-text {
              margin: 0;
              color: var(--text-secondary);
              font-size: 0.9rem;
              line-height: 1.7;
            }

            .iqb-sample-answer {
              border-radius: 16px;
              padding: 20px;
              background: #f8fafc;
              border: 1px solid rgba(0, 0, 0, 0.04);
            }

            .iqb-sample-answer-label {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              color: var(--accent-dark);
              font-weight: 800;
              font-size: 0.72rem;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 10px;
            }

            .iqb-sample-answer-text {
              margin: 0;
              color: var(--text);
              font-size: 0.9rem;
              line-height: 1.8;
            }

            /* Sources */
            .iqb-sources-box {
              border-radius: 16px;
              padding: 22px;
              border: 1px solid rgba(0, 0, 0, 0.04);
              background: #fafbfc;
            }

            .iqb-sources-heading {
              font-size: 0.95rem;
              font-weight: 700;
              margin-bottom: 14px;
            }

            .iqb-sources-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
            }

            .iqb-source-card {
              text-decoration: none;
              color: inherit;
              border-radius: 14px;
              padding: 16px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              background: #fff;
              display: grid;
              gap: 8px;
              transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }

            .iqb-source-card:hover {
              border-color: var(--accent);
              box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
            }

            .iqb-source-card-top {
              display: flex;
              justify-content: space-between;
              gap: 8px;
              align-items: flex-start;
            }

            .iqb-source-title {
              line-height: 1.45;
              font-size: 0.9rem;
            }

            .iqb-source-icon {
              color: var(--accent);
              flex-shrink: 0;
              margin-top: 2px;
              font-size: 0.88rem;
            }

            .iqb-source-note {
              color: var(--text-secondary);
              font-size: 0.82rem;
              line-height: 1.55;
            }

            /* CTA dark */
            .iqb-cta-dark {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              border-radius: 20px;
              padding: 32px;
              display: grid;
              gap: 14px;
            }

            .iqb-cta-dark-title {
              font-size: 1.35rem;
              color: #fff;
              margin: 0;
            }

            .iqb-cta-dark-desc {
              color: rgba(226, 232, 240, 0.65);
              font-size: 0.95rem;
              line-height: 1.7;
              margin: 0;
              max-width: 72ch;
            }

            .iqb-cta-dark-actions {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
              margin-top: 4px;
            }

            /* All references */
            .iqb-references {
              background: #fff;
              border-radius: 20px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              padding: 28px;
              display: grid;
              gap: 18px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            }

            .iqb-references-title {
              font-size: 1.2rem;
              margin: 0;
            }

            .iqb-references-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }

            .iqb-reference-card {
              text-decoration: none;
              color: inherit;
              border-radius: 14px;
              padding: 16px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              background: #fafbfc;
              display: grid;
              gap: 4px;
              transition: border-color 0.15s ease;
            }

            .iqb-reference-card:hover {
              border-color: var(--accent);
            }

            .iqb-reference-sector {
              color: var(--accent);
              font-weight: 800;
              font-size: 0.7rem;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .iqb-reference-title {
              font-size: 0.9rem;
              line-height: 1.45;
            }

            .iqb-reference-note {
              color: var(--text-secondary);
              font-size: 0.82rem;
              line-height: 1.55;
            }

            /* Responsive */
            @media (max-width: 980px) {
              .iqb-hero-grid,
              .iqb-sector-header,
              .iqb-question-body,
              .iqb-sources-grid,
              .iqb-references-grid,
              .iqb-prep-grid,
              .iqb-sector-nav-grid {
                grid-template-columns: 1fr;
              }
            }
          `,
        }}
      />
    </section>
  );
}

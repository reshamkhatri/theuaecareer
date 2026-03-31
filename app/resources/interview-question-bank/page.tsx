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
    <section
      className="section"
      style={{
        background:
          'linear-gradient(180deg, #f8fafc 0%, #ffffff 48%), radial-gradient(circle at top left, rgba(15,23,42,0.06), transparent 28%)',
      }}
    >
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <section
          className="card"
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.25rem)',
            borderRadius: '34px',
            border: '1px solid rgba(148,163,184,0.16)',
            background: 'linear-gradient(135deg, #0f172a 0%, #18263f 55%, #1f3552 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at top right, rgba(45,212,191,0.18), transparent 32%), radial-gradient(circle at bottom left, rgba(99,102,241,0.2), transparent 30%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '1.5rem',
              alignItems: 'end',
            }}
            className="question-bank-hero-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(226,232,240,0.92)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '14px',
                }}
              >
                Reviewed {interviewResearchReviewedOn}
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem, 7vw, 4.2rem)', marginBottom: '14px', lineHeight: 1.02, color: 'white' }}>
                Interview Question Bank with sample answers
              </h1>
              <p style={{ color: 'rgba(226,232,240,0.84)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: '60ch' }}>
                Built for Gulf-facing hiring, this page combines common recruiter themes, candidate-reported interview
                patterns, and sample answers you can adapt to your own background without sounding rehearsed.
              </p>
            </div>

            <div
              style={{
                borderRadius: '24px',
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'grid',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ color: 'rgba(226,232,240,0.62)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Best way to use this page
                </div>
                <p style={{ margin: '8px 0 0', color: 'rgba(226,232,240,0.82)', lineHeight: 1.8 }}>
                  Pick one sector, read the sample answers, then rewrite them using your own numbers, responsibilities, and results.
                </p>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <FiCheckCircle style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Questions are grouped by real hiring sectors, not generic interview categories.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <FiCheckCircle style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Each question includes context, answer signals, and a practical sample answer.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="card"
          style={{
            padding: '1.15rem',
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid rgba(148,163,184,0.16)',
            display: 'grid',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Jump to a sector</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                Start with the roles closest to the job you are applying for.
              </p>
            </div>
            <Link href="/resources" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
              Back to Resources
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '12px',
            }}
            className="question-bank-sector-nav"
          >
            {interviewSectors.map((sector) => (
              <a
                key={sector.slug}
                href={`#${sector.slug}`}
                style={{
                  borderRadius: '18px',
                  padding: '14px 16px',
                  border: '1px solid rgba(148,163,184,0.18)',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#f8fafc',
                  display: 'grid',
                  gap: '6px',
                }}
              >
                <strong>{sector.title}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{sector.roles.slice(0, 2).join(' · ')}</span>
              </a>
            ))}
          </div>
        </section>

        {interviewSectors.map((sector) => (
          <section
            key={sector.slug}
            id={sector.slug}
            className="card"
            style={{
              padding: 'clamp(1.4rem, 3vw, 2rem)',
              borderRadius: '32px',
              border: '1px solid rgba(148,163,184,0.16)',
              background: '#ffffff',
              boxShadow: '0 18px 40px rgba(15,23,42,0.05)',
              display: 'grid',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: '1.5rem',
                alignItems: 'start',
              }}
              className="question-bank-sector-header"
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    background: '#eef2ff',
                    color: '#4338ca',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}
                >
                  {sector.title}
                </div>
                <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', marginBottom: '10px' }}>{sector.title}</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.85 }}>{sector.summary}</p>
              </div>

              <div
                style={{
                  borderRadius: '24px',
                  padding: '1.25rem',
                  background: '#f8fafc',
                  border: '1px solid rgba(148,163,184,0.16)',
                  display: 'grid',
                  gap: '12px',
                }}
              >
                <div>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>Roles covered</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {sector.roles.map((role) => (
                      <span
                        key={role}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '999px',
                          background: '#ffffff',
                          border: '1px solid rgba(148,163,184,0.16)',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>What hiring managers notice</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    {sector.recruiterSignals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: '24px',
                padding: '1.25rem',
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
                border: '1px solid rgba(148,163,184,0.16)',
              }}
            >
              <h3 style={{ fontSize: '1.08rem', marginBottom: '12px' }}>Before you practice</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }} className="question-bank-checklist-grid">
                {sector.prepChecklist.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <FiCheckCircle style={{ color: '#4f46e5', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              {sector.questions.map((question, index) => (
                <article
                  key={`${sector.slug}-${index}`}
                  style={{
                    borderRadius: '28px',
                    border: '1px solid rgba(148,163,184,0.16)',
                    background: '#ffffff',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      padding: '1.25rem 1.35rem',
                      borderBottom: '1px solid rgba(148,163,184,0.14)',
                      background: '#f8fafc',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '34px',
                        height: '34px',
                        borderRadius: '12px',
                        background: '#eef2ff',
                        color: '#4338ca',
                        fontWeight: 800,
                        marginBottom: '12px',
                      }}
                    >
                      {index + 1}
                    </div>
                    <h3 style={{ fontSize: '1.22rem', margin: 0, lineHeight: 1.55 }}>{question.prompt}</h3>
                  </div>

                  <div
                    style={{
                      padding: '1.35rem',
                      display: 'grid',
                      gridTemplateColumns: '0.9fr 1.1fr',
                      gap: '16px',
                    }}
                    className="question-bank-answer-grid"
                  >
                    <div style={{ display: 'grid', gap: '14px' }}>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                          Why this gets asked
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{question.whyItComesUp}</p>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                          What a strong answer includes
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{question.strongAnswerSignals}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        borderRadius: '22px',
                        padding: '1.15rem 1.2rem',
                        background: '#f8fafc',
                        border: '1px solid rgba(148,163,184,0.16)',
                      }}
                    >
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4338ca', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                        <FiFileText />
                        Sample answer
                      </div>
                      <p style={{ margin: 0, color: 'var(--text)', lineHeight: 1.85 }}>{question.sampleAnswer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              style={{
                borderRadius: '24px',
                padding: '1.25rem',
                border: '1px solid rgba(148,163,184,0.16)',
                background: '#ffffff',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Research basis for this sector</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px' }} className="question-bank-source-grid">
                {sector.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: '20px',
                      padding: '1rem',
                      border: '1px solid rgba(148,163,184,0.16)',
                      background: '#f8fafc',
                      display: 'grid',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'flex-start' }}>
                      <strong style={{ lineHeight: 1.55 }}>{source.title}</strong>
                      <FiExternalLink style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{source.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
            color: 'white',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.55rem', margin: 0, color: 'white' }}>Use the sample answers properly</h2>
          <p style={{ margin: 0, color: 'rgba(226,232,240,0.82)', lineHeight: 1.8 }}>
            Do not memorize these word for word. Replace the examples with your own projects, guest cases, sales numbers,
            shutdowns, or safety actions. The goal is to sound prepared and credible, not scripted.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/tools/cv-maker" className="btn" style={{ textDecoration: 'none' }}>
              Open CV Maker <FiArrowRight />
            </Link>
            <Link href="/blog" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              Read career guides
            </Link>
          </div>
        </section>

        <section
          className="card"
          style={{
            padding: '1.5rem',
            borderRadius: '28px',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.45rem', margin: 0 }}>All sources reviewed for this page</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }} className="question-bank-reference-grid">
            {interviewQuestionBankReferences.map((source) => (
              <a
                key={`${source.sector}-${source.href}`}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: '20px',
                  padding: '1rem',
                  border: '1px solid rgba(148,163,184,0.16)',
                  background: '#ffffff',
                  display: 'grid',
                  gap: '6px',
                }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {source.sector}
                </span>
                <strong>{source.title}</strong>
                <span style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{source.note}</span>
              </a>
            ))}
          </div>
        </section>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 980px) {
                .question-bank-hero-grid,
                .question-bank-sector-nav,
                .question-bank-sector-header,
                .question-bank-answer-grid,
                .question-bank-source-grid,
                .question-bank-reference-grid,
                .question-bank-checklist-grid {
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


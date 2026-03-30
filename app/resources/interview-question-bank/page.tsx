import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiExternalLink, FiMessageSquare } from 'react-icons/fi';
import { interviewQuestionBankReferences, interviewResearchReviewedOn, interviewSectors } from '@/lib/interview-question-bank';

export const metadata: Metadata = {
  title: 'Interview Question Bank | Construction, Hospitality, Retail and Oil & Gas',
  description:
    'Prepare with a research-backed Gulf Interview Question Bank covering Construction, Hospitality, Retail, and Oil & Gas interview themes commonly asked by recruiters and employers.',
  alternates: {
    canonical: '/resources/interview-question-bank',
  },
  openGraph: {
    title: 'Interview Question Bank | Gulf sector interview prep',
    description:
      'Prepare for Construction, Hospitality, Retail, and Oil & Gas interviews with common question patterns distilled from recruiter guides and candidate-reported interviews.',
    url: '/resources/interview-question-bank',
  },
};

export default function InterviewQuestionBankPage() {
  return (
    <section
      className="section"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(99,102,241,0.14), transparent 28%), radial-gradient(circle at top right, rgba(45,212,191,0.15), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      }}
    >
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <div style={{ maxWidth: '860px' }}>
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
            <FiMessageSquare />
            Reviewed {interviewResearchReviewedOn}
          </div>
          <h1 style={{ fontSize: 'clamp(2.3rem, 7vw, 4rem)', marginBottom: '14px', lineHeight: 1.03 }}>
            Interview Question Bank for Gulf hiring sectors
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.12rem', lineHeight: 1.85 }}>
            This bank is built from current recruiter guides and recent candidate-reported interviews we reviewed for
            Gulf-relevant hiring patterns. It is not a random list: it is a distilled practice set for the questions
            employers repeatedly use to test judgment, attitude, and job readiness.
          </p>
        </div>

        <div
          className="card"
          style={{
            padding: '1.25rem',
            borderRadius: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            border: '1px solid rgba(99,102,241,0.14)',
            background: 'rgba(255,255,255,0.84)',
          }}
        >
          <strong style={{ marginRight: '8px' }}>Jump to sector:</strong>
          {interviewSectors.map((sector) => (
            <a
              key={sector.slug}
              href={`#${sector.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                textDecoration: 'none',
                background: 'white',
              }}
            >
              {sector.title}
            </a>
          ))}
        </div>

        {interviewSectors.map((sector, index) => (
          <section
            key={sector.slug}
            id={sector.slug}
            className="card"
            style={{
              padding: 'clamp(1.4rem, 3vw, 2rem)',
              borderRadius: '32px',
              border: '1px solid rgba(148,163,184,0.16)',
              boxShadow: '0 24px 48px rgba(15,23,42,0.05)',
              background:
                index % 2 === 0
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,245,255,0.98))',
              display: 'grid',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: '1.5rem',
              }}
              className="interview-sector-top"
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    background: 'rgba(45,212,191,0.12)',
                    color: '#0f766e',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                  }}
                >
                  {sector.title} hiring
                </div>
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '10px' }}>{sector.title}</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.85 }}>{sector.summary}</p>
              </div>

              <div
                style={{
                  borderRadius: '24px',
                  padding: '1.25rem',
                  background: 'rgba(15,23,42,0.96)',
                  color: 'white',
                  display: 'grid',
                  gap: '12px',
                }}
              >
                <strong style={{ fontSize: '1rem', color: 'white' }}>Common roles covered</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {sector.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '8px 12px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'rgba(226,232,240,0.92)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '0.95fr 1.05fr',
                gap: '1.5rem',
              }}
              className="interview-sector-summary"
            >
              <div
                style={{
                  borderRadius: '24px',
                  padding: '1.35rem',
                  background: 'rgba(255,255,255,0.86)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>What recruiters are screening for</h3>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {sector.recruiterSignals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  borderRadius: '24px',
                  padding: '1.35rem',
                  background: 'rgba(99,102,241,0.07)',
                  border: '1px solid rgba(99,102,241,0.14)',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Fast prep checklist</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {sector.prepChecklist.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <FiCheckCircle style={{ color: '#4f46e5', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Common questions to practice</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '16px',
                }}
                className="interview-question-grid"
              >
                {sector.questions.map((question, questionIndex) => (
                  <article
                    key={`${sector.slug}-${questionIndex}`}
                    style={{
                      borderRadius: '24px',
                      padding: '1.25rem',
                      background: 'white',
                      border: '1px solid rgba(148,163,184,0.18)',
                      boxShadow: '0 18px 36px rgba(15,23,42,0.04)',
                      display: 'grid',
                      gap: '12px',
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
                        background: 'rgba(99,102,241,0.12)',
                        color: '#4338ca',
                        fontWeight: 800,
                      }}
                    >
                      {questionIndex + 1}
                    </div>
                    <h4 style={{ fontSize: '1.08rem', lineHeight: 1.55, margin: 0 }}>{question.prompt}</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      <div>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>Why it comes up</strong>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{question.whyItComesUp}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>Strong answer signals</strong>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                          {question.strongAnswerSignals}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Research basis for this section</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '14px',
                }}
                className="interview-source-grid"
              >
                {sector.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      borderRadius: '22px',
                      padding: '1rem',
                      border: '1px solid rgba(148,163,184,0.18)',
                      background: 'white',
                      color: 'inherit',
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
          <h2 style={{ fontSize: '1.6rem', margin: 0, color: 'white' }}>How to use this bank effectively</h2>
          <p style={{ margin: 0, color: 'rgba(226,232,240,0.82)', lineHeight: 1.8 }}>
            Pick one sector, practice out loud, and build short STAR stories for your own experience instead of
            memorizing word-for-word answers. Recruiters usually reward clear specifics, calm delivery, and credible
            examples over polished but vague responses.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/blog" className="btn" style={{ textDecoration: 'none' }}>
              Read career guides <FiArrowRight />
            </Link>
            <Link href="/tools/cv-maker" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              Open CV Maker
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
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Full source list reviewed for this page</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '14px',
            }}
            className="interview-reference-grid"
          >
            {interviewQuestionBankReferences.map((source) => (
              <a
                key={`${source.sector}-${source.href}`}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  borderRadius: '22px',
                  padding: '1rem',
                  border: '1px solid rgba(148,163,184,0.18)',
                  background: '#fff',
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
                .interview-sector-top,
                .interview-sector-summary,
                .interview-question-grid,
                .interview-source-grid,
                .interview-reference-grid {
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

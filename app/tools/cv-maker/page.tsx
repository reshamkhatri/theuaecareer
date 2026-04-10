'use client';

import type { ReactNode, Ref } from 'react';
import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import { FiCheck, FiCpu, FiDownload, FiMail, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { buildCvBullets, buildCvSummary } from '@/lib/cv-assist';

/* ─── Types ─── */
type TemplateId = 'gulf-classic' | 'dubai-executive' | 'modern-minimal';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  notes: string;
  bullets: string[];
}

interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
  details: string;
}

interface LanguageItem {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

interface CVData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  nationality: string;
  visaStatus: string;
  dateOfBirth: string;
  summary: string;
  skills: string[];
  languages: LanguageItem[];
  template: TemplateId;
  experiences: ExperienceItem[];
  education: EducationItem[];
}

const steps = ['Profile', 'Experience', 'Education', 'Skills', 'Languages', 'Template'];

const templateInfo: Record<TemplateId, { label: string; description: string; layout: string }> = {
  'gulf-classic': {
    label: 'Gulf Classic',
    description: 'Single-column, ATS-friendly layout used by top recruitment agencies across the UAE and Saudi Arabia. Clean sections, no graphics.',
    layout: 'Single Column',
  },
  'dubai-executive': {
    label: 'Dubai Executive',
    description: 'Two-column sidebar layout with a dark left panel for contact, skills, and languages. Right panel for experience and education.',
    layout: 'Sidebar + Main',
  },
  'modern-minimal': {
    label: 'Modern Minimal',
    description: 'Contemporary split-body layout with a bold header. Left column for experience, right for skills and personal details.',
    layout: 'Split Body',
  },
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createExperience = (): ExperienceItem => ({
  id: createId(), title: '', company: '', location: '', startDate: '', endDate: '', current: false, notes: '', bullets: [],
});

const createEducation = (): EducationItem => ({
  id: createId(), degree: '', school: '', year: '', details: '',
});

const createLanguage = (): LanguageItem => ({
  id: createId(), name: '', level: 'Intermediate',
});

const initialData: CVData = {
  firstName: 'Ahmed',
  lastName: 'Al-Maktoum',
  title: 'Project Manager',
  email: 'ahmed@example.com',
  phone: '+971 50 000 0000',
  location: 'Dubai, UAE',
  linkedin: 'linkedin.com/in/ahmed-almaktoum',
  nationality: 'UAE National',
  visaStatus: 'Employment Visa',
  dateOfBirth: '15 March 1992',
  summary:
    'Project manager with 8+ years of experience leading cross-functional delivery teams, improving operations, and shipping high-visibility work across the Gulf market.',
  skills: ['Project Delivery', 'Stakeholder Management', 'Agile / Scrum', 'Budget Planning', 'Risk Assessment', 'MS Project'],
  languages: [
    { id: createId(), name: 'English', level: 'Fluent' },
    { id: createId(), name: 'Arabic', level: 'Native' },
  ],
  template: 'gulf-classic',
  experiences: [
    {
      id: createId(),
      title: 'Senior Project Manager',
      company: 'TechVision Global',
      location: 'Dubai, UAE',
      startDate: 'Jan 2021',
      endDate: '',
      current: true,
      notes: 'Led a 45-person delivery team across product, engineering, and QA.',
      bullets: [
        'Led a 45-person cross-functional delivery team across product, engineering, and QA departments.',
        'Reduced project delays by 32% by tightening planning, scope alignment, and handoff processes.',
        'Managed portfolio of 12 concurrent projects with combined budget exceeding AED 18M.',
      ],
    },
    {
      id: createId(),
      title: 'Project Coordinator',
      company: 'Gulf Construction Group',
      location: 'Abu Dhabi, UAE',
      startDate: 'Jun 2016',
      endDate: 'Dec 2020',
      current: false,
      notes: '',
      bullets: [
        'Coordinated delivery schedules for 8 infrastructure projects across Abu Dhabi and Al Ain.',
        'Prepared weekly progress reports for C-suite stakeholders and government clients.',
      ],
    },
  ],
  education: [
    {
      id: createId(),
      degree: 'BSc Business Administration',
      school: 'American University of Sharjah',
      year: '2016',
      details: 'Graduated with a focus on operations and strategic planning.',
    },
  ],
};

/* ─── Main Component ─── */
export default function CVMakerPage() {
  const [step, setStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theuaecareer-cv-data');
        if (saved) return JSON.parse(saved) as CVData;
      } catch { /* ignore */ }
    }
    return initialData;
  });
  const [skillInput, setSkillInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Persist CV data to localStorage so work isn't lost on reload
  useEffect(() => {
    try {
      localStorage.setItem('theuaecareer-cv-data', JSON.stringify(cvData));
    } catch { /* ignore quota errors */ }
  }, [cvData]);

  const fullName = [cvData.firstName, cvData.lastName].filter(Boolean).join(' ') || 'Your Name';

  const renderPreviewSheet = (mode: 'live' | 'export', ref: Ref<HTMLDivElement> | null = null) => (
    <div
      ref={ref}
      className={`cv-preview-sheet ${mode === 'live' ? 'cv-preview-sheet-live' : 'cv-preview-sheet-export'}`}
    >
      {cvData.template === 'gulf-classic' && (
        <GulfClassicPreview cvData={cvData} fullName={fullName} useSemanticHeadings={mode === 'live'} />
      )}
      {cvData.template === 'dubai-executive' && (
        <DubaiExecutivePreview cvData={cvData} fullName={fullName} useSemanticHeadings={mode === 'live'} />
      )}
      {cvData.template === 'modern-minimal' && (
        <ModernMinimalPreview cvData={cvData} fullName={fullName} useSemanticHeadings={mode === 'live'} />
      )}
    </div>
  );

  const filledSections = useMemo(
    () => [
      Boolean(cvData.firstName && cvData.title),
      cvData.experiences.some((item) => item.title || item.company || item.bullets.length > 0),
      cvData.education.some((item) => item.degree || item.school),
      cvData.skills.length > 0,
      cvData.languages.length > 0,
      Boolean(cvData.template),
    ],
    [cvData]
  );

  const updateField = (field: keyof CVData, value: string | string[] | TemplateId | LanguageItem[]) => {
    setCvData((current) => ({ ...current, [field]: value }));
  };

  const updateExperience = (id: string, changes: Partial<ExperienceItem>) => {
    setCvData((current) => ({
      ...current,
      experiences: current.experiences.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }));
  };

  const updateEducation = (id: string, changes: Partial<EducationItem>) => {
    setCvData((current) => ({
      ...current,
      education: current.education.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }));
  };

  const updateLanguage = (id: string, changes: Partial<LanguageItem>) => {
    setCvData((current) => ({
      ...current,
      languages: current.languages.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    }));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || cvData.skills.some((s) => s.toLowerCase() === value.toLowerCase())) return;
    setCvData((current) => ({ ...current, skills: [...current.skills, value] }));
    setSkillInput('');
  };

  const handleEnhanceExperience = async (experience: ExperienceItem) => {
    if (!experience.notes.trim()) {
      setStatusMessage('Paste rough notes first, then Smart Assist will turn them into polished Gulf-ready CV bullets.');
      return;
    }
    setEnhancingId(experience.id);
    setStatusMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const bullets = buildCvBullets(experience.notes, experience.title || cvData.title || 'professional');
      const summary = buildCvSummary({
        title: cvData.title,
        skills: cvData.skills,
        experiences: cvData.experiences.map((item) =>
          item.id === experience.id ? { ...item, bullets } : item
        ),
      });
      startTransition(() => {
        setCvData((current) => ({
          ...current,
          summary: current.summary.trim() || summary,
          experiences: current.experiences.map((item) =>
            item.id === experience.id ? { ...item, bullets } : item
          ),
        }));
      });
      setStatusMessage('Smart Assist rewrote your notes locally for static hosting. Review the bullets and keep only what is accurate.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to enhance experience.');
    } finally {
      setEnhancingId(null);
    }
  };

  const handleEnhanceSummary = async () => {
    const notes = cvData.experiences.map((item) => item.notes || item.bullets.join('. ')).filter(Boolean).join('. ');
    if (!notes) {
      setStatusMessage('Add at least one experience note before generating a professional summary.');
      return;
    }
    setIsSummaryLoading(true);
    setStatusMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const summary = buildCvSummary({
        title: cvData.title,
        skills: cvData.skills,
        experiences: cvData.experiences.map((item) => ({
          title: item.title,
          company: item.company,
          location: item.location,
          startDate: item.startDate,
          endDate: item.endDate,
          current: item.current,
          notes: item.notes || item.bullets.join('. '),
          bullets: item.bullets,
        })),
      });
      setCvData((current) => ({ ...current, summary: summary || current.summary }));
      setStatusMessage('Smart Assist drafted a sharper summary locally so the CV tool still works on static hosting.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to improve summary.');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || typeof window === 'undefined') return;
    if (!cvData.firstName.trim() && !cvData.lastName.trim()) {
      setStatusMessage('Please enter at least your name before exporting.');
      return;
    }
    setIsDownloading(true);
    setStatusMessage(null);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `${fullName.replace(/\s+/g, '_') || 'CV'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .save();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to export CV.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEmailCV = async () => {
    if (!previewRef.current || typeof window === 'undefined') return;
    if (!cvData.firstName.trim() && !cvData.lastName.trim()) {
      setEmailStatus({ ok: false, msg: 'Please enter at least your name before sending.' });
      return;
    }
    const email = emailInput.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailStatus({ ok: false, msg: 'Please enter a valid email address.' });
      return;
    }
    setIsSendingEmail(true);
    setEmailStatus(null);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const blob: Blob = await html2pdf()
        .set({
          margin: 0,
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .outputPdf('blob');

      const reader = new FileReader();
      const pdfBase64: string = await new Promise((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
          } else {
            reject(new Error('Unexpected PDF read result.'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const res = await fetch('/api/send-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          pdfBase64,
          fileName: `${fullName.replace(/\s+/g, '_') || 'CV'}.pdf`,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setEmailStatus({ ok: false, msg: 'Email sending is only available after deployment.' });
        return;
      }

      const data = (await res.json()) as { message?: string };
      if (res.ok) {
        setEmailStatus({ ok: true, msg: data.message || 'CV sent successfully!' });
        setEmailInput('');
        setTimeout(() => setShowEmailModal(false), 1800);
      } else {
        setEmailStatus({ ok: false, msg: data.message || 'Failed to send email.' });
      }
    } catch (error) {
      setEmailStatus({ ok: false, msg: error instanceof Error ? error.message : 'Failed to send email.' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0 72px' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontSize: '0.8rem', fontWeight: 700, marginBottom: '18px' }}>
            <FiCpu /> Gulf-ready CV builder
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.05, marginBottom: '14px', color: '#0f172a' }}>
            Build a CV that lands Gulf jobs.
          </h1>
          <p style={{ maxWidth: '760px', margin: '0 auto 16px', color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Includes nationality, visa status, and languages — the fields Gulf recruiters actually look for. Choose from 3 distinct professional layouts and export a polished PDF.
          </p>
          <button
            className="btn"
            style={{ background: 'transparent', color: '#94a3b8', fontSize: '0.8125rem', border: '1px solid #e2e8f0', padding: '6px 14px' }}
            onClick={() => {
              if (confirm('Clear all CV data and start fresh?')) {
                setCvData(initialData);
                localStorage.removeItem('theuaecareer-cv-data');
              }
            }}
          >
            Clear &amp; start fresh
          </button>
        </div>

        {/* Stepper */}
        <div className="cv-stepper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
          {steps.map((label, index) => (
            <button key={label} className="btn" onClick={() => setStep(index + 1)} style={{ background: index + 1 === step ? '#0f172a' : '#e2e8f0', color: index + 1 === step ? '#fff' : '#334155', minWidth: '120px', justifyContent: 'center', fontSize: '0.875rem' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '999px', background: filledSections[index] ? '#14b8a6' : 'rgba(255,255,255,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                {filledSections[index] ? <FiCheck /> : index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>

        {statusMessage && (
          <div className="card" style={{ marginBottom: '24px', padding: '16px 18px', borderLeft: '4px solid #0f766e', color: '#334155' }}>
            {statusMessage}
          </div>
        )}

        <div className="cv-maker-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.25fr)', gap: '28px', alignItems: 'start' }}>
          {/* Left: Editor */}
          <div className="cv-editor-column" style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            <div className="card cv-editor-card" style={{ padding: '28px', overflowX: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', fontWeight: 800 }}>
                    Step {step} of {steps.length}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', color: '#0f172a', marginTop: '6px' }}>{steps[step - 1]}</h2>
                </div>
                <button className="btn btn-secondary" onClick={handleEnhanceSummary} disabled={isSummaryLoading}>
                  {isSummaryLoading ? 'Writing summary...' : 'Write summary with Smart Assist'}
                </button>
              </div>

              {step === 1 && <StepProfile cvData={cvData} updateField={updateField} />}
              {step === 2 && (
                <StepExperience
                  experiences={cvData.experiences}
                  onAdd={() => setCvData((c) => ({ ...c, experiences: [...c.experiences, createExperience()] }))}
                  onRemove={(id) => setCvData((c) => ({ ...c, experiences: c.experiences.length > 1 ? c.experiences.filter((i) => i.id !== id) : c.experiences }))}
                  onChange={updateExperience}
                  onEnhance={handleEnhanceExperience}
                  enhancingId={enhancingId}
                />
              )}
              {step === 3 && (
                <StepEducation
                  education={cvData.education}
                  onAdd={() => setCvData((c) => ({ ...c, education: [...c.education, createEducation()] }))}
                  onRemove={(id) => setCvData((c) => ({ ...c, education: c.education.length > 1 ? c.education.filter((i) => i.id !== id) : c.education }))}
                  onChange={updateEducation}
                />
              )}
              {step === 4 && (
                <StepSkills
                  skills={cvData.skills} skillInput={skillInput} setSkillInput={setSkillInput}
                  onAdd={addSkill} onRemove={(skill) => updateField('skills', cvData.skills.filter((i) => i !== skill))}
                />
              )}
              {step === 5 && (
                <StepLanguages
                  languages={cvData.languages}
                  onAdd={() => setCvData((c) => ({ ...c, languages: [...c.languages, createLanguage()] }))}
                  onRemove={(id) => setCvData((c) => ({ ...c, languages: c.languages.filter((i) => i.id !== id) }))}
                  onChange={updateLanguage}
                />
              )}
              {step === 6 && (
                <StepTemplate selected={cvData.template} onSelect={(t) => updateField('template', t)} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', gap: '12px' }}>
                <button className="btn" onClick={() => setStep((c) => Math.max(1, c - 1))} disabled={step === 1}>Back</button>
                <button className="btn btn-primary" onClick={() => setStep((c) => Math.min(steps.length, c + 1))}>
                  {step === steps.length ? 'Review preview' : 'Next step'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="cv-preview-column" style={{ position: 'sticky', top: '24px', minWidth: 0 }}>
            <div className="card cv-preview-card" style={{ padding: '18px', background: '#e2e8f0' }}>
              <div className="cv-preview-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#22c55e' }} />
                </div>
                <strong style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569' }}>
                  Live Preview
                </strong>
                <button className="btn btn-primary" onClick={handleDownload} disabled={isDownloading}>
                  <FiDownload /> {isDownloading ? 'Exporting...' : 'Export PDF'}
                </button>
                <button
                  className="btn"
                  style={{ background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe' }}
                  onClick={() => { setShowEmailModal(true); setEmailStatus(null); }}
                >
                  <FiMail /> Email CV
                </button>
              </div>

              <div className="cv-preview-live-shell">
                {renderPreviewSheet('live')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cv-preview-export-shell" aria-hidden="true">
        {renderPreviewSheet('export', previewRef)}
      </div>
      <style jsx>{`
        .cv-preview-live-shell {
          overflow: hidden;
          border-radius: 8px;
        }
        .cv-preview-sheet {
          background-color: #fff;
          margin: 0 auto;
        }
        .cv-preview-sheet-live {
          width: 100%;
          max-width: 920px;
          box-shadow: 0 24px 54px rgba(15, 23, 42, 0.12);
        }
        .cv-preview-sheet-export {
          width: 850px;
          max-width: 850px;
        }
        .cv-preview-export-shell {
          position: fixed;
          top: 0;
          left: -10000px;
          width: 850px;
          pointer-events: none;
        }
        @media (max-width: 1280px) {
          .cv-maker-layout { grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr) !important; }
        }
        @media (max-width: 1024px) {
          .cv-maker-layout { grid-template-columns: 1fr !important; }
          .cv-preview-column { position: static !important; top: auto !important; }
        }
        @media (max-width: 900px) {
          .cv-preview-sheet-live :global(.cv-template-executive) { flex-direction: column !important; }
          .cv-preview-sheet-live :global(.cv-template-executive-sidebar) { width: 100% !important; }
          .cv-preview-sheet-live :global(.cv-template-modern-body) { flex-direction: column !important; }
          .cv-preview-sheet-live :global(.cv-template-modern-main) { flex: 1 1 auto !important; }
          .cv-preview-sheet-live :global(.cv-template-modern-side) {
            border-left: 0 !important;
            border-top: 1px solid #e5e7eb !important;
            padding-left: 0 !important;
            padding-top: 20px !important;
          }
        }
        @media (max-width: 720px) {
          .cv-stepper {
            justify-content: flex-start !important;
            flex-wrap: nowrap !important;
            overflow-x: auto;
            padding-bottom: 6px;
          }
          .cv-editor-card, .cv-preview-card { padding: 20px !important; }
          :global(.cv-profile-grid), :global(.cv-entry-grid), :global(.cv-template-grid) { grid-template-columns: 1fr !important; }
          :global(.cv-skills-row) { flex-direction: column; }
          :global(.cv-skill-input) { min-width: 0 !important; }
          .cv-preview-toolbar { flex-wrap: wrap; gap: 10px; }
          .cv-preview-toolbar .btn { flex: 1 1 calc(50% - 5px); min-width: 0; }
          .cv-preview-sheet-live :global(.cv-template-classic) { padding: 24px 18px !important; }
          .cv-preview-sheet-live :global(.cv-template-executive-sidebar),
          .cv-preview-sheet-live :global(.cv-template-executive-main) { padding: 24px 18px !important; }
          .cv-preview-sheet-live :global(.cv-template-modern-header),
          .cv-preview-sheet-live :global(.cv-template-modern-body) { padding: 24px 18px !important; }
          .cv-preview-sheet-live :global(.cv-template-modern-body) { gap: 20px !important; }
        }
      `}</style>

      {/* Email CV Modal */}
      {showEmailModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-modal-title"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowEmailModal(false); }}
          onKeyDown={(e) => { if (e.key === 'Escape') setShowEmailModal(false); }}
        >
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '36px',
            maxWidth: '440px', width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 id="email-modal-title" style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '4px' }}>Email my CV</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>We&apos;ll send your CV as a PDF attachment.</p>
              </div>
              <button onClick={() => setShowEmailModal(false)} aria-label="Close modal" style={{ color: '#94a3b8', fontSize: '1.25rem', lineHeight: 1 }}>
                <FiX />
              </button>
            </div>

            <input
              type="email"
              autoComplete="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleEmailCV(); }}
              placeholder="your@email.com"
              disabled={isSendingEmail}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: '10px',
                border: `1px solid ${emailStatus && !emailStatus.ok ? '#ef4444' : '#e2e8f0'}`,
                fontSize: '0.9375rem',
                marginBottom: '12px', outline: 'none',
                opacity: isSendingEmail ? 0.6 : 1,
              }}
            />

            {emailStatus && (
              <div style={{
                padding: '10px 14px', borderRadius: '8px', marginBottom: '12px',
                fontSize: '0.875rem', fontWeight: 500,
                background: emailStatus.ok ? '#ecfdf5' : '#fef2f2',
                color: emailStatus.ok ? '#065f46' : '#991b1b',
              }}>
                {emailStatus.msg}
              </div>
            )}

            <button
              className="btn btn-primary"
              onClick={handleEmailCV}
              disabled={isSendingEmail}
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              <FiMail /> {isSendingEmail ? 'Sending...' : 'Send CV'}
            </button>

            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', marginTop: '12px', marginBottom: 0 }}>
              Your email is only used to deliver this CV and is not stored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE A: GULF CLASSIC — Single Column, ATS-Friendly
   ═══════════════════════════════════════════════════ */
function GulfClassicPreview({
  cvData,
  fullName,
  useSemanticHeadings,
}: {
  cvData: CVData;
  fullName: string;
  useSemanticHeadings: boolean;
}) {
  const contact = [cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean);
  const personal = [
    cvData.nationality && `Nationality: ${cvData.nationality}`,
    cvData.visaStatus && `Visa: ${cvData.visaStatus}`,
    cvData.dateOfBirth && `DOB: ${cvData.dateOfBirth}`,
  ].filter(Boolean);

  return (
    <div className="cv-template-paper cv-template-classic" style={{ background: '#fff', padding: '40px 36px', fontFamily: "'Segoe UI', Arial, sans-serif", color: '#1a1a1a', fontSize: '10.5pt', lineHeight: 1.5, borderRadius: '8px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <div style={{ fontSize: '22pt', fontWeight: 700, letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>{fullName}</div>
        <div style={{ fontSize: '12pt', color: '#0f766e', fontWeight: 600, marginTop: '4px' }}>{cvData.title || 'Professional Title'}</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '9.5pt', color: '#555', marginBottom: '4px' }}>
        {contact.join('  •  ')}
      </div>
      {personal.length > 0 && (
        <div style={{ textAlign: 'center', fontSize: '9pt', color: '#777', marginBottom: '4px' }}>
          {personal.join('  |  ')}
        </div>
      )}
      <hr style={{ border: 'none', borderTop: '2px solid #0f766e', margin: '14px 0' }} />

      {/* Professional Summary */}
      <SectionHeadingClassic title="Professional Summary" asHeading={useSemanticHeadings} />
      <p style={{ margin: '0 0 16px', color: '#333' }}>
        {cvData.summary || 'Write a 3-4 sentence summary highlighting your key achievements, skills, and value.'}
      </p>

      {/* Experience */}
      <SectionHeadingClassic title="Work Experience" asHeading={useSemanticHeadings} />
      {cvData.experiences.map((exp) => (
        <div key={exp.id} style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '11pt' }}>{exp.title || 'Role Title'}</strong>
            <span style={{ color: '#444', fontSize: '9.5pt', fontWeight: 500 }}>{exp.startDate || 'Start'} — {exp.current ? 'Present' : exp.endDate || 'End'}</span>
          </div>
          <div style={{ color: '#555', fontSize: '10pt', marginBottom: '4px' }}>{[exp.company, exp.location].filter(Boolean).join(', ') || 'Company, Location'}</div>
          <ul style={{ paddingLeft: '18px', margin: '4px 0 0', color: '#333' }}>
            {(exp.bullets.length > 0 ? exp.bullets : ['Add results-focused bullet points.']).map((b, i) => (
              <li key={i} style={{ marginBottom: '3px' }}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Education */}
      <SectionHeadingClassic title="Education" asHeading={useSemanticHeadings} />
      {cvData.education.map((edu) => (
        <div key={edu.id} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <strong>{edu.degree || 'Degree'}</strong>
            <span style={{ color: '#444', fontSize: '9.5pt', fontWeight: 500 }}>{edu.year}</span>
          </div>
          <div style={{ color: '#555' }}>{edu.school || 'Institution'}</div>
          {edu.details && <div style={{ color: '#777', fontSize: '9.5pt', marginTop: '2px' }}>{edu.details}</div>}
        </div>
      ))}

      {/* Skills */}
      <SectionHeadingClassic title="Key Skills" asHeading={useSemanticHeadings} />
      <p style={{ margin: '0 0 16px', color: '#333' }}>
        {cvData.skills.length > 0 ? cvData.skills.join('  •  ') : 'Add your key skills'}
      </p>

      {/* Languages */}
      {cvData.languages.length > 0 && (
        <>
          <SectionHeadingClassic title="Languages" asHeading={useSemanticHeadings} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#333' }}>
            {cvData.languages.map((lang) => (
              <span key={lang.id}>{lang.name || 'Language'} — <em>{lang.level}</em></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SectionHeadingClassic({ title, asHeading = true }: { title: string; asHeading?: boolean }) {
  const style = {
    fontSize: '11pt',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.2px',
    color: '#0f766e',
    margin: 0,
    paddingBottom: '4px',
    borderBottom: '1px solid #d1d5db',
  };

  return (
    <div style={{ marginBottom: '8px', marginTop: '18px' }}>
      {asHeading ? <h3 style={style}>{title}</h3> : <div style={style}>{title}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE B: DUBAI EXECUTIVE — Two-Column Sidebar
   ═══════════════════════════════════════════════════ */
function DubaiExecutivePreview({
  cvData,
  fullName,
  useSemanticHeadings,
}: {
  cvData: CVData;
  fullName: string;
  useSemanticHeadings: boolean;
}) {
  const personal = [
    cvData.nationality && { label: 'Nationality', value: cvData.nationality },
    cvData.visaStatus && { label: 'Visa Status', value: cvData.visaStatus },
    cvData.dateOfBirth && { label: 'Date of Birth', value: cvData.dateOfBirth },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="cv-template-paper cv-template-executive" style={{ display: 'flex', background: '#fff', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: '10pt', lineHeight: 1.5 }}>
      {/* Sidebar */}
      <div className="cv-template-executive-sidebar" style={{ width: '35%', background: '#0f172a', color: '#e2e8f0', padding: '32px 22px', flexShrink: 0 }}>
        <div style={{ fontSize: '16pt', fontWeight: 700, color: '#ffffff', margin: '0 0 4px', lineHeight: 1.2 }}>{fullName}</div>
        <div style={{ fontSize: '10pt', color: '#67e8f9', fontWeight: 600, marginBottom: '20px' }}>{cvData.title || 'Professional Title'}</div>

        <SidebarSection title="Contact" asHeading={useSemanticHeadings}>
          {cvData.email && <div style={{ wordBreak: 'break-all' }}>{cvData.email}</div>}
          {cvData.phone && <div>{cvData.phone}</div>}
          {cvData.location && <div>{cvData.location}</div>}
          {cvData.linkedin && <div style={{ wordBreak: 'break-all' }}>{cvData.linkedin}</div>}
        </SidebarSection>

        {personal.length > 0 && (
          <SidebarSection title="Personal Details" asHeading={useSemanticHeadings}>
            {personal.map((item) => (
              <div key={item.label} style={{ marginBottom: '4px' }}>
                <span style={{ color: '#94a3b8', fontSize: '8.5pt', display: 'block' }}>{item.label}</span>
                {item.value}
              </div>
            ))}
          </SidebarSection>
        )}

        <SidebarSection title="Skills" asHeading={useSemanticHeadings}>
          {cvData.skills.length > 0
            ? cvData.skills.map((skill) => (
                <div key={skill} style={{ padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{skill}</div>
              ))
            : <div>Add your skills</div>
          }
        </SidebarSection>

        {cvData.languages.length > 0 && (
          <SidebarSection title="Languages" asHeading={useSemanticHeadings}>
            {cvData.languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                <span>{lang.name || 'Language'}</span>
                <span style={{ color: '#67e8f9', fontSize: '9pt' }}>{lang.level}</span>
              </div>
            ))}
          </SidebarSection>
        )}
      </div>

      {/* Main Content */}
      <div className="cv-template-executive-main" style={{ flex: 1, padding: '32px 28px', color: '#1a1a1a' }}>
        {/* Summary */}
        <SectionHeadingExec title="Professional Profile" asHeading={useSemanticHeadings} />
        <p style={{ margin: '0 0 20px', color: '#444' }}>
          {cvData.summary || 'Write a compelling summary of your career.'}
        </p>

        {/* Experience */}
        <SectionHeadingExec title="Career History" asHeading={useSemanticHeadings} />
        {cvData.experiences.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <strong style={{ fontSize: '10.5pt' }}>{exp.title || 'Role Title'}</strong>
              <span style={{ color: '#94a3b8', fontSize: '9pt', fontWeight: 500 }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <div style={{ color: '#6366f1', fontWeight: 600, fontSize: '9.5pt', marginBottom: '4px' }}>{[exp.company, exp.location].filter(Boolean).join(' | ')}</div>
            <ul style={{ paddingLeft: '16px', margin: '4px 0 0', color: '#333' }}>
              {(exp.bullets.length > 0 ? exp.bullets : ['Add bullet points for this role.']).map((b, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Education */}
        <SectionHeadingExec title="Education & Qualifications" asHeading={useSemanticHeadings} />
        {cvData.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '10px' }}>
            <strong>{edu.degree || 'Degree'}</strong>
            <div style={{ color: '#555' }}>{[edu.school, edu.year].filter(Boolean).join(' | ')}</div>
            {edu.details && <div style={{ color: '#777', fontSize: '9pt' }}>{edu.details}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSection({
  title,
  children,
  asHeading = true,
}: {
  title: string;
  children: ReactNode;
  asHeading?: boolean;
}) {
  const style = {
    fontSize: '8.5pt',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: '#67e8f9',
    marginBottom: '8px',
    paddingBottom: '4px',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
  };

  return (
    <div style={{ marginBottom: '18px' }}>
      {asHeading ? <h4 style={style}>{title}</h4> : <div style={style}>{title}</div>}
      <div style={{ fontSize: '9.5pt' }}>{children}</div>
    </div>
  );
}

function SectionHeadingExec({ title, asHeading = true }: { title: string; asHeading?: boolean }) {
  const style = {
    fontSize: '11pt',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.8px',
    color: '#0f172a',
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '5px',
    borderBottom: '2px solid #6366f1',
  };

  return asHeading ? <h3 style={style}>{title}</h3> : <div style={style}>{title}</div>;
}

/* ═══════════════════════════════════════════════════
   TEMPLATE C: MODERN MINIMAL — Bold Header + Split Body
   ═══════════════════════════════════════════════════ */
function ModernMinimalPreview({
  cvData,
  fullName,
  useSemanticHeadings,
}: {
  cvData: CVData;
  fullName: string;
  useSemanticHeadings: boolean;
}) {
  const contact = [cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean);
  const personal = [
    cvData.nationality && `${cvData.nationality}`,
    cvData.visaStatus && `${cvData.visaStatus}`,
    cvData.dateOfBirth && `Born ${cvData.dateOfBirth}`,
  ].filter(Boolean);

  return (
    <div className="cv-template-paper cv-template-modern" style={{ background: '#fff', fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: '10pt', lineHeight: 1.5, borderRadius: '8px', overflow: 'hidden' }}>
      {/* Header */}
      <div className="cv-template-modern-header" style={{ background: '#6366f1', color: '#fff', padding: '28px 32px' }}>
        <div style={{ fontSize: '20pt', fontWeight: 800, margin: 0, letterSpacing: '0.5px' }}>{fullName}</div>
        <div style={{ fontSize: '11pt', fontWeight: 500, opacity: 0.9, marginTop: '4px' }}>{cvData.title || 'Professional Title'}</div>
        <div style={{ fontSize: '9pt', marginTop: '10px', opacity: 0.8, display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {contact.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      {/* Body */}
      <div className="cv-template-modern-body" style={{ display: 'flex', padding: '28px 32px', gap: '28px' }}>
        {/* Left: 65% */}
        <div className="cv-template-modern-main" style={{ flex: '0 0 62%' }}>
          <MinimalHeading title="Profile" asHeading={useSemanticHeadings} />
          <p style={{ color: '#444', margin: '0 0 20px' }}>
            {cvData.summary || 'Write a professional summary.'}
          </p>

          <MinimalHeading title="Experience" asHeading={useSemanticHeadings} />
          {cvData.experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <strong>{exp.title || 'Role'}</strong>
                <span style={{ color: '#555', fontSize: '9pt', fontWeight: 500 }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ color: '#6366f1', fontSize: '9.5pt', fontWeight: 600 }}>{[exp.company, exp.location].filter(Boolean).join(', ')}</div>
              <ul style={{ paddingLeft: '16px', margin: '4px 0 0', color: '#333' }}>
                {(exp.bullets.length > 0 ? exp.bullets : ['Add bullet points.']).map((b, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}

          <MinimalHeading title="Education" asHeading={useSemanticHeadings} />
          {cvData.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <strong>{edu.degree}</strong>
              <div style={{ color: '#555' }}>{[edu.school, edu.year].filter(Boolean).join(' — ')}</div>
            </div>
          ))}
        </div>

        {/* Right: 35% */}
        <div className="cv-template-modern-side" style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '24px' }}>
          {personal.length > 0 && (
            <>
              <MinimalHeading title="Personal" asHeading={useSemanticHeadings} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px', color: '#444' }}>
                {personal.map((item) => <span key={item as string}>{item}</span>)}
              </div>
            </>
          )}

          <MinimalHeading title="Skills" asHeading={useSemanticHeadings} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px', color: '#333' }}>
            {(cvData.skills.length > 0 ? cvData.skills : ['Add your skills']).map((skill) => (
              <span key={skill} style={{ padding: '3px 0', borderBottom: '1px solid #f3f4f6' }}>{skill}</span>
            ))}
          </div>

          {cvData.languages.length > 0 && (
            <>
              <MinimalHeading title="Languages" asHeading={useSemanticHeadings} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#444' }}>
                {cvData.languages.map((lang) => (
                  <div key={lang.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang.name}</span>
                    <span style={{ fontSize: '9pt', color: '#6366f1' }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MinimalHeading({ title, asHeading = true }: { title: string; asHeading?: boolean }) {
  const style = {
    fontSize: '9.5pt',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.5px',
    color: '#6366f1',
    marginBottom: '8px',
    marginTop: '16px',
  };

  return asHeading ? <h3 style={style}>{title}</h3> : <div style={style}>{title}</div>;
}

/* ═══════════════════════════════════════════════════
   FORM STEP COMPONENTS
   ═══════════════════════════════════════════════════ */

function StepProfile({ cvData, updateField }: { cvData: CVData; updateField: (field: keyof CVData, value: string | string[] | TemplateId | LanguageItem[]) => void }) {
  return (
    <div className="cv-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {(['firstName', 'lastName', 'title', 'email', 'phone', 'location'] as const).map((field) => (
        <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600, textTransform: 'capitalize' }}>
          {field.replace(/([A-Z])/g, ' $1').trim()}
          <input className="form-input" value={cvData[field]} onChange={(e) => updateField(field, e.target.value)} />
        </label>
      ))}
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600 }}>
        LinkedIn / Portfolio
        <input className="form-input" value={cvData.linkedin} onChange={(e) => updateField('linkedin', e.target.value)} />
      </label>

      <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', margin: '8px 0', paddingTop: '16px' }}>
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', fontWeight: 800, marginBottom: '12px' }}>
          Gulf-Specific Details
        </div>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600 }}>
        Nationality
        <input className="form-input" placeholder="e.g. Indian, Filipino, Egyptian" value={cvData.nationality} onChange={(e) => updateField('nationality', e.target.value)} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600 }}>
        Visa Status
        <select className="form-input" value={cvData.visaStatus} onChange={(e) => updateField('visaStatus', e.target.value)}>
          <option value="">Select visa status</option>
          <option value="Employment Visa">Employment Visa</option>
          <option value="Visit Visa">Visit Visa</option>
          <option value="Dependent Visa">Dependent Visa</option>
          <option value="Freelance Permit">Freelance Permit</option>
          <option value="Golden Visa">Golden Visa</option>
          <option value="Available Immediately">Available Immediately</option>
          <option value="Notice Period (30 days)">Notice Period (30 days)</option>
        </select>
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600 }}>
        Date of Birth
        <input className="form-input" placeholder="e.g. 15 March 1992" value={cvData.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155', fontWeight: 600, gridColumn: '1 / -1' }}>
        Professional Summary
        <textarea className="form-input" rows={5} value={cvData.summary} onChange={(e) => updateField('summary', e.target.value)} />
      </label>
    </div>
  );
}

function StepExperience({ experiences, onAdd, onRemove, onChange, onEnhance, enhancingId }: {
  experiences: ExperienceItem[]; onAdd: () => void; onRemove: (id: string) => void;
  onChange: (id: string, changes: Partial<ExperienceItem>) => void;
  onEnhance: (experience: ExperienceItem) => Promise<void>; enhancingId: string | null;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {experiences.map((item, index) => (
        <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ color: '#0f172a' }}>Role {index + 1}</strong>
            <button className="btn btn-secondary" onClick={() => onRemove(item.id)} disabled={experiences.length === 1}><FiTrash2 /> Remove</button>
          </div>
          <div className="cv-entry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
            {(['title', 'company', 'location', 'startDate', 'endDate'] as const).map((field) => (
              <input key={field} className="form-input" placeholder={field.replace(/([A-Z])/g, ' $1')} value={item[field]} onChange={(e) => onChange(item.id, { [field]: e.target.value })} />
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0', color: '#475569', fontWeight: 600 }}>
            <input type="checkbox" checked={item.current} onChange={(e) => onChange(item.id, { current: e.target.checked })} />
            I currently work here
          </label>
          <textarea className="form-input" rows={5} placeholder="Paste rough notes: responsibilities, wins, numbers, tools, team size, projects." value={item.notes} onChange={(e) => onChange(item.id, { notes: e.target.value })} />
          <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: '10px 0 0' }}>
            Write messy notes like &quot;handled 40 calls daily, trained 2 new hires&quot; and Smart Assist will turn them into recruiter-ready bullets.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: '#64748b', fontSize: '0.92rem' }}>{item.bullets.length} bullet points ready</span>
            <button className="btn btn-primary" onClick={() => onEnhance(item)} disabled={enhancingId === item.id}>
              {enhancingId === item.id ? 'Writing bullets...' : 'Auto-write bullets'}
            </button>
          </div>
        </div>
      ))}
      <button className="btn" onClick={onAdd} style={{ justifyContent: 'center', border: '1px dashed #94a3b8', background: '#fff' }}>
        <FiPlus /> Add another role
      </button>
    </div>
  );
}

function StepEducation({ education, onAdd, onRemove, onChange }: {
  education: EducationItem[]; onAdd: () => void; onRemove: (id: string) => void;
  onChange: (id: string, changes: Partial<EducationItem>) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {education.map((item, index) => (
        <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ color: '#0f172a' }}>Education {index + 1}</strong>
            <button className="btn btn-secondary" onClick={() => onRemove(item.id)} disabled={education.length === 1}><FiTrash2 /> Remove</button>
          </div>
          <div className="cv-entry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
            <input className="form-input" placeholder="Degree or certification" value={item.degree} onChange={(e) => onChange(item.id, { degree: e.target.value })} />
            <input className="form-input" placeholder="School or institute" value={item.school} onChange={(e) => onChange(item.id, { school: e.target.value })} />
            <input className="form-input" placeholder="Year" value={item.year} onChange={(e) => onChange(item.id, { year: e.target.value })} />
          </div>
          <textarea className="form-input" rows={3} style={{ marginTop: '12px' }} placeholder="Optional honors, specializations." value={item.details} onChange={(e) => onChange(item.id, { details: e.target.value })} />
        </div>
      ))}
      <button className="btn" onClick={onAdd} style={{ justifyContent: 'center', border: '1px dashed #94a3b8', background: '#fff' }}>
        <FiPlus /> Add education
      </button>
    </div>
  );
}

function StepSkills({ skills, skillInput, setSkillInput, onAdd, onRemove }: {
  skills: string[]; skillInput: string; setSkillInput: (v: string) => void;
  onAdd: () => void; onRemove: (skill: string) => void;
}) {
  return (
    <div>
      <div className="cv-skills-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input className="form-input cv-skill-input" style={{ flex: 1, minWidth: '220px' }} placeholder="Add a skill or keyword" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} />
        <button className="btn btn-primary" onClick={onAdd}>Add skill</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills.map((skill) => (
          <button key={skill} className="btn btn-secondary" onClick={() => onRemove(skill)}>{skill} <FiTrash2 /></button>
        ))}
      </div>
    </div>
  );
}

function StepLanguages({ languages, onAdd, onRemove, onChange }: {
  languages: LanguageItem[]; onAdd: () => void; onRemove: (id: string) => void;
  onChange: (id: string, changes: Partial<LanguageItem>) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p style={{ color: '#475569', fontSize: '0.92rem', margin: '0 0 8px' }}>
        Multilingual candidates are highly valued in the Gulf. Arabic proficiency is a strong advantage for most roles.
      </p>
      {languages.map((lang) => (
        <div key={lang.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input className="form-input" style={{ flex: 1, minWidth: '160px' }} placeholder="Language (e.g. Arabic)" value={lang.name} onChange={(e) => onChange(lang.id, { name: e.target.value })} />
          <select className="form-input" style={{ width: '160px' }} value={lang.level} onChange={(e) => onChange(lang.id, { level: e.target.value as LanguageItem['level'] })}>
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>
          <button className="btn btn-secondary" onClick={() => onRemove(lang.id)}><FiTrash2 /></button>
        </div>
      ))}
      <button className="btn" onClick={onAdd} style={{ justifyContent: 'center', border: '1px dashed #94a3b8', background: '#fff', alignSelf: 'flex-start' }}>
        <FiPlus /> Add language
      </button>
    </div>
  );
}

function StepTemplate({ selected, onSelect }: { selected: TemplateId; onSelect: (t: TemplateId) => void }) {
  return (
    <div className="cv-template-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
      {(Object.entries(templateInfo) as [TemplateId, (typeof templateInfo)[TemplateId]][]).map(([id, info]) => (
        <button
          key={id}
          className="btn"
          onClick={() => onSelect(id)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '16px',
            textAlign: 'left',
            padding: '20px',
            width: '100%',
            minWidth: 0,
            whiteSpace: 'normal',
            background: selected === id ? '#f0fdfa' : '#fff',
            border: selected === id ? '2px solid #0f766e' : '1px solid #e2e8f0',
            borderRadius: '14px',
          }}
        >
          <div style={{ width: '80px', height: '100px', borderRadius: '8px', background: id === 'gulf-classic' ? '#fff' : id === 'dubai-executive' ? '#0f172a' : '#6366f1', border: '1px solid #e2e8f0', flexShrink: 0, display: 'flex', overflow: 'hidden' }}>
            {id === 'gulf-classic' && (
              <div style={{ width: '100%', padding: '8px' }}>
                <div style={{ width: '60%', height: '6px', background: '#0f766e', borderRadius: '3px', margin: '0 auto 4px' }} />
                <div style={{ width: '80%', height: '3px', background: '#d1d5db', borderRadius: '2px', margin: '0 auto 3px' }} />
                <div style={{ borderTop: '1px solid #0f766e', margin: '6px 0' }} />
                <div style={{ width: '100%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                <div style={{ width: '90%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                <div style={{ width: '95%', height: '3px', background: '#e5e7eb', borderRadius: '2px' }} />
              </div>
            )}
            {id === 'dubai-executive' && (
              <>
                <div style={{ width: '35%', background: '#0f172a', padding: '6px' }}>
                  <div style={{ width: '100%', height: '4px', background: '#67e8f9', borderRadius: '2px', marginBottom: '3px' }} />
                  <div style={{ width: '80%', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '2px' }} />
                  <div style={{ width: '90%', height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                </div>
                <div style={{ flex: 1, background: '#fff', padding: '6px' }}>
                  <div style={{ width: '80%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                  <div style={{ width: '60%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                  <div style={{ width: '90%', height: '3px', background: '#e5e7eb', borderRadius: '2px' }} />
                </div>
              </>
            )}
            {id === 'modern-minimal' && (
              <div style={{ width: '100%' }}>
                <div style={{ background: '#6366f1', height: '24px', padding: '6px' }}>
                  <div style={{ width: '60%', height: '4px', background: 'rgba(255,255,255,0.8)', borderRadius: '2px' }} />
                </div>
                <div style={{ display: 'flex', padding: '4px', gap: '3px' }}>
                  <div style={{ flex: '0 0 60%' }}>
                    <div style={{ width: '90%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                    <div style={{ width: '70%', height: '3px', background: '#e5e7eb', borderRadius: '2px' }} />
                  </div>
                  <div style={{ flex: 1, borderLeft: '1px solid #e5e7eb', paddingLeft: '3px' }}>
                    <div style={{ width: '100%', height: '3px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '2px' }} />
                    <div style={{ width: '80%', height: '3px', background: '#e5e7eb', borderRadius: '2px' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <strong style={{ color: '#0f172a', fontSize: '1.05rem' }}>{info.label}</strong>
              <span style={{ fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 8px', borderRadius: '999px', color: '#64748b' }}>{info.layout}</span>
            </div>
            <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, display: 'block', whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{info.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

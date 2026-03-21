'use client';

import type { ReactNode } from 'react';
import { startTransition, useMemo, useRef, useState } from 'react';
import { FiCheck, FiCpu, FiDownload, FiPlus, FiTrash2 } from 'react-icons/fi';

type TemplateId = 'professional' | 'modern' | 'executive';

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

interface CVData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  skills: string[];
  template: TemplateId;
  experiences: ExperienceItem[];
  education: EducationItem[];
}

const steps = ['Profile', 'Experience', 'Education', 'Skills', 'Style'];

const templates: Record<
  TemplateId,
  { label: string; accent: string; panel: string; text: string; description: string }
> = {
  professional: {
    label: 'Professional',
    accent: '#0f766e',
    panel: '#f0fdfa',
    text: '#0f172a',
    description: 'Clean and ATS-friendly for most roles.',
  },
  modern: {
    label: 'Modern',
    accent: '#1d4ed8',
    panel: '#eff6ff',
    text: '#111827',
    description: 'Sharper contrast for product, tech, and digital roles.',
  },
  executive: {
    label: 'Executive',
    accent: '#92400e',
    panel: '#fffbeb',
    text: '#1f2937',
    description: 'Warm premium tone for leadership and operations roles.',
  },
};

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createExperience = (): ExperienceItem => ({
  id: createId(),
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  notes: '',
  bullets: [],
});

const createEducation = (): EducationItem => ({
  id: createId(),
  degree: '',
  school: '',
  year: '',
  details: '',
});

const initialData: CVData = {
  firstName: 'Ahmed',
  lastName: 'Al-Maktoum',
  title: 'Project Manager',
  email: 'ahmed@example.com',
  phone: '+971 50 000 0000',
  location: 'Dubai, UAE',
  linkedin: 'linkedin.com/in/ahmed-almaktoum',
  summary:
    'Project manager with 8+ years of experience leading cross-functional delivery teams, improving operations, and shipping high-visibility work across the Gulf market.',
  skills: ['Project Delivery', 'Stakeholder Management', 'Agile', 'Budget Planning'],
  template: 'professional',
  experiences: [
    {
      id: createId(),
      title: 'Project Manager',
      company: 'TechVision Global',
      location: 'Dubai',
      startDate: '2021',
      endDate: '',
      current: true,
      notes:
        'Led a 45-person delivery team across product, engineering, and QA. Improved reporting cadence for leadership. Reduced project delays by tightening planning and handoffs.',
      bullets: [
        'Led a 45-person delivery team across product, engineering, and QA.',
        'Improved leadership reporting cadence with clearer status updates and risk tracking.',
        'Reduced project delays by tightening planning, scope alignment, and handoffs.',
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

export default function CVMakerPage() {
  const [step, setStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [skillInput, setSkillInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [enhancingId, setEnhancingId] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const activeTemplate = templates[cvData.template];
  const fullName = [cvData.firstName, cvData.lastName].filter(Boolean).join(' ') || 'Your Name';
  const contactLine = [cvData.email, cvData.phone, cvData.location, cvData.linkedin].filter(Boolean);
  const filledSections = useMemo(
    () => [
      Boolean(cvData.firstName && cvData.title),
      cvData.experiences.some((item) => item.title || item.company || item.bullets.length > 0),
      cvData.education.some((item) => item.degree || item.school),
      cvData.skills.length > 0,
      Boolean(cvData.template),
    ],
    [cvData]
  );

  const updateField = (field: keyof CVData, value: string | string[] | TemplateId) => {
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

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || cvData.skills.includes(value)) {
      return;
    }
    setCvData((current) => ({ ...current, skills: [...current.skills, value] }));
    setSkillInput('');
  };

  const handleEnhanceExperience = async (experience: ExperienceItem) => {
    if (!experience.notes.trim()) {
      setStatusMessage('Paste a few rough notes first, then let AI turn them into polished CV bullet points.');
      return;
    }

    setEnhancingId(experience.id);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/tools/cv-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'experience',
          title: experience.title || cvData.title,
          company: experience.company,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.endDate,
          current: experience.current,
          notes: experience.notes,
          skills: cvData.skills,
          experiences: cvData.experiences.map((item) => ({
            title: item.title,
            company: item.company,
            location: item.location,
            startDate: item.startDate,
            endDate: item.endDate,
            current: item.current,
            notes: item.notes,
            bullets: item.bullets,
          })),
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to enhance experience.');
      }

      startTransition(() => {
        setCvData((current) => ({
          ...current,
          summary: current.summary.trim() || payload.summary,
          experiences: current.experiences.map((item) =>
            item.id === experience.id ? { ...item, bullets: payload.bullets || item.bullets } : item
          ),
        }));
      });

      setStatusMessage(
        payload.provider === 'gemini'
          ? 'AI turned your raw notes into stronger CV bullets. Review the wording and keep only what is accurate.'
          : payload.warning || 'A basic rewrite was applied. Add a real Gemini API key for stronger AI writing.'
      );
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to enhance experience.');
    } finally {
      setEnhancingId(null);
    }
  };

  const handleEnhanceSummary = async () => {
    const notes = cvData.experiences.map((item) => item.notes || item.bullets.join('. ')).filter(Boolean).join('. ');

    if (!notes) {
      setStatusMessage('Add at least one experience note before generating a stronger summary.');
      return;
    }

    setIsSummaryLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/tools/cv-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'summary',
          title: cvData.title,
          notes,
          skills: cvData.skills,
          experiences: cvData.experiences.map((item) => ({
            title: item.title,
            company: item.company,
            location: item.location,
            startDate: item.startDate,
            endDate: item.endDate,
            current: item.current,
            notes: item.notes,
            bullets: item.bullets,
          })),
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to improve summary.');
      }

      setCvData((current) => ({ ...current, summary: payload.summary || current.summary }));
      setStatusMessage(
        payload.provider === 'gemini'
          ? 'AI wrote a sharper professional summary from your raw experience notes. Give it one final personal pass before sending.'
          : payload.warning || 'A basic summary rewrite was applied. Add a real Gemini API key for stronger AI writing.'
      );
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to improve summary.');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || typeof window === 'undefined') {
      return;
    }

    setIsDownloading(true);
    setStatusMessage(null);

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0.4,
          filename: `${fullName.replace(/\s+/g, '_') || 'CV'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .save();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Failed to export CV.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0 72px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontSize: '0.8rem', fontWeight: 700, marginBottom: '18px' }}>
            <FiCpu /> Gulf-ready CV builder
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.05, marginBottom: '14px', color: '#0f172a' }}>
            Build a sharper CV in one sitting.
          </h1>
          <p style={{ maxWidth: '760px', margin: '0 auto', color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Paste rough notes, let AI turn them into stronger CV writing, switch templates, and export a polished PDF that is easier for recruiters to scan.
          </p>
        </div>

        <div className="cv-stepper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
          {steps.map((label, index) => (
            <button key={label} className="btn" onClick={() => setStep(index + 1)} style={{ background: index + 1 === step ? '#0f172a' : '#e2e8f0', color: index + 1 === step ? '#fff' : '#334155', minWidth: '132px', justifyContent: 'center' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '999px', background: filledSections[index] ? '#14b8a6' : 'rgba(255,255,255,0.35)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                {filledSections[index] ? <FiCheck /> : index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>

        {statusMessage && (
          <div className="card" style={{ marginBottom: '24px', padding: '16px 18px', borderLeft: `4px solid ${activeTemplate.accent}`, color: '#334155' }}>
            {statusMessage}
          </div>
        )}

        <div className="cv-maker-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card cv-editor-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f766e', fontWeight: 800 }}>
                    Step {step} of {steps.length}
                  </div>
                  <h2 style={{ fontSize: '1.35rem', color: '#0f172a', marginTop: '6px' }}>{steps[step - 1]}</h2>
                </div>
                <button className="btn btn-secondary" onClick={handleEnhanceSummary} disabled={isSummaryLoading}>
                  {isSummaryLoading ? 'Writing summary...' : 'Write summary with AI'}
                </button>
              </div>

              {step === 1 && (
                <StepProfile cvData={cvData} updateField={updateField} />
              )}

              {step === 2 && (
                <StepExperience
                  experiences={cvData.experiences}
                  onAdd={() => setCvData((current) => ({ ...current, experiences: [...current.experiences, createExperience()] }))}
                  onRemove={(id) =>
                    setCvData((current) => ({
                      ...current,
                      experiences: current.experiences.length > 1 ? current.experiences.filter((item) => item.id !== id) : current.experiences,
                    }))
                  }
                  onChange={updateExperience}
                  onEnhance={handleEnhanceExperience}
                  enhancingId={enhancingId}
                />
              )}

              {step === 3 && (
                <StepEducation
                  education={cvData.education}
                  onAdd={() => setCvData((current) => ({ ...current, education: [...current.education, createEducation()] }))}
                  onRemove={(id) =>
                    setCvData((current) => ({
                      ...current,
                      education: current.education.length > 1 ? current.education.filter((item) => item.id !== id) : current.education,
                    }))
                  }
                  onChange={updateEducation}
                />
              )}

              {step === 4 && (
                <StepSkills
                  skills={cvData.skills}
                  skillInput={skillInput}
                  setSkillInput={setSkillInput}
                  onAdd={addSkill}
                  onRemove={(skill) => updateField('skills', cvData.skills.filter((item) => item !== skill))}
                />
              )}

              {step === 5 && (
                <StepStyle selected={cvData.template} onSelect={(template) => updateField('template', template)} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', gap: '12px' }}>
                <button className="btn" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>
                  Back
                </button>
                <button className="btn btn-primary" onClick={() => setStep((current) => Math.min(steps.length, current + 1))}>
                  {step === steps.length ? 'Review preview' : 'Next step'}
                </button>
              </div>
            </div>

            <div className="card cv-editor-card" style={{ padding: '24px', background: activeTemplate.panel }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '10px' }}>What makes this version stronger</h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '14px' }}>
                Each experience entry keeps the user&apos;s raw notes, then turns them into cleaner ATS-friendly bullets and a stronger summary with AI help.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155', paddingLeft: '20px' }}>
                <li>Live preview updates as you edit.</li>
                <li>Raw notes can be rewritten into recruiter-ready CV bullets in one click.</li>
                <li>PDF export is ready when your layout looks right.</li>
              </ul>
            </div>
          </div>

          <div className="cv-preview-column" style={{ position: 'sticky', top: '24px' }}>
            <div className="card cv-preview-card" style={{ padding: '18px', background: '#e2e8f0' }}>
              <div className="cv-preview-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#ef4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#f59e0b' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#22c55e' }} />
                </div>
                <strong style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569' }}>
                  Live preview
                </strong>
                <button className="btn btn-primary" onClick={handleDownload} disabled={isDownloading}>
                  <FiDownload /> {isDownloading ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>

              <div ref={previewRef} className="cv-preview-sheet" style={{ background: '#fff', color: activeTemplate.text, borderTop: `8px solid ${activeTemplate.accent}`, borderRadius: '14px', padding: '36px', boxShadow: '0 18px 30px rgba(15, 23, 42, 0.08)' }}>
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={{ fontSize: '2rem', lineHeight: 1.05, marginBottom: '8px', textTransform: cvData.template === 'executive' ? 'uppercase' : 'none' }}>
                    {fullName}
                  </h2>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: activeTemplate.accent, marginBottom: '10px' }}>{cvData.title || 'Professional Title'}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.92rem', color: '#475569' }}>
                    {contactLine.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <PreviewSection title="Professional Summary" accent={activeTemplate.accent}>
                  <p style={{ lineHeight: 1.7, color: '#334155' }}>
                    {cvData.summary || 'Add a summary that quickly explains your experience, strengths, and the type of role you want next.'}
                  </p>
                </PreviewSection>

                <PreviewSection title="Experience" accent={activeTemplate.accent}>
                  {cvData.experiences.map((item) => (
                    <div key={item.id} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <strong>{item.title || 'Role title'}</strong>
                        <span style={{ color: '#64748b' }}>{item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}</span>
                      </div>
                      <div style={{ color: '#475569', marginBottom: '8px' }}>{[item.company, item.location].filter(Boolean).join(' | ') || 'Company | Location'}</div>
                      <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#334155' }}>
                        {(item.bullets.length > 0 ? item.bullets : ['Add results-focused bullet points for this role.']).map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </PreviewSection>

                <PreviewSection title="Education" accent={activeTemplate.accent}>
                  {cvData.education.map((item) => (
                    <div key={item.id} style={{ marginBottom: '14px' }}>
                      <strong>{item.degree || 'Degree or certification'}</strong>
                      <div style={{ color: '#475569' }}>{[item.school, item.year].filter(Boolean).join(' | ') || 'School | Year'}</div>
                      {item.details && <div style={{ color: '#64748b', marginTop: '4px' }}>{item.details}</div>}
                    </div>
                  ))}
                </PreviewSection>

                <PreviewSection title="Skills" accent={activeTemplate.accent}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(cvData.skills.length > 0 ? cvData.skills : ['Add your strongest tools and capabilities']).map((skill) => (
                      <span key={skill} style={{ background: activeTemplate.panel, color: activeTemplate.accent, padding: '6px 10px', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600 }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </PreviewSection>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1024px) {
          .cv-maker-layout {
            grid-template-columns: 1fr !important;
          }

          .cv-preview-column {
            position: static !important;
            top: auto !important;
          }
        }

        @media (max-width: 720px) {
          .cv-stepper {
            justify-content: flex-start !important;
          }

          .cv-editor-card,
          .cv-preview-card {
            padding: 20px !important;
          }

          :global(.cv-profile-grid),
          :global(.cv-entry-grid),
          :global(.cv-template-grid) {
            grid-template-columns: 1fr !important;
          }

          :global(.cv-skills-row) {
            flex-direction: column;
          }

          :global(.cv-skill-input) {
            min-width: 0 !important;
          }

          .cv-preview-toolbar {
            flex-wrap: wrap;
            gap: 10px;
          }

          .cv-preview-sheet {
            padding: 22px !important;
          }
        }
      `}</style>
    </div>
  );
}

function StepProfile({
  cvData,
  updateField,
}: {
  cvData: CVData;
  updateField: (field: keyof CVData, value: string | string[] | TemplateId) => void;
}) {
  return (
    <div className="cv-profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {(['firstName', 'lastName', 'title', 'email', 'phone', 'location', 'linkedin'] as const).map((field) => (
        <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontWeight: 600, textTransform: 'capitalize' }}>
          {field === 'linkedin' ? 'LinkedIn / Portfolio' : field.replace(/([A-Z])/g, ' $1').trim()}
          <input className="form-input" value={cvData[field]} onChange={(event) => updateField(field, event.target.value)} />
        </label>
      ))}
      <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontWeight: 600, gridColumn: '1 / -1' }}>
        Professional summary
        <textarea className="form-input" rows={6} value={cvData.summary} onChange={(event) => updateField('summary', event.target.value)} />
      </label>
    </div>
  );
}

function StepExperience({
  experiences,
  onAdd,
  onRemove,
  onChange,
  onEnhance,
  enhancingId,
}: {
  experiences: ExperienceItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, changes: Partial<ExperienceItem>) => void;
  onEnhance: (experience: ExperienceItem) => Promise<void>;
  enhancingId: string | null;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {experiences.map((item, index) => (
        <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ color: '#0f172a' }}>Role {index + 1}</strong>
            <button className="btn btn-secondary" onClick={() => onRemove(item.id)} disabled={experiences.length === 1}>
              <FiTrash2 /> Remove
            </button>
          </div>
          <div className="cv-entry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
            {(['title', 'company', 'location', 'startDate', 'endDate'] as const).map((field) => (
              <input key={field} className="form-input" placeholder={field.replace(/([A-Z])/g, ' $1')} value={item[field]} onChange={(event) => onChange(item.id, { [field]: event.target.value })} />
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0', color: '#475569', fontWeight: 600 }}>
            <input type="checkbox" checked={item.current} onChange={(event) => onChange(item.id, { current: event.target.checked })} />
            I currently work here
          </label>
          <textarea className="form-input" rows={5} placeholder="Paste rough notes here: responsibilities, wins, numbers, tools, team size, projects, or recruiter keywords." value={item.notes} onChange={(event) => onChange(item.id, { notes: event.target.value })} />
          <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, margin: '10px 0 0' }}>
            Write messy notes like “handled 40 calls daily, trained 2 new hires, reduced complaints” and AI will turn them into cleaner CV bullets.
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

function StepEducation({
  education,
  onAdd,
  onRemove,
  onChange,
}: {
  education: EducationItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, changes: Partial<EducationItem>) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {education.map((item, index) => (
        <div key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <strong style={{ color: '#0f172a' }}>Education {index + 1}</strong>
            <button className="btn btn-secondary" onClick={() => onRemove(item.id)} disabled={education.length === 1}>
              <FiTrash2 /> Remove
            </button>
          </div>
          <div className="cv-entry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
            <input className="form-input" placeholder="Degree or certification" value={item.degree} onChange={(event) => onChange(item.id, { degree: event.target.value })} />
            <input className="form-input" placeholder="School or institute" value={item.school} onChange={(event) => onChange(item.id, { school: event.target.value })} />
            <input className="form-input" placeholder="Year" value={item.year} onChange={(event) => onChange(item.id, { year: event.target.value })} />
          </div>
          <textarea className="form-input" rows={3} style={{ marginTop: '12px' }} placeholder="Optional details, honors, coursework, or specializations." value={item.details} onChange={(event) => onChange(item.id, { details: event.target.value })} />
        </div>
      ))}
      <button className="btn" onClick={onAdd} style={{ justifyContent: 'center', border: '1px dashed #94a3b8', background: '#fff' }}>
        <FiPlus /> Add education
      </button>
    </div>
  );
}

function StepSkills({
  skills,
  skillInput,
  setSkillInput,
  onAdd,
  onRemove,
}: {
  skills: string[];
  skillInput: string;
  setSkillInput: (value: string) => void;
  onAdd: () => void;
  onRemove: (skill: string) => void;
}) {
  return (
    <div>
      <div className="cv-skills-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input className="form-input cv-skill-input" style={{ flex: 1, minWidth: '220px' }} placeholder="Add a skill or keyword" value={skillInput} onChange={(event) => setSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); onAdd(); } }} />
        <button className="btn btn-primary" onClick={onAdd}>Add skill</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills.map((skill) => (
          <button key={skill} className="btn btn-secondary" onClick={() => onRemove(skill)}>
            {skill} <FiTrash2 />
          </button>
        ))}
      </div>
    </div>
  );
}

function StepStyle({
  selected,
  onSelect,
}: {
  selected: TemplateId;
  onSelect: (template: TemplateId) => void;
}) {
  return (
    <div className="cv-template-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
      {(Object.entries(templates) as [TemplateId, (typeof templates)[TemplateId]][]).map(([id, template]) => (
        <button key={id} className="btn" onClick={() => onSelect(id)} style={{ display: 'block', textAlign: 'left', padding: '18px', background: selected === id ? template.panel : '#fff', border: selected === id ? `2px solid ${template.accent}` : '1px solid #e2e8f0' }}>
          <div style={{ height: '120px', borderRadius: '12px', background: '#fff', borderTop: `8px solid ${template.accent}`, marginBottom: '12px', padding: '10px' }}>
            <div style={{ width: '55%', height: '10px', borderRadius: '999px', background: template.accent, marginBottom: '10px' }} />
            <div style={{ width: '85%', height: '8px', borderRadius: '999px', background: '#cbd5e1', marginBottom: '8px' }} />
            <div style={{ width: '100%', height: '40px', borderRadius: '10px', background: template.panel }} />
          </div>
          <strong style={{ display: 'block', color: '#0f172a', marginBottom: '6px' }}>{template.label}</strong>
          <span style={{ color: '#475569', fontSize: '0.92rem' }}>{template.description}</span>
        </button>
      ))}
    </div>
  );
}

function PreviewSection({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: '26px' }}>
      <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent, marginBottom: '12px' }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

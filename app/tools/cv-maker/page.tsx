'use client';

import { useState, useRef, useEffect } from 'react';
import { FiCheck, FiDownload, FiCpu, FiPlus, FiTrash2, FiSearch } from 'react-icons/fi';
// import html2pdf from 'html2pdf.js'; // Will be dynamic imported to avoid SSR issues

export default function CVMakerPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [cvData, setCvData] = useState({
    firstName: 'Ahmed',
    lastName: 'Al-Maktoum',
    title: 'Project Manager',
    email: 'ahmed@example.com',
    phone: '+971 50 000 0000',
    location: 'Dubai, UAE',
    summary: 'A highly experienced Project Manager with over 10 years of expertise in delivering mega-projects in the Gulf region. Adept at agile methodologies, cross-functional team leadership, and strategic planning.',
    experience: [
      { id: 1, title: 'Project Manager', company: 'TechVision Global', location: 'Dubai', date: '2021 — Present', desc: 'Led a team of 45 engineers to deliver a $50M smart city platform on time and under budget.' }
    ],
    education: [
      { id: 1, degree: 'BSc Business Admin', school: 'American University of Sharjah', year: '2016' }
    ],
    skills: ['Strategic Planning', 'PMP Certified', 'Agile', 'Stakeholder Management']
  });

  const handleDownload = async () => {
    if (typeof window === 'undefined') return;
    const element = previewRef.current;
    if (!element) return;

    // Dynamically import html2pdf to prevent SSR "window is not defined" error
    const html2pdf = (await import('html2pdf.js')).default;
    const opt = {
      margin:       0,
      filename:     `CV_${cvData.firstName}_${cvData.lastName}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };
    html2pdf().set(opt).from(element).save();
  };

  const steps = [
    { num: 1, label: 'INFO' },
    { num: 2, label: 'WORK' },
    { num: 3, label: 'EDU' },
    { num: 4, label: 'SKILLS' },
    { num: 5, label: 'STYLE' },
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(8, 145, 178, 0.15)', color: 'var(--accent)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '24px' }}>
            <FiCpu /> AI-POWERED CV BUILDER
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1 }}>
            Craft your career story in<br/>minutes.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Leverage Gulf-optimized AI to generate a professional CV that beats the ATS and lands you the interview.
          </p>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          {steps.map((s) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: step === s.num ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.3s' }} onClick={() => setStep(s.num)}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: step >= s.num ? 'var(--primary)' : '#E2E8F0', 
                color: step >= s.num ? 'white' : 'var(--text-muted)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 
              }}>
                {step > s.num ? <FiCheck /> : s.num}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Builder Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Left Column: Form Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Form Card */}
            <div className="card" style={{ padding: '32px' }}>
              
              {step === 1 && (
                <>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '24px' }}>Step 1: Personal Information</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>First Name</label>
                      <input type="text" className="form-input" value={cvData.firstName} onChange={e => setCvData({...cvData, firstName: e.target.value})} placeholder="e.g. Ahmed" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Last Name</label>
                      <input type="text" className="form-input" value={cvData.lastName} onChange={e => setCvData({...cvData, lastName: e.target.value})} placeholder="e.g. Al-Maktoum" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Professional Title</label>
                    <input type="text" className="form-input" value={cvData.title} onChange={e => setCvData({...cvData, title: e.target.value})} placeholder="e.g. Project Manager" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Email Address</label>
                      <input type="email" className="form-input" value={cvData.email} onChange={e => setCvData({...cvData, email: e.target.value})} placeholder="ahmed@example.com" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Phone Number</label>
                      <input type="text" className="form-input" value={cvData.phone} onChange={e => setCvData({...cvData, phone: e.target.value})} placeholder="+971 50 000 0000" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>Location</label>
                    <input type="text" className="form-input" value={cvData.location} onChange={e => setCvData({...cvData, location: e.target.value})} placeholder="Dubai, UAE" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)' }}>Skip for now</button>
                    <button className="btn btn-primary" onClick={() => setStep(2)}>Next Step →</button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '24px' }}>Step 2: Work Experience</h2>
                  {cvData.experience.map((exp, idx) => (
                    <div key={exp.id} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '16px' }}>
                      <input type="text" className="form-input" value={exp.title} onChange={(e) => {
                        const newArray = [...cvData.experience];
                        newArray[idx].title = e.target.value;
                        setCvData({...cvData, experience: newArray});
                      }} style={{ marginBottom: '12px', fontWeight: 700 }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                         <input type="text" className="form-input" value={exp.company} onChange={(e) => {
                          const newArray = [...cvData.experience];
                          newArray[idx].company = e.target.value;
                          setCvData({...cvData, experience: newArray});
                         }} />
                         <input type="text" className="form-input" value={exp.date} onChange={(e) => {
                          const newArray = [...cvData.experience];
                          newArray[idx].date = e.target.value;
                          setCvData({...cvData, experience: newArray});
                         }} />
                      </div>
                      <textarea className="form-input" value={exp.desc} onChange={(e) => {
                          const newArray = [...cvData.experience];
                          newArray[idx].desc = e.target.value;
                          setCvData({...cvData, experience: newArray});
                      }} rows={3} />
                    </div>
                  ))}
                  <button className="btn" style={{ width: '100%', marginBottom: '24px', background: 'white', border: '1px dashed var(--border-alt)' }}><FiPlus /> Add Entry</button>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)' }} onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => setStep(3)}>Next Step →</button>
                  </div>
                </>
              )}

              {step >= 3 && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                   <p style={{ color: 'var(--text-muted)' }}>Other steps functionality in progress...</p>
                   <button className="btn btn-primary mt-md" onClick={() => setStep(1)}>Restart</button>
                </div>
              )}

            </div>

            {/* Template Selector Card (Static for UX matching) */}
            <div className="card" style={{ padding: '24px', background: '#F4F7FA' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '16px' }}>
                Quick Select Template
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                 <div style={{ background: 'white', border: '2px solid var(--primary)', borderRadius: '8px', height: '140px', padding: '12px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', height: '8px', background: '#E2E8F0', marginBottom: '4px' }}></div>
                    <div style={{ width: '60%', height: '4px', background: '#F1F5F9', marginBottom: '12px' }}></div>
                    <div style={{ width: '100%', flex: 1, background: '#F8FAFC' }}></div>
                    <div style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 700, marginTop: '8px', color: 'var(--primary)' }}>Clean Professional</div>
                 </div>
                 <div style={{ background: 'white', border: '2px solid transparent', borderRadius: '8px', height: '140px', padding: '12px', display: 'flex', flexDirection: 'column', opacity: 0.5 }}>
                    <div style={{ display: 'flex', gap: '8px', height: '100%' }}>
                      <div style={{ width: '30%', background: '#CBD5E1', height: '100%' }}></div>
                      <div style={{ flex: 1, background: '#F1F5F9' }}></div>
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 700, marginTop: '8px', color: 'var(--text-secondary)' }}>Modern Side</div>
                 </div>
                 <div style={{ background: 'white', border: '2px solid transparent', borderRadius: '8px', height: '140px', padding: '12px', display: 'flex', flexDirection: 'column', opacity: 0.5, alignItems: 'center' }}>
                    <div style={{ width: '40%', height: '8px', background: '#CBD5E1', marginBottom: '8px' }}></div>
                    <div style={{ width: '80%', height: '2px', background: '#F1F5F9', marginBottom: '12px' }}></div>
                    <div style={{ width: '100%', flex: 1, background: '#F8FAFC' }}></div>
                    <div style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 700, marginTop: '8px', color: 'var(--text-secondary)' }}>Classic Serif</div>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live PDF Preview */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
               
               {/* Preview Browser Header */}
               <div style={{ background: '#F8FAFC', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', gap: '6px' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                 </div>
                 <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Live AI Preview</div>
                 <div><FiSearch style={{ color: 'var(--text-muted)' }} /></div>
               </div>

               {/* Actual CV Canvas */}
               <div style={{ padding: '0px', background: '#E2E8F0' }}>
                  <div style={{ 
                     background: 'white', 
                     margin: '24px auto', 
                     width: '210mm', 
                     minHeight: '297mm', // strict A4
                     transformOrigin: 'top center',
                     transform: 'scale(0.8)', // scale to fit sidebar
                     padding: '40px 50px',
                     boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }} ref={previewRef}>
                     <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '24px', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '28pt', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.5px', textTransform: 'uppercase', marginBottom: '8px', lineHeight: 1 }}>
                          {cvData.firstName} {cvData.lastName}
                        </h1>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '10pt', color: '#475569', fontWeight: 500 }}>
                           <span>{cvData.email}</span>
                           <span>•</span>
                           <span>{cvData.phone}</span>
                           <span>•</span>
                           <span>{cvData.location}</span>
                        </div>
                     </div>

                     <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '12pt', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Professional Profile</h3>
                        <p style={{ fontSize: '10.5pt', lineHeight: 1.6, color: '#334155' }}>
                          {cvData.summary}
                        </p>
                     </div>

                     <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '12pt', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Work Experience</h3>
                        {cvData.experience.map(exp => (
                          <div key={exp.id} style={{ marginBottom: '20px' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                               <strong style={{ fontSize: '11pt', color: 'var(--primary)' }}>{exp.title}</strong>
                               <span style={{ fontSize: '10pt', color: '#64748B' }}>{exp.date}</span>
                             </div>
                             <div style={{ fontSize: '10.5pt', color: '#0F172A', fontWeight: 500, marginBottom: '8px' }}>
                               {exp.company} — {exp.location}
                             </div>
                             <p style={{ fontSize: '10pt', lineHeight: 1.5, color: '#475569' }}>
                               {exp.desc}
                             </p>
                          </div>
                        ))}
                     </div>
                     
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                          <h3 style={{ fontSize: '12pt', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Education</h3>
                          {cvData.education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: '16px' }}>
                               <strong style={{ display: 'block', fontSize: '10.5pt', color: 'var(--primary)', marginBottom: '4px' }}>{edu.degree}</strong>
                               <div style={{ fontSize: '10pt', color: '#475569' }}>{edu.school}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '12pt', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Technical Skills</h3>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                             {cvData.skills.map(skill => (
                               <span key={skill} style={{ display: 'inline-block', fontSize: '9pt', padding: '4px 10px', border: '1px solid #E2E8F0', borderRadius: '4px', color: '#334155' }}>
                                 {skill}
                               </span>
                             ))}
                          </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Download Footer */}
               <div style={{ background: 'white', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#10B981', fontWeight: 600 }}>
                   <FiCheck /> Changes saved automatically
                 </div>
                 <button onClick={handleDownload} className="btn" style={{ background: '#0F766E', color: 'white' }}>
                   DOWNLOAD AS PDF <FiDownload style={{ marginLeft: '8px' }} />
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

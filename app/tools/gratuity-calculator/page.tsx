'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

function calculateGratuity({
  salary,
  startDate,
  endDate,
}: {
  salary: string;
  startDate: string;
  endDate: string;
}) {
  if (!salary || !startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end <= start) return null;

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);

  const basicSalary = parseFloat(salary);
  if (isNaN(basicSalary)) return null;

  const dailyWage = basicSalary / 30;

  let first5YearsDays = 0;
  let after5YearsDays = 0;

  if (years <= 5) {
     first5YearsDays = (years * 21) + ((remainingDaysAfterYears / 365) * 21);
  } else {
     first5YearsDays = 5 * 21;
     const additionalYears = (years - 5) + (remainingDaysAfterYears / 365);
     after5YearsDays = additionalYears * 30;
  }

  const first5Amount = first5YearsDays * dailyWage;
  const after5Amount = after5YearsDays * dailyWage;
  let totalGratuity = first5Amount + after5Amount;

  if (totalGratuity > basicSalary * 24) {
    totalGratuity = basicSalary * 24;
  }

  return {
    years,
    months,
    dailyWage,
    first5Amount,
    after5Amount,
    totalGratuity
  };
}

export default function GratuityCalculatorPage() {
  const [salary, setSalary] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [contractType, setContractType] = useState('Limited');
  const [reason, setReason] = useState('Termination');
  
  const summaryRef = useRef<HTMLDivElement>(null);

  const results = calculateGratuity({ salary, startDate, endDate });

  const handleDownload = async () => {
    if (typeof window === 'undefined') return;
    const element = summaryRef.current;
    if (!element) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin:       0.5,
        filename:     `Gratuity_Summary.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Failed to generate PDF', err);
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Dark Hero Section matching screenshot */}
      <section style={{ background: 'var(--primary)', color: 'white', padding: '60px 0', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '10%', top: '20%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(8, 145, 178, 0.2)', color: 'var(--accent)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            Calculator Tool
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px', color: 'white' }}>
            UAE Gratuity Calculator
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', maxWidth: '550px', lineHeight: 1.6 }}>
            Estimate your end-of-service benefits based on the latest UAE Labour Law. Accurate, fast, and compliant with the 2024 regulations.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Form & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Form Card */}
            <div className="card" style={{ padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--primary)', fontWeight: 800, fontSize: '1.25rem' }}>
                <div style={{ background: '#E2E8F0', padding: '8px', borderRadius: '8px', color: 'var(--accent)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M7 15h0M2 9.5h20"></path></svg>
                </div>
                Employment Details
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Basic Monthly Salary (AED)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>AED</span>
                  <input type="number" className="form-input" style={{ paddingLeft: '60px', background: '#F8FAFC', border: 'none' }} placeholder="e.g. 15,000" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Start Date</label>
                  <input type="date" className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>End Date</label>
                  <input type="date" className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Contract Type</label>
                  <select className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={contractType} onChange={(e) => setContractType(e.target.value)}>
                    <option value="Limited">Limited</option>
                    <option value="Unlimited">Unlimited</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Reason for Leaving</label>
                  <select className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={reason} onChange={(e) => setReason(e.target.value)}>
                    <option value="Termination">Termination</option>
                    <option value="Resignation">Resignation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Legal Formula Overview */}
            <div className="card" style={{ padding: '32px', borderRadius: '16px', background: '#F4F7FA', border: 'none' }}>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '16px' }}>Legal Formula Overview</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '16px', lineHeight: 1.6 }}>
                According to the UAE Labour Law, the end-of-service gratuity is calculated as follows:
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px' }}>
                <li><strong>21 days&apos;</strong> basic salary for each year of the first five years of service.</li>
                <li><strong>30 days&apos;</strong> basic salary for each additional year, provided that the total gratuity shall not exceed two years&apos; basic salary.</li>
              </ul>
              
              <div style={{ background: '#E2E8F0', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Disclaimer</strong>
                This calculator provides an estimate only. Final calculations should be verified with your HR department or legal counsel based on your specific contract and recent amendments to the UAE Labour Law.
              </div>
            </div>

          </div>


          {/* Right Column: Sticky Summary & Ads */}
          <div style={{ position: 'sticky', top: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Summary Card */}
            <div ref={summaryRef} style={{ background: 'var(--primary)', borderRadius: '16px', padding: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Total Gratuity Amount</div>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                 <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>AED</span>
                 <span style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-1px' }}>
                   {results ? results.totalGratuity.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                 </span>
              </div>

              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '16px' }}>Calculation Breakdown</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px', marginBottom: '24px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Total Service Period</span>
                    <strong style={{ fontWeight: 600 }}>{results ? `${results.years} Years, ${results.months} Months` : '-'}</strong>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Daily Wage Rate</span>
                    <strong style={{ fontWeight: 600 }}>{results ? `AED ${results.dailyWage.toFixed(2)}` : '-'}</strong>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>First 5 Years (21 Days/Yr)</span>
                    <strong style={{ fontWeight: 600 }}>{results ? `AED ${results.first5Amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '-'}</strong>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>After 5 Years (30 Days/Yr)</span>
                    <strong style={{ fontWeight: 600 }}>{results ? `AED ${results.after5Amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : '-'}</strong>
                 </div>
              </div>

              <button 
                onClick={handleDownload} 
                className="btn" 
                style={{ width: '100%', background: '#0F766E', color: 'white', display: 'flex', justifyContent: 'center', gap: '8px' }}
                disabled={!results}
              >
                <FiDownload /> Download Summary (PDF)
              </button>
            </div>

            {/* Read Article Promo Card */}
            <div className="card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
               <div style={{ width: '80px', height: '100px', background: 'var(--primary)', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  {/* Pseudo image representation */}
                  <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '40%', background: '#F59E0B', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '60%', background: '#F59E0B', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', right: '50%', height: '80%', background: '#FCD34D', borderRadius: '4px 4px 0 0' }}></div>
               </div>
               <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', letterSpacing: '1px', marginBottom: '8px' }}>Read Expert Guide</div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: 1.3 }}>What is UAE Gratuity? A Complete Guide 2024</h4>
                  <Link href="/blog/uae-gratuity-calculation-guide" style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Article <FiArrowRight />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container" style={{ marginTop: '80px', maxWidth: '1000px' }}>
         <h2 style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--primary)', marginBottom: '40px' }}>Frequently Asked Questions</h2>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#F4F7FA', padding: '24px', borderRadius: '12px' }}>
               <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '12px' }}>Am I eligible for gratuity if I resign?</h4>
               <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Yes, under the new 2024 law, employees are eligible for gratuity even if they resign, provided they have completed at least one year of continuous service.</p>
            </div>
            <div style={{ background: '#F4F7FA', padding: '24px', borderRadius: '12px' }}>
               <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '12px' }}>How is the daily wage calculated?</h4>
               <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>The daily wage is usually calculated by dividing the basic monthly salary by 30 days. Allowances like housing and transport are generally excluded.</p>
            </div>
         </div>
      </div>

    </div>
  );
}

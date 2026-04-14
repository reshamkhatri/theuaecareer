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
          <h1 style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px', color: 'white' }}>
            UAE Gratuity Calculator
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', maxWidth: '550px', lineHeight: 1.6 }}>
            Estimate your end-of-service benefits based on the latest UAE Labour Law. Accurate, fast, and compliant with the 2024 regulations.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="gratuity-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column: Form & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Form Card */}
            <div className="card gratuity-card" style={{ padding: '32px', borderRadius: '16px' }}>
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

              <div className="gratuity-dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Start Date</label>
                  <input type="date" className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>End Date</label>
                  <input type="date" className="form-input" style={{ background: '#F8FAFC', border: 'none' }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="gratuity-dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
            <div className="card gratuity-card" style={{ padding: '32px', borderRadius: '16px', background: '#F4F7FA', border: 'none' }}>
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
          <div className="gratuity-sidebar" style={{ position: 'sticky', top: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Summary Card */}
            <div ref={summaryRef} className="gratuity-summary-card" style={{ background: 'var(--primary)', borderRadius: '16px', padding: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
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
            <div className="card gratuity-promo-card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
               <div style={{ width: '80px', height: '100px', background: 'var(--primary)', borderRadius: '8px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  {/* Pseudo image representation */}
                  <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '40%', background: '#F59E0B', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '60%', background: '#F59E0B', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', right: '50%', height: '80%', background: '#FCD34D', borderRadius: '4px 4px 0 0' }}></div>
               </div>
               <div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', letterSpacing: '1px', marginBottom: '8px' }}>Read Expert Guide</div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px', lineHeight: 1.3 }}>What is UAE Gratuity? A Complete Guide 2024</h4>
                  <Link href="/blog/uae-labour-law-guide-for-expats" style={{ fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Article <FiArrowRight />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Deep-Dive Pillar Content */}
      <section className="container" style={{ marginTop: '80px', maxWidth: '900px', lineHeight: 1.8 }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '24px', letterSpacing: '-1px' }}>
          Final Guide to UAE End-of-Service Gratuity (2026 Edition)
        </h2>
        
        <p style={{ fontSize: '1.125rem', color: '#444', marginBottom: '32px' }}>
          For expats working in the UAE, the <strong>End-of-Service Gratuity</strong> isn&apos;t just a bonus—it&apos;s a vital financial safety net regulated by federal law. Since the major overhaul of the UAE Labour Law in February 2022 (Federal Decree-Law No. 33), the rules surrounding how much you are owed, when you get paid, and how &quot;limited&quot; contracts work have changed significantly.
        </p>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px' }}>What is the UAE Gratuity Law (Federal Decree-Law No. 33)?</h3>
        <p style={{ marginBottom: '20px' }}>
          The current UAE Labour Law applies to all private sector employees in the mainland and most free zones. The fundamental principle is that any employee who completes <strong>one full year of continuous service</strong> is entitled to a lump-sum payment upon the termination of their employment.
        </p>
        <p style={{ marginBottom: '20px' }}>
          One of the biggest changes in the recent law update was the <strong>standardisation of contracts</strong>. Previously, employees on &quot;Limited&quot; and &quot;Unlimited&quot; contracts faced different gratuity reduction rules if they resigned. Today, most contracts are standardised, and the old &quot;resignation reductions&quot; (where you might only get 1/3 or 2/3 of your gratuity) have been largely phased out in favour of a more transparent, service-years-based calculation.
        </p>

        <div style={{ background: '#FFF7ED', borderLeft: '4px solid #F59E0B', padding: '24px', borderRadius: '8px', margin: '40px 0' }}>
          <h4 style={{ color: '#92400E', fontSize: '1.125rem', marginBottom: '12px', fontWeight: 700 }}>⚠️ Important: The 2024 Voluntary Savings Scheme</h4>
          <p style={{ color: '#92400E', fontSize: '0.9375rem', margin: 0 }}>
            In late 2023, the UAE government introduced a voluntary <strong>End-of-Service Savings Scheme</strong> (as per Cabinet Resolution No. 96). Companies can now opt to enroll their employees in an investment-based fund (supervised by SCA and MOHRE) instead of the traditional lump-sum gratuity. If your company has joined this scheme, your benefits will be managed through an investment account rather than the standard basic-salary formula.
          </p>
        </div>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px' }}>How the Gratuity Formula is Calculated</h3>
        <p style={{ marginBottom: '20px' }}>
          Gratuity is calculated based on your <strong>last basic salary</strong>. It does not include allowances like housing, transport, or utilities. This is why many expats see a &quot;Total Package&quot; of AED 20,000 but a &quot;Basic Salary&quot; of AED 10,000—your gratuity will be calculated on the latter.
        </p>
        
        <div style={{ background: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0', margin: '32px 0' }}>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--primary)' }}>Standard Gratuity Accrual:</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: '#10B981', fontWeight: 800 }}>✔</span>
              <span><strong>1 to 5 Years of Service:</strong> 21 days&apos; basic salary for each year of service.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <span style={{ color: '#10B981', fontWeight: 800 }}>✔</span>
              <span><strong>More than 5 Years of Service:</strong> 30 days&apos; basic salary for each additional year.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', color: '#64748B', fontSize: '0.875rem' }}>
              <span><em>Note: Total gratuity cannot exceed the equivalent of two years&apos; basic salary.</em></span>
            </li>
          </ul>
        </div>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px' }}>Eligibility & Exclusions: The Fine Print</h3>
        <p style={{ marginBottom: '20px' }}>
          While most workers qualify, there are specific scenarios where you might not receive your full benefit:
        </p>
        <ul style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Unpaid Leave:</strong> Days taken as unpaid leave are deducted from your total days of service. If you worked for 365 days but took 10 days of unpaid leave, you haven&apos;t completed &quot;one full year&quot; yet.</li>
          <li><strong>Absconding:</strong> If an employee leaves work without notice (absconds), they may lose their right to end-of-service benefits.</li>
          <li><strong>Gross Misconduct:</strong> Under Article 44 of the Labour Law, if an employee is terminated for reasons like physical assault at work, sharing trade secrets, or being under the influence of alcohol during shift, the employer may attempt to withhold benefits (though this is often contested in court).</li>
        </ul>

        <h3 style={{ fontSize: '1.75rem', color: 'var(--primary)', margin: '40px 0 20px' }}>MOHRE Dispute Resolution: What to do if you aren&apos;t paid</h3>
        <p style={{ marginBottom: '20px' }}>
          The UAE government requires that all end-of-service benefits be paid within <strong>14 days of the contract termination date</strong>. If your employer refuses to pay or miscalculates the amount, follow these steps:
        </p>
        <ol style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li><strong>Internal Query:</strong> Request a written breakdown from your HR department. Compare it with the results from our <strong>UAE Gratuity Calculator</strong>.</li>
          <li><strong>MOHRE Complaint:</strong> If unresolved, file a labor complaint through the MOHRE Website or the MOHRE App.</li>
          <li><strong>TAWAFUQ Center:</strong> A mediator from a Tawafuq center will attempt to settle the case within 10 working days.</li>
          <li><strong>Labor Court:</strong> If mediation fails and the claim is over AED 50,000, the case is referred to the UAE Labor Court. For claims under AED 50,000, MOHRE now has the power to issue a final, binding decision.</li>
        </ol>

        <div style={{ padding: '32px', background: 'var(--primary)', color: 'white', borderRadius: '16px', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Ready to check your numbers?</h4>
          <p style={{ opacity: 0.8, marginBottom: '24px' }}>Use the tool at the top of this page for an instant, accurate estimate.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn" style={{ background: 'var(--accent)', color: 'var(--primary)' }}>
            Back to Calculator
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="container" style={{ marginTop: '80px', maxWidth: '1000px' }}>
         <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '8px', letterSpacing: '-1px' }}>Gratuity FAQ & People Also Ask</h2>
         <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.125rem' }}>Expert answers to your most common end-of-service questions</p>
         
         <div className="gratuity-faq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Am I eligible for gratuity if I resign?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Yes. Under the 2022 UAE Labour Law, employees are eligible for gratuity even if they resign, provided they have completed at least 1 year of continuous service. The old reductions for resignation on Unlimited contracts have been removed for most employees.</p>
            </div>
            
            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Does gratuity include my housing allowance?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>No. Gratuity is calculated <strong>only on your basic salary</strong> as stated in your employment contract. Housing, transport, and utilities are technically considered &quot;allowances&quot; and are excluded from the calculation.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What is the maximum gratuity I can receive?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>The total sum of end-of-service gratuity cannot exceed the equivalent of <strong>two years&apos; worth of your basic salary</strong>, regardless of how many decades you have worked for the company.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What happens if I leave before 1 year?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>If you leave your job before completing 365 days of continuous service, you are <strong>not entitled</strong> to any gratuity payment. Even leaving at 360 days results in zero benefit.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Is gratuity the same for Free Zone workers?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Most free zones (like JAFZA or DMCC) follow the UAE Federal Labour Law. However, the <strong>DIFC</strong> and <strong>ADGM</strong> have their own specific employment laws and a mandatory pension-style scheme (DEWS), which replaces traditional gratuity.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>How long should it take to receive my payment?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>The law is very strict here: all end-of-service entitlements—including gratuity and unpaid leave—must be paid within <strong>14 days</strong> of your last working day.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Does maternity leave reduce my gratuity?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>No. Paid maternity leave is considered <strong>service time</strong>. Only periods of unpaid leave (beyond what is legally protected) are deducted from the service day count.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Can an employer deduct fines from my gratuity?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Employers can only make deductions for specific reasons: outstanding loans, damage to company property (proven), or court-ordered garnishments. They cannot deduct visa costs or general recruitment expenses.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What is Article 44 of the UAE Labour Law?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Article 44 lists the conditions under which an employer can terminate an employee <strong>without notice</strong>. While gratuity is still generally paid, some specific cases of gross misconduct can lead to legal challenges over the payoff.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>How is the &quot;last basic salary&quot; determined?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>It is the basic salary you were earning on your final day of work. If you received a pay rise 6 months before leaving, your gratuity for the *entire* service period is calculated using that new, higher basic salary.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>What if I work part-time in the UAE?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>Part-time employees are also entitled to gratuity, but it is calculated on a pro-rata basis based on the number of hours worked compared to a full-time role.</p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '28px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
               <h3 style={{ fontSize: '1.125rem', color: 'var(--primary)', marginBottom: '12px', fontWeight: 700 }}>Do I get gratuity on a visit visa?</h3>
               <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.7, margin: 0 }}>No. Working on a visit visa is illegal in the UAE. Gratuity is only legally enforceable for employees with a valid labor contract and residence visa registered with MOHRE.</p>
            </div>
         </div>

         {/* Internal links */}
         <div style={{ marginTop: '40px', padding: '32px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '16px', fontWeight: 700 }}>Related Career Resources</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
               {[
                 { label: 'Full UAE Labour Law Guide', href: '/blog/uae-labour-law-guide-for-expats' },
                 { label: '2026 Salary Guide by Industry', href: '/blog/salary-guide-uae-2026' },
                 { label: 'Work Visa Renewal Process', href: '/blog/how-to-renew-uae-work-visa' },
                 { label: 'Dubai vs Abu Dhabi Salaries', href: '/blog/abu-dhabi-vs-dubai-working-expats' },
                 { label: 'Best Remittance Rates AED', href: '/blog/best-remittance-options-uae-2026' },
                 { label: 'How to find a job as a fresher', href: '/blog/how-to-find-a-job-in-dubai-as-a-fresher' },
                 { label: 'Building a Gulf CV', href: '/tools/cv-maker' }
               ].map((link) => (
                 <Link key={link.href} href={link.href} style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 600, background: '#F1F5F9', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none' }}>
                   {link.label}
                 </Link>
               ))}
            </div>
         </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Am I eligible for gratuity if I resign in UAE?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. Under UAE Labour Law (Federal Decree No. 33 of 2021), employees are eligible for gratuity even if they resign, as long as they have completed at least 1 year of continuous service.' },
              },
              {
                '@type': 'Question',
                name: 'What is the UAE gratuity formula?',
                acceptedAnswer: { '@type': 'Answer', text: 'For the first 5 years: 21 days of basic salary per year. Beyond 5 years: 30 days of basic salary per year. Total gratuity is capped at 2 years of basic salary.' },
              },
              {
                '@type': 'Question',
                name: 'How is the daily wage calculated for UAE gratuity?',
                acceptedAnswer: { '@type': 'Answer', text: 'The daily wage is your basic monthly salary divided by 30 days. Housing, transport, and other allowances are excluded.' },
              },
              {
                '@type': 'Question',
                name: 'When is gratuity paid in UAE?',
                acceptedAnswer: { '@type': 'Answer', text: 'Gratuity must be paid within 14 days of your last working day. If delayed, you can file a complaint with MOHRE at 800-60.' },
              },
              {
                '@type': 'Question',
                name: 'Is gratuity taxed in UAE?',
                acceptedAnswer: { '@type': 'Answer', text: 'No. There is no income tax in the UAE, so your gratuity payment is tax-free in the UAE.' },
              },
            ],
          }),
        }}
      />

      <style jsx>{`
        @media (max-width: 1024px) {
          .gratuity-layout {
            grid-template-columns: 1fr !important;
          }

          .gratuity-sidebar {
            position: static !important;
            top: auto !important;
          }
        }

        @media (max-width: 720px) {
          .gratuity-card,
          .gratuity-summary-card {
            padding: 22px !important;
          }

          .gratuity-dual-grid,
          .gratuity-faq-grid {
            grid-template-columns: 1fr !important;
          }

          .gratuity-promo-card {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}

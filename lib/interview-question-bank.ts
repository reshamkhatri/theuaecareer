export interface InterviewQuestion {
  prompt: string;
  whyItComesUp: string;
  strongAnswerSignals: string;
}

export interface InterviewSource {
  title: string;
  href: string;
  note: string;
}

export interface InterviewSector {
  slug: string;
  title: string;
  summary: string;
  roles: string[];
  recruiterSignals: string[];
  prepChecklist: string[];
  questions: InterviewQuestion[];
  sources: InterviewSource[];
}

export const interviewResearchReviewedOn = 'March 30, 2026';

export const interviewSectors: InterviewSector[] = [
  {
    slug: 'construction',
    title: 'Construction',
    summary:
      'Construction interviews across the Gulf usually mix project delivery, site coordination, and strict safety questioning. Recruiters repeatedly test whether you can read drawings, control subcontractors, and stop unsafe work when pressure builds on site.',
    roles: ['Site Engineer', 'Civil Foreman', 'Quantity Surveyor', 'Planning Engineer', 'HSE Officer'],
    recruiterSignals: [
      'Drawing literacy and your ability to translate drawings into daily execution plans.',
      'Confidence around QA/QC, inspection requests, snag closure, and rework prevention.',
      'Real examples of toolbox talks, permit-to-work checks, and escalation of unsafe conditions.',
    ],
    prepChecklist: [
      'Prepare two project stories with scope, value, timeline, headcount, and your exact responsibilities.',
      'Revise concrete, finishing, MEP coordination, and safety documentation you handled personally.',
      'Keep one clear example ready where you prevented delay, rework, or a safety incident.',
    ],
    questions: [
      {
        prompt: 'Walk me through the last construction project you handled and your exact scope on site.',
        whyItComesUp: 'Interviewers want to see whether your title matches the work you really owned.',
        strongAnswerSignals: 'State project type, package value, team size, subcontractors managed, and deliverables you signed off.',
      },
      {
        prompt: 'How do you turn IFC drawings into a daily work plan for labour, materials, and inspections?',
        whyItComesUp: 'This checks site planning discipline and whether you can move from drawings to execution.',
        strongAnswerSignals: 'Mention drawing review, look-ahead planning, material requests, manpower allocation, and inspection hold points.',
      },
      {
        prompt: 'Tell me about a time you had to stop unsafe work even though the schedule was under pressure.',
        whyItComesUp: 'Gulf contractors often screen heavily for safety ownership, not just productivity.',
        strongAnswerSignals: 'Describe the hazard, who you escalated to, what controls you added, and how work restarted safely.',
      },
      {
        prompt: 'How do you coordinate civil, MEP, and finishing teams when multiple trades need the same area?',
        whyItComesUp: 'Coordination failures are a common cause of delay and rework on Gulf projects.',
        strongAnswerSignals: 'Talk about sequence planning, access control, clash checks, daily coordination, and clear area handovers.',
      },
      {
        prompt: 'What is your process before a concrete pour or major inspection request?',
        whyItComesUp: 'They want proof you understand hold points and document control, not just field supervision.',
        strongAnswerSignals: 'Reference checklist review, approved drawings, material approvals, method statements, test certificates, and consultant sign-off.',
      },
      {
        prompt: 'How do you deal with a subcontractor who is slipping on manpower, quality, or progress?',
        whyItComesUp: 'Subcontractor control is a recurring interview theme for engineers and foremen.',
        strongAnswerSignals: 'Show a practical escalation path: measurement, warning, recovery plan, daily follow-up, and evidence-based reporting.',
      },
      {
        prompt: 'Give an example of how you reduced wastage or prevented rework on a project.',
        whyItComesUp: 'Recruiters want cost awareness, not just technical knowledge.',
        strongAnswerSignals: 'Share a measurable outcome such as saved material, improved productivity, or fewer NCRs.',
      },
      {
        prompt: 'What site documents do you use most often, and how do you keep them organized?',
        whyItComesUp: 'This tests whether you can survive in a documentation-heavy Gulf project environment.',
        strongAnswerSignals: 'Mention RFIs, IRs, MIRs, WIRs, look-ahead plans, NCRs, permits, and updated drawing registers.',
      },
    ],
    sources: [
      {
        title: 'Indeed: 46 Potential Interview Questions for Jobs in Construction',
        href: 'https://www.indeed.com/career-advice/interviewing/interview-questions-for-construction',
        note: 'Current recruiter-style construction interview guide updated December 11, 2025.',
      },
      {
        title: 'Glassdoor: Construction management interview questions',
        href: 'https://www.glassdoor.com/Interview/construction-management-interview-questions-SRCH_KO0,23_SDRD.htm',
        note: 'Candidate-reported recent construction-management interview themes.',
      },
      {
        title: 'Glassdoor: Arabtec Construction interview questions',
        href: 'https://www.glassdoor.com/Interview/Arabtec-Construction-Interview-Questions-E517895.htm',
        note: 'Gulf-relevant candidate-reported examples from a known regional construction employer.',
      },
    ],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    summary:
      'Hospitality interviews in Dubai and across the Gulf are usually built around guest recovery, grooming, service language, and teamwork under pressure. Interviewers listen for warmth, consistency, and brand awareness more than memorized scripts.',
    roles: ['Front Desk Agent', 'Guest Service Agent', 'Housekeeping Attendant', 'Waiter/Server', 'Barista'],
    recruiterSignals: [
      'Natural communication, polished grooming, and calm behaviour with demanding guests.',
      'Service recovery examples that protect the guest experience without ignoring policy.',
      'Awareness of brand standards, upselling, multilingual service, and shift flexibility.',
    ],
    prepChecklist: [
      'Prepare one strong guest complaint story using the STAR format.',
      'Learn the hotel or restaurant brand, guest segment, and service style before the interview.',
      'Practice short answers about grooming standards, upselling, and working rotating shifts.',
    ],
    questions: [
      {
        prompt: 'What does hospitality mean to you in a Gulf hotel, restaurant, or resort environment?',
        whyItComesUp: 'This is a common opener because hospitality employers are testing mindset before technical skill.',
        strongAnswerSignals: 'Focus on anticipation, respect, consistency, and creating a smooth guest experience across cultures.',
      },
      {
        prompt: 'Tell me about a time you handled an unhappy guest and turned the situation around.',
        whyItComesUp: 'Guest recovery is one of the most repeated hospitality interview themes.',
        strongAnswerSignals: 'Explain the complaint, how you listened, what action you took, and how you closed the loop with the guest.',
      },
      {
        prompt: 'How do you stay calm and polite during a busy shift, peak check-in, or service rush?',
        whyItComesUp: 'Gulf hospitality teams often work high-volume shifts where composure matters as much as speed.',
        strongAnswerSignals: 'Mention prioritization, communication with teammates, and staying guest-focused without sounding robotic.',
      },
      {
        prompt: 'What would you do if a guest arrives and the room is not ready or the order is delayed?',
        whyItComesUp: 'This tests your recovery language and judgment in a very common real scenario.',
        strongAnswerSignals: 'Show ownership, apology, a practical alternative, and follow-up until the issue is resolved.',
      },
      {
        prompt: 'How do you upsell rooms, dishes, or add-on services without making the guest uncomfortable?',
        whyItComesUp: 'Upselling is frequently discussed in hotel and restaurant hiring.',
        strongAnswerSignals: 'Frame upselling as relevance-based suggestions that improve the guest experience, not pressure selling.',
      },
      {
        prompt: 'Why do you want to work for this property or brand specifically?',
        whyItComesUp: 'Luxury and large-brand employers in the Gulf expect candidates to know the brand, not just the job title.',
        strongAnswerSignals: 'Reference the property, service culture, guest mix, brand reputation, or growth path honestly.',
      },
      {
        prompt: 'How do you maintain hygiene, grooming, and service standards on long or split shifts?',
        whyItComesUp: 'Consistency is a major concern in hospitality operations.',
        strongAnswerSignals: 'Talk about routines, checklists, supervisor feedback, and attention to detail.',
      },
      {
        prompt: 'Describe working with multicultural teammates and guests from different countries.',
        whyItComesUp: 'This is especially common in Gulf hospitality due to the diversity of staff and guests.',
        strongAnswerSignals: 'Show respect, flexibility, simple communication, and examples of adapting your tone or service style.',
      },
    ],
    sources: [
      {
        title: 'Glassdoor: Marriott International interview questions in Dubai',
        href: 'https://www.glassdoor.com/Interview/Marriott-International-Dubai-Interview-Questions-EI_IE7790.0,22_IL.23,28_IM954.htm',
        note: 'Recent candidate-reported Dubai hospitality interview experiences.',
      },
      {
        title: 'Hcareers: How to answer “Tell me about yourself” in a hospitality interview',
        href: 'https://www.hcareers.com/article/advice-from-employers/how-to-answer-tell-me-about-yourself-in-a-hospitality-interview',
        note: 'Employer-facing hospitality interview guidance updated May 27, 2025.',
      },
      {
        title: 'Indeed: “What does hospitality mean to you?”',
        href: 'https://www.indeed.com/career-advice/interviewing/what-does-hospitality-mean-to-you',
        note: 'Current hospitality question breakdown updated December 11, 2025.',
      },
      {
        title: 'Indeed Canada: Hospitality interview questions',
        href: 'https://ca.indeed.com/career-advice/interviewing/hospitality-interview-questions',
        note: 'Updated February 27, 2026 with practical hospitality interview themes.',
      },
    ],
  },
  {
    slug: 'retail',
    title: 'Retail',
    summary:
      'Retail interviews in the Gulf often revolve around selling behaviour, product knowledge, customer handling, targets, stock discipline, and store presentation. Managers want proof that you can convert footfall into sales without losing service quality.',
    roles: ['Sales Associate', 'Cashier', 'Storekeeper', 'Visual Merchandiser', 'Store Manager'],
    recruiterSignals: [
      'Customer approach, conversion, upselling, and confidence with targets or KPIs.',
      'Stock accuracy, inventory discipline, and awareness of shrinkage or non-moving items.',
      'Professional handling of returns, complaints, and pressure during promotion periods.',
    ],
    prepChecklist: [
      'Know your numbers from your last job: sales target, conversion, UPT, ATV, returns, or shrinkage.',
      'Prepare one story about a difficult customer and one story about achieving or recovering target.',
      'Revise common retail policies: refunds, exchanges, store opening/closing, and stock counts.',
    ],
    questions: [
      {
        prompt: 'How do you approach a customer who is browsing but not asking for help yet?',
        whyItComesUp: 'Retail employers want to see whether you can engage without sounding pushy.',
        strongAnswerSignals: 'Show a soft opening, product knowledge, and a service-first approach that still creates selling opportunities.',
      },
      {
        prompt: 'Tell me about your last sales target and how you tracked your performance against it.',
        whyItComesUp: 'This tests commercial awareness and whether you understand retail numbers.',
        strongAnswerSignals: 'Mention the target, the metric, what action you took, and the final result.',
      },
      {
        prompt: 'What do you do when a key item is out of stock or a product is not moving?',
        whyItComesUp: 'Interviewers often use this to test stock sense and selling flexibility.',
        strongAnswerSignals: 'Discuss alternative recommendations, checking stock systems, and feedback to the team on slow movers.',
      },
      {
        prompt: 'How would you handle a return or exchange when the customer is upset about the policy?',
        whyItComesUp: 'Policy handling is a standard retail interview topic because it affects both service and margin.',
        strongAnswerSignals: 'Balance empathy with policy clarity and show how you de-escalate without overpromising.',
      },
      {
        prompt: 'Describe a time you upsold or cross-sold successfully.',
        whyItComesUp: 'Retail managers want proof that you can increase basket value naturally.',
        strongAnswerSignals: 'Explain how you identified the need, recommended a relevant add-on, and measured the outcome.',
      },
      {
        prompt: 'How do you keep displays, shelves, and promotional areas retail-ready during a busy shift?',
        whyItComesUp: 'Visual discipline matters heavily in mall-based Gulf retail environments.',
        strongAnswerSignals: 'Talk about zoning, recovery routines, priority products, and teamwork during rush periods.',
      },
      {
        prompt: 'How do you prevent shrinkage, cash discrepancies, or stock loss?',
        whyItComesUp: 'Loss prevention is a recurring interview theme in chain retail.',
        strongAnswerSignals: 'Cover vigilance, process discipline, stock counts, and escalation of suspicious situations.',
      },
      {
        prompt: 'Give an example of a time you handled several customers at once during a rush.',
        whyItComesUp: 'This reveals whether you can stay organized and service-focused under pressure.',
        strongAnswerSignals: 'Show prioritization, polite acknowledgment, and clear communication while keeping the line moving.',
      },
    ],
    sources: [
      {
        title: 'Glassdoor: Landmark Group interview questions in Dubai',
        href: 'https://www.glassdoor.com/Interview/Landmark-Group-Dubai-Interview-Questions-EI_IE342832.0,14_IL.15,20_IM954.htm',
        note: 'Recent Dubai candidate-reported retail interview themes including inventory and customer handling.',
      },
      {
        title: 'Indeed: 35 retail interview questions',
        href: 'https://www.indeed.com/career-advice/interviewing/retail-interview-questions',
        note: 'Updated October 2, 2025 with retail customer-service and scenario questions.',
      },
      {
        title: 'Indeed: Retail merchandiser interview questions',
        href: 'https://www.indeed.com/career-advice/interviewing/retail-merchandiser-interview-questions',
        note: 'Useful for stock, display, and merchandising-focused roles.',
      },
      {
        title: 'Indeed: Common retail store manager interview questions',
        href: 'https://www.indeed.com/career-advice/interviewing/retail-store-manager-interview-questions',
        note: 'Current retail leadership question patterns updated December 4, 2025.',
      },
    ],
  },
  {
    slug: 'oil-gas',
    title: 'Oil & Gas',
    summary:
      'Oil and gas interviews in Abu Dhabi and wider Gulf markets usually test HSE discipline first, then process or field depth. Expect questions about permits, abnormal conditions, equipment familiarity, shutdowns, handovers, and learning from incidents.',
    roles: ['Process Operator', 'Mechanical Technician', 'Petroleum Engineer', 'Safety Officer', 'Field Supervisor'],
    recruiterSignals: [
      'Non-negotiable safety behaviour around PTW, JSA, isolation, and escalation.',
      'Real plant or field knowledge instead of textbook definitions only.',
      'Shift handover quality, troubleshooting logic, and response to abnormal readings or alarms.',
    ],
    prepChecklist: [
      'Prepare your certifications, permit-to-work exposure, and site/plant systems you have used recently.',
      'Revise one incident, near miss, or abnormal condition you handled and what you learned from it.',
      'Be ready to explain equipment or process steps in simple language, not only engineering jargon.',
    ],
    questions: [
      {
        prompt: 'Walk me through your field, plant, or rig experience and the type of equipment you have handled directly.',
        whyItComesUp: 'Interviewers want to separate hands-on exposure from purely supporting or office-based roles.',
        strongAnswerSignals: 'Mention facility type, equipment, shift pattern, and the exact actions you personally carried out.',
      },
      {
        prompt: 'How do you prepare for a job under permit-to-work and job safety analysis requirements?',
        whyItComesUp: 'Safety system familiarity is often screened before deeper technical questions.',
        strongAnswerSignals: 'Reference PTW review, JSA, isolation verification, gas testing, toolbox talk, and stop-work authority.',
      },
      {
        prompt: 'Tell me about a time you stopped a job or escalated a condition for safety reasons.',
        whyItComesUp: 'Gulf energy employers often test whether you will protect the site when production pressure is high.',
        strongAnswerSignals: 'Show courage, procedure adherence, and what changed before work resumed.',
      },
      {
        prompt: 'What do you do if you see abnormal pressure, temperature, vibration, or alarm readings during your shift?',
        whyItComesUp: 'This is a common operator and technician question because it shows your troubleshooting instincts.',
        strongAnswerSignals: 'Explain verification, immediate safeguards, reporting, and safe escalation rather than guessing.',
      },
      {
        prompt: 'How do you manage shift handover so the next team does not miss a critical issue?',
        whyItComesUp: 'Poor handover causes safety and production failures, so managers look for discipline here.',
        strongAnswerSignals: 'Mention logbooks, key alarms, equipment status, permits open, maintenance constraints, and verbal confirmation.',
      },
      {
        prompt: 'Explain a process or piece of equipment you know especially well.',
        whyItComesUp: 'Interviewers want proof of depth in one area, not broad but shallow knowledge.',
        strongAnswerSignals: 'Use plain language, describe normal operation, common issues, and the safety critical points.',
      },
      {
        prompt: 'How do you balance production targets with strict HSE and environmental compliance?',
        whyItComesUp: 'This is a classic Gulf oil and gas tension, especially on live operations.',
        strongAnswerSignals: 'Make it clear that safe, compliant production is the goal and shortcuts are unacceptable.',
      },
      {
        prompt: 'Describe a root-cause investigation, shutdown, or troubleshooting case you were involved in.',
        whyItComesUp: 'They want structured thinking, not just reactive maintenance.',
        strongAnswerSignals: 'Show how data, observations, permits, and team communication led to the corrective action.',
      },
    ],
    sources: [
      {
        title: 'Glassdoor: ADNOC Group interview questions in Abu Dhabi',
        href: 'https://www.glassdoor.com/Interview/ADNOC-Group-Abu-Dhabi-Interview-Questions-EI_IE7716.0,11_IL.12,21_IM953.htm',
        note: 'Recent candidate-reported Abu Dhabi interview experiences for a major regional employer.',
      },
      {
        title: 'NaukriGulf: 20 Oil and Gas Interview Questions',
        href: 'https://www.naukrigulf.com/career-tips/oil-gas-interview-questions',
        note: 'Gulf-market-focused oil and gas interview guide updated August 6, 2024.',
      },
      {
        title: 'Indeed: 48 Petroleum Engineer Interview Questions',
        href: 'https://www.indeed.com/career-advice/interviewing/petroleum-engineer-interview-questions',
        note: 'Current technical interview guide updated December 16, 2025.',
      },
    ],
  },
];

export const interviewQuestionBankReferences = interviewSectors.flatMap((sector) =>
  sector.sources.map((source) => ({
    sector: sector.title,
    ...source,
  }))
);


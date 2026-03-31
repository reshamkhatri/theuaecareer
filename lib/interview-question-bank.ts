export interface InterviewQuestion {
  prompt: string;
  whyItComesUp: string;
  strongAnswerSignals: string;
  sampleAnswer: string;
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
      'Construction interviews across the Gulf usually mix project delivery, coordination, safety ownership, and documentation discipline. Employers want proof that you can handle live site pressure without losing control of quality or safety.',
    roles: ['Site Engineer', 'Civil Foreman', 'Quantity Surveyor', 'Planning Engineer', 'HSE Officer'],
    recruiterSignals: [
      'Clear ownership of scope, labour, subcontractors, and inspections.',
      'Comfort with QA/QC, NCR prevention, and sequencing across multiple trades.',
      'Real safety examples, not only textbook knowledge.',
    ],
    prepChecklist: [
      'Prepare two project stories with value, timeline, team size, and your exact responsibility.',
      'Revise the documents you handled: RFIs, IRs, permits, NCRs, look-ahead plans, and drawing revisions.',
      'Keep one strong safety story and one delay-recovery story ready.',
    ],
    questions: [
      {
        prompt: 'Walk me through the last construction project you handled and your exact scope on site.',
        whyItComesUp: 'Interviewers want to check whether your title matches the work you personally owned.',
        strongAnswerSignals: 'State project type, package value, team size, subcontractors, and the deliverables you signed off.',
        sampleAnswer:
          'In my last role I worked on a G+12 residential project in Dubai worth around AED 48 million. I was responsible for the structural and blockwork packages on two zones, which meant coordinating subcontractors, checking daily progress, raising inspection requests, and making sure materials and manpower were ready before each activity. I also tracked look-ahead plans with the planning engineer and closed consultant comments before handover to the finishing team.',
      },
      {
        prompt: 'How do you turn IFC drawings into a daily work plan for labour, materials, and inspections?',
        whyItComesUp: 'This tests whether you can move from drawings to field execution without confusion.',
        strongAnswerSignals: 'Mention drawing review, quantity check, material readiness, labour allocation, and inspection hold points.',
        sampleAnswer:
          'I start by reviewing the latest approved drawing revision and marking the exact work front for the next one to three days. Then I check quantities, material availability, and the subcontractor manpower plan. Before work starts I confirm method statements, access, and the consultant inspection points so the activity does not stop midway. That way the labour team knows the sequence, the store team knows what is needed, and inspections are raised on time.',
      },
      {
        prompt: 'Tell me about a time you had to stop unsafe work even though the schedule was under pressure.',
        whyItComesUp: 'Gulf contractors often screen heavily for safety ownership, not only output.',
        strongAnswerSignals: 'Show that you recognized the hazard, escalated correctly, and restarted only after controls were in place.',
        sampleAnswer:
          'On one slab activity a subcontractor started working near an edge before the required guardrails were fixed. We were already behind program, but I stopped the activity immediately, informed the safety officer and site manager, and made the team install the edge protection before work resumed. We lost some time that morning, but we prevented a serious fall risk and kept the rest of the week on track by resequencing manpower on another area.',
      },
      {
        prompt: 'How do you coordinate civil, MEP, and finishing teams when multiple trades need the same area?',
        whyItComesUp: 'Coordination failure is one of the most common reasons for delay and rework.',
        strongAnswerSignals: 'Talk about sequence planning, daily coordination, access control, and clear handovers.',
        sampleAnswer:
          'I break the area into a simple sequence before work starts, usually civil completion, then concealed MEP, then inspection closure, then finishing release. Every morning I confirm who has access and what must be protected. If one team is slipping, I escalate early instead of allowing everyone to crowd the same area. That reduces clashes, protects completed work, and makes handover responsibilities clear.',
      },
      {
        prompt: 'What is your process before a concrete pour or major inspection request?',
        whyItComesUp: 'They want proof that you understand technical hold points and document control.',
        strongAnswerSignals: 'Reference checklist review, approved drawings, test certificates, and consultant sign-off.',
        sampleAnswer:
          'Before a pour I check that the latest approved drawing is available on site, reinforcement and shuttering are complete, embedded items are fixed, and the consultant comments from any pre-inspection are closed. I also confirm material approvals, test certificates, and pour sequence with the subcontractor. Only after that do I raise the inspection request and coordinate labour, pump access, and standby backup so the pour runs smoothly.',
      },
      {
        prompt: 'How do you deal with a subcontractor who is slipping on manpower, quality, or progress?',
        whyItComesUp: 'Subcontractor control is a recurring interview theme for site-based roles.',
        strongAnswerSignals: 'Show a practical escalation path with measurement, recovery plan, and follow-up.',
        sampleAnswer:
          'First I measure the gap against the agreed target, not just my impression. Then I call the subcontractor supervisor, explain the shortfall with numbers, and ask for a recovery plan covering manpower, materials, and supervision. If the gap continues, I escalate to the site manager with daily records and photos so action can be taken early. I prefer fast, evidence-based escalation instead of waiting until the weekly review.',
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
      'Hospitality interviews in Dubai and across the Gulf usually revolve around guest recovery, composure, grooming, upselling, and service consistency. Managers listen for warmth and maturity, not memorized luxury-brand slogans.',
    roles: ['Front Desk Agent', 'Guest Service Agent', 'Housekeeping Attendant', 'Waiter/Server', 'Barista'],
    recruiterSignals: [
      'Calm communication and natural guest-focused language.',
      'Real examples of recovering service issues without blaming others.',
      'Awareness of standards, upselling, multicultural teamwork, and shift flexibility.',
    ],
    prepChecklist: [
      'Prepare one strong guest complaint story with a clear resolution.',
      'Study the hotel or restaurant brand before the interview.',
      'Practice short, natural answers about grooming, upselling, and peak-shift pressure.',
    ],
    questions: [
      {
        prompt: 'What does hospitality mean to you in a Gulf hotel, restaurant, or resort environment?',
        whyItComesUp: 'This opener tests service mindset before technical skill.',
        strongAnswerSignals: 'Focus on anticipation, respect, consistency, and creating a comfortable guest experience.',
        sampleAnswer:
          'To me hospitality means making the guest feel welcome, respected, and taken care of from the first interaction until they leave. In the Gulf that also means understanding guests from many cultures, staying professional at all times, and keeping service consistent even when the operation is busy. A good hospitality team solves problems quickly without making the guest feel the pressure behind the scenes.',
      },
      {
        prompt: 'Tell me about a time you handled an unhappy guest and turned the situation around.',
        whyItComesUp: 'Guest recovery is one of the most repeated hospitality interview themes.',
        strongAnswerSignals: 'Explain the complaint, how you listened, what you did, and how you followed up.',
        sampleAnswer:
          'At my previous property a guest was upset because the room was not ready at the expected time. I listened without interrupting, apologized sincerely, and checked what could be done immediately. I arranged a priority clean, offered a temporary seating area with refreshments, and kept the guest updated instead of making them wait without information. When the room was ready I personally escorted the guest and checked later that evening to make sure everything was fine. The guest calmed down because they felt someone had taken ownership.',
      },
      {
        prompt: 'How do you stay calm and polite during a busy shift, peak check-in, or service rush?',
        whyItComesUp: 'High-volume Gulf properties care about composure as much as speed.',
        strongAnswerSignals: 'Mention prioritization, communication, and staying guest-focused.',
        sampleAnswer:
          'During busy periods I focus on staying organized instead of trying to rush everything at once. I acknowledge the guest quickly, prioritize the most urgent task, and keep communication clear with my teammates so we are not duplicating work. Even when the line is long, I try to keep my tone calm and respectful because guests notice attitude immediately. Speed matters, but composure keeps the whole service flow under control.',
      },
      {
        prompt: 'What would you do if a guest arrives and the room is not ready or the order is delayed?',
        whyItComesUp: 'This tests your recovery language in a very common live scenario.',
        strongAnswerSignals: 'Show ownership, apology, alternative action, and follow-up.',
        sampleAnswer:
          'I would first apologize clearly and avoid blaming another department. Then I would give the guest a realistic update and offer the best immediate alternative, such as waiting in the lounge, checking another available room, or updating the kitchen for priority follow-up depending on the situation. The important part is to stay visible and keep the guest informed until the issue is resolved, not disappear after the first apology.',
      },
      {
        prompt: 'How do you upsell rooms, dishes, or add-on services without making the guest uncomfortable?',
        whyItComesUp: 'Upselling is frequently discussed in hotel and restaurant hiring.',
        strongAnswerSignals: 'Frame upselling as relevant suggestions that improve the guest experience.',
        sampleAnswer:
          'I do not treat upselling like hard selling. I first listen to what the guest actually needs, then I recommend something that genuinely improves their stay or meal. For example, if a family wants more space, I can explain the benefit of a larger room instead of only quoting a higher price. If the recommendation feels useful and natural, guests respond much better and service still feels personal.',
      },
      {
        prompt: 'Why do you want to work for this property or brand specifically?',
        whyItComesUp: 'Large Gulf employers expect candidates to know the brand, not just the vacancy.',
        strongAnswerSignals: 'Reference the property, service culture, guest mix, or growth path honestly.',
        sampleAnswer:
          'I applied here because your property has a strong reputation for service consistency and international guest standards, and that is the environment where I want to grow. I also like that your brand invests in training and internal progression, which is important to me because I want to build a long-term hospitality career, not just move from job to job. I believe my service style fits well with a brand that values detail and guest recovery.',
      },
    ],
    sources: [
      {
        title: 'Glassdoor: Marriott International interview questions in Dubai',
        href: 'https://www.glassdoor.com/Interview/Marriott-International-Dubai-Interview-Questions-EI_IE7790.0,22_IL.23,28_IM954.htm',
        note: 'Recent candidate-reported Dubai hospitality interview experiences.',
      },
      {
        title: 'Hcareers: How to answer "Tell me about yourself" in a hospitality interview',
        href: 'https://www.hcareers.com/article/advice-from-employers/how-to-answer-tell-me-about-yourself-in-a-hospitality-interview',
        note: 'Employer-facing hospitality interview guidance updated May 27, 2025.',
      },
      {
        title: 'Indeed: "What does hospitality mean to you?"',
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
      'Retail interviews in the Gulf often revolve around customer approach, sales targets, upselling, stock discipline, and store presentation. Hiring managers want people who can sell confidently without losing control of service quality or policy.',
    roles: ['Sales Associate', 'Cashier', 'Storekeeper', 'Visual Merchandiser', 'Store Manager'],
    recruiterSignals: [
      'Comfort with KPIs like conversion, UPT, ATV, returns, and shrinkage.',
      'Customer-handling maturity under pressure and during promotions.',
      'Strong habits around stock, display standards, and policy compliance.',
    ],
    prepChecklist: [
      'Know your last target, conversion, UPT, ATV, or shrinkage numbers if possible.',
      'Prepare one target-achievement story and one difficult-customer story.',
      'Revise refund, exchange, stock-count, and merchandising basics.',
    ],
    questions: [
      {
        prompt: 'How do you approach a customer who is browsing but not asking for help yet?',
        whyItComesUp: 'Retail employers want to see whether you can engage without sounding pushy.',
        strongAnswerSignals: 'Show a soft opening, product awareness, and a service-first approach that can still lead to conversion.',
        sampleAnswer:
          'I usually acknowledge the customer first with a greeting and give them a little space instead of approaching too aggressively. After that I use a simple open question based on what they are looking at, such as whether they need a size, color, or recommendation. This helps me start a natural conversation without making the customer feel pressured. If they want to browse alone, I stay available and check back at the right moment.',
      },
      {
        prompt: 'Tell me about your last sales target and how you tracked your performance against it.',
        whyItComesUp: 'This tests commercial awareness and your comfort with retail numbers.',
        strongAnswerSignals: 'Mention the target, the metric, the actions you took, and the result.',
        sampleAnswer:
          'In my last job I had a monthly individual sales target plus KPI tracking for UPT and conversion. I checked my performance every day, especially after peak hours, so I knew whether I needed to improve product mix or upselling. When I saw that I was behind target, I focused more on recommending complete looks and add-on items instead of single-item sales. That helped me close the month above target and improve basket value at the same time.',
      },
      {
        prompt: 'What do you do when a key item is out of stock or a product is not moving?',
        whyItComesUp: 'Interviewers use this to test your flexibility and stock sense.',
        strongAnswerSignals: 'Discuss alternatives, checking stock systems, and feedback on slow-moving items.',
        sampleAnswer:
          'If a key item is out of stock, I try to save the sale by offering the closest alternative in style, use, or price instead of simply saying it is unavailable. If the item is slow-moving, I pay attention to customer feedback and discuss it with the supervisor so the team can adjust recommendations or display placement. In both cases I try to protect the customer experience and the sale, not just report the stock issue.',
      },
      {
        prompt: 'How would you handle a return or exchange when the customer is upset about the policy?',
        whyItComesUp: 'Policy handling is a standard retail interview topic because it affects service and margin.',
        strongAnswerSignals: 'Balance empathy with policy clarity and stay calm without overpromising.',
        sampleAnswer:
          'I would first let the customer explain the issue fully and acknowledge the frustration. Then I would explain the policy clearly in a calm tone and show what options are available, such as exchange, store credit, or supervisor review depending on the case. My goal would be to keep the conversation respectful and solution-focused instead of arguing. Even when policy cannot change, the customer should feel that I listened and tried to help.',
      },
      {
        prompt: 'Describe a time you upsold or cross-sold successfully.',
        whyItComesUp: 'Retail managers want proof that you can increase basket value naturally.',
        strongAnswerSignals: 'Explain the customer need, your recommendation, and the measurable result.',
        sampleAnswer:
          'A customer once came in looking for one formal shirt. After asking a few questions, I learned it was for regular office use, so I suggested a second easy-care option plus a tie that matched both shirts. I explained the benefit instead of just mentioning extra items, and the customer liked that the suggestion was practical. That sale increased basket value and still felt like service, not pressure.',
      },
      {
        prompt: 'How do you prevent shrinkage, cash discrepancies, or stock loss?',
        whyItComesUp: 'Loss prevention is a recurring interview theme in chain retail.',
        strongAnswerSignals: 'Cover vigilance, process discipline, accurate stock handling, and escalation.',
        sampleAnswer:
          'I focus on discipline in the small things: accurate billing, careful handover at the till, correct tagging, and following stock movement procedures exactly. I also pay attention to unusual behavior in-store and report concerns early instead of ignoring them. Most shrinkage problems grow when basic controls are treated casually, so I take routine checks seriously every shift.',
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
      'Oil and gas interviews in Abu Dhabi and wider Gulf markets usually test HSE discipline first, then plant or field depth. Expect questions about permits, abnormal conditions, shift handover, shutdowns, equipment familiarity, and incident learning.',
    roles: ['Process Operator', 'Mechanical Technician', 'Petroleum Engineer', 'Safety Officer', 'Field Supervisor'],
    recruiterSignals: [
      'Non-negotiable safety behavior around PTW, JSA, isolation, and escalation.',
      'Real operating or field knowledge instead of only textbook definitions.',
      'Structured thinking during abnormal conditions, handover, and troubleshooting.',
    ],
    prepChecklist: [
      'Prepare your certifications, systems worked on, and equipment you handled directly.',
      'Revise one incident, shutdown, or abnormal condition you managed and what you learned from it.',
      'Be ready to explain one process or equipment item in plain language.',
    ],
    questions: [
      {
        prompt: 'Walk me through your field, plant, or rig experience and the type of equipment you have handled directly.',
        whyItComesUp: 'Interviewers want to separate hands-on experience from support-only exposure.',
        strongAnswerSignals: 'Mention facility type, equipment, shift pattern, and the tasks you personally performed.',
        sampleAnswer:
          'I have mainly worked in gas-processing operations on rotating shifts, supporting compressors, separators, pumps, and utility systems. My direct responsibilities included routine checks, start-up and shutdown support, logbook recording, line-up verification, and reporting abnormalities to the control room and supervisor. I am most comfortable in operations where process discipline and safety checks are followed closely every shift.',
      },
      {
        prompt: 'How do you prepare for a job under permit-to-work and job safety analysis requirements?',
        whyItComesUp: 'Safety system familiarity is often screened before deeper technical questions.',
        strongAnswerSignals: 'Reference PTW review, JSA, isolation, gas testing, toolbox talk, and stop-work authority.',
        sampleAnswer:
          'Before work starts, I review the permit carefully, confirm the exact job scope, and make sure all isolations and precautions match the task. I check the JSA with the team so everyone understands the hazards, controls, PPE, and emergency response. If gas testing or lockout verification is required, I do not assume it is already correct. I only support the job once I am satisfied the permit and the field conditions match.',
      },
      {
        prompt: 'Tell me about a time you stopped a job or escalated a condition for safety reasons.',
        whyItComesUp: 'Energy employers want proof that you will protect the site even under production pressure.',
        strongAnswerSignals: 'Show courage, procedure adherence, and safe restart discipline.',
        sampleAnswer:
          'During one maintenance activity I noticed the work area condition did not match the job briefing because a nearby line had not been isolated as expected. I stopped the work immediately, informed the supervisor, and asked the team to stay clear until the isolation was rechecked. The job restarted later after the permit conditions were corrected. I would rather delay a task than let the team work under uncertain isolation conditions.',
      },
      {
        prompt: 'What do you do if you see abnormal pressure, temperature, vibration, or alarm readings during your shift?',
        whyItComesUp: 'This tests troubleshooting discipline and safe escalation.',
        strongAnswerSignals: 'Explain verification, immediate safeguards, communication, and controlled response.',
        sampleAnswer:
          'First I verify whether the reading is genuine by checking related indicators, trends, and field conditions instead of reacting to one number alone. If the condition still looks abnormal, I inform the control room or supervisor immediately and take the required immediate action based on procedure, such as reducing load, isolating the equipment, or preparing standby support. The key is to stay calm, follow procedure, and communicate early before a small deviation becomes a larger event.',
      },
      {
        prompt: 'How do you manage shift handover so the next team does not miss a critical issue?',
        whyItComesUp: 'Poor handover creates both production and safety failures.',
        strongAnswerSignals: 'Mention logs, permit status, equipment condition, constraints, and verbal confirmation.',
        sampleAnswer:
          'I treat handover as a safety activity, not just a routine update. I clearly explain abnormal conditions, open permits, maintenance limitations, alarms, and equipment that needs close monitoring in the next shift. I also make sure the written log matches the verbal handover, because one without the other can create gaps. I want the next operator to know exactly what needs attention before I leave the area.',
      },
      {
        prompt: 'How do you balance production targets with strict HSE and environmental compliance?',
        whyItComesUp: 'This is a classic tension in live operations and a common interview test.',
        strongAnswerSignals: 'Make it clear that safe production is the only acceptable production.',
        sampleAnswer:
          'I do not see safety and production as separate goals. Stable production only happens when the plant is operating safely and within limits. If a shortcut improves output for one hour but increases risk, that is not good production in my view. My approach is to protect people, equipment, and compliance first, then recover production through proper troubleshooting and coordination.',
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


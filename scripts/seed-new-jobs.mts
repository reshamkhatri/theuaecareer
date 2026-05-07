import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  apiVersion: '2026-03-27',
  token: 'skt3SrbZVgKKjKcq1pSCsmbnOLtMvHBPYalxUqFdxCOyatLCXa3fkRJmXHNKJwiv2OlMWOGeEVGAj9enCMwEQkICoBwPqvPJps8yWbaDtqQkj9Zp1llEjDTQnyIfog1HOxaUqUfcJ3QFTSvx42KkqgM70ePc23EJbICOA4oBU4VTY9HhgFqI',
  useCdn: false,
});

let kc = 0;
const k = () => `k${++kc}`;
const sp = (t: string) => ({ _type: 'span' as const, _key: k(), text: t, marks: [] as string[] });
const p = (t: string, s = 'normal') => ({ _type: 'block' as const, _key: k(), style: s, markDefs: [], children: [sp(t)] });
const bullet = (t: string) => ({ _type: 'block' as const, _key: k(), style: 'normal', listItem: 'bullet' as const, level: 1, markDefs: [], children: [sp(t)] });

const now = new Date().toISOString();
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
const expiryDate = nextMonth.toISOString();

const jobs = [
  {
    _id: 'job-sales-associate-retail-dubai-mall',
    _type: 'job',
    title: 'Sales Associate — Retail',
    companyName: 'Retail Brand',
    slug: { _type: 'slug', current: 'sales-associate-retail-dubai-mall' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Retail',
    categoryLabel: 'Retail / FMCG',
    experienceRequired: '0–2 years (freshers welcome)',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Every Sunday–Thursday, 10am–4pm',
      venue: 'Dubai Mall HR office, Ground Floor near main entrance',
      summary: 'Walk-in: Every Sunday–Thursday, 10am–4pm at Dubai Mall'
    },
    description: [
      p('We are looking for enthusiastic and customer-focused Sales Associates to join our team at Dubai Mall. This is a full-time role with fixed shifts. No prior UAE experience is required — if you have retail or customer service experience from your home country, you are eligible to apply.'),
      p('You will be responsible for greeting customers, helping them find products, maintaining store displays, and processing transactions. Training is provided for all new joiners.'),
      p('What We Are Looking For:', 'h3'),
      bullet('Good communication skills in English (additional languages a plus)'),
      bullet('Professional appearance and a positive attitude'),
      bullet('Ability to stand for extended periods during shifts'),
      bullet('Availability to work weekends (Friday and Saturday are the busiest days)'),
      bullet('UAE residence visa (visit visa candidates may be considered for immediate joiners)')
    ],
    howToApply: [
      p('Walk in directly during the interview timings above. Bring your CV, passport copy, and one photograph. No need to call ahead.')
    ],
    metaTitle: 'Sales Associate Job in Dubai Mall | Walk-In Interview',
    metaDescription: 'Walk-in interview for Sales Associate at Dubai Mall. Salary AED 2,000-2,500. Freshers welcome to apply. Full-time role in Retail/FMCG.'
  },
  {
    _id: 'job-delivery-driver-light-vehicle-jebel-ali',
    _type: 'job',
    title: 'Delivery Driver — Light Vehicle',
    companyName: 'Logistics Company',
    slug: { _type: 'slug', current: 'delivery-driver-light-vehicle-jebel-ali' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    categoryLabel: 'Logistics & Transport',
    experienceRequired: '1+ year UAE driving experience',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Saturday and Sunday, 9am–1pm',
      venue: 'Company depot, Jebel Ali',
      summary: 'Walk-in: Saturday and Sunday, 9am–1pm at Jebel Ali depot'
    },
    description: [
      p('A well-established logistics company in Jebel Ali is hiring light vehicle delivery drivers. The role involves daily deliveries across Dubai and Sharjah on a fixed route basis. Company vehicle provided. Fuel card provided. Working hours are 7am to 5pm with one hour break.'),
      p('Requirements:', 'h3'),
      bullet('Valid UAE light vehicle driving licence (mandatory)'),
      bullet('Minimum 1 year driving experience in UAE'),
      bullet('Smartphone with WhatsApp for route communication'),
      bullet('Clean driving record (no major accidents or traffic fines in the past year)'),
      bullet('Basic English for delivery documentation')
    ],
    howToApply: [
      p('Walk in on Saturday or Sunday between 9am and 1pm. Bring your UAE driving licence (original), passport copy, visa copy, and CV. WhatsApp the number on the contact page with "Driver Application" to get the depot address.')
    ],
    metaTitle: 'Delivery Driver Job in Jebel Ali | Walk-In Interview',
    metaDescription: 'Hiring Delivery Drivers in Dubai (Jebel Ali). Light vehicle. Salary AED 2,200 - 2,600 + fuel. Walk-in interview this weekend.'
  },
  {
    _id: 'job-room-attendant-housekeeping-marina',
    _type: 'job',
    title: 'Room Attendant — Housekeeping',
    companyName: '4-Star Hotel Group',
    slug: { _type: 'slug', current: 'room-attendant-housekeeping-dubai-marina' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Hospitality',
    experienceRequired: '0–1 year (freshers welcome)',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Every Saturday, 9am–12pm',
      venue: 'Hotel HR Office, Dubai Marina',
      summary: 'Walk-in: Every Saturday, 9am–12pm in Dubai Marina'
    },
    description: [
      p('A 4-star hotel in Dubai Marina is hiring Room Attendants for their housekeeping department. This is a full package role that includes accommodation and meals in a staff residence, which means your take-home salary goes entirely to savings or family support.'),
      p('Duties include cleaning and servicing guest rooms to hotel standards, replenishing amenities, and reporting any maintenance issues.'),
      p('Who Can Apply:', 'h3'),
      bullet('Freshers with hotel housekeeping training from a hospitality institute are welcome'),
      bullet('Previous housekeeping experience from any country is an advantage'),
      bullet('Female candidates preferred for this property (as per hotel policy)'),
      bullet('Accommodation and meals are provided in a staff residence')
    ],
    howToApply: [
      p('Walk in every Saturday from 9am to 12pm to the hotel HR department. Bring your CV, passport copy, visa copy, and educational certificates. Dress neatly for the interview.')
    ],
    metaTitle: 'Room Attendant Job in Dubai Marina | Walk-In Interview',
    metaDescription: 'Walk-in interview for Room Attendants in Dubai Marina. AED 1,700 + accommodation + meals. Freshers welcome. 4-Star Hotel Group.'
  },
  {
    _id: 'job-customer-service-agent-call-centre',
    _type: 'job',
    title: 'Customer Service Agent — Call Centre',
    companyName: 'Telecom Company',
    slug: { _type: 'slug', current: 'customer-service-agent-call-centre-business-bay' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Customer Service',
    categoryLabel: 'Telecommunications',
    experienceRequired: '0–2 years',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Monday to Wednesday, 11am–3pm',
      venue: 'Business Bay Office',
      summary: 'Walk-in: Monday to Wednesday, 11am–3pm at Business Bay'
    },
    description: [
      p('A leading telecom company in Business Bay is expanding their customer service team. This is an in-office role with fixed shifts. You will handle inbound customer queries related to billing, plans, and technical issues. Training is fully provided.'),
      p('Requirements:', 'h3'),
      bullet('Fluent English is mandatory; Hindi or Tagalog is a strong plus'),
      bullet('Basic computer literacy (MS Word, Excel, email)'),
      bullet('Good listening skills and patience'),
      bullet('Willing to work in rotational shifts (no night shifts for this batch)')
    ],
    howToApply: [
      p('Walk in Monday to Wednesday between 11am and 3pm. Bring your CV and passport copy to our Business Bay office.')
    ],
    metaTitle: 'Customer Service Agent Job in Dubai | Walk-In Interview',
    metaDescription: 'Hiring Customer Service Agents in Business Bay, Dubai. Walk-in interviews Monday-Wednesday. Salary AED 2,500 - 3,000 + bonus.'
  },
  {
    _id: 'job-warehouse-operative-dubai-south',
    _type: 'job',
    title: 'Warehouse Operative',
    companyName: 'E-Commerce Fulfilment Centre',
    slug: { _type: 'slug', current: 'warehouse-operative-dubai-south' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    categoryLabel: 'Logistics & Warehousing',
    experienceRequired: 'Not required',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: false,
    description: [
      p('A major e-commerce fulfilment centre in Dubai South is hiring warehouse operatives for their pick-and-pack operations. The facility runs 24 hours and you will be assigned an 8-hour fixed shift. Transport from Dubai city areas and accommodation at a staff residence are provided.'),
      p('Requirements:', 'h3'),
      bullet('Physically fit and able to stand for long periods'),
      bullet('Comfortable working in an air-conditioned warehouse environment'),
      bullet('Basic literacy (able to read barcodes and product codes)'),
      bullet('No prior experience required — full training given on day one'),
      bullet('Immediate joiners preferred')
    ],
    howToApply: [
      p('Email CV to jobs@example.com with subject line "Warehouse Operative — Dubai South". Include your visa status, availability date, and contact number. Shortlisted candidates will be called for an interview within 3 working days.')
    ],
    metaTitle: 'Warehouse Operative Job in Dubai South | E-Commerce',
    metaDescription: 'Full-time Warehouse Operative job in Dubai South. AED 1,600 - 1,900 + accommodation + transport. No experience required. Apply now.'
  },
  {
    _id: 'job-receptionist-medical-clinic-abu-dhabi',
    _type: 'job',
    title: 'Receptionist — Medical Clinic',
    companyName: 'Private Medical Clinic',
    slug: { _type: 'slug', current: 'receptionist-medical-clinic-abu-dhabi' },
    location: { city: 'Abu Dhabi', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Admin',
    categoryLabel: 'Healthcare / Administration',
    experienceRequired: '1–3 years in front desk or medical reception',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: false,
    description: [
      p('A well-established private medical clinic in Khalifa City, Abu Dhabi is hiring a Receptionist. You will be the first point of contact for patients — managing appointments, insurance pre-approvals, patient registration, and front-desk queries. The clinic sees approximately 80–100 patients per day.'),
      p('Requirements:', 'h3'),
      bullet('Prior experience in a medical clinic or hospital reception is strongly preferred'),
      bullet('Familiarity with insurance pre-approval processes (DHA/DOH-type)'),
      bullet('Excellent English; Arabic is a major advantage for this role'),
      bullet('Professional demeanour and ability to handle a busy front desk calmly'),
      bullet('Female candidates preferred (as per clinic policy)')
    ],
    howToApply: [
      p('Send your CV with "Medical Receptionist — Abu Dhabi" in the subject line. Include your current location, visa status, and notice period. Interviews will be conducted in person at the clinic for shortlisted candidates.')
    ],
    metaTitle: 'Medical Receptionist Job in Abu Dhabi | Private Clinic',
    metaDescription: 'Hiring Medical Receptionist for a private clinic in Khalifa City, Abu Dhabi. AED 2,800 - 3,500. 1-3 years experience required.'
  },
  {
    _id: 'job-accountant-junior-sharjah',
    _type: 'job',
    title: 'Accountant — Junior',
    companyName: 'Trading Company',
    slug: { _type: 'slug', current: 'accountant-junior-sharjah' },
    location: { city: 'Sharjah', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Finance',
    categoryLabel: 'Finance / Accounting',
    experienceRequired: '1–3 years',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: false,
    description: [
      p('A trading company in Sharjah Industrial Area is hiring a Junior Accountant. This is a straightforward accounts payable / accounts receivable role with some VAT filing responsibilities. You will work closely with the senior accountant and report to the Finance Manager.'),
      p('Requirements:', 'h3'),
      bullet('Bachelor’s degree in Accounting, Finance, or a related field'),
      bullet('1–3 years of accounting experience (UAE experience preferred)'),
      bullet('Proficiency in Tally, QuickBooks, or any similar accounting software'),
      bullet('Good understanding of UAE VAT (Federal Tax Authority filing experience is a plus)'),
      bullet('Strong Excel skills')
    ],
    howToApply: [
      p('Email your CV with the subject line "Junior Accountant — Sharjah". Include your current salary, expected salary, and notice period. Only shortlisted candidates will be contacted within 5 working days.')
    ],
    metaTitle: 'Junior Accountant Job in Sharjah | Trading Company',
    metaDescription: 'Junior Accountant vacancy in Sharjah Industrial Area. AED 3,000 - 4,000. 1-3 years experience in UAE required. Apply online.'
  },
  {
    _id: 'job-security-guard-dubai',
    _type: 'job',
    title: 'Security Guard',
    companyName: 'Security Services Company',
    slug: { _type: 'slug', current: 'security-guard-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Security',
    categoryLabel: 'Security & Facilities',
    experienceRequired: 'Not required (SIRA licence preferred)',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Daily, 9am–5pm (Sunday to Thursday)',
      venue: 'Company head office, Deira',
      summary: 'Walk-in: Sunday to Thursday, 9am–5pm in Deira'
    },
    description: [
      p('A licensed security services company is hiring Security Guards for deployment across multiple client sites in Dubai including residential buildings, retail outlets, and commercial offices. Accommodation and transportation to site are provided.'),
      p('Requirements:', 'h3'),
      bullet('SIRA (Security Industry Regulatory Agency) licence holders are strongly preferred'),
      bullet('Candidates without SIRA licence may be considered — company will assist with licensing'),
      bullet('Physically fit, presentable appearance'),
      bullet('Basic English communication'),
      bullet('Willingness to work 12-hour rotating shifts (day and night)')
    ],
    howToApply: [
      p('Walk in any working day between 9am and 5pm to the company head office in Deira. Bring your passport copy, visa copy, CV, and SIRA licence if you have one. Ask for the HR department at the reception.')
    ],
    metaTitle: 'Security Guard Jobs in Dubai | Walk-In Interviews',
    metaDescription: 'Walk-in interviews for Security Guards in Dubai. SIRA licence preferred but not required. AED 1,800 - 2,200 + accommodation + transport.'
  },
  {
    _id: 'job-cook-indian-cuisine-karama',
    _type: 'job',
    title: 'Cook — Indian Cuisine',
    companyName: 'Restaurant Group',
    slug: { _type: 'slug', current: 'cook-indian-cuisine-karama' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Hospitality / F&B',
    experienceRequired: '2+ years',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: true,
    walkInDetails: {
      date: now,
      time: 'Tuesday and Thursday, 3pm–6pm',
      venue: 'Restaurant premises, Karama',
      summary: 'Walk-in: Tuesday and Thursday, 3pm–6pm in Karama'
    },
    description: [
      p('A popular Indian restaurant group in Karama is hiring experienced cooks who specialise in North Indian and South Indian cuisine. The kitchen is busy and fast-paced. You will work as part of a team of 6 cooks across different stations.'),
      p('Requirements:', 'h3'),
      bullet('Minimum 2 years cooking experience in a restaurant kitchen (not home cooking)'),
      bullet('Strong knowledge of either North Indian (curries, tandoor, biryanis) or South Indian (dosas, idlis, Kerala cuisine) cooking'),
      bullet('Ability to work in a fast-paced kitchen environment'),
      bullet('Health certificate / food handler’s certificate is an advantage')
    ],
    howToApply: [
      p('Walk in on Tuesday or Thursday between 3pm and 6pm. The restaurant is in Karama — WhatsApp "Cook Application" to our contact number for the exact address. Bring your CV and be prepared to do a brief practical cooking test.')
    ],
    metaTitle: 'Indian Cuisine Cook Job in Karama, Dubai | Walk-In',
    metaDescription: 'Hiring Cook for Indian Cuisine in Karama, Dubai. Walk-in interviews Tuesday & Thursday. Salary AED 1,800 - 2,500 + meals.'
  },
  {
    _id: 'job-it-support-technician-dubai',
    _type: 'job',
    title: 'IT Support Technician',
    companyName: 'IT Services Company',
    slug: { _type: 'slug', current: 'it-support-technician-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'IT',
    categoryLabel: 'Information Technology',
    experienceRequired: '2–4 years',
    postedDate: now,
    expiryDate: expiryDate,
    status: 'active',
    isWalkIn: false,
    description: [
      p('An IT services company based in Deira is hiring an IT Support Technician to service their client base across Dubai and the Northern Emirates. The role is a mix of remote support and on-site visits. You will handle hardware and software issues, network troubleshooting, and basic server maintenance for SME clients.'),
      p('Requirements:', 'h3'),
      bullet('2–4 years of IT support experience (L1/L2)'),
      bullet('Strong knowledge of Windows OS, Microsoft 365, and basic networking (LAN/WAN/VPN)'),
      bullet('Experience with routers, switches, and firewalls (Cisco, Mikrotik, or similar)'),
      bullet('Valid UAE driving licence (you’ll need to visit client sites)'),
      bullet('Good English communication skills (client-facing role)'),
      bullet('CompTIA A+ or Network+ certification is an advantage but not mandatory')
    ],
    howToApply: [
      p('Email your CV with the subject line "IT Support Technician — Dubai". Include your current or most recent salary and your notice period. Shortlisted candidates will be contacted for a phone screen within 3 working days.')
    ],
    metaTitle: 'IT Support Technician Job in Dubai | Apply Now',
    metaDescription: 'IT Support Technician job vacancy in Dubai. Require 2-4 years experience, Windows OS, networking, and valid UAE driving licence.'
  }
];

async function main() {
  const tx = client.transaction();
  for (const job of jobs) {
    tx.createOrReplace(job);
  }
  await tx.commit();
  console.log(`Successfully uploaded ${jobs.length} new jobs!`);
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});

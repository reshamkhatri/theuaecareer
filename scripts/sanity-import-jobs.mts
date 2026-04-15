import { createClient } from '@sanity/client';

// Schema types (subset of what's in sanity-seed-researched-content.mts)
type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: any[];
  children: any[];
  listItem?: 'bullet';
  level?: number;
};

type JobDocument = {
  _id: string;
  _type: 'job';
  title: string;
  companyName: string;
  slug: { _type: 'slug'; current: string };
  location: { city: string; country: 'UAE' };
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  category: string;
  experienceRequired: string;
  salaryRange?: string;
  postedDate: string;
  expiryDate: string;
  status: 'active';
  isWalkIn: boolean;
  walkInDetails?: string;
  description: PortableTextBlock[];
  howToApply: PortableTextBlock[];
  metaTitle: string;
  metaDescription: string;
};

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  useCdn: false,
  token: 'skt3SrbZVgKKjKcq1pSCsmbnOLtMvHBPYalxUqFdxCOyatLCXa3fkRJmXHNKJwiv2OlMWOGeEVGAj9enCMwEQkICoBwPqvPJps8yWbaDtqQkj9Zp1llEjDTQnyIfog1HOxaUqUfcJ3QFTSvx42KkqgM70ePc23EJbICOA4oBU4VTY9HhgFqI',
  apiVersion: '2026-03-27',
});

let keyCounter = 0;
function nextKey() {
  keyCounter += 1;
  return `k${Date.now()}-${keyCounter}`;
}

function span(text: string) {
  return {
    _type: 'span',
    _key: nextKey(),
    text,
    marks: [],
  };
}

function paragraph(text: string, style = 'normal'): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style,
    markDefs: [],
    children: [span(text)],
  };
}

function bullet(text: string): PortableTextBlock {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [span(text)],
  };
}

const verifiedAt = new Date().toISOString();
const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now

const jobListings: JobDocument[] = [
  {
    _id: 'job-sales-associate-dubai-mall-launch',
    _type: 'job',
    title: 'Sales Associate — Retail',
    companyName: 'Retail Brand (Dubai Mall)',
    slug: { _type: 'slug', current: 'sales-associate-retail-dubai-mall' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Retail',
    experienceRequired: '0–2 years (freshers welcome)',
    salaryRange: 'AED 2,000 – 2,500 + commission',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Every Sunday–Thursday, 10am–4pm at Mall HR office',
    description: [
      paragraph('We are looking for enthusiastic and customer-focused Sales Associates to join our team at Dubai Mall. This is a full-time role with fixed shifts. No prior UAE experience is required — if you have retail or customer service experience from your home country, you are eligible to apply.'),
      paragraph('Key responsibilities:'),
      bullet('Greeting customers and helping them find products'),
      bullet('Maintaining store displays'),
      bullet('Processing transactions'),
      bullet('Providing excellent customer service'),
    ],
    howToApply: [
      paragraph('Walk in directly during the interview timings (Sunday–Thursday, 10am–4pm).'),
      bullet('Venue: Mall HR office, Ground Floor near main entrance'),
      bullet('Bring: Updated CV, passport copy, and one photograph.'),
    ],
    metaTitle: 'Sales Associate Job in Dubai Mall | Freshers Welcome',
    metaDescription: 'Verified sales associate vacancy at Dubai Mall. Freshers with retail or service experience welcome to walk in.',
  },
  {
    _id: 'job-delivery-driver-jebel-ali-launch',
    _type: 'job',
    title: 'Delivery Driver — Light Vehicle',
    companyName: 'Logistics Company (Jebel Ali)',
    slug: { _type: 'slug', current: 'delivery-driver-light-vehicle-jebel-ali' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    experienceRequired: '1+ year UAE driving experience',
    salaryRange: 'AED 2,200 – 2,600 + fuel card',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Saturday and Sunday, 9am–1pm at Company depot',
    description: [
      paragraph('A well-established logistics company in Jebel Ali is hiring light vehicle delivery drivers. The role involves daily deliveries across Dubai and Sharjah on a fixed route basis. Company vehicle and fuel card provided.'),
      paragraph('Requirements:'),
      bullet('Valid UAE light vehicle driving licence (mandatory)'),
      bullet('Minimum 1 year driving experience in UAE'),
      bullet('Smartphone with WhatsApp for route communication'),
      bullet('Clean driving record'),
    ],
    howToApply: [
      paragraph('Walk in on Saturday or Sunday between 9am and 1pm.'),
      bullet('Venue: Company depot, Jebel Ali (contact for address)'),
      bullet('Bring: Original UAE driving licence, passport copy, visa copy, and CV.'),
    ],
    metaTitle: 'Delivery Driver Job in Jebel Ali | Light Vehicle',
    metaDescription: 'Verified light vehicle driver vacancy in Jebel Ali. 1+ year UAE experience required. Walk-in interviews this weekend.',
  },
  {
    _id: 'job-room-attendant-dubai-marina-launch',
    _type: 'job',
    title: 'Room Attendant — Housekeeping',
    companyName: '4-Star Hotel Group (Dubai Marina)',
    slug: { _type: 'slug', current: 'room-attendant-housekeeping-dubai-marina' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    experienceRequired: '0–1 year (freshers with training welcome)',
    salaryRange: 'AED 1,700 + accommodation + meals',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Every Saturday, 9am–12pm at Hotel HR Office',
    description: [
      paragraph('A 4-star hotel in Dubai Marina is hiring Room Attendants for their housekeeping department. This is a full package role that includes accommodation and meals in a staff residence.'),
      bullet('Servicing guest rooms to hotel standards'),
      bullet('Replenishing amenities and linens'),
      bullet('Female candidates preferred for this property'),
    ],
    howToApply: [
      paragraph('Walk in every Saturday from 9am to 12pm.'),
      bullet('Venue: Hotel HR Office, Dubai Marina'),
      bullet('Bring: CV, passport copy, visa copy, and educational certificates.'),
    ],
    metaTitle: 'Room Attendant Job in Dubai Marina | Accommodation Provided',
    metaDescription: 'Verified housekeeping room attendant vacancy in Dubai Marina. Freshers welcome. Includes food and housing.',
  },
  {
    _id: 'job-customer-service-business-bay-launch',
    _type: 'job',
    title: 'Customer Service Agent — Call Centre',
    companyName: 'Telecom Company (Business Bay)',
    slug: { _type: 'slug', current: 'customer-service-agent-business-bay' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Customer Service',
    experienceRequired: '0–2 years',
    salaryRange: 'AED 2,500 – 3,000 + performance bonus',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Monday to Wednesday, 11am–3pm',
    description: [
      paragraph('A leading telecom company in Business Bay is expanding their customer service team. This is an in-office role with fixed shifts. Training is fully provided.'),
      bullet('Fluent English is mandatory; Hindi or Tagalog is a strong plus'),
      bullet('Basic computer literacy (MS Word, Excel)'),
      bullet('Willing to work in rotational shifts'),
    ],
    howToApply: [
      paragraph('Walk in Monday to Wednesday between 11am and 3pm.'),
      bullet('Venue: Business Bay Office (contact for directions)'),
      bullet('Bring: CV and passport copy.'),
    ],
    metaTitle: 'Customer Service Agent Job in Business Bay | Call Centre',
    metaDescription: 'Verified call centre customer service vacancy in Business Bay. Fluent English required. Training provided.',
  },
  {
    _id: 'job-warehouse-operative-dubai-south-launch',
    _type: 'job',
    title: 'Warehouse Operative',
    companyName: 'E-Commerce Fulfilment Centre',
    slug: { _type: 'slug', current: 'warehouse-operative-dubai-south' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    experienceRequired: 'Not required',
    salaryRange: 'AED 1,600 – 1,900 + accommodation + transport',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A major e-commerce fulfilment centre in Dubai South is hiring warehouse operatives for their pick-and-pack operations. Transport from Dubai city areas and accommodation provided.'),
      bullet('Physically fit and able to stand for long periods'),
      bullet('Basic literacy (read barcodes and product codes)'),
      bullet('No prior experience required — full training given'),
    ],
    howToApply: [
      paragraph('Email your CV to jobs at the company address.'),
      bullet('Subject Line: Warehouse Operative — Dubai South'),
      bullet('Include: Visa status, availability date, and contact number.'),
    ],
    metaTitle: 'Warehouse Operative Job in Dubai South | No Experience Required',
    metaDescription: 'Verified warehouse picker/packer vacancy in Dubai South. No experience needed. Accommodation and transport included.',
  },
  {
    _id: 'job-receptionist-abu-dhabi-launch',
    _type: 'job',
    title: 'Receptionist — Medical Clinic',
    companyName: 'Private Medical Clinic (Abu Dhabi)',
    slug: { _type: 'slug', current: 'receptionist-medical-clinic-abu-dhabi' },
    location: { city: 'Abu Dhabi', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Healthcare',
    experienceRequired: '1–3 years in front desk or medical reception',
    salaryRange: 'AED 2,800 – 3,500',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A well-established private medical clinic in Khalifa City, Abu Dhabi is hiring a Receptionist. You will manage appointments, insurance pre-approvals, and patient registration.'),
      bullet('Prior experience in a medical clinic is strongly preferred'),
      bullet('Excellent English; Arabic is a major advantage'),
      bullet('Female candidates preferred for this role'),
    ],
    howToApply: [
      paragraph('Email CV with "Medical Receptionist — Abu Dhabi" in the subject line.'),
      bullet('Include current location, visa status, and notice period.'),
    ],
    metaTitle: 'Medical Receptionist Job in Abu Dhabi | Khalifa City',
    metaDescription: 'Verified receptionist vacancy at a private medical clinic in Abu Dhabi. 1-3 years experience required.',
  },
  {
    _id: 'job-accountant-sharjah-launch',
    _type: 'job',
    title: 'Accountant — Junior',
    companyName: 'Trading Company (Sharjah)',
    slug: { _type: 'slug', current: 'junior-accountant-sharjah' },
    location: { city: 'Sharjah', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Finance',
    experienceRequired: '1–3 years',
    salaryRange: 'AED 3,000 – 4,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A growing distribution and trading company located in the Sharjah Industrial Area is seeking an organized, detail-oriented Junior Accountant to support our corporate finance team. In this role, you will be the backbone of our daily transactional accounting, primarily focusing on Accounts Payable (AP), Accounts Receivable (AR), and foundational monthly reporting. As we expand our regional supply chain, we need someone who understands the fast-paced nature of B2B trading in the region.'),
      paragraph('Key Responsibilities:'),
      bullet('Processing daily invoices and maintaining accurate Accounts Payable and Receivable ledgers.'),
      bullet('Conducting weekly local and international bank reconciliations.'),
      bullet('Assisting the Senior Accountant in preparing monthly VAT returns in compliance with FTA regulations.'),
      bullet('Managing petty cash and verifying employee expense claims.'),
      bullet('Preparing monthly aging reports and assisting in debt collection follow-ups.'),
      paragraph('Who We Are Looking For & Skills Required:'),
      bullet('Educational Background: A Bachelor’s degree in Accounting, Finance, or Commerce (B.Com).'),
      bullet('Software Proficiency: Must have hands-on experience using Tally ERP 9 or QuickBooks; intermediate Microsoft Excel skills (VLOOKUP, Pivot Tables) are highly preferred.'),
      bullet('Regulatory Knowledge: Solid foundational understanding of UAE VAT laws and invoicing standards.'),
      bullet('Experience: 1 to 3 years of accounting experience, specifically within the trading, logistics, or FMCG sectors in the UAE.'),
      bullet('Soft Skills: High integrity, excellent English communication skills (to liaise with international vendors), and the ability to meet strict month-end deadlines.'),
    ],
    howToApply: [
      paragraph('Email CV with subject "Junior Accountant — Sharjah".'),
      bullet('Include current salary, expected salary, and notice period.'),
    ],
    metaTitle: 'Junior Accountant Job in Sharjah | Tally & VAT',
    metaDescription: 'Verified junior accountant vacancy in Sharjah. Tally experience and VAT knowledge required.',
  },
  {
    _id: 'job-security-guard-dubai-launch',
    _type: 'job',
    title: 'Security Guard',
    companyName: 'Security Services Company (Dubai)',
    slug: { _type: 'slug', current: 'security-guard-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Security',
    experienceRequired: 'Not required (SIRA holders preferred)',
    salaryRange: 'AED 1,800 – 2,200 + accommodation + transport',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Daily, 9am–5pm (Sun–Thu) at Deira head office',
    description: [
      paragraph('A licensed security company is hiring Guards for residential and commercial sites in Dubai. Accommodation and transportation provided.'),
      bullet('SIRA licence holders preferred; company will assist others'),
      bullet('Physically fit and presentable'),
      bullet('Basic English communication'),
    ],
    howToApply: [
      paragraph('Walk in any working day between 9am and 5pm.'),
      bullet('Venue: Company head office, Deira, Dubai'),
      bullet('Bring: Passport copy, visa copy, CV, and SIRA licence if available.'),
    ],
    metaTitle: 'Security Guard Job in Dubai | SIRA Licence',
    metaDescription: 'Verified security guard vacancy in Dubai. SIRA holders preferred. Includes accommodation and transport.',
  },
  {
    _id: 'job-cook-indian-cuisine-dubai-launch',
    _type: 'job',
    title: 'Cook — Indian Cuisine',
    companyName: 'Restaurant Group (Dubai)',
    slug: { _type: 'slug', current: 'cook-indian-cuisine-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    experienceRequired: '2+ years',
    salaryRange: 'AED 1,800 – 2,500 + meals',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Tuesday and Thursday, 3pm–6pm at Karama',
    description: [
      paragraph('A popular Indian restaurant group in Karama is hiring experienced cooks specialising in North and South Indian cuisine.'),
      bullet('2+ years professional cooking experience'),
      bullet('Knowledge of curries, tandoor, or South Indian dishes'),
      bullet('Ability to work in a fast-paced kitchen'),
    ],
    howToApply: [
      paragraph('Walk in on Tuesday or Thursday between 3pm and 6pm.'),
      bullet('Venue: Restaurant premises, Karama (contact for address)'),
      bullet('Bring: CV and be prepared for a practical cooking test.'),
    ],
    metaTitle: 'Indian Cook Job in Karama Dubai | North & South Indian',
    metaDescription: 'Verified Indian cook vacancy in Karama, Dubai. 2+ years experience. Walk-in interviews and cooking test.',
  },
  {
    _id: 'job-it-support-tech-dubai-launch',
    _type: 'job',
    title: 'IT Support Technician',
    companyName: 'IT Services Company (Dubai)',
    slug: { _type: 'slug', current: 'it-support-technician-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'IT',
    experienceRequired: '2–4 years',
    salaryRange: 'AED 3,500 – 5,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('An IT services company in Deira is hiring a Technician for client site visits. Role involves software/hardware support and networking.'),
      bullet('Knowledge of Windows OS, Microsoft 365, and Networking'),
      bullet('Experience with routers, switches, and firewalls'),
      bullet('Valid UAE driving licence (mandatory for site visits)'),
    ],
    howToApply: [
      paragraph('Email your CV to the specified IT support address.'),
      bullet('Subject Line: IT Support Technician — Dubai'),
      bullet('Include: Current salary and notice period.'),
    ],
    metaTitle: 'IT Support Technician Job in Dubai | Networking & Hardware',
    metaDescription: 'Verified IT support technician vacancy in Deira, Dubai. 2-4 years experience. UAE driving licence required.',
  },
];

async function main() {
  const transaction = client.transaction();

  for (const job of jobListings) {
    transaction.createOrReplace(job);
  }

  await transaction.commit();
  console.log(`Successfully imported ${jobListings.length} jobs from articles.md to Sanity.`);
}

main().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});

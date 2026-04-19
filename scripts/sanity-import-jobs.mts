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
      paragraph('A premium international retail brand is looking for enthusiastic and customer-focused Sales Associates to join our growing team at the iconic Dubai Mall. This is a highly interactive, full-time role involving fixed shifts. If you have a passion for luxury goods or high-street fashion, this is an excellent foot in the door. No prior UAE experience is required — if you have proven retail sales or customer service experience from your home country, our immersive 2-week training program will set you up for success.'),
      paragraph('Key Responsibilities:'),
      bullet('Warmly greeting customers and providing a personalized shopping experience.'),
      bullet('Assisting with product selection, upselling, and cross-selling premium items.'),
      bullet('Maintaining impeccable store visual merchandising and display standards.'),
      bullet('Processing POS transactions efficiently and handling daily cash and card reconciliations.'),
      bullet('Managing inventory counts and keeping the stockroom highly organized.'),
      paragraph('Ideal Candidate Profile:'),
      bullet('Experience: Excellent track record in retail, hospitality, or direct customer service.'),
      bullet('Skills: Strong interpersonal and communication skills; fluent English is mandatory.'),
      bullet('Attitude: High energy, approachable, and able to remain calm during peak mall hours (weekends/holidays).'),
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
      paragraph('A well-established third-party logistics (3PL) company based in Jebel Ali Free Zone (JAFZA) is aggressively expanding its fleet and requires experienced Light Vehicle Delivery Drivers. In this role, you will be the face of our company, responsible for the safe and timely delivery of sensitive parcels across Dubai and Sharjah on fixed, optimized routes. The company provides a fully maintained delivery van, fuel card, and a mobile device with data allocation.'),
      paragraph('Core Responsibilities:'),
      bullet('Safely operating a company-provided light commercial vehicle under UAE traffic laws.'),
      bullet('Sorting, loading, and unloading daily delivery consignments accurately at the depot.'),
      bullet('Navigating assigned routes efficiently using GPS mapping software to meet delivery time windows.'),
      bullet('Collecting cash-on-delivery (COD) payments and accurately reporting them back to the hub.'),
      bullet('Conducting daily pre-trip vehicle inspections and reporting any maintenance issues.'),
      paragraph('Requirements:'),
      bullet('Licence: Must possess a valid, clean UAE light vehicle driving licence.'),
      bullet('Experience: Minimum 1 year of active driving experience within the UAE (familiarity with Dubai/Sharjah roads is essential).'),
      bullet('Tech Skills: Must be comfortable using smartphones, Google Maps, and WhatsApp for dispatcher communication.'),
      bullet('Language: Basic English or Arabic is required to communicate with customers.'),
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
      paragraph('A prestigious 4-star boutique hotel located in the heart of Dubai Marina is actively recruiting dedicated Room Attendants to join their Housekeeping department. We pride ourselves on offering a luxurious, spotless environment for our international guests. This position offers an excellent full-package benefit structure, including high-quality shared staff accommodation, duty meals, transportation, and a clear path for promotion within the hotel group.'),
      paragraph('Daily Duties & Responsibilities:'),
      bullet('Systematically cleaning and servicing guest rooms, suites, and sometimes public areas to strict luxury hotel standards.'),
      bullet('Changing bed linens, making beds, and ensuring bathroom amenities are fully restocked.'),
      bullet('Handling guest requests promptly and courteously (e.g., extra towels, ironing boards).'),
      bullet('Reporting any room maintenance issues or missing items to the Housekeeping Supervisor immediately.'),
      bullet('Ensuring all cleaning equipment and storage carts are kept organized and secure.'),
      paragraph('Who We Are Looking For:'),
      bullet('Experience: 0–1 year of experience. Freshers with a great attitude are welcome, as comprehensive on-the-job training is provided.'),
      bullet('Physical Stamina: Ability to stand, bend, and work actively for long shifts.'),
      bullet('Details: Extremely detail-oriented with a strong sense of hygiene and presentation.'),
      bullet('Note: Female candidates are highly preferred for this specific property layout.'),
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
      paragraph('A leading multinational telecommunications provider located in Business Bay seeks energetic and resilient Customer Service Agents to join their rapidly expanding Call Centre team. As the first point of contact for our subscriber base, you will resolve technical queries, process plan upgrades, and handle billing inquiries. This is a fast-paced, in-office role that requires working in rotational shifts. You will receive 3 weeks of fully paid product training before going live.'),
      paragraph('Your Responsibilities:'),
      bullet('Managing high volumes of inbound calls and emails from customers with professionalism and empathy.'),
      bullet('Troubleshooting basic telecom issues (network drops, SIM activation, billing disputes).'),
      bullet('Identifying opportunities to upsell new mobile/broadband packages and value-added services.'),
      bullet('Accurately logging all customer interactions and details in the CRM system (Salesforce).'),
      bullet('Meeting or exceeding monthly KPI targets for call resolution time and customer satisfaction scores.'),
      paragraph('Requirements & Qualifications:'),
      bullet('Language Skills: Exceptional, accent-neutral English fluency is strictly mandatory. Fluency in Hindi, Tagalog, or Arabic is considered a massive advantage.'),
      bullet('Experience: 0–2 years in a customer-facing or BPO/Call Centre environment.'),
      bullet('Tech Proficiency: Fast typing speed and basic computer literacy (MS Office, web navigation).'),
      bullet('Flexibility: Must be willing to work rotational shifts, including some nights and weekends.'),
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
      paragraph('A major international e-commerce and retail fulfilment centre located in Dubai South (near Al Maktoum Airport) is hiring energetic Warehouse Operatives for their massive pick-and-pack operations. This is the perfect entry-level role for individuals looking to gain experience in modern, automated logistics. The company provides a robust support package, including company-sponsored visa, daily transport from major Dubai residential hubs, and staff accommodation.'),
      paragraph('Your Role on the Floor:'),
      bullet('Using handheld RF scanners to accurately pick daily customer orders from storage bins.'),
      bullet('Packing and labeling boxes securely for final-mile courier dispatch.'),
      bullet('Assisting in the unloading of incoming shipment containers and palletizing goods.'),
      bullet('Performing periodic stock cycle counts to ensure inventory accuracy.'),
      bullet('Maintaining a clean, safe, and hazard-free workspace according to company health & safety guidelines.'),
      paragraph('Candidate Requirements:'),
      bullet('Experience: No prior warehouse experience is needed — we provide full site-specific induction and safety training.'),
      bullet('Physical Fitness: Must be physically fit, capable of lifting up to 15kg, and able to stand/walk for the duration of a standard shift.'),
      bullet('Basic Literacy: Must be able to read alphanumeric product codes, barcodes, and basic English shipping labels.'),
      bullet('Team Player: Reliability, punctuality, and a strong work ethic are non-negotiable.'),
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
      paragraph('A highly reputable, government-licensed security services firm is undergoing a massive recruitment drive for qualified Security Guards. We have open deployments across premium residential communities, corporate towers, and retail complexes across Dubai. We pride ourselves on providing our personnel with excellent living standards, offering clean staff accommodation, free daily transportation, uniform issuance, and comprehensive medical insurance.'),
      paragraph('Core Responsibilities:'),
      bullet('Patrolling assigned premises (on foot or via buggy) to establish a visible security presence and deter illegal activities.'),
      bullet('Monitoring complex CCTV systems and building access control panels from the central control room.'),
      bullet('Controlling the access of visitors, contractors, and delivery personnel into private residential or corporate buildings.'),
      bullet('Responding rapidly to emergency alarms, medical incidents, or fire safety alerts.'),
      bullet('Writing detailed end-of-shift incident reports and maintaining the daily physical logbook.'),
      paragraph('Requirements:'),
      bullet('Licensing: Candidates holding a valid SIRA (Security Industry Regulatory Agency) licence/certificate will be given immediate priority. The company will assist exceptional unlicensed candidates with obtaining their certification.'),
      bullet('Physical Condition: Must be physically fit, highly alert, and presentable.'),
      bullet('Communication: Basic to intermediate English speaking and writing skills are required for incident reporting.'),
      bullet('Background: A clean police clearance certificate from your home country or the UAE is mandatory.'),
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
      paragraph('A wildly popular, high-footfall Indian restaurant group based in the bustling district of Karama, Dubai, is looking to hire passionate and experienced Cooks. With multiple branches opening this year, we need culinary professionals who specialize in authentic North Indian and South Indian cuisines. Our kitchen runs on speed, consistency, and rich traditional flavors, making this a fantastic opportunity for chefs looking to build a stable career in Dubai’s vibrant food scene.'),
      paragraph('Kitchen Responsibilities:'),
      bullet('Preparing and cooking a diverse menu of traditional curries, biryanis, and tandoor items to exact recipe standards.'),
      bullet('Assisting the Head Chef with daily ingredient prep, marination, and portion control to minimize wastage.'),
      bullet('Managing the hot line efficiently during peak dining hours (lunch and dinner rushes).'),
      bullet('Ensuring strict compliance with Dubai Municipality food safety and hygiene (HACCP) regulations.'),
      bullet('Maintaining the cleanliness and organization of personal cooking stations and shared walk-in freezers.'),
      paragraph('Candidate Profile:'),
      bullet('Experience: A minimum of 2+ years of professional cooking experience in a busy restaurant, hotel, or catering kitchen.'),
      bullet('Specialization: Strong, demonstrable knowledge of North Indian (Punjabi/Mughlai) or South Indian dishes.'),
      bullet('Pace: Ability to remain calm, focused, and fast under the intense pressure of a commercial kitchen.'),
      bullet('Testing: Shortlisted candidates must be prepared to participate in a 30-minute practical cooking test during the interview phase.'),
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
      paragraph('A dynamic and fast-growing Managed IT Services Provider (MSP) based in Deira is looking for a versatile IT Support Technician. This role operates at the frontline of our business, offering vital technical support to our diverse portfolio of SME corporate clients across Dubai. This is a highly mobile role split between our helpdesk and on-site client visits, requiring an individual who loves solving hardware puzzles and possesses excellent client-facing soft skills.'),
      paragraph('Technical Duties & Responsibilities:'),
      bullet('Providing Level 1 & Level 2 technical support for hardware, software, and localized network issues.'),
      bullet('Installing, configuring, and troubleshooting Windows/Mac operating systems, and Microsoft 365 environments.'),
      bullet('Setting up and maintaining office peripherals, including IP phones, networked printers, and biometric scanners.'),
      bullet('Performing basic network troubleshooting involving routers, switches, WiFi access points, and hardware firewalls.'),
      bullet('Driving to client offices across Dubai to resolve critical physical infrastructure issues that cannot be handled remotely.'),
      paragraph('What We Require:'),
      bullet('Experience: 2 to 4 years of hands-on IT support experience, preferably within an MSP or corporate helpdesk environment.'),
      bullet('Certifications: CompTIA A+, Network+, or basic CCNA certifications are highly desirable.'),
      bullet('Licensing: A valid UAE driving licence is strictly mandatory, as daily client site visits are required.'),
      bullet('Soft Skills: Patient, articulate, and capable of explaining complex technical problems to non-technical staff.'),
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

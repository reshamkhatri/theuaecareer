import { createClient } from '@sanity/client';

// Schema types
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
  return `kmj${Date.now()}-${keyCounter}`;
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
    _id: 'job-admin-assistant-dubai',
    _type: 'job',
    title: 'Administrative Assistant',
    companyName: 'Multinational Consulting Firm',
    slug: { _type: 'slug', current: 'administrative-assistant-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Admin / Secretarial',
    experienceRequired: '2–4 years',
    salaryRange: 'AED 4,000 – 6,500',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A prestigious multinational consulting firm located in DIFC (Dubai International Financial Centre) is seeking a highly organized and proactive Administrative Assistant. In this role, you will be the backbone of our daily office operations, providing essential support to senior executives and ensuring the office runs smoothly and efficiently.'),
      paragraph('Key Responsibilities:'),
      bullet('Managing complex calendars and scheduling meetings, conferences, and teleconferences across multiple time zones.'),
      bullet('Coordinating comprehensive domestic and international travel arrangements, including visas and accommodation.'),
      bullet('Drafting, formatting, and proofreading high-level corporate documents, presentations, and correspondence.'),
      bullet('Screening incoming calls, emails, and physical mail, directing them to the appropriate departments.'),
      bullet('Maintaining an organized electronic and physical filing system for highly confidential corporate files.'),
      paragraph('Ideal Candidate Profile:'),
      bullet('Experience: 2 to 4 years of proven administrative or executive support experience in a corporate environment.'),
      bullet('Skills: Mastery of Microsoft Office 365 (Word, Excel, PowerPoint, Outlook) is essential. Typing speed of 50+ WPM.'),
      bullet('Communication: Flawless written and spoken English. Professional telephone etiquette.'),
      bullet('Attitude: High level of discretion, strong problem-solving abilities, and the capacity to work efficiently under pressure.'),
    ],
    howToApply: [
      paragraph('Email your updated CV and a brief cover letter directly to our recruitment team.'),
      bullet('Subject Line: DIFC Admin Assistant Application'),
      bullet('Important: Include your current visa status and notice period.'),
    ],
    metaTitle: 'Administrative Assistant Job in Dubai | DIFC | AED 6,500',
    metaDescription: 'Verified Administrative Assistant vacancy in DIFC, Dubai. High-end consulting firm looking for experienced administrative professionals. Apply now.',
  },
  {
    _id: 'job-hr-coordinator-sharjah',
    _type: 'job',
    title: 'HR Coordinator',
    companyName: 'Regional Logistics Hub',
    slug: { _type: 'slug', current: 'hr-coordinator-sharjah' },
    location: { city: 'Sharjah', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Human Resources',
    experienceRequired: '1–3 years',
    salaryRange: 'AED 3,500 – 5,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A fast-growing logisitics and supply chain company based in the Sharjah Airport International Free Zone (SAIF Zone) is actively seeking a diligent HR Coordinator. You will work closely with the HR Manager to oversee a variety of HR functions for a diverse workforce of over 200 blue- collar and white-collar employees.'),
      paragraph('Key Responsibilities:'),
      bullet('Assisting with the end-to-end recruitment process, from posting job ads and screening CVs to scheduling interviews.'),
      bullet('Managing the onboarding process for new hires, including orientation sessions and initial documentation.'),
      bullet('Maintaining accurate and up-to-date employee records, leave tracking, and attendance logs securely.'),
      bullet('Coordinating with the company PRO to track employee visa statuses, labour contracts, and Emirates ID renewals.'),
      bullet('Addressing basic employee grievances and queries related to payroll, company policies, and workplace issues.'),
      paragraph('What We Require:'),
      bullet('Education: Bachelor’s degree in Business Administration, Human Resources, or a related field.'),
      bullet('Knowledge: Fundamental understanding of the UAE Labour Law and MOHRE guidelines is required.'),
      bullet('Technical Skills: Proficiency in MS Excel and experience with an HRIS (Human Resources Information System) or ERP software.'),
      bullet('Language Skills: Strong English communication skills. Hindi or Urdu fluency is highly preferred given our workforce demographic.'),
    ],
    howToApply: [
      paragraph('Please send your resume to our official recruitment email address.'),
      bullet('Subject Line: HR Coordinator - SAIF Zone'),
      bullet('Include your expected salary and earliest joining date.'),
    ],
    metaTitle: 'HR Coordinator Job in Sharjah | SAIF Zone | Logistics',
    metaDescription: 'Verified HR Coordinator job opening in Sharjah SAIF Zone for a logistics company. UAE Labour Law knowledge required.',
  },
  {
    _id: 'job-graphic-designer-abu-dhabi',
    _type: 'job',
    title: 'Graphic Designer',
    companyName: 'Boutique Marketing Agency',
    slug: { _type: 'slug', current: 'graphic-designer-abu-dhabi' },
    location: { city: 'Abu Dhabi', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Design & Creative',
    experienceRequired: '3+ years',
    salaryRange: 'AED 6,000 – 9,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A cutting-edge, award-winning boutique marketing agency based in Al Reem Island, Abu Dhabi, is on the hunt for a highly creative and versatile Graphic Designer. You will be responsible for bringing our clients’ brands to life across a multitude of platforms. We work with high-profile clients in the retail, hospitality, and real estate sectors.'),
      paragraph('Core Responsibilities:'),
      bullet('Designing compelling visual content for digital marketing campaigns, including social media posts, web banners, and email newsletters.'),
      bullet('Creating high-quality print materials such as brochures, flyers, event backdrops, and corporate branding identity kits (logos, business cards).'),
      bullet('Collaborating directly with copywriters and marketing strategists to ensure visuals align flawlessly with campaign objectives.'),
      bullet('Retouching and manipulating high-resolution photography for advertising use.'),
      bullet('Presenting design concepts to internal teams and integrating feedback quickly and effectively.'),
      paragraph('Ideal Candidate Attributes:'),
      bullet('Portfolio: A stunning portfolio demonstrating a strong grasp of typography, layout, color theory, and branding aesthetics.'),
      bullet('Software: Advanced proficiency in the Adobe Creative Suite (Photoshop, Illustrator, InDesign). Basic video editing (Premiere Pro, After Effects) is a massive plus.'),
      bullet('Experience: Minimum 3 years of agency experience in the UAE or GCC region.'),
      bullet('Work Style: Ability to juggle multiple fast-paced projects and deliver high-quality work against tight deadlines.'),
    ],
    howToApply: [
      paragraph('Submit your CV along with a link to your online design portfolio (Behance, Dribbble, or personal website).'),
      bullet('Applications without a portfolio link will not be considered.'),
      bullet('Subject: Graphic Designer Application - Abu Dhabi'),
    ],
    metaTitle: 'Graphic Designer Job in Abu Dhabi | Al Reem Island Agency',
    metaDescription: 'Verified Graphic Designer position in Abu Dhabi for a boutique marketing agency. Adobe Creative Suite proficiency required. Submit portfolio.',
  },
  {
    _id: 'job-data-entry-clerk-dubai',
    _type: 'job',
    title: 'Data Entry Clerk',
    companyName: 'Healthcare Administration Network',
    slug: { _type: 'slug', current: 'data-entry-clerk-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Admin / Secretarial',
    experienceRequired: '0–2 years (Freshers Welcome)',
    salaryRange: 'AED 2,500 – 3,500',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Thursday and Friday, 9am–1pm',
    description: [
      paragraph('A major healthcare administration support office located in Dubai Healthcare City (DHCC) is seeking precise and focused Data Entry Clerks to digitize thousands of patient records and insurance claims. This is a quiet, intensive, desk-bound role focusing entirely on speed and absolute accuracy. Full training on our proprietary healthcare database will be provided.'),
      paragraph('Primary Tasks:'),
      bullet('Accurately inputting large volumes of alphanumeric data from physical patient intake forms into our secure digital healthcare system.'),
      bullet('Verifying the accuracy and completeness of insurance claims before final submission.'),
      bullet('Identifying and correcting data entry errors or reporting critical discrepancies to supervisors.'),
      bullet('Maintaining strict patient confidentiality and adhering fully to healthcare data privacy regulations.'),
      bullet('Scanning and organizing physical documents into structured digital archives.'),
      paragraph('Requirements for the Role:'),
      bullet('Speed & Accuracy: Must have a proven typing speed of at least 45 WPM with a 98%+ accuracy rate.'),
      bullet('Attention to Detail: Exceptional eye for detail; capable of spotting minor errors in long alphanumeric strings.'),
      bullet('Tech Skills: Familiarity with Microsoft Excel and general database navigation.'),
      bullet('Education: High School Diploma or equivalent. Fresh graduates with excellent tying skills are highly encouraged to apply.'),
    ],
    howToApply: [
      paragraph('We are conducting walk-in interviews and typing tests this week.'),
      bullet('When: Thursday and Friday, between 9:00 AM and 1:00 PM.'),
      bullet('Bring: Updated CV and original Emirates ID or Passport.'),
      bullet('Note: Be prepared to complete a 10-minute supervised typing accuracy test.'),
    ],
    metaTitle: 'Data Entry Clerk Job in Dubai | DHCC | Walk-in Interviews',
    metaDescription: 'Verified Data Entry Clerk vacancy in Dubai Healthcare City. Freshers welcome. Walk-in interviews and typing test required.',
  },
  {
    _id: 'job-accounts-assistant-sharjah',
    _type: 'job',
    title: 'Accounts Assistant',
    companyName: 'FMCG Wholesale Distributor',
    slug: { _type: 'slug', current: 'accounts-assistant-sharjah' },
    location: { city: 'Sharjah', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Finance / Accounting',
    experienceRequired: '1–2 years',
    salaryRange: 'AED 2,500 – 3,500',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A prominent Fast-Moving Consumer Goods (FMCG) wholesale distributor located in the Sharjah Industrial Area requires a diligent and meticulous Accounts Assistant to support their busy finance department. This is a tremendous opportunity for early-career accounting professionals to gain immense exposure to high-volume transaction processing and inventory accounting.'),
      paragraph('Roles and Responsibilities:'),
      bullet('Assisting with the daily processing of hundreds of supplier invoices and matching them with delivery notes/LPOs.'),
      bullet('Recording daily cash and cheque receipts from outdoor sales representatives accurately.'),
      bullet('Reconciling supplier statements and highlighting any missing invoices or outstanding debits.'),
      bullet('Assisting the Chief Accountant with minor inventory audits and stock reconciliations.'),
      bullet('Providing general clerical support to the finance team, including filing, scanning, and data retrieval.'),
      paragraph('Candidate Requirements:'),
      bullet('Education: Diploma or basic degree in Accounting, Commerce, or Finance.'),
      bullet('Experience: 1 to 2 years of bookkeeping or junior accounting experience is required.'),
      bullet('Skills: Basic, hands-on knowledge of Tally ERP and Microsoft Excel.'),
      bullet('Traits: Highly trustworthy, excellent numerical skills, and capable of working in a somewhat noisy, fast-paced wholesale environment.'),
    ],
    howToApply: [
      paragraph('Send your application electronically to our finance recruitment team.'),
      bullet('Subject Line: Accounts Assistant - FMCG Sharjah'),
      bullet('Include your current visa status (Visit Visa/Cancelled Visa preferred for immediate joining).'),
    ],
    metaTitle: 'Accounts Assistant Job in Sharjah | FMCG Wholesale',
    metaDescription: 'Verified Accounts Assistant vacancy in Sharjah Industrial Area. Tally experience required. Ideal for early-career finance professionals.',
  },
  {
    _id: 'job-outdoor-sales-executive-dubai',
    _type: 'job',
    title: 'Outdoor Sales Executive',
    companyName: 'Corporate IT & Telecom Solutions',
    slug: { _type: 'slug', current: 'outdoor-sales-executive-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Sales / Business Development',
    experienceRequired: '2+ years (UAE experience mandatory)',
    salaryRange: 'AED 4,000 – 6,000 + High Commission',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Monday & Tuesday, 10am - 3pm',
    description: [
      paragraph('A leading corporate B2B IT and Telecom solutions provider based in Business Bay is actively recruiting aggressive, results-driven Outdoor Sales Executives. You will be responsible for hunting new businesses, pitching enterprise telecom packages, and closing SME deals across Dubai and Sharjah. We offer an excellent commission structure with uncapped earning potential for top performers.'),
      paragraph('Key Sales Responsibilities:'),
      bullet('Actively prospecting and generating B2B leads through cold calling, networking, and door-to-door visits in business districts.'),
      bullet('Arranging and conducting professional sales meetings with SME business owners and IT Managers.'),
      bullet('Pitching customized telecom plans, internet leased lines, and PABX systems tailored to client needs.'),
      bullet('Negotiating contract terms, closing sales, and ensuring seamless handover to the deployment team.'),
      bullet('Providing excellent after-sales support to secure long-term contract renewals and referrals.'),
      paragraph('Strict Requirements:'),
      bullet('Experience: Minimum 2 years of proven outdoor/field B2B sales experience specifically within the UAE (Telecom or IT sales is a massive advantage).'),
      bullet('Crucial Requirement: Must possess a valid UAE light vehicle driving licence. (Company provides a fuel/transport allowance).'),
      bullet('Skills: Exceptional negotiation, presentation, and objection-handling skills.'),
      bullet('Drive: A highly resilient, "hunter" mentality capable of handling high rejection rates and meeting aggressive monthly quotas.'),
    ],
    howToApply: [
      paragraph('We host open sales recruitment days every week.'),
      bullet('When: Monday and Tuesday, between 10:00 AM and 3:00 PM.'),
      bullet('Where: Business Bay head office (Contact via site form for exact tower details).'),
      bullet('Bring: Updated CV, Driving Licence copy, and past sales performance proof (if available).'),
    ],
    metaTitle: 'Outdoor Sales Executive Job in Dubai | B2B Telecom',
    metaDescription: 'Verified Outdoor Sales Executive vacancy in Dubai for B2B Telecom. UAE driving licence mandatory. High commission structure. Walk-in interviews.',
  },
  {
    _id: 'job-auto-mechanic-sharjah',
    _type: 'job',
    title: 'Auto Mechanic (Light Vehicles)',
    companyName: 'Premium Auto Service Center',
    slug: { _type: 'slug', current: 'auto-mechanic-sharjah' },
    location: { city: 'Sharjah', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Automotive / Technical',
    experienceRequired: '3+ years',
    salaryRange: 'AED 2,500 – 4,000 + Shared Accommodation',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Every Wednesday, 2pm - 6pm',
    description: [
      paragraph('A highly rated, premium European and Asian car service center located in the Sharjah Auto Market area is hiring experienced Auto Mechanics. We are looking for hands-on, highly skilled technicians who can accurately diagnose and repair modern light vehicles. Our garage handles everything from routine service to complex engine overhauls.'),
      paragraph('Workshop Duties:'),
      bullet('Performing accurate computer-aided diagnostics to identify engine, transmission, and electrical faults.'),
      bullet('Executing routine vehicle maintenance, including oil changes, brake pad replacements, and fluid top-ups.'),
      bullet('Conducting major repairs such as timing chain replacements, suspension overhauls, and engine rebuilds.'),
      bullet('Testing vehicles comprehensively post-repair to guarantee safety and performance standards.'),
      bullet('Maintaining a clean, safe, and highly organized workshop bay.'),
      paragraph('What We Require:'),
      bullet('Experience: Minimum 3 years of hands-on garage experience. Experience with German brands (Mercedes, BMW, Audi) or Japanese brands (Toyota, Nissan) is highly valued.'),
      bullet('Technical Skills: Strong understanding of modern automotive electronics and diagnostic scanners.'),
      bullet('Physicality: Capable of performing heavy lifting and working in a non-AC workshop environment.'),
      bullet('Language: Basic English or Arabic is required to communicate with the Service Advisors.'),
    ],
    howToApply: [
      paragraph('We prefer to meet our mechanics in person for a technical assessment.'),
      bullet('Take a walk-in interview on any Wednesday between 2:00 PM and 6:00 PM.'),
      bullet('Bring: Your CV, passport copy, and wear casual/work clothes as you may be asked to demonstrate diagnostic skills on a test vehicle.'),
    ],
    metaTitle: 'Auto Mechanic Job in Sharjah | Light Vehicles',
    metaDescription: 'Verified Auto Mechanic vacancy in Sharjah. Experience with European or Japanese cars required. Accommodation provided. Walk-in interviews.',
  },
  {
    _id: 'job-waitress-server-dubai-marina',
    _type: 'job',
    title: 'Waitress / Server',
    companyName: 'Luxury Dining Restaurant',
    slug: { _type: 'slug', current: 'waitress-server-dubai-marina' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality / F&B',
    experienceRequired: '1+ year',
    salaryRange: 'AED 3,000 – 4,500 + Service Charge & Tips',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: true,
    walkInDetails: 'Sunday & Monday, 11am - 2pm',
    description: [
      paragraph('An upscale, newly opened fine dining restaurant in Dubai Marina is seeking elegant, passionate, and experienced Waitresses and Servers to join our front-of-house team. We cater to high-net-worth individuals and tourists, requiring a flawless standard of service, extensive menu knowledge, and a warm, welcoming personality.'),
      paragraph('Daily Responsibilities:'),
      bullet('Greeting guests gracefully, seating them, and presenting our complex culinary and beverage menus.'),
      bullet('Explaining daily specials, answering intricate questions regarding ingredients, and expertly upselling premium beverages.'),
      bullet('Taking orders accurately and inputting them rapidly into the POS system.'),
      bullet('Serving food and drinks following precise fine-dining protocols and etiquette.'),
      bullet('Anticipating guest needs throughout the meal, processing payments securely, and resetting tables swiftly.'),
      paragraph('Ideal Candidate Requirements:'),
      bullet('Experience: At least 1 year of waiting experience in a premium casual or fine-dining restaurant, ideally within the UAE.'),
      bullet('Presentation: Immaculate personal grooming, high energy, and a genuinely hospitable demeanor.'),
      bullet('Communication: Excellent, fluent English is mandatory; Russian or Arabic language skills are a significant advantage for our demographic.'),
      bullet('Flexibility: Must be comfortable working late night shifts, weekends, and public holidays.'),
    ],
    howToApply: [
      paragraph('We are holding open casting calls for front-of-house staff.'),
      bullet('When: Sunday and Monday, from 11:00 AM to 2:00 PM.'),
      bullet('Where: In-restaurant at Dubai Marina (Request exact location via our contact form).'),
      bullet('Make sure to bring your CV and arrive dressed in smart, business-appropriate attire.'),
    ],
    metaTitle: 'Waitress Job in Dubai Marina | Fine Dining',
    metaDescription: 'Verified Waitress / Server job in an upscale Dubai Marina restaurant. High salary plus tips. Excellent English required. Walk-in interviews.',
  },
  {
    _id: 'job-civil-engineer-abu-dhabi',
    _type: 'job',
    title: 'Civil Engineer (Junior)',
    companyName: 'Mid-Sized General Contracting',
    slug: { _type: 'slug', current: 'junior-civil-engineer-abu-dhabi' },
    location: { city: 'Abu Dhabi', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Engineering / Construction',
    experienceRequired: '1–3 years',
    salaryRange: 'AED 4,000 – 6,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A reputable mid-sized general contracting company based in Abu Dhabi is seeking a Junior Civil Engineer to manage on-site execution for an upcoming residential villa complex project. You will work closely with the Project Manager to ensure structural work is completed safely, on schedule, and strictly according to the approved architectural blueprints.'),
      paragraph('Site Responsibilities:'),
      bullet('Supervising daily on-site construction activities, managing labour teams, sub-contractors, and ensuring smooth workflow.'),
      bullet('Checking technical designs and drawings to ensure that they are followed correctly during implementation.'),
      bullet('Calculating and ordering necessary building materials accurately to minimize material wastage.'),
      bullet('Enforcing strict site safety (HSE) rules and ensuring all workers use proper PPE.'),
      bullet('Drafting daily and weekly progress reports for the Senior Project Manager and the client’s consultant.'),
      paragraph('Qualifications Needed:'),
      bullet('Education: A Bachelor’s Degree in Civil Engineering from a recognized university. (Equivalency certificate will be needed eventually).'),
      bullet('Experience: 1 to 3 years of civil construction experience, preferably in the UAE or GCC on residential or commercial projects.'),
      bullet('Software: Proficient in AutoCAD and Microsoft Office.'),
      bullet('Physical Requirements: Willingness to work long hours outdoors in typical UAE weather conditions.'),
    ],
    howToApply: [
      paragraph('Email your updated CV and degree copy to our engineering director.'),
      bullet('Subject Line: Junior Site Engineer - AUH Project.'),
      bullet('Please mention your Society of Engineers (SOE) registration status if available.'),
    ],
    metaTitle: 'Junior Civil Engineer Job in Abu Dhabi | Construction',
    metaDescription: 'Verified Junior Civil Engineer vacancy in Abu Dhabi for a residential construction project. 1-3 years experience and AutoCAD skills required.',
  },
  {
    _id: 'job-php-laravel-developer-dubai',
    _type: 'job',
    title: 'PHP/Laravel Developer (Junior)',
    companyName: 'Digital Tech Startup',
    slug: { _type: 'slug', current: 'php-laravel-developer-dubai' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Information Technology',
    experienceRequired: '1–3 years',
    salaryRange: 'AED 4,500 – 7,000',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      paragraph('A fast-growing, innovative digital tech startup based in Jumeirah Lakes Towers (JLT), Dubai, is looking for a passionate Junior PHP/Laravel Developer. You will join our agile development team to assist in building, testing, and maintaining scalable web applications and RESTful APIs for our flagship SaaS platform. This is a tremendous learning opportunity for a developer eager to write clean code and grow their career.'),
      paragraph('Technical Responsibilities:'),
      bullet('Writing clean, secure, and well-documented PHP code using the Laravel framework.'),
      bullet('Developing and testing robust backend RESTful APIs to be consumed by our mobile and frontend teams.'),
      bullet('Assisting in database design and optimizing complex MySQL queries for speed and efficiency.'),
      bullet('Troubleshooting, debugging, and resolving reported issues in existing web applications.'),
      bullet('Participating in daily stand-ups and collaborating actively via GitHub and Jira.'),
      paragraph('What We’re Looking For:'),
      bullet('Experience: 1 to 3 years of hands-on commercial experience in PHP development.'),
      bullet('Frameworks: Solid understanding of the Laravel MVC framework. Experience with Vue.js or React on the frontend is a huge bonus.'),
      bullet('Database: Strong knowledge of relational databases, specifically MySQL.'),
      bullet('Development Practices: Familiarity with Git version control, basic Linux command line, and Postman for API testing.'),
      bullet('Mindset: A team player with strong problem-solving skills and a passion for learning modern web technologies.'),
    ],
    howToApply: [
      paragraph('Apply via email with your CV and links to your work.'),
      bullet('Subject Line: Junior Laravel Developer - JLT'),
      bullet('Mandatory: You must include a link to your GitHub profile or links to live projects you have actively contributed to.'),
    ],
    metaTitle: 'Junior PHP/Laravel Developer Job in Dubai | JLT Startup',
    metaDescription: 'Verified Junior PHP / Laravel Web Developer job in JLT, Dubai. Fast-growing startup seeking passionate developers. Apply with GitHub portfolio.',
  }
];

async function main() {
  const transaction = client.transaction();

  for (const job of jobListings) {
    transaction.createOrReplace(job);
  }

  try {
    const res = await transaction.commit();
    console.log(`\nSuccessfully imported ${res.results.length} more jobs to Sanity.`);
  } catch (error) {
    console.error('Migration failed: ', error);
  }
}

main();

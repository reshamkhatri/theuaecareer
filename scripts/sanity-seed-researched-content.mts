import { getCliClient } from 'sanity/cli';

type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: [];
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
  }>;
  listItem?: 'bullet';
  level?: number;
};

type ArticleDocument = {
  _id: string;
  _type: 'article';
  title: string;
  slug: { _type: 'slug'; current: string };
  excerpt: string;
  category: string;
  tags: string[];
  status: 'published';
  publishDate: string;
  lastUpdatedDate: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  content: PortableTextBlock[];
};

type JobDocument = {
  _id: string;
  _type: 'job';
  title: string;
  companyName: string;
  slug: { _type: 'slug'; current: string };
  location: { city: string; country: 'UAE' };
  jobType: 'Full-time';
  category: string;
  categoryLabel?: string;
  experienceRequired: string;
  postedDate: string;
  expiryDate: string;
  status: 'active';
  isWalkIn: false;
  description: PortableTextBlock[];
  howToApply: PortableTextBlock[];
  metaTitle: string;
  metaDescription: string;
};

const verifiedAt = '2026-03-29T09:00:00.000Z';
const expiresAt = '2026-04-12T23:59:59.000Z';
let keyCounter = 0;

const client = getCliClient({
  apiVersion: '2026-03-27',
});

function nextKey() {
  keyCounter += 1;
  return `k${keyCounter}`;
}

function span(text: string) {
  return {
    _type: 'span' as const,
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

function blocksFromSections(sections: Array<{ style?: string; text: string }>): PortableTextBlock[] {
  return sections.map((section) => paragraph(section.text, section.style ?? 'normal'));
}

const jobs: JobDocument[] = [
  {
    _id: 'job-jw-marriott-dubai-hotel-cleanliness-expert-25182266',
    _type: 'job',
    title: 'Hotel Cleanliness Expert',
    companyName: 'JW Marriott Marquis Hotel Dubai',
    slug: { _type: 'slug', current: 'hotel-cleanliness-expert-jw-marriott-marquis-dubai-25182266' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Housekeeping & Laundry',
    experienceRequired: 'Housekeeping experience preferred; hotel service standards matter more than job title alone',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Marriott careers page on March 29, 2026. This full-time housekeeping role is based at JW Marriott Marquis Hotel Dubai.',
        },
        {
          text: 'Marriott describes the position as a guest-facing cleanliness role covering both guest rooms and public areas. The hotel highlights benefits such as accommodation, meals on duty, transportation, training, insurance, and global employee discounts.',
        },
        { style: 'h3', text: 'What the role includes' },
      ]),
      bullet('Cleaning guest rooms and public areas to hotel standards'),
      bullet('Replacing amenities, linens, and supplies while following housekeeping procedures'),
      bullet('Reporting missing items, defects, and maintenance issues to supervisors'),
      bullet('Supporting guests with courteous service and professional communication'),
      ...blocksFromSections([
        { style: 'h3', text: 'Who this role suits' },
        {
          text: 'This opening is a strong fit for candidates with hotel housekeeping, room attendant, laundry, or facility cleaning experience. It can also suit applicants with solid hospitality discipline who want to move into branded hotel operations.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply directly through the official Marriott careers page for Job ID 25182266. Search the exact title "Hotel Cleanliness Expert" on careers.marriott.com if the direct link changes.',
        },
        {
          text: 'Before applying, prepare a clean one-page CV that highlights housekeeping, room servicing, public-area cleaning, hotel SOPs, guest interaction, and shift flexibility.',
        },
      ]),
    ],
    metaTitle: 'Hotel Cleanliness Expert Job in Dubai at JW Marriott Marquis',
    metaDescription:
      'Verified Hotel Cleanliness Expert vacancy at JW Marriott Marquis Hotel Dubai. Full-time housekeeping role found live on the official Marriott careers page.',
  },
  {
    _id: 'job-sofitel-dubai-laundry-supervisor-ref97224z',
    _type: 'job',
    title: 'Laundry Supervisor',
    companyName: 'Sofitel Dubai Jumeirah Beach',
    slug: { _type: 'slug', current: 'laundry-supervisor-sofitel-dubai-jumeirah-beach-ref97224z' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Housekeeping & Laundry',
    experienceRequired: 'Laundry operations background with staff supervision experience preferred',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Accor careers page on March 29, 2026. This permanent full-time role is listed at Sofitel Dubai Jumeirah Beach.',
        },
        {
          text: 'The job focuses on supervising hotel laundry operations, quality control, linen flow, stock monitoring, staff rotation, maintenance coordination, and daily record-keeping.',
        },
        { style: 'h3', text: 'Main responsibilities' },
      ]),
      bullet('Supervise laundry operations and ensure hotel procedures are followed'),
      bullet('Monitor linen quality, uniform condition, and finishing standards'),
      bullet('Coordinate preventive maintenance and report equipment issues'),
      bullet('Prepare rosters, track attendance, and support staff training'),
      bullet('Maintain hygiene, safety, and housekeeping standards across the laundry area'),
      ...blocksFromSections([
        { style: 'h3', text: 'Good fit for candidates with' },
        {
          text: 'This role is best for applicants with hotel laundry, linen room, housekeeping operations, or uniform-room supervision experience who can handle both people management and day-to-day quality control.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply through the official Accor careers page using reference REF97224Z. Search "Laundry Supervisor Sofitel Dubai Jumeirah Beach" on careers.accor.com if the page URL changes.',
        },
        {
          text: 'Tailor your CV around hotel laundry operations, linen handling, team supervision, stock control, machine coordination, and safety compliance.',
        },
      ]),
    ],
    metaTitle: 'Laundry Supervisor Job in Dubai at Sofitel Dubai Jumeirah Beach',
    metaDescription:
      'Verified Laundry Supervisor opening at Sofitel Dubai Jumeirah Beach. Hotel laundry operations role listed on the official Accor careers site.',
  },
  {
    _id: 'job-accor-dubai-demi-chef-arabic-kitchen-ref86030r',
    _type: 'job',
    title: 'Demi Chef (Arabic kitchen)',
    companyName: 'Accor Dubai Hospitality Team',
    slug: { _type: 'slug', current: 'demi-chef-arabic-kitchen-dubai-ref86030r' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Culinary',
    experienceRequired: 'Minimum 2 to 3 years in a professional kitchen with Arabic cuisine focus',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Accor careers page on March 29, 2026. This permanent full-time culinary opening is listed for Dubai under reference REF86030R.',
        },
        {
          text: 'Accor is hiring a Demi Chef focused on Arabic cuisine. The role includes preparing authentic dishes, supporting day-to-day kitchen operations, maintaining hygiene standards, helping with inventory, and mentoring junior team members.',
        },
        { style: 'h3', text: 'Key requirements from the listing' },
      ]),
      bullet('Culinary degree or diploma'),
      bullet('2 to 3 years of kitchen experience with strong Arabic cuisine knowledge'),
      bullet('Confident knife skills and good food safety habits'),
      bullet('Ability to work in a fast-paced kitchen and support menu consistency'),
      bullet('English communication; Arabic is a plus'),
      ...blocksFromSections([
        { style: 'h3', text: 'Who should apply' },
        {
          text: 'This opening makes sense for cooks and demi chefs who already have hands-on Arabic kitchen experience and want to move into a branded hospitality environment in Dubai.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply on the official Accor careers page with reference REF86030R. Search "Demi Chef Arabic kitchen Dubai" on careers.accor.com if the direct page changes.',
        },
        {
          text: 'Use a CV that clearly lists Arabic cuisine strengths, previous hotel or restaurant kitchens, HACCP or hygiene training, and the sections you have worked on.',
        },
      ]),
    ],
    metaTitle: 'Demi Chef Arabic Kitchen Job in Dubai | Verified Accor Opening',
    metaDescription:
      'Verified Demi Chef Arabic kitchen vacancy in Dubai on the official Accor careers site. Full-time culinary role with Arabic cuisine experience required.',
  },
  {
    _id: 'job-raffles-dubai-front-office-agent-ref69887p',
    _type: 'job',
    title: 'Front Office Agent',
    companyName: 'Raffles Dubai',
    slug: { _type: 'slug', current: 'front-office-agent-raffles-dubai-ref69887p' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Front Office & Guest Services',
    experienceRequired: 'Minimum 2 years of guest relations experience in a four or five-star hotel',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Accor careers page on March 29, 2026. This Raffles Dubai role is a full-time front desk opening under reference REF69887P.',
        },
        {
          text: 'The job covers reception, check-in and check-out, cashiering, reservation knowledge, guest requests, complaint handling, and maintaining a polished front desk experience in a luxury hotel setting.',
        },
        { style: 'h3', text: 'Highlights from the employer requirements' },
      ]),
      bullet('Strong written and spoken English'),
      bullet('Calm guest handling and professional front-desk presence'),
      bullet('Ability to work as part of a multicultural hotel team'),
      bullet('Hotel management education is preferred'),
      bullet('Arabic or a European language is an advantage'),
      ...blocksFromSections([
        { style: 'h3', text: 'Best fit for this opening' },
        {
          text: 'Candidates with hotel reception, guest relations, front office, or concierge experience should prioritize this role, especially if they can show luxury-service standards and strong guest communication.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply via the official Accor careers site using reference REF69887P. Search the exact role title and hotel name if the page URL changes.',
        },
        {
          text: 'On your CV, highlight Opera or hotel PMS familiarity, cash handling, guest complaint resolution, check-in/out duties, and any language strengths.',
        },
      ]),
    ],
    metaTitle: 'Front Office Agent Job in Dubai at Raffles Dubai',
    metaDescription:
      'Verified Front Office Agent opening at Raffles Dubai. Luxury hotel guest-services role found live on the official Accor careers page.',
  },
  {
    _id: 'job-raffles-dubai-f-and-b-server-ref92288c',
    _type: 'job',
    title: 'F&B Server',
    companyName: 'Raffles Dubai',
    slug: { _type: 'slug', current: 'f-and-b-server-raffles-dubai-ref92288c' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Hospitality',
    categoryLabel: 'Food & Beverage',
    experienceRequired: 'Minimum 2 years in food and beverage, ideally in five-star luxury hospitality',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Accor careers page on March 29, 2026. This full-time permanent F&B Server role is listed at Raffles Dubai under reference REF92288C.',
        },
        {
          text: 'Raffles describes the role as a guest-centric service position focused on luxury dining standards, menu knowledge, allergen awareness, upselling, cash handling, and close teamwork with outlet leadership.',
        },
        { style: 'h3', text: 'Key requirements' },
      ]),
      bullet('Strong English reading, writing, and speaking'),
      bullet('At least 2 years of food and beverage experience'),
      bullet('Luxury hospitality experience is preferred'),
      bullet('Professional grooming, teamwork, and guest-first service style'),
      bullet('Comfort with menu knowledge, allergens, SOPs, and opening or closing duties'),
      ...blocksFromSections([
        { style: 'h3', text: 'Who should prioritize this role' },
        {
          text: 'This is a good target for servers, waiters, waitresses, and restaurant team members aiming to move into a luxury hotel brand in Dubai.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply on the official Accor careers page using reference REF92288C. Search "F&B Server Raffles Dubai" on careers.accor.com if needed.',
        },
        {
          text: 'Your CV should emphasize table service, menu knowledge, guest care, upselling, allergen handling, POS or billing exposure, and luxury or branded restaurant experience.',
        },
      ]),
    ],
    metaTitle: 'F&B Server Job in Dubai at Raffles Dubai | Verified 2026 Listing',
    metaDescription:
      'Verified F&B Server vacancy at Raffles Dubai. Full-time hotel food and beverage role listed on the official Accor careers page.',
  },
  {
    _id: 'job-raffles-dubai-driver-ref89832w',
    _type: 'job',
    title: 'Driver',
    companyName: 'Raffles Dubai',
    slug: { _type: 'slug', current: 'driver-raffles-dubai-ref89832w' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    categoryLabel: 'Hotel Transport & Guest Services',
    experienceRequired: 'Minimum 3 years of driver experience, preferably in a five-star hotel environment',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Accor careers page on March 29, 2026. This Driver opening is listed at Raffles Dubai under reference REF89832W.',
        },
        {
          text: 'The role focuses on guest transportation, safe driving, city-route knowledge, warm arrival and departure service, baggage assistance, and supporting the hotel driveway and transport flow.',
        },
        { style: 'h3', text: 'Employer expectations' },
      ]),
      bullet('Confident English communication and professional guest interaction'),
      bullet('Strong knowledge of Dubai roads, landmarks, shopping areas, and attractions'),
      bullet('Safe guest transfer and baggage support'),
      bullet('High-school education level'),
      bullet('Arabic language ability is a plus'),
      ...blocksFromSections([
        { style: 'h3', text: 'Candidate fit' },
        {
          text: 'This role suits hotel drivers, chauffeurs, airport transfer drivers, and transport staff who can combine safe driving with polished guest service.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply via the official Accor careers page using reference REF89832W. Search "Driver Raffles Dubai" on careers.accor.com if the direct link changes.',
        },
        {
          text: 'Show hotel driving, chauffeur work, airport transfer experience, Dubai route knowledge, customer service, and clean safety habits clearly on your CV.',
        },
      ]),
    ],
    metaTitle: 'Driver Job in Dubai at Raffles Dubai | Verified Accor Vacancy',
    metaDescription:
      'Verified Driver opening at Raffles Dubai. Guest transport and hotel service role found live on the official Accor careers page.',
  },
  {
    _id: 'job-chalhoub-crm-associate-level-shoes-7367791',
    _type: 'job',
    title: 'CRM Associate - Level Shoes',
    companyName: 'Chalhoub Group',
    slug: { _type: 'slug', current: 'crm-associate-level-shoes-chalhoub-group-7367791' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Retail',
    categoryLabel: 'CRM & Customer Analytics',
    experienceRequired: 'CRM, segmentation, campaign analysis, and customer-data skills required',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Chalhoub Group careers site on March 29, 2026. This Dubai-based role supports Level Shoes customer analytics and CRM activity.',
        },
        {
          text: 'The role supports customer segmentation, campaign execution, reporting, lifecycle journeys, loyalty initiatives, and performance analysis across channels such as email, app, SMS, and WhatsApp.',
        },
        { style: 'h3', text: 'Skills mentioned on the employer listing' },
      ]),
      bullet('Strong analytical and problem-solving ability'),
      bullet('Customer segmentation and behavioral analysis'),
      bullet('Experience with CRM reporting and campaign KPI tracking'),
      bullet('SQL, GBQ, or Python data-querying ability'),
      bullet('Attention to detail and comfort working across teams'),
      ...blocksFromSections([
        { style: 'h3', text: 'Who should target this job' },
        {
          text: 'Candidates in CRM, digital marketing analytics, customer lifecycle marketing, retail analytics, or ecommerce retention work should consider this role seriously.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply on the official Chalhoub Group careers page for job 7367791. Search "CRM Associate Level Shoes" on careers.chalhoubgroup.com if the direct page changes.',
        },
        {
          text: 'Make your CV specific: include CRM platforms, segmentation work, lifecycle campaigns, reporting cadence, dashboard tools, SQL or analytics exposure, and measurable retention or revenue outcomes.',
        },
      ]),
    ],
    metaTitle: 'CRM Associate Job in Dubai at Level Shoes | Chalhoub Group',
    metaDescription:
      'Verified CRM Associate opening for Level Shoes in Dubai at Chalhoub Group. Customer analytics and CRM role live on the official careers site.',
  },
  {
    _id: 'job-chalhoub-merchandise-planner-gap-inc-7369323',
    _type: 'job',
    title: 'Merchandise Planner - GAP INC.',
    companyName: 'Chalhoub Group',
    slug: { _type: 'slug', current: 'merchandise-planner-gap-inc-chalhoub-group-7369323' },
    location: { city: 'Dubai', country: 'UAE' },
    jobType: 'Full-time',
    category: 'Logistics',
    categoryLabel: 'Merchandising & Planning',
    experienceRequired: 'Around 5 years of planning experience across multiple categories',
    postedDate: verifiedAt,
    expiryDate: expiresAt,
    status: 'active',
    isWalkIn: false,
    description: [
      ...blocksFromSections([
        {
          text: 'Verified live on the official Chalhoub Group careers site on March 29, 2026. This Dubai opening supports merchandise planning for GAP INC. in an omnichannel environment.',
        },
        {
          text: 'The job focuses on sales planning, open-to-buy management, margin and inventory optimization, markdown strategy, assortment recommendations, and in-season re-planning with cross-functional teams.',
        },
        { style: 'h3', text: 'What the employer is looking for' },
      ]),
      bullet('Strong analytical and critical-thinking skills'),
      bullet('Advanced Excel and strong business acumen'),
      bullet('Ability to influence and collaborate across commercial, finance, ecommerce, and buying teams'),
      bullet('Inventory, markdown, and profitability planning experience'),
      bullet('SAP knowledge is a plus'),
      ...blocksFromSections([
        { style: 'h3', text: 'Best-fit candidates' },
        {
          text: 'This role suits experienced merchandise planners, demand planners, retail analysts, or supply chain planning professionals with strong commercial decision-making skills.',
        },
      ]),
    ],
    howToApply: [
      ...blocksFromSections([
        {
          text: 'Apply through the official Chalhoub Group careers page for job 7369323. Search "Merchandise Planner GAP INC" on careers.chalhoubgroup.com if the direct page changes.',
        },
        {
          text: 'Use a metrics-driven CV that highlights forecasting, OTB ownership, markdown planning, inventory optimization, category planning, and the tools you use to support commercial decisions.',
        },
      ]),
    ],
    metaTitle: 'Merchandise Planner Job in Dubai at Chalhoub Group',
    metaDescription:
      'Verified Merchandise Planner opening for GAP INC. in Dubai at Chalhoub Group. Planning and inventory strategy role live on the official careers site.',
  },
];

const articles: ArticleDocument[] = [
  {
    _id: 'article-verified-dubai-jobs-direct-employer-march-2026',
    _type: 'article',
    title: 'Verified Dubai Jobs Open Now: 7 Direct Employer Roles We Checked on March 29, 2026',
    slug: { _type: 'slug', current: 'verified-dubai-jobs-open-now-direct-employer-march-2026' },
    excerpt:
      'We checked official employer career pages and found seven live Dubai openings across Marriott, Accor, and Chalhoub Group. Here is what stands out right now.',
    category: 'Company Hiring',
    tags: ['dubai jobs', 'uae jobs', 'company hiring', 'direct employer jobs'],
    status: 'published',
    publishDate: verifiedAt,
    lastUpdatedDate: verifiedAt,
    author: 'Editorial Team',
    metaTitle: 'Verified Dubai Jobs Open Now: 7 Direct Employer Roles',
    metaDescription:
      'Seven live Dubai jobs checked on official employer career pages on March 29, 2026. Hospitality, transport, CRM, and planning roles included.',
    content: [
      ...blocksFromSections([
        {
          text: 'If you are tired of recycled listings and vague job posts, this is the kind of update worth bookmarking. We checked official employer career pages on March 29, 2026 and shortlisted seven Dubai roles that were live when reviewed. The goal here is simple: show you direct-employer openings, skip fake urgency, and save you time.',
        },
        {
          text: 'This batch leans heavily toward hospitality and branded retail because that is where we found a useful mix of genuinely open roles. If you are applying from inside the UAE, these are the kinds of listings worth moving on quickly because big employers often keep pages live only while they are actively screening.',
        },
        { style: 'h2', text: 'The verified openings' },
        { style: 'h3', text: '1. Hotel Cleanliness Expert at JW Marriott Marquis Hotel Dubai' },
        {
          text: 'This is a strong target for housekeeping candidates who want a branded hotel on their CV. Marriott describes the role as a guest-room and public-area cleanliness position with hotel benefits like accommodation, meals on duty, transportation, training, and insurance. If you already have hotel housekeeping or facility-cleaning discipline, this is a practical role to target.',
        },
        { style: 'h3', text: '2. Laundry Supervisor at Sofitel Dubai Jumeirah Beach' },
        {
          text: 'For candidates already inside hotel operations, this is one of the more serious supervisory openings in the batch. The role combines laundry quality control, linen handling, team supervision, attendance tracking, and equipment coordination. It makes sense for anyone moving from laundry operations or housekeeping support into a more accountable supervisor role.',
        },
        { style: 'h3', text: '3. Demi Chef (Arabic kitchen) in Dubai through Accor' },
        {
          text: 'Arabic cuisine experience is the clear filter here. The employer asks for kitchen background, food safety habits, and the ability to work under pressure while supporting menu consistency and inventory handling. If your profile already includes Arabic kitchen work, this is more realistic than applying blindly to generic chef listings.',
        },
        { style: 'h3', text: '4. Front Office Agent at Raffles Dubai' },
        {
          text: 'This is the most obvious front-desk target in the current set. The employer is looking for strong English, guest-relations confidence, luxury-service awareness, and at least two years of related hotel experience. If your CV already includes reception, guest services, check-in or cashiering work, this is the type of direct-employer role that deserves a tailored application.',
        },
        { style: 'h3', text: '5. F&B Server at Raffles Dubai' },
        {
          text: 'The Raffles F&B opening is useful because the listing is unusually clear about what matters: service standards, grooming, menu knowledge, allergen awareness, and luxury-hospitality experience. This is the sort of role where a clean, service-focused CV can make a bigger difference than a long one.',
        },
        { style: 'h3', text: '6. Driver at Raffles Dubai' },
        {
          text: 'Hotel driver roles are not just about driving. This listing expects Dubai city knowledge, guest-facing service, baggage handling, and the kind of professional presentation that luxury hotels expect at the first point of contact. If you are only framing yourself as a transport worker and not as a service professional, your CV will undersell you for roles like this.',
        },
        { style: 'h3', text: '7. CRM Associate and Merchandise Planner roles at Chalhoub Group' },
        {
          text: 'These two Chalhoub roles are the most corporate options in the batch. The CRM Associate opening is focused on customer analytics, segmentation, campaign reporting, and lifecycle marketing. The Merchandise Planner role is a more senior planning opportunity centered on sales, margin, markdowns, OTB, and inventory strategy. If you work in retail analytics, CRM, merchandising, or planning, these are better targets than broad one-click job-board applications.',
        },
        { style: 'h2', text: 'What this tells us about the market right now' },
        {
          text: 'Two patterns stand out. First, hospitality employers in Dubai are still hiring for operational roles where service quality, presentation, and shift discipline matter more than flashy CV wording. Second, larger retail groups are still adding analytical and planning roles for people who can prove measurable impact, not just familiarity with tools.',
        },
        {
          text: 'That means your strategy should change based on the role. For hotel jobs, a one-page CV with clear duties, language ability, guest-service examples, and shift readiness usually works better than an over-designed resume. For CRM and planning roles, numbers matter: campaign outcomes, retention gains, forecast accuracy, inventory turns, margin impact, or channel growth.',
        },
        { style: 'h2', text: 'How to apply smarter' },
      ]),
      bullet('Apply on official employer career pages first, not through random WhatsApp messages or fee-based middlemen.'),
      bullet('Tailor your CV to the exact role instead of sending one generic version to every employer.'),
      bullet('Use the employer reference number when following up so your application is easier to identify.'),
      bullet('Move quickly on direct-employer listings because branded companies can close screening windows without warning.'),
      ...blocksFromSections([
        {
          text: "We will keep adding more verified direct-employer roles as we find them. If you want faster results, focus on quality over volume. Ten weak applications usually lose to two strong ones that clearly match the employer's language and expectations.",
        },
      ]),
    ],
  },
  {
    _id: 'article-how-to-apply-dubai-hotel-jobs-official-career-pages-2026',
    _type: 'article',
    title: 'How to Apply for Dubai Hotel Jobs Through Official Employer Career Pages in 2026',
    slug: { _type: 'slug', current: 'how-to-apply-for-dubai-hotel-jobs-through-official-career-pages-2026' },
    excerpt:
      'A practical guide to applying for Dubai hotel jobs the right way: where to apply, how to tailor your CV, and how to avoid wasting time on low-quality leads.',
    category: 'Career Guides',
    tags: ['dubai hotel jobs', 'career guide', 'official careers pages', 'uae hospitality jobs'],
    status: 'published',
    publishDate: verifiedAt,
    lastUpdatedDate: verifiedAt,
    author: 'Editorial Team',
    metaTitle: 'How to Apply for Dubai Hotel Jobs Through Official Career Pages',
    metaDescription:
      'Step-by-step guide to applying for Dubai hotel jobs on official employer career pages in 2026, with CV, follow-up, and scam-avoidance advice.',
    content: [
      ...blocksFromSections([
        {
          text: "A lot of UAE job seekers still apply the hard way. They spend hours on mixed-quality job boards, follow vague Telegram links, or message random recruiters without checking whether the role exists on the employer's own site. For hotel jobs in Dubai, that is one of the biggest reasons people waste time.",
        },
        {
          text: 'The better route is simpler: identify employers that are actively hiring, go to their official careers page, match your CV to the exact role, and apply directly. It is cleaner, safer, and usually gives you a better-quality lead than chasing recycled listings.',
        },
        { style: 'h2', text: 'Why official employer pages matter' },
        {
          text: 'Official hotel career pages tell you two things that low-quality reposts usually do not. First, they confirm the role is or was genuinely open with the employer. Second, they show the real language the hiring team is using for the role. That language is gold when you tailor your CV.',
        },
        {
          text: 'When we checked current Dubai openings from brands like Marriott, Accor, and Raffles, the descriptions were very specific. They did not just ask for good communication skills. They asked for guest handling, menu knowledge, housekeeping standards, PMS familiarity, city knowledge, grooming, and shift flexibility. That level of detail tells you what to surface in your application.',
        },
        { style: 'h2', text: 'Step 1: shortlist the right roles before you apply' },
        {
          text: 'Do not start by asking whether a hotel is famous. Start by asking whether the role matches your real background. If you have room attendant or public-area cleaning experience, housekeeping and laundry jobs make sense. If you have guest-relation or front desk work, look for front office and concierge roles. If you come from restaurant service, prioritize F&B server, waiter, hostess, or outlet roles.',
        },
        {
          text: 'This sounds obvious, but many candidates still apply to every hotel role they see. That weakens their response rate because the CV stops looking credible. Focus on what is truly close to your experience first.',
        },
        { style: 'h2', text: 'Step 2: mirror the employer language on your CV' },
      ]),
      bullet('If the employer says guest service, use guest service instead of only saying customer service.'),
      bullet('If the listing mentions Opera or hotel systems, mention the exact PMS or POS tools you know.'),
      bullet('If the role depends on Dubai route knowledge or luxury standards, make that visible near the top of your profile or experience section.'),
      bullet('If the employer cares about grooming, service culture, allergens, safety, or SOPs, surface that clearly instead of burying it at the bottom.'),
      ...blocksFromSections([
        {
          text: 'Dubai hotel employers screen fast. A recruiter or HR coordinator should be able to understand your match in less than a minute. That is why role-specific wording matters more than decorative design.',
        },
        { style: 'h2', text: 'Step 3: keep the application package clean' },
        {
          text: 'For most hospitality roles, you do not need a complicated package. You need a clean CV, a short summary, the right contact details, and honest availability. If you are already in the UAE, mention your visa status and whether you can attend in-person interviews quickly. If you are outside the UAE, mention that clearly too, so the employer knows how to assess your timeline.',
        },
        {
          text: 'Your CV should show hotel name or brand, role, dates, key duties, and a few relevant results or responsibilities. Keep it readable. Fancy formatting does not save weak matching.',
        },
        { style: 'h2', text: 'Step 4: follow up the smart way' },
        {
          text: 'After applying, save the employer reference number and page title. If the company has a talent portal, you may not get a reply immediately. That does not mean the application was ignored. What matters is whether your profile is easy to shortlist when screening starts.',
        },
        {
          text: 'If you do follow up, do it professionally and only when you have the correct job reference. A short note that names the role and reference number is much stronger than a generic "Any update?" message.',
        },
        { style: 'h2', text: 'How to avoid fake or low-quality leads' },
        {
          text: "One practical rule helps more than most people realize: if you cannot confirm the role on the employer's own careers page, treat the lead carefully. That does not automatically make it fake, but it does mean you should verify before investing time or sharing sensitive documents.",
        },
        {
          text: 'Branded employers also tend to make their hiring process more explicit. Some, like Marriott, publicly warn applicants about recruitment scams and fee-based fraud. That is a useful reminder for every UAE job seeker: real employers do not need you to pay to get shortlisted.',
        },
        { style: 'h2', text: 'Final takeaway' },
        {
          text: 'If you want better results with Dubai hotel jobs, stop treating the search like a volume game. Use official employer career pages, apply only where your background makes sense, and shape your CV around the actual language of the role. It is a slower strategy on paper, but it almost always produces stronger applications.',
        },
      ]),
    ],
  },
  {
    _id: 'article-dubai-hospitality-jobs-what-employers-want-2026',
    _type: 'article',
    title: 'Hospitality Jobs in Dubai: What Employers Want in Housekeeping, F&B, Driver and Front Office Roles',
    slug: { _type: 'slug', current: 'hospitality-jobs-in-dubai-what-employers-want-2026' },
    excerpt:
      'We reviewed live Dubai hospitality listings and broke down the skills employers keep asking for across housekeeping, front office, food and beverage, and driver roles.',
    category: 'Industry Roundups',
    tags: ['hospitality jobs', 'dubai hotels', 'uae jobs', 'industry roundups'],
    status: 'published',
    publishDate: verifiedAt,
    lastUpdatedDate: verifiedAt,
    author: 'Editorial Team',
    metaTitle: 'Hospitality Jobs in Dubai: What Employers Want in 2026',
    metaDescription:
      'What Dubai hospitality employers want in housekeeping, front office, food and beverage, and driver roles based on live employer listings we reviewed.',
    content: [
      ...blocksFromSections([
        {
          text: 'If you read enough Dubai hotel job descriptions, patterns start repeating. Employers may use different brand language, but the hiring signals are surprisingly consistent. We reviewed live listings from major employers and the same themes kept showing up across housekeeping, front office, food and beverage, and guest transport roles.',
        },
        {
          text: 'That matters because many candidates still build CVs around very generic phrases. They say hardworking, quick learner, and good communication, but they leave out the more specific signals employers actually screen for. Those missing details are often what make a profile easy to reject.',
        },
        { style: 'h2', text: '1. Service mindset matters across every operational role' },
        {
          text: 'Even roles that look operational on paper still carry guest-service expectations. Housekeeping jobs mention guest interaction, courtesy, and professional behavior. Driver jobs talk about first impressions, guest comfort, and hotel presentation. Front office roles go even further, asking for calm complaint handling, guest recognition, and polished communication.',
        },
        {
          text: 'The lesson is simple: if your background is in hotels, restaurants, transport, or facilities, do not describe yourself only as a worker. Describe yourself as a service professional who can support guests and standards at the same time.',
        },
        { style: 'h2', text: '2. Grooming, discipline, and shift readiness are not small details' },
        {
          text: 'Dubai hospitality employers still care a lot about punctuality, grooming, and service discipline. This is especially visible in food and beverage and front office roles, but it shows up in transport and housekeeping roles too. That means your application should make it easy to understand that you can work scheduled shifts, follow SOPs, and represent a brand professionally.',
        },
        { style: 'h2', text: '3. Role-specific knowledge beats generic experience' },
        {
          text: 'For front office roles, employers mention check-in and check-out procedures, cashiering, PMS familiarity, guest issue handling, and reservation knowledge. For F&B roles, they mention menu knowledge, allergens, service standards, upselling, and coordination with outlet teams. For driver roles, they focus on Dubai city knowledge, guest transfer safety, and baggage support. For housekeeping and laundry, they look for linen handling, cleanliness standards, equipment awareness, and quality control.',
        },
        {
          text: 'In other words, the more your CV sounds like the actual day-to-day work, the stronger your application becomes. A generic summary does not compete well with a profile that clearly matches the role.',
        },
        { style: 'h2', text: '4. English stays important, but it is not the only signal' },
        {
          text: 'Most employer pages still ask for English communication, but many also mention extra value signals like Arabic, another foreign language, system familiarity, or regional knowledge. This matters because language ability is often a tie-breaker, not the whole decision. If you also bring city knowledge, guest-relations calmness, or strong operational habits, that can carry more weight than people expect.',
        },
        { style: 'h2', text: '5. Physical stamina and pressure handling still matter' },
        {
          text: 'Operational hotel roles are not office jobs in disguise. Standing for long shifts, handling rush periods, staying calm with guests, and keeping standards under pressure are real parts of the work. Employers do not always say this in big letters, but the descriptions make it clear. If you already thrive in fast-paced service environments, say so directly.',
        },
        { style: 'h2', text: 'How to use this insight on your CV' },
      ]),
      bullet('Put the most role-specific duties near the top of your recent experience, not buried under general soft skills.'),
      bullet('Name the systems, service standards, safety routines, or operational processes you already know.'),
      bullet('Make your language match the role: front office, guest relations, room attendant, outlet service, chauffeur service, laundry operations, and so on.'),
      bullet('If you have luxury, branded, airport, mall, or high-volume hospitality experience, say that clearly.'),
      ...blocksFromSections([
        {
          text: "Dubai hospitality hiring is competitive, but it is also very readable once you know what employers are signaling. The best applications are not always the longest. They are the ones that match the language of the job and make the employer's decision easier.",
        },
      ]),
    ],
  },
];

async function main() {
  const transaction = client.transaction();

  for (const job of jobs) {
    transaction.createOrReplace(job);
  }

  for (const article of articles) {
    transaction.createOrReplace(article);
  }

  await transaction.commit();

  console.log(`Seeded ${jobs.length} jobs and ${articles.length} articles.`);
}

main().catch((error) => {
  console.error('Failed to seed researched content.');
  console.error(error);
  process.exit(1);
});

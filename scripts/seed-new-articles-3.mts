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
const h2 = (t: string) => p(t, 'h2');
const h3 = (t: string) => p(t, 'h3');
const li = (t: string) => ({ _type: 'block' as const, _key: k(), style: 'normal', listItem: 'bullet' as const, level: 1, markDefs: [], children: [sp(t)] });
const now = new Date().toISOString();

const articles = [
  {
    _id: 'article-accountant-jobs-dubai-guide-2026',
    _type: 'article',
    title: 'Accountant Jobs in Dubai 2026 — Salaries, Requirements, and Where to Apply',
    slug: { _type: 'slug', current: 'accountant-jobs-dubai-guide-2026' },
    excerpt: 'Everything you need to know about accountant jobs in Dubai: salary ranges, qualification requirements, VAT knowledge, and the best places to apply in 2026.',
    category: 'Career Guides',
    tags: ['accountant jobs dubai', 'finance jobs uae', 'accounting career', 'vat accountant'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Accountant Jobs in Dubai 2026 — Salary and How to Apply',
    metaDescription: 'Complete guide to accountant jobs in Dubai for 2026. Covers salary ranges, VAT knowledge, qualifications needed, and where to apply.',
    content: [
      p('Accounting remains one of the most stable career paths in Dubai. Every company needs financial management, and with UAE VAT compliance now a permanent fixture, demand for qualified accountants continues to grow across industries.'),
      p('This guide covers what you need to know about landing an accounting role in Dubai — from salary expectations to required qualifications and where to find the best opportunities.'),

      h2('Accountant Salary Ranges in Dubai'),
      li('Junior Accountant (0 to 2 years): AED 3,000 to 5,000 per month'),
      li('Accountant (2 to 5 years): AED 5,000 to 8,000 per month'),
      li('Senior Accountant (5 to 8 years): AED 8,000 to 13,000 per month'),
      li('Chief Accountant: AED 12,000 to 18,000 per month'),
      li('Finance Manager: AED 15,000 to 25,000 per month'),
      li('Financial Controller: AED 20,000 to 35,000 per month'),
      p('Salaries vary by company size, industry, and whether the role is in a free zone or mainland entity. Trading companies in Deira and Sharjah typically pay at the lower end. Multinationals and banks pay at the higher end.'),

      h2('Qualifications That Matter'),
      h3('Essential qualifications'),
      li('Bachelor degree in Accounting, Finance, or Commerce'),
      li('Proficiency in accounting software — Tally, QuickBooks, SAP, or Oracle'),
      li('Strong Excel skills including pivot tables, VLOOKUP, and data analysis'),
      li('Understanding of UAE VAT regulations and FTA filing procedures'),

      h3('Certifications that boost your salary'),
      li('ACCA — Most recognized accounting qualification in the UAE and GCC'),
      li('CPA — Valued by American companies and multinationals'),
      li('CMA — Useful for management accounting and cost analysis roles'),
      li('CIA — For internal audit positions'),
      p('An ACCA or CPA certification can increase your salary by 20 to 35 percent compared to non-certified accountants at the same experience level.'),

      h2('UAE VAT Knowledge Is Now Essential'),
      p('Since VAT was introduced in the UAE in 2018, every accountant is expected to understand VAT compliance. This includes:'),
      li('VAT registration thresholds and voluntary registration'),
      li('Input and output VAT calculations'),
      li('Filing VAT returns through the Federal Tax Authority portal'),
      li('Handling reverse charge mechanisms for imports'),
      li('Managing tax credit notes and adjustments'),
      p('If you do not have VAT experience, consider taking a short course from an approved training provider before applying. Many employers now list UAE VAT knowledge as a mandatory requirement.'),

      h2('Where to Find Accountant Jobs in Dubai'),
      li('Direct company career pages — especially for banks, hotels, and trading companies'),
      li('LinkedIn — set alerts for accountant, finance, and VAT roles in Dubai'),
      li('Bayt.com and GulfTalent — strongest UAE-specific job boards for finance roles'),
      li('Recruitment agencies — Robert Half, Michael Page, and Hays recruit for mid to senior accounting positions'),
      li('Walk-in interviews — less common for accounting but some trading companies and SMEs do open-door hiring'),
      p('For the best results, apply directly to companies and through LinkedIn simultaneously. Use our job listings page to find current accounting openings.'),

      h2('Tips for Your Accounting CV in the UAE'),
      li('List specific software you know — Tally ERP 9, SAP FICO, QuickBooks, Zoho Books'),
      li('Mention VAT filing experience with the number of returns you have filed'),
      li('Quantify your work — managed accounts for 3 entities, processed 200 monthly invoices'),
      li('Include your professional certifications prominently'),
      li('State your visa status clearly'),

      h2('Frequently Asked Questions'),
      h3('Do I need UAE experience to get an accounting job in Dubai?'),
      p('Not always. Many employers accept international experience, especially if you have relevant certifications and software knowledge. However, UAE VAT experience gives you a significant advantage.'),
      h3('What is the demand outlook for accountants in Dubai?'),
      p('Strong. Corporate tax was introduced in 2023, which has created additional demand for tax accountants and compliance professionals alongside existing VAT roles.'),
      h3('Can I work as a freelance accountant in the UAE?'),
      p('Yes. With a freelance visa from a free zone like IFZA or Meydan, you can offer accounting services to multiple clients. This is increasingly popular among experienced accountants.'),

      p('Accounting is one of the most reliable career paths in Dubai. Focus on getting certified, building VAT expertise, and tailoring your applications to specific roles. The jobs are there — the question is whether your profile stands out.'),
    ],
  },
  {
    _id: 'article-work-from-home-jobs-uae-2026',
    _type: 'article',
    title: 'Work From Home Jobs in UAE 2026 — Legitimate Remote Opportunities',
    slug: { _type: 'slug', current: 'work-from-home-jobs-uae-2026' },
    excerpt: 'Looking for work-from-home jobs in the UAE? Here are legitimate remote opportunities, industries that hire remotely, and how to avoid scams in 2026.',
    category: 'Career Guides',
    tags: ['work from home uae', 'remote jobs dubai', 'wfh jobs', 'online jobs uae'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'Work From Home Jobs in UAE 2026 — Real Remote Opportunities',
    metaDescription: 'Legitimate work-from-home jobs in the UAE for 2026. Covers remote roles, industries hiring remotely, salary ranges, and how to spot scams.',
    content: [
      p('Remote work in the UAE has matured significantly since the pandemic. While not every industry offers work-from-home options, several sectors now actively hire for fully remote or hybrid positions. The challenge is separating legitimate opportunities from the noise of fake listings and paid schemes.'),
      p('This guide covers which industries genuinely offer remote work in the UAE, what roles are available, realistic salary expectations, and how to protect yourself from scams.'),

      h2('Industries That Offer Remote Work in the UAE'),
      h3('Technology and Software'),
      p('This is the strongest sector for remote work. Software developers, UI/UX designers, QA testers, DevOps engineers, and technical writers can often work fully remote. Many tech companies in Dubai Internet City and DTEC allow hybrid or remote arrangements.'),

      h3('Customer Service and Call Centers'),
      p('Several telecom, banking, and e-commerce companies have shifted customer service roles to remote or hybrid models. Agents handle calls and chats from home using company-provided equipment.'),

      h3('Digital Marketing'),
      p('Content writers, SEO specialists, social media managers, and paid advertising specialists frequently work remotely. Agencies and in-house marketing teams in Dubai increasingly allow location flexibility.'),

      h3('Education and Tutoring'),
      p('Online tutoring platforms hire teachers for English, math, science, and test preparation. Some UAE schools also offer remote teaching positions for specific subjects.'),

      h3('Data Entry and Virtual Assistance'),
      p('Administrative support roles including data entry, scheduling, email management, and document processing can be done remotely. These are popular among part-time workers.'),

      h2('Realistic Salary Ranges for Remote Jobs'),
      li('Customer Service Agent remote: AED 2,500 to 4,500 per month'),
      li('Content Writer: AED 3,000 to 7,000 per month'),
      li('Social Media Manager: AED 4,000 to 9,000 per month'),
      li('Software Developer remote: AED 8,000 to 20,000 per month'),
      li('Online Tutor part-time: AED 1,500 to 4,000 per month'),
      li('Virtual Assistant: AED 2,000 to 5,000 per month'),
      li('SEO Specialist: AED 4,000 to 10,000 per month'),
      p('Remote salaries can be 10 to 20 percent lower than in-office equivalents, but you save on transport, food, and wardrobe costs. Factor in the total value when comparing offers.'),

      h2('Where to Find Remote Jobs in the UAE'),
      li('LinkedIn — filter by remote in the location field and add UAE as a keyword'),
      li('Bayt.com — has a remote and work-from-home filter'),
      li('WeWorkRemotely and Remote.co — global platforms that sometimes list UAE roles'),
      li('Upwork and Fiverr — for freelance remote work, especially writing, design, and development'),
      li('Company career pages — check if specific employers mention hybrid or remote options'),

      h2('How to Spot Remote Job Scams'),
      p('Fake work-from-home listings are one of the biggest problems in the UAE job market. Here is how to protect yourself:'),
      li('Never pay money for a remote job opportunity. Legitimate employers do not charge application or training fees.'),
      li('Be wary of jobs that promise very high income for minimal work. If it sounds too good to be true, it probably is.'),
      li('Check the company name and website. Search for reviews and complaints online before sharing your details.'),
      li('Avoid jobs that only communicate through WhatsApp or Telegram without any official email or portal.'),
      li('Do not share your Emirates ID, passport, or bank details until you have verified the employer.'),

      h2('Legal Considerations for Remote Work in UAE'),
      p('If you are working remotely for a UAE company, you still need a valid work visa. Working on a tourist visa is not legal, even if the work is done from home.'),
      p('Freelancers can obtain a freelance visa through free zones like Dubai Internet City Freelancer, IFZA, or Meydan Free Zone. This gives you legal status to work remotely for multiple clients.'),

      h2('Frequently Asked Questions'),
      h3('Can I work remotely for a company outside the UAE while living in the UAE?'),
      p('Technically yes, but you need a valid residence visa. A freelance visa or golden visa covers this. Working without proper visa status can result in fines and deportation.'),
      h3('Do remote workers get gratuity in the UAE?'),
      p('If you are employed full-time by a UAE company on a standard employment contract, yes. Freelancers and contractors do not receive gratuity.'),
      h3('Is hybrid work common in Dubai?'),
      p('Increasingly yes. Many companies in Dubai offer 2 to 3 days work from home per week, especially in tech, marketing, and professional services.'),

      p('Remote work in the UAE is real and growing, but it requires the same diligence as any job search. Focus on legitimate platforms, verify every employer, and make sure your visa status supports remote work legally.'),
    ],
  },
];

async function main() {
  const tx = client.transaction();
  for (const article of articles) {
    tx.createOrReplace(article);
  }
  await tx.commit();
  console.log(`Successfully uploaded ${articles.length} new articles!`);
  for (const a of articles) {
    console.log(`  - ${a.slug.current}`);
  }
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});

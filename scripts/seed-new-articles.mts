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
const sp = (text: string) => ({ _type: 'span' as const, _key: k(), text, marks: [] as string[] });
const p = (text: string, style = 'normal') => ({ _type: 'block' as const, _key: k(), style, markDefs: [], children: [sp(text)] });
const h2 = (text: string) => p(text, 'h2');
const h3 = (text: string) => p(text, 'h3');
const li = (text: string) => ({ _type: 'block' as const, _key: k(), style: 'normal', listItem: 'bullet' as const, level: 1, markDefs: [], children: [sp(text)] });

const now = new Date().toISOString();

const articles = [
  {
    _id: 'article-uae-gratuity-calculation-guide-2026',
    _type: 'article',
    title: 'UAE Gratuity Calculation Guide 2026 — How to Calculate Your End-of-Service Benefits',
    slug: { _type: 'slug', current: 'uae-gratuity-calculation-guide-2026' },
    excerpt: 'Learn exactly how UAE gratuity is calculated for private sector employees. Step-by-step formula, real examples, and common mistakes to avoid in 2026.',
    category: 'Career Guides',
    tags: ['uae gratuity', 'end of service', 'gratuity calculator', 'labour law'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'UAE Gratuity Calculation Guide 2026 — End-of-Service Benefits',
    metaDescription: 'Step-by-step guide to calculating UAE gratuity in 2026. Covers the formula, real examples, resignation vs termination, and common mistakes expats make.',
    content: [
      p('If you have been working in the UAE for more than a year and you are planning to resign or your contract is ending, gratuity is the single most important financial benefit you need to understand. Most expats either underestimate what they are owed or get confused by conflicting advice online.'),
      p('This guide breaks down the exact formula, walks through real examples, and covers the most common mistakes people make when calculating their end-of-service gratuity in the UAE private sector.'),

      h2('What Is UAE Gratuity?'),
      p('Gratuity, also called end-of-service benefit, is a lump-sum payment that every UAE private sector employer must pay to employees who complete at least one year of continuous service. It is mandated by Federal Decree-Law No. 33 of 2021, which replaced the older UAE Labour Law.'),
      p('This payment is calculated based on your basic salary only — not your total salary package. Allowances for housing, transport, phone, or any other benefits are excluded from the gratuity calculation.'),

      h2('The Gratuity Formula'),
      p('The calculation depends on how long you have worked:'),
      li('First 5 years of service: 21 calendar days of basic salary per year'),
      li('After 5 years: 30 calendar days of basic salary for each additional year'),
      li('Maximum cap: Total gratuity cannot exceed 2 years of your gross salary'),
      p('For partial years, the gratuity is calculated proportionally. For example, if you worked 3 years and 7 months, you get gratuity for 3.58 years.'),

      h3('Daily Rate Calculation'),
      p('Your daily basic salary for gratuity purposes is calculated as: Monthly Basic Salary divided by 30. This is the standard used by MOHRE and UAE courts, regardless of how many actual days are in the month.'),

      h2('Real Example: 4 Years of Service'),
      p('Let us say your basic salary is AED 5,000 per month. You have worked for 4 years and you are resigning.'),
      li('Daily rate: AED 5,000 / 30 = AED 166.67'),
      li('Gratuity per year: AED 166.67 x 21 days = AED 3,500.07'),
      li('Total for 4 years: AED 3,500.07 x 4 = AED 14,000.28'),
      p('That is your approximate gratuity before any deductions. If you had worked 7 years instead, the first 5 years would use the 21-day formula and the remaining 2 years would use the 30-day formula.'),

      h2('Real Example: 7 Years of Service'),
      p('Same basic salary of AED 5,000:'),
      li('First 5 years: AED 166.67 x 21 x 5 = AED 17,500.35'),
      li('Next 2 years: AED 166.67 x 30 x 2 = AED 10,000.20'),
      li('Total gratuity: AED 27,500.55'),
      p('The jump from 21 days to 30 days per year makes a significant difference. If you are close to completing 5 years, it is usually worth staying to unlock the higher rate.'),

      h2('Resignation vs Termination — Does It Matter?'),
      p('Under the new 2021 law, gratuity entitlement is the same whether you resign or are terminated by the employer. The old rule that reduced gratuity for voluntary resignation has been removed. You get the full amount either way, as long as you have completed at least one year of service.'),
      p('The only exception is if you are terminated for gross misconduct under Article 44 of the Labour Law. In that case, the employer may withhold gratuity entirely.'),

      h2('Common Mistakes Expats Make'),
      h3('1. Using total salary instead of basic salary'),
      p('This is the most frequent error. Your gratuity is based on basic salary only. If your offer letter says AED 8,000 total with AED 5,000 basic, your gratuity is calculated on AED 5,000.'),
      h3('2. Not accounting for unpaid leave'),
      p('Extended unpaid leave periods are typically excluded from your service period. If you took 3 months of unpaid leave during your tenure, your effective service period is reduced by those months.'),
      h3('3. Assuming gratuity includes the notice period'),
      p('Your notice period counts as part of your service if you are working during it. But if you are on garden leave or not serving the notice period, check with your employer whether it is included.'),

      h2('How to Use Our Gratuity Calculator'),
      p('We built a free UAE Gratuity Calculator that does all the math for you. Enter your basic salary, your start date, and your end date. It handles partial years, the 5-year threshold, and gives you the exact amount. Try it now on our tools page.'),

      h2('Frequently Asked Questions'),
      h3('Is gratuity taxable in the UAE?'),
      p('No. The UAE does not impose income tax, so your gratuity is paid in full without any tax deductions.'),
      h3('Can my employer deduct from my gratuity?'),
      p('Yes, but only for legitimate outstanding debts like salary advances, loans, or damages you are contractually liable for. They cannot deduct arbitrary amounts.'),
      h3('What if my employer refuses to pay gratuity?'),
      p('File a complaint with MOHRE through the app, website, or by calling 800-60473. If MOHRE cannot resolve it, the case goes to the labour court.'),
      h3('Do free zone employees get gratuity?'),
      p('Yes. Free zone employees are entitled to gratuity under the same rules. Some free zones like DIFC have their own employment law with slightly different calculations, so check your specific zone.'),

      p('Understanding your gratuity rights means you can plan your finances properly before you resign. Use our free calculator, keep a copy of your MOHRE-registered contract, and make sure your basic salary is clearly documented.'),
    ],
  },
  {
    _id: 'article-best-cv-format-uae-jobs-2026',
    _type: 'article',
    title: 'Best CV Format for UAE Jobs in 2026 — What Actually Gets You Interviews',
    slug: { _type: 'slug', current: 'best-cv-format-uae-jobs-2026' },
    excerpt: 'The UAE job market has its own CV rules. Learn the exact format, sections, and layout that get results for Dubai, Abu Dhabi, and Sharjah job applications.',
    category: 'Career Guides',
    tags: ['cv format', 'uae cv', 'resume uae', 'job application'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'Best CV Format for UAE Jobs 2026 — Get More Interviews',
    metaDescription: 'The UAE job market has specific CV rules. Here is the exact format, sections, and layout that gets results for jobs in Dubai, Abu Dhabi, and Sharjah.',
    content: [
      p('Your CV is the first thing any UAE employer sees. Before your skills, your experience, or your qualifications — they see your format. And in the UAE, a badly formatted CV gets rejected before anyone reads a single line.'),
      p('This guide covers exactly what a UAE-standard CV looks like in 2026, what sections you need, what to include that most people forget, and how to avoid the mistakes that get CVs thrown out.'),

      h2('Why UAE CVs Are Different'),
      p('If you are coming from Europe, North America, or South Asia, the CV format you are used to may not work here. The UAE has its own conventions:'),
      li('A professional photo is expected in the top-right corner'),
      li('Visa status must be clearly stated'),
      li('Nationality and date of birth are commonly included'),
      li('A one-page format is preferred for under 5 years of experience'),
      li('Two pages maximum for senior roles'),
      p('These are not just preferences — many recruiters in Dubai will skip your CV entirely if it does not include a photo or visa status.'),

      h2('The Ideal CV Structure'),
      h3('1. Header Section'),
      p('Your name, phone number with country code, email address, LinkedIn URL, and city of residence. Place your professional photo in the top-right corner. The photo should be a passport-style headshot with a plain background.'),

      h3('2. Professional Summary'),
      p('A 3 to 4 line summary at the top that tells the recruiter who you are, what you do, and what you are looking for. This is the most read section of any CV.'),
      p('Bad example: Hardworking professional seeking new opportunities in a dynamic environment.'),
      p('Good example: Front Office professional with 4 years of experience at 5-star hotels in Dubai. Skilled in Opera PMS, guest complaint resolution, and multilingual service. Seeking a Guest Relations or Front Office Supervisor role.'),

      h3('3. Work Experience'),
      p('List your roles in reverse chronological order. For each role include: job title, company name, location, dates, and 4 to 6 bullet points describing your key responsibilities and achievements.'),
      li('Use numbers wherever possible: Managed 120-room floor, handled 80+ check-ins daily, achieved 95% guest satisfaction score'),
      li('Start each bullet with an action verb: managed, supervised, processed, coordinated, delivered'),
      li('Mention UAE-specific experience prominently'),

      h3('4. Education'),
      p('List your highest qualification first. Include the institution name, degree, and year of completion. If you have professional certifications relevant to your field, list them separately.'),

      h3('5. Skills Section'),
      p('Include both technical skills and language abilities. In the UAE, language skills are highly valued. List your proficiency level for each language: native, fluent, conversational, or basic.'),

      h3('6. Personal Information'),
      p('In the UAE, it is standard to include your nationality, visa status, date of birth, and driving licence status. This is different from Western markets where this information is excluded.'),

      h2('What Visa Status to Mention'),
      li('Employment visa with current employer — mention you need a transfer or NOC'),
      li('Visit visa — mention you are available for immediate joining'),
      li('Freelance or golden visa — mention you do not need employer sponsorship'),
      li('Currently outside UAE — mention your availability to relocate'),

      h2('Common CV Mistakes in the UAE'),
      h3('Using a generic objective statement'),
      p('Replace it with a specific professional summary. Recruiters in Dubai see hundreds of CVs with I am a hardworking team player. It means nothing.'),
      h3('Making it too long'),
      p('If you have under 5 years of experience, keep it to one page. Two pages maximum for senior professionals. Nobody reads a 4-page CV.'),
      h3('No photo'),
      p('In the UAE job market, a photo is expected. Use a professional headshot, not a selfie or a cropped group photo.'),
      h3('Missing contact details'),
      p('Include your UAE phone number with the +971 code. If you are outside the UAE, include your WhatsApp number.'),

      h2('Frequently Asked Questions'),
      h3('Should I include my salary expectation on my CV?'),
      p('No. Save salary discussion for the interview stage. Including it on your CV can disqualify you before you get a chance to negotiate.'),
      h3('Do I need a cover letter for UAE jobs?'),
      p('Most UAE employers do not read cover letters unless specifically requested. Focus your effort on making your CV strong.'),
      h3('What file format should I use?'),
      p('Send your CV as a PDF unless the employer specifically asks for Word format. PDFs preserve your formatting across all devices.'),

      p('A well-formatted CV is the single most effective tool in your UAE job search. Use our free AI CV Maker to build one that follows all of these guidelines, or download it as a PDF ready to send to employers.'),
    ],
  },
  {
    _id: 'article-salary-guide-dubai-2026-by-industry',
    _type: 'article',
    title: 'Dubai Salary Guide 2026 — Average Salaries by Industry and Job Level',
    slug: { _type: 'slug', current: 'dubai-salary-guide-2026-by-industry' },
    excerpt: 'What are the average salaries in Dubai in 2026? We break down pay ranges across hospitality, IT, construction, retail, healthcare, and finance by job level.',
    category: 'Salary Insights',
    tags: ['dubai salary', 'uae salary guide', 'average salary dubai', 'salary by industry'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Dubai Salary Guide 2026 — Average Pay by Industry',
    metaDescription: 'Average salaries in Dubai for 2026 across hospitality, IT, construction, retail, healthcare, and finance. Broken down by entry, mid, and senior levels.',
    content: [
      p('One of the most common questions job seekers ask is: what is a good salary in Dubai? The answer depends entirely on your industry, experience level, and job function. This guide gives you realistic salary ranges for the most common industries in Dubai in 2026.'),
      p('All figures are monthly salaries in AED and are based on a combination of employer postings, recruiter data, and publicly available market surveys. These are not aspirational numbers — they reflect what companies are actually paying.'),

      h2('Hospitality and Tourism'),
      p('Dubai hospitality sector remains one of the largest employers in the emirate. Salaries include basic pay only unless noted.'),
      li('Room Attendant or Housekeeping: AED 1,500 to 2,200 plus accommodation and meals'),
      li('Waiter or F&B Server: AED 1,800 to 2,500 plus tips and meals'),
      li('Front Office Agent: AED 2,500 to 4,000'),
      li('Chef de Partie: AED 3,000 to 5,000'),
      li('Restaurant Manager: AED 6,000 to 10,000'),
      li('Hotel General Manager: AED 25,000 to 50,000 plus benefits'),
      p('Many hospitality roles come with accommodation, meals, and transport. When evaluating an offer, factor in these benefits — they can add AED 2,000 to 4,000 in effective monthly value.'),

      h2('Information Technology'),
      p('The UAE tech sector continues to grow, with demand concentrated in cybersecurity, cloud infrastructure, and data engineering.'),
      li('IT Support Technician L1: AED 3,000 to 5,000'),
      li('Software Developer mid-level: AED 8,000 to 15,000'),
      li('Senior Software Engineer: AED 15,000 to 25,000'),
      li('Data Analyst: AED 7,000 to 12,000'),
      li('Cybersecurity Analyst: AED 10,000 to 18,000'),
      li('IT Manager: AED 18,000 to 30,000'),
      li('CTO or VP Engineering: AED 40,000 to 80,000 plus equity'),

      h2('Construction and Engineering'),
      p('Construction remains a core sector in Dubai, with ongoing projects in infrastructure, residential, and commercial development.'),
      li('General Labourer: AED 1,200 to 1,800 plus accommodation'),
      li('Electrician or Plumber: AED 2,000 to 3,500'),
      li('Site Engineer: AED 5,000 to 9,000'),
      li('Project Manager: AED 12,000 to 22,000'),
      li('Quantity Surveyor: AED 8,000 to 15,000'),
      li('Construction Director: AED 25,000 to 45,000'),

      h2('Retail and FMCG'),
      li('Sales Associate: AED 1,800 to 2,800 plus commission'),
      li('Visual Merchandiser: AED 3,500 to 6,000'),
      li('Store Manager: AED 5,000 to 9,000'),
      li('Area or Regional Manager: AED 12,000 to 20,000'),
      li('Brand Manager: AED 10,000 to 18,000'),

      h2('Healthcare'),
      li('Nurse staff level: AED 5,000 to 9,000'),
      li('Pharmacist: AED 6,000 to 10,000'),
      li('General Practitioner: AED 15,000 to 25,000'),
      li('Specialist Doctor: AED 25,000 to 60,000'),
      li('Hospital Administrator: AED 12,000 to 22,000'),

      h2('Finance and Accounting'),
      li('Junior Accountant: AED 3,000 to 5,000'),
      li('Senior Accountant: AED 6,000 to 10,000'),
      li('Financial Analyst: AED 8,000 to 14,000'),
      li('Finance Manager: AED 15,000 to 25,000'),
      li('CFO: AED 40,000 to 80,000'),

      h2('What Affects Your Salary in Dubai'),
      h3('Company type'),
      p('Multinational companies and government-linked entities typically pay 15 to 30 percent more than small local businesses for equivalent roles.'),
      h3('Free zone vs mainland'),
      p('Some free zones offer competitive packages with additional benefits. DIFC and ADGM roles tend to pay higher than mainland equivalents in finance.'),
      h3('Nationality'),
      p('While it should not matter, salary expectations and offers sometimes vary by nationality. This is a market reality rather than a legal norm.'),
      h3('Negotiation'),
      p('Many employers in Dubai expect you to negotiate. Do not accept the first offer without asking. Research the market rate for your role using guides like this one.'),

      h2('Frequently Asked Questions'),
      h3('Is a salary of AED 5,000 good in Dubai?'),
      p('It depends on your lifestyle and whether your employer provides accommodation. AED 5,000 with free housing and transport is manageable. Without those benefits, it is tight for Dubai.'),
      h3('Do employers pay for accommodation separately?'),
      p('Some do, especially in hospitality and construction. For office jobs, accommodation is usually included in the salary as a housing allowance, typically 30 to 40 percent of the total package.'),
      h3('Are salaries in Abu Dhabi higher than Dubai?'),
      p('Government and oil sector salaries in Abu Dhabi can be higher. Private sector salaries are generally comparable, with Dubai slightly ahead in tech, retail, and hospitality.'),

      p('Use this guide as a benchmark when evaluating job offers. If an offer falls significantly below these ranges, it may be worth negotiating or looking at alternatives. Check our job listings page for current openings with salary details.'),
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

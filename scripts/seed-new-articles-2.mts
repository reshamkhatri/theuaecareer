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
    _id: 'article-top-10-mistakes-job-seekers-uae',
    _type: 'article',
    title: 'Top 10 Mistakes Job Seekers Make in the UAE — And How to Fix Them',
    slug: { _type: 'slug', current: 'top-10-mistakes-job-seekers-make-in-uae' },
    excerpt: 'Most job seekers in the UAE repeat the same avoidable mistakes. Here are the top 10 errors and practical fixes to improve your chances of getting hired.',
    category: 'Career Guides',
    tags: ['job search uae', 'job seeker mistakes', 'career advice dubai', 'job hunting tips'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'Top 10 Mistakes Job Seekers Make in the UAE',
    metaDescription: 'Avoid these 10 common job search mistakes in the UAE. Practical fixes for CV errors, interview blunders, and application strategy problems.',
    content: [
      p('Finding a job in the UAE is competitive. Thousands of applicants chase the same roles, and most of them make the same avoidable mistakes. If your job search has been going on for weeks without results, chances are you are making at least two or three of the errors on this list.'),
      p('Here are the ten most common mistakes we see UAE job seekers make, and exactly how to fix each one.'),

      h2('1. Sending the Same CV to Every Job'),
      p('This is the number one mistake. A generic CV that lists everything you have ever done gets ignored because it does not match any specific role. Recruiters in Dubai spend less than 30 seconds scanning a CV. If they cannot see a match immediately, you are out.'),
      p('Fix: Tailor your CV for each application. Mirror the language from the job posting. If they ask for guest relations experience, use those exact words on your CV.'),

      h2('2. No Professional Photo on Your CV'),
      p('In Europe and North America, photos on CVs are discouraged. In the UAE, they are expected. A CV without a photo looks incomplete to most Gulf employers.'),
      p('Fix: Add a professional passport-style headshot in the top-right corner. Plain background, smart attire, no sunglasses or selfies.'),

      h2('3. Not Mentioning Visa Status'),
      p('Employers need to know your visa situation before they invest time in interviewing you. Are you on an employment visa needing a transfer? A visit visa with limited time? Outside the country entirely?'),
      p('Fix: Add a clear line near the top of your CV: Current visa status — Employment visa, available with 30-day notice. This saves the recruiter a question and moves you forward faster.'),

      h2('4. Applying Only Through Job Boards'),
      p('Job boards like Bayt, Indeed, and LinkedIn are useful, but they are also the most crowded channels. Your application competes with hundreds of others.'),
      p('Fix: Apply directly on company career pages. Walk in to interviews. Connect with hiring managers on LinkedIn with a personalized message. Use multiple channels simultaneously.'),

      h2('5. Ignoring Walk-In Interviews'),
      p('Walk-in interviews are one of the fastest ways to get hired in the UAE, especially for hospitality, retail, logistics, and security roles. Many job seekers skip them because they seem informal.'),
      p('Fix: Check walk-in listings weekly. Show up early, dress professionally, bring multiple copies of your CV and required documents. Walk-ins often lead to same-day or next-day offers.'),

      h2('6. Writing a Weak Professional Summary'),
      p('Starting your CV with I am a hardworking team player looking for new challenges tells the employer nothing useful. It is the most overused phrase in the UAE job market.'),
      p('Fix: Write a specific 3-line summary. Name your profession, years of experience, key skills, and what role you are targeting. Make it impossible to confuse you with someone else.'),

      h2('7. Not Following Up After Applying'),
      p('Most candidates apply and then wait passively. In a market where hundreds apply for the same role, following up can make the difference between being shortlisted and being forgotten.'),
      p('Fix: Follow up 5 to 7 days after applying. Send a short professional message referencing the job title and your application date. Do not be pushy — one follow-up is enough.'),

      h2('8. Expecting Quick Results'),
      p('The average job search in the UAE takes 4 to 8 weeks for entry-level roles and 8 to 16 weeks for mid-senior positions. Many candidates give up after two weeks of no callbacks.'),
      p('Fix: Set realistic expectations. Apply consistently — aim for 5 to 10 targeted applications per week rather than 50 generic ones. Consistency beats volume.'),

      h2('9. Sharing Sensitive Documents Too Early'),
      p('Some candidates share passport copies, visa pages, and personal documents with unverified recruiters or agencies before confirming the opportunity is real.'),
      p('Fix: Only share documents after you have verified the employer or agency. Check company registration, look for an official website, and never pay money for a job opportunity.'),

      h2('10. Not Using Free Tools Available to Them'),
      p('Many job seekers do not realize that free tools exist to strengthen their applications. A well-formatted CV, a properly calculated gratuity expectation, and knowledge of current salary benchmarks all improve your negotiating position.'),
      p('Fix: Use our free CV Maker to create a Gulf-standard CV. Check our Gratuity Calculator before negotiating. Read our Salary Guide to understand market rates for your role.'),

      h2('Frequently Asked Questions'),
      h3('How many jobs should I apply to per week in the UAE?'),
      p('Quality matters more than quantity. Five to ten well-targeted applications per week typically produce better results than fifty generic submissions.'),
      h3('Is it worth applying for jobs from outside the UAE?'),
      p('Yes, but be transparent about your location and availability. Some employers prefer candidates already in the UAE, but many will consider strong candidates abroad for the right role.'),
      h3('Should I use a recruitment agency?'),
      p('Reputable agencies can be helpful, but never pay an agency for job placement. Legitimate recruiters are paid by the employer, not the candidate.'),

      p('Avoiding these ten mistakes will not guarantee you a job overnight, but it will significantly improve your response rate and move you closer to an offer. Start with the fixes that apply most to your situation and adjust your strategy weekly.'),
    ],
  },
  {
    _id: 'article-nurse-salary-uae-2026',
    _type: 'article',
    title: 'Nurse Salary in UAE 2026 — Pay by Emirate, Speciality, and Hospital Type',
    slug: { _type: 'slug', current: 'nurse-salary-uae-2026' },
    excerpt: 'What do nurses earn in the UAE in 2026? We break down nurse salaries by emirate, hospital type, speciality, and experience level with real market data.',
    category: 'Salary Insights',
    tags: ['nurse salary uae', 'nursing jobs dubai', 'healthcare salary', 'dha nurse'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Nurse Salary in UAE 2026 — Complete Breakdown',
    metaDescription: 'Nurse salaries in the UAE for 2026 broken down by emirate, speciality, and hospital type. Covers DHA, DOH, and private sector nursing pay.',
    content: [
      p('Nursing is one of the most in-demand professions in the UAE, and the country actively recruits nurses from around the world. But salary expectations vary widely depending on where you work, who your employer is, and what your speciality is.'),
      p('This guide gives you realistic nurse salary ranges for 2026 based on current market data from government and private sector employers across the UAE.'),

      h2('Staff Nurse Salaries by Emirate'),
      h3('Dubai'),
      li('Government hospitals DHA: AED 8,000 to 12,000 per month plus housing allowance'),
      li('Private hospitals large chains: AED 5,000 to 9,000 per month'),
      li('Small clinics: AED 4,000 to 6,000 per month'),
      p('Dubai Health Authority positions generally offer the best packages because they include housing, flight tickets, medical insurance, and annual leave benefits on top of base salary.'),

      h3('Abu Dhabi'),
      li('SEHA government hospitals: AED 8,500 to 13,000 per month plus benefits'),
      li('Cleveland Clinic Abu Dhabi: AED 9,000 to 14,000 per month'),
      li('Private sector: AED 5,000 to 8,500 per month'),
      p('Abu Dhabi DOH-licensed facilities tend to pay slightly higher than Dubai equivalents, especially for ICU, OR, and emergency specialities.'),

      h3('Sharjah and Northern Emirates'),
      li('Government facilities: AED 6,000 to 9,000 per month'),
      li('Private hospitals: AED 4,000 to 7,000 per month'),
      p('Salaries in Sharjah and the Northern Emirates are lower, but cost of living is also significantly less than Dubai or Abu Dhabi.'),

      h2('Salary by Nursing Speciality'),
      li('General or Medical-Surgical Nurse: AED 5,000 to 9,000'),
      li('ICU or Critical Care Nurse: AED 7,000 to 13,000'),
      li('Operating Room Nurse: AED 7,000 to 12,000'),
      li('Emergency Room Nurse: AED 6,500 to 11,000'),
      li('Neonatal or NICU Nurse: AED 7,000 to 12,000'),
      li('Dialysis Nurse: AED 6,000 to 10,000'),
      li('Home Care Nurse: AED 4,000 to 7,000'),
      li('Nurse Manager or Head Nurse: AED 12,000 to 20,000'),
      p('Specialised nurses with certifications in critical care, oncology, or cardiac nursing command premium salaries. If you are a general nurse, pursuing a speciality certification can increase your earning potential by 20 to 40 percent.'),

      h2('What Affects Your Nursing Salary'),
      h3('Licensing body'),
      p('DHA Dubai, DOH Abu Dhabi, and MOH federal each have their own licensing requirements. DHA and DOH positions typically pay more than MOH-licensed private facilities.'),
      h3('Years of experience'),
      p('Entry-level nurses with 1 to 2 years of experience start at the lower end. After 5 years, salaries increase significantly, especially with UAE experience.'),
      h3('Country of qualification'),
      p('Nurses from the Philippines, India, UK, and USA are the most commonly recruited. Western-trained nurses sometimes receive higher initial offers, but experience and speciality matter more long-term.'),
      h3('Benefits package'),
      p('Government and large private hospitals offer comprehensive packages including housing allowance of AED 3,000 to 6,000 per month, annual flights, medical insurance, and end-of-service gratuity. These benefits can effectively double your compensation.'),

      h2('How to Get Licensed as a Nurse in UAE'),
      li('DHA licence for Dubai: Apply through the DHA website, pass the DHA prometric exam, submit your dataflow verification'),
      li('DOH licence for Abu Dhabi: Apply through the TAMM system, pass the DOH exam, complete dataflow'),
      li('MOH licence for other emirates: Apply through the MOH portal with your qualifications and experience certificates'),
      p('The licensing process typically takes 2 to 4 months from application to approval. Start the dataflow verification early as it takes the longest.'),

      h2('Frequently Asked Questions'),
      h3('Can I work in Dubai with an MOH licence?'),
      p('No. Dubai requires a DHA licence. You need to convert or obtain the specific licence for the emirate where you will work.'),
      h3('Do UAE hospitals provide accommodation for nurses?'),
      p('Most government hospitals and large private hospital groups provide accommodation or a housing allowance. Smaller clinics may not.'),
      h3('Is overtime paid for nurses in the UAE?'),
      p('Yes. Under UAE Labour Law, overtime is paid at 125 percent of your hourly rate for the first two extra hours, and 150 percent after that.'),

      p('The UAE nursing market remains strong for 2026, with particular demand in ICU, emergency, and home care nursing. Research your target employer, get your licence sorted early, and negotiate based on the real salary ranges in this guide.'),
    ],
  },
  {
    _id: 'article-golden-visa-uae-eligibility-guide-2026',
    _type: 'article',
    title: 'UAE Golden Visa 2026 — Complete Eligibility Guide for Workers and Professionals',
    slug: { _type: 'slug', current: 'uae-golden-visa-eligibility-guide-2026' },
    excerpt: 'Who qualifies for the UAE Golden Visa in 2026? This guide covers eligibility for skilled workers, investors, entrepreneurs, and professionals with updated rules.',
    category: 'Visa & PRO Guides',
    tags: ['golden visa uae', 'uae visa', 'long term visa', 'residency uae'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'UAE Golden Visa 2026 — Who Is Eligible and How to Apply',
    metaDescription: 'Complete guide to UAE Golden Visa eligibility in 2026. Covers salary requirements, professional categories, investors, and the application process.',
    content: [
      p('The UAE Golden Visa is a long-term residence visa that allows foreign nationals to live, work, and study in the UAE without needing a national sponsor. It was introduced in 2019 and has been expanded several times since. In 2026, it remains one of the most attractive residency options for skilled workers and professionals in the region.'),
      p('This guide covers who is eligible, what the requirements are, and how to apply based on the most current rules.'),

      h2('What Is the UAE Golden Visa?'),
      p('The Golden Visa is a 10-year renewable residence visa. Unlike standard employment visas which are tied to your employer and last 2 to 3 years, the Golden Visa gives you independent residency. You can change jobs, start a business, or even leave the UAE for extended periods without losing your visa status.'),
      p('Key benefits include:'),
      li('10-year residence visa, renewable'),
      li('No need for employer sponsorship'),
      li('Ability to sponsor family members independently'),
      li('Entry visa valid for 6 months for processing'),
      li('Can stay outside the UAE for more than 6 months without losing residency'),

      h2('Eligibility Categories'),
      h3('1. Skilled Employees'),
      p('This is the most relevant category for working professionals. To qualify as a skilled employee:'),
      li('You must hold a valid employment contract in the UAE'),
      li('Your monthly salary must be AED 30,000 or above, or you must hold a bachelor degree or equivalent'),
      li('Your job must be classified in occupational levels 1, 2, or 3 according to the Ministry of Human Resources classification'),
      p('This category covers managers, professionals, and skilled technical workers. Common qualifying roles include engineers, doctors, nurses, IT professionals, accountants, architects, and senior managers.'),

      h3('2. Investors'),
      li('Real estate investors: Own property worth AED 2 million or more'),
      li('Business investors: Invest at least AED 2 million in a UAE-registered business'),
      li('Fund deposit: Deposit AED 2 million or more in a UAE investment fund approved by the government'),

      h3('3. Entrepreneurs'),
      p('Entrepreneurs who own or have previously owned a startup or SME in the UAE can qualify if they meet specific revenue or innovation criteria. The business must be approved by a relevant UAE authority.'),

      h3('4. Exceptional Talent'),
      li('Scientists and researchers with significant publications or contributions'),
      li('Creative professionals in arts, culture, and media'),
      li('Athletes with international achievements'),
      li('Holders of advanced degrees in AI, big data, epidemiology, or similar priority fields'),

      h3('5. Outstanding Students'),
      p('Top graduates from UAE universities and high-performing secondary school students with a GPA above 3.8 may be eligible for a 5-year Golden Visa.'),

      h2('How to Apply'),
      p('The application process depends on your category:'),
      li('Step 1: Check your eligibility through the ICA website or the GDRFA Dubai portal'),
      li('Step 2: Gather required documents — passport, salary certificate, employment contract, educational certificates, and any supporting evidence'),
      li('Step 3: Submit your application online through the ICA Smart Services portal or through an Amer centre'),
      li('Step 4: Pay the application fee, typically AED 2,800 to 4,500 depending on the type'),
      li('Step 5: Complete medical testing and Emirates ID registration'),
      li('Step 6: Receive your Golden Visa stamp'),
      p('Processing time is typically 2 to 4 weeks for straightforward applications. More complex cases involving business verification or talent assessment may take longer.'),

      h2('Common Questions About the Golden Visa'),
      h3('Can I switch jobs with a Golden Visa?'),
      p('Yes. One of the main advantages is that your visa is not tied to any employer. You can change jobs freely without affecting your residency status.'),
      h3('Can I sponsor my family?'),
      p('Yes. Golden Visa holders can sponsor their spouse, children, and in some cases parents, regardless of their salary level.'),
      h3('What if I lose my job?'),
      p('Your Golden Visa remains valid even if you are unemployed. You do not need to find new employment within 30 or 60 days like standard visa holders.'),
      h3('Do I need to be in the UAE to apply?'),
      p('You need a valid UAE entry visa or residence to start the process. Some categories allow you to apply from outside the UAE through UAE embassies.'),
      h3('Is the Golden Visa really free to maintain?'),
      p('You need to renew your Emirates ID periodically and maintain valid health insurance. There are no annual fees for the visa itself, but standard living costs apply.'),

      p('The Golden Visa represents a significant advantage for professionals building long-term careers in the UAE. If you meet the salary or qualification threshold, applying early gives you stability and flexibility that standard employment visas cannot match.'),
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

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
    _id: 'article-security-guard-jobs-dubai-2026',
    _type: 'article',
    title: 'Security Guard Jobs in Dubai 2026 — SIRA Licence, Salary, and How to Apply',
    slug: { _type: 'slug', current: 'security-guard-jobs-dubai-2026' },
    excerpt: 'Complete guide to security guard jobs in Dubai for 2026. Covers SIRA licence requirements, salary ranges, top employers, and where to find openings.',
    category: 'Career Guides',
    tags: ['security guard dubai', 'sira licence', 'security jobs uae', 'guard salary'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Security Guard Jobs in Dubai 2026 — SIRA, Salary, Apply',
    metaDescription: 'How to get a security guard job in Dubai in 2026. SIRA licence guide, salary breakdown, top security companies, and application tips.',
    content: [
      p('Security is one of the largest employment sectors in Dubai. With thousands of residential towers, malls, hotels, corporate offices, and construction sites requiring round-the-clock security, demand for guards remains consistently high throughout the year.'),
      p('This guide covers everything you need to know about working as a security guard in Dubai — from SIRA licensing to realistic salary expectations and the best way to find work.'),

      h2('SIRA Licence — What It Is and Why You Need It'),
      p('SIRA stands for Security Industry Regulatory Agency. It is the government body in Dubai that regulates private security companies and individual security guards. To legally work as a security guard in Dubai, you must hold a valid SIRA licence.'),
      h3('How to get a SIRA licence'),
      li('Your employer applies on your behalf through the SIRA portal'),
      li('You must pass a SIRA training course covering security procedures, fire safety, first aid, and customer service'),
      li('Training takes approximately 3 to 5 days depending on the provider'),
      li('You must pass a background check with no criminal record'),
      li('The licence is valid for 2 years and must be renewed'),
      p('Some security companies will hire you first and then process your SIRA licence. Others require you to already have one. Having an existing SIRA licence makes you a significantly stronger candidate.'),

      h2('Security Guard Salary in Dubai'),
      li('Entry-level guard without SIRA: AED 1,500 to 1,800 per month plus accommodation'),
      li('Guard with SIRA licence: AED 1,800 to 2,200 per month plus accommodation'),
      li('Senior guard or shift supervisor: AED 2,500 to 3,500 per month'),
      li('Security officer corporate or hotel: AED 3,000 to 4,500 per month'),
      li('Security manager: AED 6,000 to 10,000 per month'),
      p('Most security guard positions include accommodation and transport as part of the package. When evaluating an offer, consider these benefits — they add AED 1,500 to 3,000 in monthly value.'),

      h2('Types of Security Guard Roles'),
      h3('Residential building guard'),
      p('Stationed at apartment building lobbies and parking areas. Duties include access control, visitor registration, CCTV monitoring, and reporting incidents. These are among the most common positions.'),
      h3('Mall and retail security'),
      p('Crowd management, theft prevention, emergency response, and customer assistance in shopping centres. Higher interaction with the public and usually requires better English communication.'),
      h3('Corporate office security'),
      p('Access control, badge verification, visitor management, and building safety. These roles tend to have more regular hours and better working conditions.'),
      h3('Hotel and hospitality security'),
      p('Guest safety, event security, parking management, and emergency coordination. Hotels often prefer guards with hospitality awareness and grooming standards.'),
      h3('Construction site security'),
      p('Perimeter security, equipment monitoring, and access control for workers. Often involves outdoor work in challenging weather conditions.'),

      h2('Top Security Companies Hiring in Dubai'),
      li('Transguard Group — one of the largest security employers in the UAE'),
      li('G4S — global security company with significant UAE operations'),
      li('Securitas — major international security provider'),
      li('Emirates Security — well-established local company'),
      li('Hawk Security Services — active in residential and commercial security'),
      p('These companies frequently conduct walk-in interviews at their offices. Check our walk-in interviews page for current security hiring events.'),

      h2('How to Apply'),
      li('Walk-in interviews are the most common route. Security companies in Deira, Bur Dubai, and Al Quoz regularly hold open hiring days.'),
      li('Bring your passport copy, visa copy, CV, and SIRA licence if you have one.'),
      li('Be prepared for a physical fitness assessment — some companies check height, weight, and basic fitness.'),
      li('Dress neatly and arrive early. First impressions matter even for guard positions.'),

      h2('Frequently Asked Questions'),
      h3('Can I get a security job without a SIRA licence?'),
      p('Some companies will hire you and process your SIRA licence. However, having an existing licence gives you a clear advantage and opens up more opportunities.'),
      h3('What shifts do security guards work?'),
      p('Most positions are 12-hour shifts on a rotating basis — either day shift 7am to 7pm or night shift 7pm to 7am. Some corporate and hotel roles offer 8-hour shifts.'),
      h3('Is there career growth in security?'),
      p('Yes. Guards can progress to shift supervisor, control room operator, security officer, and eventually security manager. SIRA offers advanced certifications for career advancement.'),

      p('Security guard positions remain one of the most accessible job categories in Dubai, with high hiring volume and relatively low barriers to entry. Get your SIRA licence sorted, apply to reputable companies, and check our job listings for current openings.'),
    ],
  },
  {
    _id: 'article-how-to-convert-driving-licence-uae-2026',
    _type: 'article',
    title: 'How to Convert Your Driving Licence to UAE — Country List and Step-by-Step Process',
    slug: { _type: 'slug', current: 'convert-driving-licence-to-uae-2026' },
    excerpt: 'Need to convert your driving licence to a UAE licence? This guide covers eligible countries, required documents, fees, and the full step-by-step process for 2026.',
    category: 'Visa & PRO Guides',
    tags: ['uae driving licence', 'licence conversion', 'driving in dubai', 'rta licence'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'Convert Driving Licence to UAE 2026 — Full Guide',
    metaDescription: 'Step-by-step guide to converting your driving licence to UAE in 2026. Eligible countries, documents needed, RTA fees, and the complete process.',
    content: [
      p('If you have moved to the UAE and want to drive, you need a UAE driving licence. Depending on which country issued your current licence, you may be able to convert it directly without taking a driving test. This guide covers the full process.'),

      h2('Countries Eligible for Direct Licence Conversion'),
      p('The UAE allows direct licence conversion without a driving test for residents holding valid licences from specific countries. As of 2026, the eligible countries include:'),
      li('GCC countries: Saudi Arabia, Bahrain, Kuwait, Oman, Qatar'),
      li('European countries: UK, France, Germany, Italy, Spain, Netherlands, Belgium, Austria, Switzerland, Sweden, Norway, Denmark, Finland, Ireland, Portugal, Greece, Poland, Turkey'),
      li('North America: USA, Canada'),
      li('Asia Pacific: Australia, New Zealand, Japan, South Korea, Singapore, Hong Kong'),
      li('Other: South Africa'),
      p('If your country is on this list, you can convert your licence without a driving test. If your country is not listed, you will need to take driving lessons and pass the RTA driving test.'),

      h2('Step-by-Step Process for Direct Conversion'),
      h3('Step 1: Get your documents ready'),
      li('Original valid driving licence from your home country'),
      li('Valid UAE residence visa stamped in your passport'),
      li('Emirates ID original and copy'),
      li('Passport original and copy'),
      li('One passport-size photo with white background'),
      li('Eye test certificate from an RTA-approved optician'),
      li('No objection certificate from your employer if required'),

      h3('Step 2: Get your licence translated'),
      p('If your licence is not in English or Arabic, you need an official translation from a legal translation office. The translation must be attested.'),

      h3('Step 3: Pass the eye test'),
      p('Visit any RTA-approved optician or typing centre. The eye test costs approximately AED 50 to 100. You will receive a certificate immediately. If you wear glasses or contact lenses, bring them.'),

      h3('Step 4: Visit an RTA service centre or typing centre'),
      p('Go to any RTA customer service centre or authorised typing centre. Popular locations include Al Barsha, Deira, and Al Awir. Bring all your documents. The staff will process your application.'),

      h3('Step 5: Pay the fees'),
      li('Application fee: AED 200'),
      li('Licence issuance fee: AED 120 to 300 depending on licence type and duration'),
      li('Knowledge test fee: AED 200 if applicable to your category'),
      li('Typing centre service fee: AED 50 to 100'),
      li('Total approximate cost: AED 500 to 800'),

      h3('Step 6: Collect your licence'),
      p('If everything is in order, your UAE driving licence is typically issued within 2 to 5 working days. You can collect it from the service centre or have it delivered by post.'),

      h2('If Your Country Is Not on the Eligible List'),
      p('You will need to go through the full process:'),
      li('Open a learner file at a driving school such as Emirates Driving Institute, Belhasa, or Dubai Driving Centre'),
      li('Take the required number of driving lessons, typically 20 to 40 classes'),
      li('Pass the theory test, hazard perception test, and parking test'),
      li('Pass the final road test'),
      li('Total cost: AED 5,000 to 8,000 depending on the school and number of lessons needed'),
      p('The full process takes 2 to 4 months on average. Some nationalities may require additional lessons based on historical pass rates at RTA.'),

      h2('Important Rules to Know'),
      li('You must convert your licence within 6 months of getting your UAE residence visa'),
      li('International driving permits are valid for tourists but not for residents'),
      li('Your home country licence will be returned to you after conversion'),
      li('UAE licences are valid for 2 years for residents and 10 years for GCC nationals'),
      li('Renewal costs approximately AED 400 to 600 including eye test'),

      h2('Frequently Asked Questions'),
      h3('Can I drive in the UAE with my home country licence?'),
      p('Tourists can drive with an international driving permit or a licence from certain countries. Residents must convert to a UAE licence within 6 months.'),
      h3('Which licence categories can be converted?'),
      p('Light vehicle licences are the most commonly converted. Heavy vehicle, motorcycle, and bus licences follow a similar process but may require additional testing.'),
      h3('What if my home licence has expired?'),
      p('An expired licence cannot be converted. You must renew your home country licence first before applying for conversion in the UAE.'),
      h3('Can I convert a Pakistani or Indian licence directly?'),
      p('No. Pakistan and India are not on the direct conversion list. You will need to attend driving school and pass the RTA tests.'),

      p('Converting your driving licence is one of the first things you should do after settling in the UAE. It opens up job opportunities that require driving, and it gives you independence in a city built around cars. Start the process early to avoid delays.'),
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

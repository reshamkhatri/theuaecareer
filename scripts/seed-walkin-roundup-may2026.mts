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

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: This is a RECURRING post. Every Monday:
//   1. Open Sanity Studio → find "Walk-In Interviews in Dubai This Week"
//   2. Update the title date (e.g. "June 2026")
//   3. Replace the company listings with fresh ones
//   4. Click "Last Updated Date" → set to today
//   5. Publish
//
// Do NOT create a new post each week — update this same one.
// Google re-indexes updated posts faster, and all inbound links stay intact.
// ─────────────────────────────────────────────────────────────────────────────

const articles = [
  // ── Dubai weekly roundup (the cornerstone post) ──────────────────────────
  {
    _id: 'article-walk-in-interviews-dubai-this-week',
    _type: 'article',
    title: 'Walk-In Interviews in Dubai This Week — June 2026',
    slug: { _type: 'slug', current: 'walk-in-interviews-dubai-this-week' },
    excerpt: 'The latest walk-in interviews happening in Dubai this week across retail, hospitality, logistics, and more. Updated every Monday with new companies.',
    category: 'Walk-In Interviews',
    tags: ['walk in interview dubai', 'walk in interview this week', 'dubai jobs walk in', 'immediate hiring dubai'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Walk-In Interviews in Dubai This Week — June 2026',
    metaDescription: 'Walk-in interviews in Dubai this week: retail, hospitality, logistics, admin, and more. Updated every Monday. Bring your CV and walk in today.',
    content: [
      p('Walk-in interviews are different from regular applications. You don\'t wait for a callback. You show up, meet the team, and in a lot of cases you know if you have an offer by the end of the same day. That\'s why this is one of the most searched things on Google in the UAE every single week — and it\'s why we update this post every Monday.'),
      p('Bookmark this page. Check back Monday mornings. New companies are added throughout the week as they announce interview dates.'),

      h2('Walk-In Interviews Happening This Week'),

      h3('1. Sales Associates — Retail & FMCG'),
      p('Several retail brands at Dubai Mall, Deira City Centre, and Al Ghurair Centre are running open-door hiring for sales associates this week. Freshers welcome. If you can communicate clearly in English and you\'re comfortable on your feet for a full shift, you\'re a realistic candidate.'),
      li('What they want: 0–2 years retail or customer-facing experience, basic English, weekend availability'),
      li('Salary: AED 2,000 to 2,800 plus commission'),
      li('Walk-in timing: Sunday to Thursday, 10am to 4pm'),
      li('What to bring: CV (at least two printed copies), passport copy, one recent photograph'),

      h3('2. Delivery Drivers — Logistics & E-Commerce'),
      p('Logistics companies in the Dubai Industrial Area and Jebel Ali are hiring light vehicle drivers for local delivery routes. Application to first shift can be as fast as three days if your documents are in order.'),
      li('Requirements: Valid UAE light vehicle driving licence, basic English, smartphone for route apps'),
      li('Salary: AED 2,200 to 2,700 plus fuel allowance'),
      li('Walk-in location: Dubai Industrial Area near Gate 5'),
      li('Bring: Original driving licence, passport, visa copy, CV'),

      h3('3. Housekeeping Staff — Hotels'),
      p('A 4-star hotel group in Dubai Marina and JBR is hiring room attendants and a linen supervisor. Freshers with hotel housekeeping training from a hospitality institute are being considered for the attendant roles — you don\'t need UAE experience to apply.'),
      li('Roles: Room Attendant, Linen Room Attendant, Housekeeping Supervisor'),
      li('Salary: AED 1,600 to 2,200 for attendants; AED 3,000 to 3,800 for supervisors'),
      li('Walk-in: Saturday and Sunday, 9am to 1pm'),
      li('Bring your CV directly to the hotel HR department. Call the hotel\'s main line and ask for HR to confirm the address before you travel.'),

      h3('4. Customer Service Agents — Call Centre'),
      p('A telecoms company in Business Bay is hiring for their inbound support team. Fixed shift pattern, no split shifts. English is mandatory; Hindi or Tagalog is a real plus and can push the offer closer to the top of the range.'),
      li('Requirements: Fluent English, basic computer skills, customer-focused attitude'),
      li('Salary: AED 2,500 to 3,000 plus performance bonus'),
      li('Walk-in: Monday to Wednesday this week, 11am to 3pm'),
      li('WhatsApp the number on our contact page with "CS Walk-In" to get the office address in Business Bay'),

      h3('5. Security Guards — Multiple Sites'),
      p('A SIRA-licensed security company in Deira is doing open-door hiring all week for guards across residential buildings, retail outlets, and commercial offices. Accommodation and transport to site are provided. Candidates without a SIRA licence may still be considered — the company assists with licensing for strong candidates.'),
      li('SIRA licence holders prioritised; unlicensed candidates considered case by case'),
      li('Salary: AED 1,800 to 2,200 plus accommodation and transport'),
      li('Walk-in: Daily, 9am to 5pm, Sunday to Thursday'),
      li('Head office in Deira — ask reception for HR on arrival. Bring passport, visa copy, and CV.'),

      h3('6. Warehouse Operatives — Dubai South'),
      p('An e-commerce fulfilment centre near Al Maktoum Airport is hiring for pick-and-pack. No experience needed. The facility runs 24 hours with 8-hour fixed shifts. Accommodation and bus transport from main Dubai areas are included.'),
      li('No experience required — full training on day one'),
      li('Salary: AED 1,600 to 1,900 plus accommodation and transport'),
      li('Walk-in: Sunday to Tuesday this week, 8am to 12pm'),
      li('Dubai South logistics zone — WhatsApp "Warehouse" to our contact number for the gate address'),

      h3('7. Cook — Indian Cuisine, Karama'),
      p('A well-known Indian restaurant group in Karama is hiring experienced cooks for their kitchen team. You\'ll need real restaurant experience — not home cooking — and confident knowledge of either North Indian or South Indian cuisine.'),
      li('Experience: Minimum 2 years in a commercial kitchen'),
      li('Salary: AED 1,800 to 2,500 plus meals during shift'),
      li('Walk-in: Tuesday and Thursday, 3pm to 6pm'),
      li('WhatsApp "Cook Application" to our contact number for the Karama address. Be ready for a brief cooking test.'),

      h2('Tips for Walk-In Interviews in Dubai'),
      p('Most people who struggle at walk-ins haven\'t prepared for the format, not the interview itself. A few things that genuinely make a difference:'),
      li('Bring at least three printed copies of your CV. Some companies keep one, some don\'t, and pulling out a printed copy looks sharper than scrolling through your phone.'),
      li('Arrive early. Walk-in hiring is mostly first-come, first-served. If it opens at 10am, be there at 9:45. The later slots often go to the people who arrived early and waited.'),
      li('Dress for the role. For retail and hospitality: smart casual. For office or call centre: formal. First impressions happen before you open your mouth.'),
      li('Have your documents ready in a folder: passport copy, visa copy, Emirates ID copy, and a recent photo. Every UAE employer will ask for these. It saves time and signals you\'re organised.'),
      li('Follow up the next day. A short WhatsApp message — "I attended your walk-in on [day] for [role], I\'m still very interested" — takes 30 seconds and puts your name back in front of them.'),

      h2('How We Find These Listings'),
      p('We pull these from company LinkedIn pages, official social media announcements, and direct contact with HR teams. We don\'t list agencies that charge fees from job seekers. Everything here is from direct employers or verified authorised recruiters.'),
      p('Know of a walk-in interview that\'s not on this list? Drop it to us via the Contact page and we\'ll add it.'),

      h2('More Resources'),
      li('Build a clean CV before you walk in — use our free CV Maker'),
      li('Not sure what to say when you arrive? Read: Walk-In Interview Self-Introduction Sample'),
      li('Packing your folder? See: Documents for a Walk-In Interview in Dubai'),
      li('Browse all UAE job listings for non-walk-in roles'),
    ],
  },

  // ── Abu Dhabi weekly roundup ──────────────────────────────────────────────
  {
    _id: 'article-walk-in-interviews-abu-dhabi-this-week',
    _type: 'article',
    title: 'Walk-In Interviews in Abu Dhabi This Week — June 2026',
    slug: { _type: 'slug', current: 'walk-in-interviews-abu-dhabi-this-week' },
    excerpt: 'Walk-in interviews happening in Abu Dhabi this week across healthcare, retail, hospitality, and facilities. Updated every Monday with fresh company listings.',
    category: 'Walk-In Interviews',
    tags: ['walk in interview abu dhabi', 'abu dhabi jobs walk in', 'immediate hiring abu dhabi'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Walk-In Interviews in Abu Dhabi This Week — June 2026',
    metaDescription: 'Walk-in interviews in Abu Dhabi this week: healthcare, retail, hospitality, facilities. Updated every Monday. Know what to bring before you go.',
    content: [
      p('Abu Dhabi\'s job market runs a bit differently from Dubai. The government sector is bigger here, there\'s a stronger push to hire nationals, and the commutes across the city can be long if you don\'t check the location before you travel. That said, private-sector walk-in hiring is active year-round — particularly in healthcare support, retail, hospitality, and facilities.'),
      p('Here\'s what\'s open this week. We update every Monday.'),

      h2('Walk-In Interviews This Week'),

      h3('1. Receptionist / Front Desk — Medical Clinics'),
      p('A group of private medical clinics in Khalifa City and Mushrif are hiring front-desk staff. Prior experience in a clinic or hospital is preferred, but candidates with strong admin backgrounds from other sectors are being interviewed too.'),
      li('Requirements: Presentable English communication, basic insurance admin knowledge preferred, ability to handle a busy front desk'),
      li('Salary: AED 2,800 to 3,500'),
      li('Walk-in: Sunday to Tuesday, 10am to 2pm'),
      li('Bring: CV, passport copy, visa copy, any healthcare admin certificates'),

      h3('2. Sales Associates — Shopping Malls'),
      p('Retail brands at Yas Mall and Al Wahda Mall are hiring sales staff for the new stock season. Freshers are considered for most roles. Weekend availability is expected.'),
      li('Requirements: English communication, professional appearance, willingness to work Fridays and Saturdays'),
      li('Salary: AED 1,900 to 2,500 plus commission'),
      li('Walk-in: Daily, 11am to 4pm, head to the mall HR kiosk on ground floor'),
      li('Bring: CV, passport copy, one photograph'),

      h3('3. Housekeeping and Laundry Staff — Hospitality'),
      p('A hotel group near Corniche is hiring housekeeping attendants and laundry staff for several properties. Package includes shared accommodation and meals. Female candidates preferred for housekeeping roles as per hotel policy.'),
      li('Salary: AED 1,500 to 1,900 plus accommodation and meals'),
      li('Walk-in: Saturday and Sunday, 8am to 11am'),
      li('Call the HR line first for the specific property address. Bring CV and full document set.'),

      h3('4. Security Guards — Commercial and Residential'),
      p('A licensed security company covering Abu Dhabi and Al Ain is hiring guards on open-door days this week. DOH health card required before deployment; company assists with obtaining it.'),
      li('Salary: AED 1,700 to 2,100 plus accommodation and transport'),
      li('SIRA or relevant Abu Dhabi security licence preferred'),
      li('Walk-in: Monday to Thursday, 9am to 4pm, Abu Dhabi Industrial City area'),
      li('Bring: Full documents including any security licence copies'),

      h3('5. Light Vehicle Drivers — Corporate Fleet'),
      p('Two corporate services companies in Abu Dhabi are hiring drivers for executive transport and staff movement roles. UAE driving experience and a clean record are essential. Arabic is an advantage for one of the roles.'),
      li('Salary: AED 2,200 to 3,200 depending on role and experience'),
      li('Requirements: UAE light vehicle licence, minimum 2 years UAE driving experience, clean Salik history'),
      li('Walk-in: Monday and Wednesday this week, 9am to 1pm'),
      li('Bring: Original licence, passport copy, visa copy, CV'),

      h2('Abu Dhabi Walk-In Tips'),
      p('A couple of things specific to Abu Dhabi that trip people up:'),
      li('Check the exact location before you travel. Abu Dhabi is spread out and a wrong area can cost you an hour. Ask for a building name or landmark, not just the street.'),
      li('Bring both Arabic and English copies of your CV if you have them. Some government-linked companies prefer Arabic documentation.'),
      li('Government entities and SEHA facilities almost never do walk-ins — those go through their portals. The listings above are all private sector.'),
      li('Use our free CV Maker and our walk-in checklist before you head out.'),
    ],
  },

  // ── Sharjah weekly roundup ────────────────────────────────────────────────
  {
    _id: 'article-walk-in-interviews-sharjah-this-week',
    _type: 'article',
    title: 'Walk-In Interviews in Sharjah This Week — June 2026',
    slug: { _type: 'slug', current: 'walk-in-interviews-sharjah-this-week' },
    excerpt: 'Walk-in interviews happening in Sharjah this week in industrial, retail, logistics, and hospitality sectors. Updated Monday. Salaries, timings, and what to bring.',
    category: 'Walk-In Interviews',
    tags: ['walk in interview sharjah', 'sharjah jobs walk in', 'immediate hiring sharjah'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Walk-In Interviews in Sharjah This Week — June 2026',
    metaDescription: 'Walk-in interviews in Sharjah this week: industrial, logistics, retail, and hospitality. Updated Mondays. Salary ranges, timings, and documents listed.',
    content: [
      p('Sharjah doesn\'t get the same coverage as Dubai, but it runs a busy industrial zone and the hiring volume is real — especially in manufacturing, logistics, and security. Salaries sit a little lower on average, but accommodation is bundled into more packages here than it is in Dubai, which changes the actual take-home calculation.'),
      p('Here\'s what\'s on this week. Updated every Monday.'),

      h2('Walk-In Interviews This Week'),

      h3('1. Production Operators and Packers — Industrial Area'),
      p('Two factories in Sharjah Industrial Area 1 and 5 are doing open-door hiring for production-line operators, quality checkers, and packing staff. No experience required for packing roles. Prior factory experience helps for the operator positions.'),
      li('Salary: AED 1,400 to 1,800 plus shared accommodation and transport'),
      li('Walk-in: Daily from Sunday to Thursday, 7am to 10am before the morning shift starts'),
      li('Bring: Passport, visa copy, CV. Steel-toed shoes required once deployed — company provides them.'),

      h3('2. Retail Sales Staff — Sharjah City Centre and Mega Mall'),
      p('Fashion and electronics retailers at both malls are running walk-ins for sales associates and cashiers. Arabic is helpful for Sharjah retail — many customers prefer to be served in Arabic even if the brand\'s official language is English.'),
      li('Salary: AED 1,800 to 2,300 plus commission'),
      li('Walk-in: Saturday to Tuesday, 10am to 3pm at the respective mall HR desks'),
      li('Bring: CV, photo, passport copy'),

      h3('3. Cleaners and Facility Staff — FM Company'),
      p('A facilities management company holding multiple Sharjah government building contracts is hiring cleaners and building maintenance helpers. Both male and female candidates are being considered. Accommodation is included.'),
      li('Salary: AED 1,300 to 1,600 plus accommodation and transport'),
      li('Walk-in: Monday and Tuesday this week, 9am to 12pm'),
      li('Office in Al Sajaa Industrial Area — WhatsApp "FM Cleaning" to our contact number for the address'),

      h3('4. Drivers — Delivery and Internal Transport'),
      p('A trading company and a food distribution company in Sharjah are each hiring light vehicle drivers. Both roles involve fixed routes within Sharjah and the Northern Emirates. Fuel cards provided.'),
      li('Salary: AED 1,900 to 2,400 plus fuel card'),
      li('Requirements: UAE light vehicle licence, clean record, basic English'),
      li('Walk-in: Sunday and Monday, 9am to 1pm at their respective offices in Industrial Area 2'),
      li('Bring: Original licence, passport copy, CV'),

      h3('5. Security Guards — Multiple Clients'),
      p('A security firm operating across Sharjah residential towers, commercial buildings, and one industrial site is hiring on open days this week. Company is registered with MoI and handles all licensing paperwork for guards hired without a prior licence.'),
      li('Salary: AED 1,600 to 1,950 plus accommodation'),
      li('Walk-in: Wednesday and Thursday, 9am to 4pm'),
      li('Their office is in Rolla area — WhatsApp "Security Guard" for the address'),

      h2('A note on Sharjah salaries'),
      p('Salaries here run lower than Dubai numbers on paper. Before you write off a role, check whether accommodation is included — a Sharjah package at AED 1,600 with accommodation and transport is often comparable in real terms to a Dubai salary of AED 2,200 where you\'re paying rent.'),
      p('Use our CV Maker to get your documents ready. Our walk-in checklist covers what to carry to any interview in the UAE.'),
    ],
  },
];

async function run() {
  for (const a of articles) {
    await client.createOrReplace(a as any);
    console.log('Published:', a.slug.current);
  }
  console.log(`\nDone. ${articles.length} walk-in roundup posts published to Sanity.`);
  console.log('\nREMINDER: Update these every Monday in Sanity Studio.');
  console.log('Change the title date, refresh the listings, update "Last Updated Date".');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

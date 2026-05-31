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
    _id: 'article-uae-labour-law-expats-2026',
    _type: 'article',
    title: 'UAE Labour Law for Expats — The Rights Most Workers Find Out About Too Late',
    slug: { _type: 'slug', current: 'uae-labour-law-for-expats-2026' },
    excerpt: 'A plain-English guide to UAE Labour Law for expats in 2026 — contracts, probation, gratuity, notice periods, unpaid salary, and what to do when things go wrong.',
    category: 'Career Guides',
    tags: ['uae labour law', 'expat rights uae', 'mohre', 'employment contract uae', 'gratuity'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'UAE Labour Law for Expats 2026 — Know Your Rights',
    metaDescription: 'Plain-English UAE Labour Law guide for expats: contracts, probation, gratuity, notice periods, unpaid salary, and the MOHRE complaint process explained.',
    content: [
      p('Most people start reading about UAE Labour Law on a bad day. The salary is late, the company has suddenly asked them to "resign," or a manager has said something that doesn’t sound quite legal. By then you’re reacting under pressure instead of knowing where you stand.'),
      p('It’s better to read this now, while nothing is wrong. The UAE system is more employee-friendly than a lot of expats assume. The catch is that the protections only help you if you know they exist and keep the right paperwork. Here is what every private-sector worker in the UAE should understand, written the way you’d explain it to a friend over coffee.'),

      h2('Does this law even apply to you?'),
      p('The current law is Federal Decree-Law No. 33 of 2021. It covers private-sector employees across the mainland and most free zones. Government staff and domestic workers (housemaids, family drivers) sit under separate rules, so this guide isn’t for them.'),
      p('A few free zones — DIFC and ADGM being the big ones — run their own employment regulations that differ from the federal law. If you work in one of those, your contract follows that zone’s rules. Not sure which applies? Ask HR which authority your visa is issued under. It takes two minutes and tells you which rulebook you’re playing by.'),

      h2('Your real contract is the one the government has'),
      p('Here’s something that trips people up constantly. The contract that matters legally is the one registered with MOHRE (the Ministry of Human Resources and Emiratisation) — not the offer letter or the side agreement your employer waved at you during onboarding.'),
      p('If your MOHRE contract says AED 6,000 and a separate internal letter says AED 4,500, the MOHRE figure is what holds up in a dispute. So get a copy of your MOHRE contract. You can pull it yourself through the MOHRE app under your labour card details. Save it somewhere you can reach without asking HR, because if a fight starts, HR is the last place that will hand it over quickly.'),

      h2('Probation: the part where a wrong move can get you banned'),
      p('Probation can run up to 6 months. During that window either side can end things, but the notice rules are specific and people get burned by ignoring them:'),
      li('Employer ending it during probation: 14 days’ notice to you.'),
      li('You resigning to join another UAE company: 1 month’s notice.'),
      li('You resigning to leave the UAE entirely: 14 days’ notice.'),
      p('Walk out without serving the right notice during probation and you can face a work ban for a period. If you’re jumping ship to a better offer, tell the new employer you have to serve a month — a serious company will wait. The ones that pressure you to skip notice are usually the ones you’ll regret joining.'),

      h2('Hours, overtime, and that vague clause in your contract'),
      p('The standard week is 48 hours, normally 8 hours a day across 6 days. During Ramadan, Muslim employees get 2 hours shaved off each day. Overtime is paid at 125% of your hourly rate for the first two hours and 150% after that, or for night and Friday work.'),
      p('You’ll often see a line like "working hours as per business requirements." Companies lean on it to push unpaid extra hours. It does not override the 48-hour legal cap. If you’re routinely doing 60 hours with nothing extra in the bank, that’s not a grey area — that’s unpaid overtime.'),

      h2('Annual leave, and the money you’re owed if you don’t take it'),
      li('In your first year: 2 days of leave for every month worked, available after 6 months.'),
      li('After one full year: 30 calendar days a year.'),
      p('Leave the company with days unused? They owe you the cash for them, calculated on your basic salary — not your total package with allowances. Worth knowing before you resign with three weeks of leave sitting on the table.'),

      h2('End-of-service gratuity — the lump sum people underestimate'),
      p('Finish at least one year and you’re owed gratuity when you leave. It’s built on your basic salary, not the full package, which is why people are often disappointed by the final number:'),
      li('First 5 years: 21 days’ basic salary for each year.'),
      li('Beyond 5 years: 30 days’ basic salary for each year.'),
      li('The total caps at two years’ basic salary.'),
      p('Run the numbers before you hand in your notice, not after. Our free Gratuity Calculator does the math in a few seconds so you walk into the resignation conversation knowing the exact figure you should be paid.'),

      h2('When your salary is late'),
      p('Employers have to pay within 10 days of the due date. Past that, you can file with MOHRE directly — no lawyer needed to start:'),
      li('The MOHRE app on iOS or Android'),
      li('mohre.gov.ae'),
      li('The hotline on 600590000'),
      p('Companies take this seriously because repeat offenders can have their ability to hire new staff frozen by the ministry. In practice, most legitimate employers fix a delayed salary fast once a complaint lands. The threat of the complaint is often enough.'),

      h2('Can they fire you on the spot?'),
      p('Normally, no. Termination for performance or business reasons needs proper notice — usually 30 to 90 days depending on your contract. Instant dismissal with no notice is only legal for specific serious misconduct spelled out in the law: violence, turning up drunk, leaking confidential company information, that kind of thing.'),
      p('Get terminated with no valid reason and no notice and you may be owed compensation of up to three months’ pay, on top of your gratuity and any unused leave. Arbitrary dismissal is a real claim, and MOHRE’s dispute process exists precisely for it.'),

      h2('The short version'),
      p('Keep a copy of your MOHRE contract where you can reach it. Check that your payslips match what that contract promises. Learn the probation notice rules before you ever resign. And remember the MOHRE complaint process is free and it works — it’s there for exactly the moments when an employer is hoping you don’t know your rights.'),
      p('From here you might want to calculate your gratuity with our free tool, or build a clean Gulf-standard CV with our CV Maker before your next move.'),
    ],
  },

  {
    _id: 'article-driver-salary-uae-2026',
    _type: 'article',
    title: 'Driver Salary in UAE 2026 — What You’ll Actually Earn by Vehicle, Company, and City',
    slug: { _type: 'slug', current: 'driver-salary-uae-2026' },
    excerpt: 'A realistic 2026 breakdown of driver salaries in the UAE by vehicle type, company, and emirate — light vehicle, heavy truck, delivery, and school bus pay explained.',
    category: 'Salary Insights',
    tags: ['driver salary uae', 'delivery driver dubai', 'heavy driver salary', 'driving jobs uae'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Editorial Team',
    metaTitle: 'Driver Salary in UAE 2026 — By Vehicle and City',
    metaDescription: 'How much do drivers earn in the UAE in 2026? Light vehicle, heavy truck, delivery, and school bus salaries broken down by company and emirate.',
    content: [
      p('If you drive for a living in the UAE — or you’re weighing up a move here to do it — the first question is always the same: what does it actually pay? The honest answer is "it depends," but not in a useless way. It depends on three things you can mostly control: what you drive, who you drive for, and which emirate you’re based in.'),
      p('Here’s a realistic picture of the market as it stands in 2026. These are working ranges, not the inflated numbers you’ll see in some job ads or the rock-bottom ones a bad agency will quote you.'),

      h2('Light vehicle driver (car or van)'),
      p('This is the biggest category by far — delivery runs, company car driving, driver-cum-messenger roles, staff transport in smaller vehicles.'),
      li('New to the UAE, under 2 years here: AED 1,800 to 2,200 a month'),
      li('Experienced, 2 to 5 years: AED 2,200 to 2,800 a month'),
      li('Personal or executive driver: AED 3,000 to 4,500 a month'),
      p('Most of these come with fuel or a fuel card, and often a company SIM. Accommodation is the variable — a package role might include it, a straight salary role usually won’t. Always ask whether the quoted number includes accommodation, because AED 2,500 with a shared room is a very different deal from AED 2,500 where you pay your own rent.'),

      h2('Heavy vehicle driver (truck or trailer)'),
      p('The pay is better, but so is the grind — long hours, multiple drops, cross-emirate routes that start before sunrise.'),
      li('10-tonne truck: AED 2,500 to 3,200 a month'),
      li('Trailer / 18-wheeler: AED 3,000 to 4,000 a month'),
      li('Tanker (fuel or chemical): AED 3,500 to 5,000 a month, with the higher figure reflecting the risk'),
      p('You need a valid UAE heavy licence — a home-country heavy licence won’t cut it on its own. If you’re converting, budget roughly AED 3,000 to 5,000 and one to three months through a driving school. It’s an investment, but a heavy licence is genuinely worth several hundred dirhams more a month for the rest of your career here.'),

      h2('E-commerce delivery driver'),
      p('This is where most of the new hiring is. Noon, Amazon.ae, Talabat, and Deliveroo move enormous volumes of drivers, and the hiring is fast — some go from application to first shift in three to five days.'),
      li('Noon or Amazon.ae van delivery: AED 2,000 to 2,500 base, plus delivery bonuses'),
      li('Talabat or Deliveroo on a bike: AED 1,800 to 2,200, plus per-order incentives'),
      li('Some platforms pay purely per delivery, which rewards speed and stamina — strong months can beat a fixed salary, slow ones won’t'),
      p('Read the pay structure carefully before you sign. "Up to AED 4,000" usually means the base is much lower and you only hit the top with a punishing number of drops a day. Ask what an average driver in their second month actually takes home.'),

      h2('School bus driver'),
      p('The trade-off here is money for hours. The pay sits in the middle, but you’re usually done by mid-afternoon and your weekends and school holidays are genuinely free.'),
      li('Salary: AED 2,000 to 2,800 a month'),
      li('Often includes accommodation, sometimes meals'),
      li('Needs a light or heavy bus licence depending on vehicle size'),
      li('Expect a background check — a clean record isn’t negotiable when you’re carrying children'),

      h2('How the emirates compare'),
      p('Dubai pays the most for equivalent roles, simply because demand is high and so is the cost of living. Abu Dhabi runs close behind, and pulls ahead for government-linked and oil-and-gas transport work. Sharjah and Ajman pay less on paper, but rent is lower and accommodation is bundled more often, so the take-home gap is smaller than it looks.'),
      li('Dubai: roughly 10 to 15% above the UAE average for the same role'),
      li('Abu Dhabi: strongest for government and energy-sector transport'),
      li('Sharjah / Ajman: lower base, but accommodation included more frequently'),

      h2('What actually moves your salary up'),
      p('Beyond the obvious, a few things genuinely shift the number an employer will offer you:'),
      li('Licence class — a heavy licence is worth AED 500 to 1,000 more a month than light in most companies'),
      li('UAE experience specifically — employers pay a premium because you already know local roads, Salik, and traffic rules'),
      li('A clean record — no accidents, no outstanding fines, clean Salik history; many companies check before they offer'),
      li('Arabic — useful for some government and VIP driving roles, and it can lift the offer'),

      h2('Where to find driver jobs'),
      p('Walk-in interviews are how most drivers actually get hired here — companies run open-door days at their depots and warehouses and hire on the spot. Check our walk-in listings and the main UAE Jobs page, and have your licence, passport, visa copy, and a printed CV ready to go. For driving roles, employers often care more about your licence and record than your CV, but turning up organised still puts you ahead of half the room.'),
    ],
  },

  {
    _id: 'article-find-job-dubai-fresher-2026',
    _type: 'article',
    title: 'How to Find a Job in Dubai as a Fresher — Advice That Actually Works in 2026',
    slug: { _type: 'slug', current: 'how-to-find-a-job-in-dubai-as-a-fresher-2026' },
    excerpt: 'No UAE experience? Here’s a practical, honest guide to landing your first job in Dubai as a fresher in 2026 — which industries hire, what your CV needs, and where to apply.',
    category: 'Career Guides',
    tags: ['fresher jobs dubai', 'first job uae', 'jobs for freshers', 'dubai job search'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Mohammed Iqbal',
    metaTitle: 'How to Find a Job in Dubai as a Fresher (2026)',
    metaDescription: 'Honest 2026 guide to finding your first job in Dubai as a fresher: which industries hire freshers, how to fix your CV, and where to actually apply.',
    content: [
      p('Everyone who moved to Dubai for work remembers the first few weeks. You’ve landed, the visa is either sorted or still on a visit stamp, and the job hunt suddenly feels twice as hard as it looked from back home. Nobody’s calling back. Your CV seems to vanish the second you hit send.'),
      p('Here’s the part the panic hides from you: Dubai hires freshers every single week. The people who struggle usually aren’t unqualified — they’re aiming at the wrong industries, sending the wrong CV, or applying in the wrong places. Fix those three things and the callbacks start.'),

      h2('Which industries actually hire people with no experience'),
      p('Not every sector wants a blank slate, but several hire freshers in real volume, all year round:'),
      li('Retail and FMCG — supermarkets, fashion, electronics. They want presentable, decent English, and a willingness to work weekends. UAE experience is a bonus, not a requirement.'),
      li('Hospitality — hotels and restaurants hire stewards, waiters, kitchen helpers, and housekeeping constantly. Many roles include accommodation and meals, which quietly makes a low salary go a lot further.'),
      li('Logistics and warehousing — packing, sorting, warehouse operative work rarely asks for experience. Fit and available-immediately is most of the battle.'),
      li('Call centres — customer service and telesales often prefer freshers so they can train you their way. Fluent English or Hindi is the real gatekeeper.'),
      li('Security and facilities — guards, cleaners, general labour. High volume, fast joining, and SIRA licensing help for security.'),

      h2('Fix your CV before you send another application'),
      p('Your CV is the first and often only thing an employer sees, and Gulf CVs follow a few conventions that differ from what you may have used back home:'),
      li('One page if you have under three years of experience. Two pages maximum, ever.'),
      li('A professional photo, top right. Standard in the UAE and the wider GCC, even though it’s discouraged in Western markets.'),
      li('Your visa status, stated plainly — visit visa, employment visa needing transfer, or needing sponsorship. Recruiters want this answered before they read further.'),
      li('A three-line summary at the top. Something like: "Hospitality graduate with hotel training, looking for a full-time front-office or F&B role in Dubai, available immediately." Specific beats generic every time.'),
      p('If formatting isn’t your strength, our free CV Maker builds a clean, Gulf-standard layout in a few minutes — photo placement, sections, and all.'),

      h2('Where to actually apply'),
      p('There are a hundred job platforms and most freshers burn weeks on the ones that don’t move. Here’s what works, roughly in order:'),
      li('Walk-in interviews — the fastest route, full stop. Companies running walk-ins want to hire quickly. Check our walk-in page weekly and just show up prepared.'),
      li('Company career pages — if you want Carrefour, Emaar, Majid Al Futtaim, or a specific hotel group, apply on their own site. Cut out the middleman and you move faster.'),
      li('LinkedIn — set your profile to Open to Work and send short, human connection notes to Dubai HR staff. Not copy-paste. People can smell copy-paste.'),
      li('Bayt and GulfTalent — the established Gulf boards. Set alerts for your category so you’re early on new posts.'),
      li('WhatsApp job groups — a lot of UAE hiring still moves through them. Ask anyone you know here to add you to relevant ones.'),

      h2('The visit visa clock'),
      p('Plenty of freshers arrive on a 30 or 60-day visit visa hoping to land something before it runs out. It can work, but only if you’re realistic about the timeline. Most companies take two to four weeks from interview to offer to visa processing. That means you start applying in week one, not week three.'),
      p('Running low on days? You can usually extend a visit visa once for 30 days at an immigration office or typing centre. Or step out and come back once a company has begun your work-visa paperwork — some employers will process it even while you’re outside the country.'),

      h2('Things nobody tells you'),
      li('Timing matters. September to November and January to March are the strong hiring months. August is dead, December is quiet. If you’re getting silence in midsummer, the calendar may be the problem, not you.'),
      li('Accommodation changes the math. A lower salary with accommodation included can beat a higher one where you pay your own rent. Compare take-home, not headline.'),
      li('Never pay for a job. Legitimate UAE employers do not charge job seekers, ever. Anyone asking for money to "process" or "secure" your role is running a scam. Walk away.'),
      li('If one industry gives you nothing for weeks, switch lanes. The skill that won’t land you a callback in one sector can be exactly what another is short on.'),

      h2('Be patient, but be relentless'),
      p('Almost nobody who lands a first job in Dubai got lucky. They applied consistently for four to six weeks, went to every walk-in they could reach, and kept the CV sharp. The ones who quit after two weeks of silence usually needed one more week. Keep going — and use this site to pull fresh listings every week so you’re never out of leads.'),
    ],
  },

  {
    _id: 'article-renew-uae-work-visa-2026',
    _type: 'article',
    title: 'How to Renew Your UAE Work Visa in 2026 — Steps, Documents, Costs, and Timelines',
    slug: { _type: 'slug', current: 'how-to-renew-uae-work-visa-2026' },
    excerpt: 'Your UAE work visa is expiring? Here’s exactly how renewal works in 2026 — the medical, Emirates ID, visa stamping, documents you need, costs, and what to do if your company stalls.',
    category: 'Visa & PRO Guides',
    tags: ['uae work visa renewal', 'residence visa uae', 'emirates id renewal', 'pro services uae'],
    status: 'published',
    publishDate: now,
    lastUpdatedDate: now,
    author: 'Aisha Rahman',
    metaTitle: 'How to Renew Your UAE Work Visa 2026 — Full Guide',
    metaDescription: 'Step-by-step 2026 guide to renewing your UAE work visa: medical test, Emirates ID, visa stamping, documents, costs, timelines, and what to do if HR delays.',
    content: [
      p('Most employees in the UAE never really handle their own visa renewal — the company PRO does the running around. That’s fine, right up until your passport has been sitting in HR for three weeks and nobody can tell you what’s happening. Knowing how the process actually works means you can ask the right questions instead of just waiting and worrying.'),
      p('Here’s the whole thing, start to finish, as it stands in 2026.'),

      h2('When does it need to happen?'),
      p('Employment visas usually run two years; some free-zone visas run three. Your company should kick off the renewal at least 30 days before expiry. If the visa lapses before the paperwork is done, you typically get a grace period — around 30 days — to stay without fines while it’s sorted.'),
      p('After the grace period, overstay fines start at AED 50 a day. Don’t let it drift that far. If your expiry is six weeks out and HR hasn’t mentioned renewal, that’s your cue to ask.'),

      h2('Step 1 — Medical fitness test'),
      p('Before anything else, you pass a medical at a government-approved centre. Standard requirement for every employment visa.'),
      li('Includes a blood test and a chest X-ray'),
      li('Screens for infectious diseases — TB, HIV, Hepatitis B and C'),
      li('Costs roughly AED 250 to 550 depending on the emirate and how fast you want results'),
      li('Results usually ready in one to two working days'),
      li('Your PRO either takes you or hands you a referral to go yourself'),

      h2('Step 2 — Emirates ID'),
      p('Your Emirates ID and residence visa renew together. If your biometrics need updating, you’ll register fingerprints and a photo at an ICP-approved centre.'),
      li('Bring your passport'),
      li('Your employer or PRO normally files the application and pays the fee'),
      li('Emirates ID renewal runs around AED 100 for a two-year card'),

      h2('Step 3 — Visa stamping'),
      p('Once the medical clears and the Emirates ID application is in, immigration processes the residence visa. These days it’s mostly an electronic visa linked to your file rather than a physical stamp in the passport.'),
      li('Processing usually takes 5 to 10 working days'),
      li('Some free zones move faster, in the 3 to 5 day range'),
      li('You can travel within the UAE normally during this time'),
      p('If you need to fly internationally mid-process, your PRO can usually pull the file back temporarily — but it adds time, so flag it early rather than the night before your flight.'),

      h2('Documents to have ready'),
      p('Hand these over at the start and you avoid the back-and-forth that drags renewals out:'),
      li('Original passport, valid at least 6 months beyond the new visa'),
      li('Two recent passport photos, white background'),
      li('Copy of your current Emirates ID'),
      li('Copy of your current residence visa'),
      li('Employment contract or salary certificate, if asked'),

      h2('What it costs'),
      p('If the company is covering it — which, by law, it generally should for the work visa itself — you pay nothing. On certain free-zone packages where the employee carries their own costs, the rough totals are:'),
      li('Medical: AED 250 to 550'),
      li('Emirates ID: AED 100'),
      li('Visa fee: AED 400 to 700 depending on emirate and type'),
      li('Typing centre service charge: AED 100 to 200'),
      li('All in: roughly AED 850 to 1,400'),

      h2('When the company drags its feet'),
      p('It happens more than it should. If your renewal is stalling with no explanation, take these steps in order — each one builds a paper trail:'),
      li('Ask HR or the PRO for a written update on where the renewal stands. Get it in writing, not just verbally.'),
      li('Check your own status on the ICP smart services portal using your passport or file number, so you’re not relying solely on what HR tells you.'),
      li('If the company is genuinely stalling and the visa has already expired, file a complaint with MOHRE. Visa obligations are taken seriously, and a complaint usually moves things fast.'),

      h2('Once it’s renewed, check three things'),
      p('When your passport and new visa come back, verify before you relax:'),
      li('Your name matches your passport spelling exactly'),
      li('The expiry is two years out from the new issue date — not carried over from the old one'),
      li('Your employer’s name matches your current company'),
      p('Spot anything wrong and go straight back to the PRO. Corrections after the fact need a separate process and cost you more time. For the bigger picture on your rights at work, our UAE Labour Law guide is worth a read, and if you’re renewing because you’re moving on, run the numbers first with our Gratuity Calculator.'),
    ],
  },
];

async function run() {
  for (const a of articles) {
    await client.createOrReplace(a as any);
    console.log('Published:', a.slug.current);
  }
  console.log(`\nDone. ${articles.length} articles published to Sanity.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import Job from '@/lib/models/Job';
import Article from '@/lib/models/Article';
import { getAuthFromCookies } from '@/lib/auth';

// POST /api/seed — Create initial admin account and sample data
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Check if this is a first-time seed (no admin exists)
    const adminCount = await Admin.countDocuments();

    // Allow seeding if no admin exists OR if authenticated admin requests it
    if (adminCount > 0) {
      const admin = await getAuthFromCookies();
      if (!admin) {
        return NextResponse.json(
          { error: 'Admin already exists. Login to re-seed data.' },
          { status: 403 }
        );
      }
    }

    const { seedType } = await request.json().catch(() => ({ seedType: 'all' }));

    const results: Record<string, string> = {};

    // Seed admin account
    if (seedType === 'all' || seedType === 'admin') {
      const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@theuaecareer.com' });
      if (!existingAdmin) {
        await Admin.create({
          email: process.env.ADMIN_EMAIL || 'admin@theuaecareer.com',
          password: process.env.ADMIN_PASSWORD || 'admin123',
        });
        results.admin = 'Admin account created';
      } else {
        results.admin = 'Admin already exists';
      }
    }

    // Seed sample jobs
    if (seedType === 'all' || seedType === 'jobs') {
      const jobCount = await Job.countDocuments();
      if (jobCount === 0) {
        const sampleJobs = getSampleJobs();
        await Job.insertMany(sampleJobs);
        results.jobs = `${sampleJobs.length} sample jobs created`;
      } else {
        results.jobs = `${jobCount} jobs already exist`;
      }
    }

    // Seed sample articles
    if (seedType === 'all' || seedType === 'articles') {
      await Article.deleteMany({}); // Clear existing to ensure fresh data
      const sampleArticles = getSampleArticles();
      await Article.insertMany(sampleArticles);
      results.articles = `${sampleArticles.length} sample articles recreated`;
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

function getSampleJobs() {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  return [
    {
      title: 'Sales Executive',
      companyName: 'Al Futtaim Group',
      location: { city: 'Dubai', country: 'UAE' },
      jobType: 'Full-time',
      salaryRange: { min: 5000, max: 8000, currency: 'AED' },
      experienceRequired: '1-3 years',
      category: 'Sales',
      description: '<p>We are looking for a motivated Sales Executive to join our dynamic team in Dubai. The ideal candidate will have experience in retail or B2B sales within the UAE market.</p><h3>Responsibilities</h3><ul><li>Develop and maintain client relationships</li><li>Meet monthly sales targets</li><li>Conduct product presentations and demos</li><li>Prepare sales reports and forecasts</li></ul><h3>Requirements</h3><ul><li>1-3 years of sales experience in UAE</li><li>Excellent communication skills in English</li><li>Valid UAE driving license preferred</li><li>Knowledge of Gulf market dynamics</li></ul>',
      howToApply: 'Send your CV to careers@alfuttaim.com with subject line "Sales Executive Application"',
      expiryDate: nextMonth,
      isWalkIn: false,
      slug: 'sales-executive-al-futtaim-group-dubai',
      metaTitle: 'Sales Executive at Al Futtaim Group in Dubai — theuaecareer.com',
      metaDescription: 'Al Futtaim Group is hiring a Sales Executive in Dubai. 1-3 years experience, AED 5,000-8,000 salary. Apply now.',
    },
    {
      title: 'Delivery Driver',
      companyName: 'Noon',
      location: { city: 'Dubai', country: 'UAE' },
      jobType: 'Full-time',
      salaryRange: { min: 3500, max: 5500, currency: 'AED' },
      experienceRequired: '0-1 years',
      category: 'Logistics',
      description: '<p>Noon is hiring delivery drivers in Dubai! Join the fastest-growing e-commerce company in the Middle East.</p><h3>What We Offer</h3><ul><li>Competitive salary + delivery bonuses</li><li>Company vehicle provided</li><li>Health insurance</li><li>Accommodation assistance</li></ul><h3>Requirements</h3><ul><li>Valid UAE driving license</li><li>Good knowledge of Dubai roads</li><li>Smartphone with data plan</li><li>Ability to lift up to 20kg</li></ul>',
      howToApply: 'Apply through WhatsApp: +971-50-XXX-XXXX or visit noon.com/careers',
      expiryDate: nextMonth,
      isWalkIn: false,
      slug: 'delivery-driver-noon-dubai',
      metaTitle: 'Delivery Driver at Noon in Dubai — theuaecareer.com',
      metaDescription: 'Noon is hiring Delivery Drivers in Dubai. Company vehicle provided, AED 3,500-5,500. Apply now.',
    },
    {
      title: 'Registered Nurse',
      companyName: 'Mediclinic',
      location: { city: 'Abu Dhabi', country: 'UAE' },
      jobType: 'Full-time',
      salaryRange: { min: 8000, max: 14000, currency: 'AED' },
      experienceRequired: '2-5 years',
      category: 'Healthcare',
      description: '<p>Mediclinic Abu Dhabi is recruiting experienced Registered Nurses for our expanding hospital network.</p><h3>Responsibilities</h3><ul><li>Provide direct patient care according to established care plans</li><li>Monitor patient condition and document changes</li><li>Administer medications and treatments</li><li>Collaborate with physicians and healthcare team</li></ul><h3>Requirements</h3><ul><li>Bachelor of Science in Nursing</li><li>2-5 years clinical experience</li><li>DOH (Department of Health) license or eligibility</li><li>BLS certification</li></ul>',
      howToApply: 'Apply online at mediclinic.ae/careers or email nursing.recruitment@mediclinic.ae',
      expiryDate: nextMonth,
      isWalkIn: false,
      slug: 'registered-nurse-mediclinic-abu-dhabi',
      metaTitle: 'Registered Nurse at Mediclinic in Abu Dhabi — theuaecareer.com',
      metaDescription: 'Mediclinic Abu Dhabi is hiring Registered Nurses. 2-5 years experience, AED 8,000-14,000. Apply now.',
    },
    {
      title: 'Walk-In Interview — Hotel Staff (Multiple Positions)',
      companyName: 'Rotana Hotels',
      location: { city: 'Dubai', country: 'UAE' },
      jobType: 'Walk-in',
      salaryRange: { min: 3000, max: 7000, currency: 'AED' },
      experienceRequired: 'Freshers welcome',
      category: 'Hospitality',
      description: '<p>Rotana Hotels is conducting walk-in interviews for multiple hospitality positions in Dubai!</p><h3>Available Positions</h3><ul><li>Front Desk Receptionist</li><li>Housekeeping Staff</li><li>F&B Waiter / Waitress</li><li>Kitchen Helper</li><li>Bellboy</li></ul><h3>What to Bring</h3><ul><li>Updated CV (printed copies)</li><li>Passport copy</li><li>Visa copy</li><li>Passport-size photographs</li></ul>',
      howToApply: 'Walk in directly to the venue with your CV and documents',
      expiryDate: nextWeek,
      isWalkIn: true,
      walkInDetails: {
        date: tomorrow,
        time: '9:00 AM - 4:00 PM',
        venue: 'Rotana Hotel, Sheikh Zayed Road, Dubai',
      },
      slug: 'walk-in-interview-hotel-staff-rotana-hotels-dubai',
      metaTitle: 'Walk-In Interview — Hotel Staff at Rotana Hotels Dubai — theuaecareer.com',
      metaDescription: 'Walk-in interview at Rotana Hotels Dubai for multiple hotel positions. Freshers welcome. AED 3,000-7,000.',
    },
    {
      title: 'Walk-In Interview — Warehouse Workers & Drivers',
      companyName: 'Emirates Logistics',
      location: { city: 'Sharjah', country: 'UAE' },
      jobType: 'Walk-in',
      salaryRange: { min: 2500, max: 4500, currency: 'AED' },
      experienceRequired: '0-2 years',
      category: 'Logistics',
      description: '<p>Emirates Logistics is hiring warehouse workers and delivery drivers through walk-in interviews in Sharjah.</p><h3>Positions Available</h3><ul><li>Warehouse Helper</li><li>Forklift Operator</li><li>Light Vehicle Driver</li><li>Heavy Vehicle Driver</li></ul><h3>Requirements</h3><ul><li>Valid UAE visa</li><li>Drivers must have valid UAE license</li><li>Physical fitness required for warehouse roles</li></ul>',
      howToApply: 'Walk in with your CV and documents',
      expiryDate: nextWeek,
      isWalkIn: true,
      walkInDetails: {
        date: dayAfter,
        time: '10:00 AM - 3:00 PM',
        venue: 'Emirates Logistics, Industrial Area 5, Sharjah',
      },
      slug: 'walk-in-warehouse-workers-drivers-sharjah',
      metaTitle: 'Walk-In Interview — Warehouse Workers & Drivers in Sharjah — theuaecareer.com',
      metaDescription: 'Walk-in interview for warehouse workers and drivers in Sharjah. AED 2,500-4,500. Freshers welcome.',
    },
    {
      title: 'Software Developer',
      companyName: 'Careem',
      location: { city: 'Dubai', country: 'UAE' },
      jobType: 'Full-time',
      salaryRange: { min: 15000, max: 25000, currency: 'AED' },
      experienceRequired: '3-5 years',
      category: 'IT',
      description: '<p>Join Careem, the leading ride-hailing platform in the Middle East, as a Software Developer based in Dubai.</p><h3>Responsibilities</h3><ul><li>Design and develop scalable backend services</li><li>Write clean, maintainable code in Node.js / Python</li><li>Participate in code reviews and technical discussions</li><li>Work with cross-functional teams in an Agile environment</li></ul><h3>Requirements</h3><ul><li>Bachelor degree in Computer Science or equivalent</li><li>3-5 years of professional software development</li><li>Strong in Node.js, Python, or Go</li><li>Experience with cloud services (AWS/GCP)</li><li>Knowledge of microservices architecture</li></ul>',
      howToApply: 'Apply at careem.com/careers or send CV to tech.hiring@careem.com',
      expiryDate: nextMonth,
      isWalkIn: false,
      slug: 'software-developer-careem-dubai',
      metaTitle: 'Software Developer at Careem in Dubai — theuaecareer.com',
      metaDescription: 'Careem is hiring a Software Developer in Dubai. 3-5 years experience, AED 15,000-25,000. Apply now.',
    },
    {
      title: 'Accountant',
      companyName: 'KPMG Lower Gulf',
      location: { city: 'Abu Dhabi', country: 'UAE' },
      jobType: 'Full-time',
      salaryRange: { min: 8000, max: 12000, currency: 'AED' },
      experienceRequired: '2-4 years',
      category: 'Finance',
      description: '<p>KPMG Lower Gulf is seeking an experienced Accountant for our Abu Dhabi office.</p><h3>Responsibilities</h3><ul><li>Prepare financial statements and reports</li><li>Handle accounts payable and receivable</li><li>Reconcile bank statements and general ledger</li><li>Support month-end and year-end closing processes</li><li>Ensure compliance with UAE tax regulations</li></ul><h3>Requirements</h3><ul><li>Bachelor degree in Accounting or Finance</li><li>2-4 years of accounting experience</li><li>CPA, ACCA, or CMA certification preferred</li><li>Proficiency in ERP systems (SAP/Oracle)</li></ul>',
      howToApply: 'Apply through kpmg.com/ae/careers',
      expiryDate: nextMonth,
      isWalkIn: false,
      slug: 'accountant-kpmg-abu-dhabi',
      metaTitle: 'Accountant at KPMG in Abu Dhabi — theuaecareer.com',
      metaDescription: 'KPMG is hiring an Accountant in Abu Dhabi. 2-4 years experience, AED 8,000-12,000. Apply now.',
    },
    {
      title: 'Walk-In Interview — Retail Sales Staff',
      companyName: 'Lulu Hypermarket',
      location: { city: 'Dubai', country: 'UAE' },
      jobType: 'Walk-in',
      salaryRange: { min: 2500, max: 4000, currency: 'AED' },
      experienceRequired: 'Freshers welcome',
      category: 'Retail',
      description: '<p>Lulu Hypermarket is conducting walk-in interviews for retail sales positions across their Dubai branches.</p><h3>Positions</h3><ul><li>Sales Associate</li><li>Cashier</li><li>Stock Supervisor</li><li>Customer Service Representative</li></ul><h3>Benefits</h3><ul><li>Accommodation provided</li><li>Transportation provided</li><li>Annual air tickets</li><li>Medical insurance</li></ul>',
      howToApply: 'Walk in with your CV, passport copy, and visa copy',
      expiryDate: nextWeek,
      isWalkIn: true,
      walkInDetails: {
        date: tomorrow,
        time: '10:00 AM - 5:00 PM',
        venue: 'Lulu Hypermarket Head Office, Al Qusais, Dubai',
      },
      slug: 'walk-in-retail-sales-lulu-hypermarket-dubai',
      metaTitle: 'Walk-In Interview — Retail Staff at Lulu Hypermarket Dubai — theuaecareer.com',
      metaDescription: 'Walk-in interview at Lulu Hypermarket Dubai for sales, cashier, and stock positions. Freshers welcome.',
    },
  ];
}

function getSampleArticles() {
  return [
    {
      title: 'Dubai & Abu Dhabi Walk-in Interviews: This Week\'s Full Roundup',
      slug: 'dubai-abu-dhabi-walk-in-interviews-roundup',
      content: '<p>Explore over 45 immediate hiring opportunities across hospitality, security, and retail sectors for the upcoming week in the UAE.</p><h2>Top Walk-In Events</h2><p>This week marks a massive recruitment drive from luxury hotel chains and major retail conglomerates preparing for the upcoming busy season. Walk-in interviews offer the fastest route to employment because you bypass ATS filters and speak directly to hiring managers.</p><h3>What you need to bring</h3><ul><li>3-4 copies of your updated resume</li><li>Passport size photographs with white background</li><li>Passport and visa copies</li><li>Educational certificates (attested preferred)</li></ul>',
      excerpt: 'Explore over 45 immediate hiring opportunities across hospitality, security, and retail sectors for the upcoming week in the UAE.',
      metaTitle: 'Dubai & Abu Dhabi Walk-in Interviews: This Week\'s Full Roundup',
      metaDescription: 'Complete roundup of walk in interviews happening in Dubai and Abu Dhabi this week.',
      category: 'Walk-In Interviews',
      tags: ['walk-in', 'dubai', 'abu dhabi', 'hiring'],
      status: 'published',
      publishDate: new Date(),
      lastUpdatedDate: new Date(),
      readTime: 12,
    },
    {
      title: 'UAE Tech Salary Guide 2024: What to Expect?',
      slug: 'uae-tech-salary-guide-2024',
      content: '<p>From junior developers to CTOs, we break down the latest compensation data for the Emirates tech hub.</p><h2>The Boom of Tech in the UAE</h2><p>The UAE has solidified its position as the Silicon Valley of the Middle East. With the influx of global talent and heavy government investment in AI, Web3, and fintech, salaries have seen a steady increase.</p><h3>Average Salaries by Role</h3><ul><li><strong>Frontend Developer (React/Vue/Angular):</strong> AED 12,000 - 22,000 monthly</li><li><strong>Backend Developer (Node/Python/Java):</strong> AED 14,000 - 25,000 monthly</li><li><strong>Data Scientist:</strong> AED 18,000 - 35,000 monthly</li><li><strong>Engineering Manager:</strong> AED 30,000 - 55,000+ monthly</li></ul><p>Remember, salaries in the UAE are entirely tax-free, which significantly increases your net take-home pay compared to Europe or North America.</p>',
      excerpt: 'From junior developers to CTOs, we break down the latest compensation data for the Emirates tech hub.',
      metaTitle: 'UAE Tech Salary Guide 2024',
      metaDescription: 'Comprehensive salary guide for software engineering, data science, and IT roles in the UAE.',
      category: 'Salary Insights',
      tags: ['salary', 'tech', 'software engineering'],
      status: 'published',
      publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastUpdatedDate: new Date(),
      readTime: 8,
    },
    {
      title: 'Emirates Group Careers: Strategic Hiring for 2025',
      slug: 'emirates-group-careers-strategic-hiring-2025',
      content: '<p>A deep dive into the massive recruitment drive announced by the world\'s leading airline group.</p><h2>Opportunities Beyond Cabin Crew</h2><p>While Emirates is famous for its multicultural cabin crew, the Emirates Group (including dnata) is actively hiring thousands of professionals across IT, engineering, finance, and ground operations.</p><h3>Key Benefits of Joining Emirates</h3><p>Working for the Emirates Group comes with legendary benefits including comprehensive medical insurance, discounted travel (staff travel) for you and your family, and a prestigious name on your CV.</p>',
      excerpt: 'A deep dive into the massive recruitment drive announced by the world\'s leading airline group.',
      metaTitle: 'Emirates Group Careers: Strategic Hiring for 2025',
      metaDescription: 'Learn about the massive recruitment drive and benefits of working at Emirates Group.',
      category: 'Company Hiring',
      tags: ['emirates', 'aviation', 'dubai jobs'],
      status: 'published',
      publishDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      lastUpdatedDate: new Date(),
      readTime: 5,
    },
    {
      title: 'Golden Visa vs Green Visa: Which is right for you?',
      slug: 'golden-visa-vs-green-visa-comparisons',
      content: '<p>Understanding the nuances of the new residency frameworks in the United Arab Emirates.</p><h2>The Shift in UAE Residency</h2><p>The UAE has fundamentally revamped its visa system to attract and retain global talent long-term. The Golden Visa and Green Visa are the centerpieces of this new framework.</p><h3>Golden Visa (10 Years)</h3><p>Targeted at investors, entrepreneurs, exceptional talents, scientists, and outstanding students. It provides self-sponsored residency for 10 years and allows you to sponsor your family regardless of their age.</p><h3>Green Visa (5 Years)</h3><p>Designed for skilled professionals, freelancers, and self-employed individuals. It offers 5 years of residency without needing a local sponsor or employer, giving you massive career flexibility.</p>',
      excerpt: 'Understanding the nuances of the new residency frameworks in the United Arab Emirates.',
      metaTitle: 'Golden Visa vs Green Visa UAE',
      metaDescription: 'Compare the Golden Visa and Green Visa requirements and benefits in the UAE.',
      category: 'Visa Guides',
      tags: ['visa', 'golden visa', 'green residency'],
      status: 'published',
      publishDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      lastUpdatedDate: new Date(),
      readTime: 10,
    },
    {
      title: 'Crushing the UAE Interview: Cultural Best Practices',
      slug: 'crushing-uae-interview-cultural-practices',
      content: '<p>Master the social and professional etiquette required for job interviews in the Gulf region.</p><h2>Navigating the Cultural Nuances</h2><p>Interviewing in the UAE is unique because you are often dealing with hiring managers from vastly different cultural backgrounds—Western, South Asian, local Emirati, or Levant. Flexibility is key.</p><h3>Dress Code</h3><p>Conservative and professional is the rule. For men, a suit and tie are almost always expected unless explicitly stated otherwise. For women, business professional attire that covers the shoulders and knees is recommended.</p><h3>Communication Style</h3><p>Always address interviewers formally (Mr./Ms.) until invited to use first names. Politeness and respect for hierarchy are highly valued in corporate Gulf cultures.</p>',
      excerpt: 'Master the social and professional etiquette required for job interviews in the Gulf region.',
      metaTitle: 'Crushing the UAE Interview: Cultural Best Practices',
      metaDescription: 'Learn the cultural nuances and etiquette needed to pass job interviews in Dubai and the UAE.',
      category: 'Career Guides',
      tags: ['interview tips', 'culture', 'career guide'],
      status: 'published',
      publishDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      lastUpdatedDate: new Date(),
      readTime: 7,
    },
    {
      title: 'How to calculate your End of Service Gratuity in 2025',
      slug: 'calculate-end-of-service-gratuity-2025',
      content: '<p>A complete mathematical breakdown of the UAE labor law regarding your final settlement.</p><h2>The Core Formula</h2><p>Under the new UAE Labor Law, your end of service gratuity is calculated strictly on your basic salary (excluding housing, transport, and other allowances). If you have worked for more than one year but less than five years, you get 21 days of basic wage for each year. If you have worked more than five years, you get 30 days of basic wage for each additional year.</p><p>Use our free AI calculator to instantly compute exactly what you are owed without doing the complex math yourself.</p>',
      excerpt: 'A complete mathematical breakdown of the UAE labor law regarding your final settlement.',
      metaTitle: 'Calculate UAE Gratuity 2025',
      metaDescription: 'Learn the exact mathematical formula to calculate your end of service gratuity in the UAE.',
      category: 'Salary Insights',
      tags: ['gratuity', 'salary', 'labor law'],
      status: 'published',
      publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      lastUpdatedDate: new Date(),
      readTime: 6,
    }
  ];
}

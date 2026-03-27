// Job categories
export const JOB_CATEGORIES = [
  'Hospitality',
  'IT',
  'Construction',
  'Healthcare',
  'Sales',
  'Logistics',
  'Admin',
  'Finance',
  'Education',
  'Engineering',
  'Retail',
  'Other',
] as const;

// Countries
export const COUNTRIES = ['UAE', 'Saudi Arabia', 'Qatar'] as const;

// Job types
export const JOB_TYPES = ['Full-time', 'Part-time', 'Walk-in', 'Contract'] as const;

// UAE cities
export const UAE_CITIES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
] as const;

// Article categories
export const ARTICLE_CATEGORIES = [
  'Walk-In Interviews',
  'Company Hiring',
  'Career Guides',
  'Salary Insights',
  'Visa & PRO Guides',
  'Industry Roundups',
] as const;

// Article statuses
export const ARTICLE_STATUSES = ['draft', 'published', 'archived'] as const;

// Site metadata
export const SITE_NAME = 'theuaecareer.com';
export const SITE_TAGLINE = 'Your Gateway to Gulf Careers';
export const SITE_DESCRIPTION =
  'Find the latest jobs in UAE, Dubai, Abu Dhabi, and the Gulf region. Walk-in interviews, career guides, salary insights, and free tools for UAE job seekers.';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const isLocalSiteUrl =
  !configuredSiteUrl ||
  configuredSiteUrl.includes('localhost') ||
  configuredSiteUrl.includes('127.0.0.1');

export const SITE_URL = isLocalSiteUrl ? 'https://theuaecareer.com' : configuredSiteUrl;

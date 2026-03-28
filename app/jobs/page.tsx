import type { Metadata } from 'next';
import JobsListingClient from '@/components/JobsListingClient';
import { getAllPublicJobs } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Latest Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers',
  description:
    'Browse the latest job openings in UAE, Dubai, Abu Dhabi, Sharjah, Saudi Arabia and Qatar. Filter by country, job type, and industry.',
  alternates: {
    canonical: '/jobs',
  },
  openGraph: {
    title: 'Latest Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers',
    description:
      'Browse the latest job openings in UAE, Dubai, Abu Dhabi, Sharjah, Saudi Arabia and Qatar. Filter by country, job type, and industry.',
    url: '/jobs',
  },
};

export default async function JobsPage() {
  const jobs = await getAllPublicJobs();

  return <JobsListingClient initialJobs={jobs} />;
}

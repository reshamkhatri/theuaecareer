import type { Metadata } from 'next';
import JobsListingClient from '@/components/JobsListingClient';
import { SITE_URL } from '@/lib/constants';
import { getAllPublicJobs } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Latest Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers',
  description:
    'Browse the latest job openings in UAE, Dubai, Abu Dhabi, Sharjah, Saudi Arabia and Qatar. Filter by country, job type, and industry.',
  alternates: {
    canonical: '/jobs/',
  },
  openGraph: {
    title: 'Latest Jobs in UAE 2026 - Dubai, Abu Dhabi, Gulf Careers',
    description:
      'Browse the latest job openings in UAE, Dubai, Abu Dhabi, Sharjah, Saudi Arabia and Qatar. Filter by country, job type, and industry.',
    url: '/jobs/',
  },
};

export default async function JobsPage() {
  const jobs = await getAllPublicJobs();
  const jobsCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Latest Gulf Jobs',
    description:
      'Browse current job openings in the UAE and Gulf region, including Dubai, Abu Dhabi, Sharjah, Saudi Arabia, and Qatar.',
    url: `${SITE_URL}/jobs/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: jobs.slice(0, 12).map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/jobs/${job.slug}/`,
        name: job.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsCollectionJsonLd) }}
      />
      <JobsListingClient initialJobs={jobs} />
    </>
  );
}

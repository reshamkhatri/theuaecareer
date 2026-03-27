import JobsListingClient from '@/components/JobsListingClient';
import { getAllPublicJobs } from '@/lib/content';

export const revalidate = 300;

export default async function JobsPage() {
  const jobs = await getAllPublicJobs();

  return <JobsListingClient initialJobs={jobs} />;
}

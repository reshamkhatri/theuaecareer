import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-03-27',
});

async function checkJobs() {
  const query = `*[_type == "job"]|order(postedDate desc){title, "slug": slug.current, expiryDate, status, companyName}`;
  const jobs = await client.fetch(query);
  
  console.log('--- ALL JOBS IN SANITY CMS (Full List) ---');
  for (const [i, j] of jobs.entries()) {
    console.log(`${i + 1}. ${j.title} | Company: ${j.companyName} | Slug: ${j.slug}`);
  }
  console.log(`\nTotal jobs: ${jobs.length}`);
}

checkJobs().catch(console.error);

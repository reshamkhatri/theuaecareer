import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-03-27',
});

async function checkJobs() {
  const query = `*[_type == "job"]{title, "slug": slug.current}`;
  const jobs = await client.fetch(query);
  
  console.log('--- ALL JOBS IN SANITY CMS ---');
  jobs.forEach((j: any) => {
    console.log(`- ${j.title} (${j.slug})`);
  });
  console.log(`\nTotal jobs: ${jobs.length}`);
}

checkJobs().catch(console.error);

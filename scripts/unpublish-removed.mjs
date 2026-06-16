import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'gmirvpfp', dataset: 'production',
  apiVersion: '2026-03-27', token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false,
});

// Slugs removed in the 2026-06 cleanup that originate as Sanity documents.
const removedSlugs = [
  'nurse-salary-uae-2026',
  'uae-golden-visa-eligibility-guide-2026',
  'walk-in-interview-self-introduction-sample-uae',
  'what-to-carry-for-walk-in-interview-uae',
  'cv-for-housekeeping-jobs-dubai-sample',
  'walk-in-interview-checklist-uae',
  'documents-for-walk-in-interview-dubai',
  'walk-in-interviews-dubai-this-week',
  'walk-in-interviews-abu-dhabi-this-week',
  'walk-in-interviews-sharjah-this-week',
  'verified-dubai-jobs-open-now-direct-employer-march-2026',
  'dubai-salary-guide-2026-by-industry',
  'retail-sales-associate-interview-questions-uae',
  'room-attendant-interview-questions-dubai',
];

const docs = await client.fetch(
  `*[_type=="article" && slug.current in $slugs]{ _id, "slug": slug.current, status }`,
  { slugs: removedSlugs }
);

console.log(`Matched ${docs.length} Sanity docs to unpublish:`);
let tx = client.transaction();
for (const d of docs) {
  console.log(`  draft <- ${d.slug} (${d._id}) [was: ${d.status}]`);
  tx = tx.patch(d._id, (p) => p.set({ status: 'draft' }));
}
if (docs.length) {
  await tx.commit();
  console.log('Committed.');
} else {
  console.log('Nothing to do.');
}

const missing = removedSlugs.filter((s) => !docs.find((d) => d.slug === s));
if (missing.length) console.log('\nNot found in Sanity (likely static-only):', missing.join(', '));

import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  apiVersion: '2026-03-27',
  useCdn: false,
});

async function check() {
  const articles = await client.fetch(
    `*[_type == "article"] | order(publishDate desc) { title, "slug": slug.current, category }`
  );
  console.log(`\n=== EXISTING ARTICLES (${articles.length}) ===`);
  for (const a of articles) {
    console.log(`- [${a.category}] ${a.slug}`);
  }
}

check();

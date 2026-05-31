import fs from 'node:fs';
import path from 'node:path';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  apiVersion: '2026-03-27',
  token: 'skt3SrbZVgKKjKcq1pSCsmbnOLtMvHBPYalxUqFdxCOyatLCXa3fkRJmXHNKJwiv2OlMWOGeEVGAj9enCMwEQkICoBwPqvPJps8yWbaDtqQkj9Zp1llEjDTQnyIfog1HOxaUqUfcJ3QFTSvx42KkqgM70ePc23EJbICOA4oBU4VTY9HhgFqI',
  useCdn: false,
});

const brainDir = 'C:\\Users\\Resham KC\\.gemini\\antigravity\\brain\\4fd5c444-0b36-48c8-bae5-be6833068d1f';

const imageMap = [
  { slug: 'uae-gratuity-calculation-guide-2026', file: 'gratuity_calc_1778242478594.png' },
  { slug: 'best-cv-format-uae-jobs-2026', file: 'cv_format_1778242552048.png' },
  { slug: 'dubai-salary-guide-2026-by-industry', file: 'salary_guide_1778242567596.png' },
  { slug: 'top-10-mistakes-job-seekers-make-in-uae', file: 'job_mistakes_1778242583137.png' },
  { slug: 'nurse-salary-uae-2026', file: 'nurse_salary_1778242805921.png' },
  { slug: 'uae-golden-visa-eligibility-guide-2026', file: 'golden_visa_1778314799881.png' },
];

async function main() {
  for (const item of imageMap) {
    const filePath = path.join(brainDir, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${item.file}...`);
    const imageAsset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: item.file
    });

    console.log(`Uploaded asset: ${imageAsset._id}`);

    // Query the article by slug
    const articleQuery = `*[_type == "article" && slug.current == "${item.slug}"][0]`;
    const article = await client.fetch(articleQuery);

    if (article) {
      console.log(`Patching article ${item.slug}...`);
      await client
        .patch(article._id)
        .set({
          featuredImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            }
          }
        })
        .commit();
      console.log(`Successfully patched ${item.slug}`);
    } else {
      console.warn(`Article not found for slug: ${item.slug}`);
    }
  }
}

main().catch(console.error);

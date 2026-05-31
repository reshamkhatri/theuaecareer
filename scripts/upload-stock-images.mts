import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'gmirvpfp',
  dataset: 'production',
  apiVersion: '2026-03-27',
  token: 'skt3SrbZVgKKjKcq1pSCsmbnOLtMvHBPYalxUqFdxCOyatLCXa3fkRJmXHNKJwiv2OlMWOGeEVGAj9enCMwEQkICoBwPqvPJps8yWbaDtqQkj9Zp1llEjDTQnyIfog1HOxaUqUfcJ3QFTSvx42KkqgM70ePc23EJbICOA4oBU4VTY9HhgFqI',
  useCdn: false,
});

const articles = [
  { slug: 'accountant-jobs-dubai-guide-2026', keyword: 'calculator,finance' },
  { slug: 'work-from-home-jobs-uae-2026', keyword: 'homeoffice,laptop' },
  { slug: 'security-guard-jobs-dubai-2026', keyword: 'guard,security' },
  { slug: 'convert-driving-licence-to-uae-2026', keyword: 'steering,car' },
];

async function main() {
  for (const item of articles) {
    // using generic high-quality stock photo APIs
    const url = `https://loremflickr.com/1024/768/${item.keyword}?lock=${Math.floor(Math.random() * 1000)}`;
    const filename = `${item.slug}.jpg`;
    const filepath = path.join(process.cwd(), filename);

    console.log(`Downloading image for ${item.slug} (${item.keyword})...`);
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
      
      const fileStream = fs.createWriteStream(filepath);
      await pipeline(Readable.fromWeb(response.body as any), fileStream);
      
      console.log(`Uploading to Sanity...`);
      const imageAsset = await client.assets.upload('image', fs.createReadStream(filepath), {
        filename: filename
      });
      
      const articleQuery = `*[_type == "article" && slug.current == "${item.slug}"][0]`;
      const article = await client.fetch(articleQuery);
      
      if (article) {
        console.log(`Patching article...`);
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
        console.log(`Successfully patched ${item.slug}\n`);
      } else {
        console.warn(`Article not found: ${item.slug}\n`);
      }
      
      // Cleanup
      fs.unlinkSync(filepath);
    } catch (error) {
      console.error(`Failed to process ${item.slug}:`, error);
    }
  }
}

main().catch(console.error);

import { createClient } from 'next-sanity';
import path from 'path';
import { existsSync } from 'node:fs';

// Node 20+ built-in env loader
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (existsSync(envPath)) {
    // @ts-ignore
    if (typeof process.loadEnvFile === 'function') {
      process.loadEnvFile(envPath);
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

async function diagnoseSanity() {
  console.log('--- Sanity Connection Diagnosis ---');
  console.log(`Project ID: ${projectId}`);
  console.log(`Dataset: ${dataset}`);
  
  if (!projectId) {
    console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing from .env.local');
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-03-27',
    useCdn: false,
  });

  try {
    console.log('Fetching job count from Sanity...');
    const count = await client.fetch('count(*[_type == "job"])');
    console.log(`✅ Success! Found ${count} jobs in Sanity.`);
    
    if (count === 0) {
      console.warn('⚠️ Warning: Connection successful but no jobs found in this dataset.');
    }
  } catch (error: any) {
    console.error('❌ Connection Failed!');
    console.error(`Error Message: ${error.message}`);
    if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('Possible Cause: Network issue or Sanity API is unreachable.');
    } else if (error.message.includes('403')) {
      console.error('Possible Cause: Project ID is incorrect or API access is restricted.');
    }
  }
}

diagnoseSanity();

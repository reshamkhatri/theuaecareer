const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            if (res.statusCode !== 200 && res.statusCode !== 302) {
                reject(new Error(`Status: ${res.statusCode}`));
                return;
            }
            
            if (res.statusCode === 302 || res.statusCode === 301) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                return;
            }

            const writeStream = fs.createWriteStream(filepath);
            res.pipe(writeStream);
            writeStream.on('finish', () => {
                writeStream.close();
                resolve();
            });
        }).on('error', reject);
    });
}

const tasks = {
  "driver-interview-questions-in-qatar": "driver,driving,wheel",
  "how-to-get-uae-driving-licence-2026": "car,steering,test",
  "self-introduction-for-walk-in-interview-in-uae": "interview,office,applicant",
  "cv-for-housekeeping-jobs-dubai-sample": "housekeeping,cleaning,room",
  "what-to-carry-for-walk-in-interview-in-uae": "resume,folder,interview",
  "what-to-carry-for-walk-in-interview-uae": "resume,folder,interview",
  "documents-for-walk-in-interview-dubai": "document,contract,desk",
  "front-office-interview-questions-dubai-hotels": "hotel,reception,desk",
  "walk-in-interview-checklist-uae": "checklist,clipboard,office",
  "best-remittance-options-uae-2026": "mobile,banking,app",
  "hospitality-jobs-in-dubai-what-employers-want-2026": "restaurant,waiter,hospitality",
  "verified-dubai-jobs-open-now-direct-employer-march-2026": "hiring,office,business"
};

const replacements = {
  "driver-interview-questions-in-qatar": "driver-qatar",
  "how-to-get-uae-driving-licence-2026": "uae-driving-licence",
  "self-introduction-for-walk-in-interview-in-uae": "self-introduction-uae",
  "cv-for-housekeeping-jobs-dubai-sample": "cv-housekeeping-dubai",
  "what-to-carry-for-walk-in-interview-in-uae": "what-to-carry-walk-in",
  "what-to-carry-for-walk-in-interview-uae": "what-to-carry-walk-in",
  "documents-for-walk-in-interview-dubai": "documents-walk-in-dubai",
  "front-office-interview-questions-dubai-hotels": "front-office-interview",
  "walk-in-interview-checklist-uae": "walk-in-interview-checklist",
  "best-remittance-options-uae-2026": "remittance-uae",
  "hospitality-jobs-in-dubai-what-employers-want-2026": "dubai-hotel-jobs",
  "verified-dubai-jobs-open-now-direct-employer-march-2026": "verified-dubai-jobs"
};

const targetDir = path.join(__dirname, '..', 'public', 'article-images');
const downloadedBases = new Set();

async function run() {
    for (const [slug, keyword] of Object.entries(tasks)) {
        const baseName = replacements[slug];
        if (downloadedBases.has(baseName)) continue;
        
        console.log(`Downloading for ${baseName} (${keyword})...`);
        
        const heroPath = path.join(targetDir, `${baseName}-hero.jpg`);
        const inlinePath = path.join(targetDir, `${baseName}-inline.jpg`);
        
        try {
            console.log(`  Downloading ${baseName}-hero.jpg`);
            await downloadImage(`https://loremflickr.com/1200/630/${keyword}/all?random=1`, heroPath);
            
            console.log(`  Downloading ${baseName}-inline.jpg`);
            await downloadImage(`https://loremflickr.com/1200/630/${keyword}/all?random=2`, inlinePath);
            
            downloadedBases.add(baseName);
            console.log(`✓ Success for ${baseName}!`);
        } catch(e) {
            console.log(`Error downloading ${baseName}:`, e.message);
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}

run();

const fs = require('fs');
const path = require('path');
const https = require('https');

async function scrapePexels(query) {
    const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        const html = await response.text();
        const urls = [];
        
        // Regex to find image URLs
        const regex = /https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            urls.push(match[0] + "?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop");
            if (urls.length >= 2) break;
        }
        
        // If first regex fails, try alternative format
        if (urls.length < 2) {
            const regex2 = /https:\/\/images\.pexels\.com\/photos\/\d+\/free-photo-of-[a-z-]+\.jpeg/g;
            while ((match = regex2.exec(html)) !== null) {
                urls.push(match[0] + "?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop");
                if (urls.length >= 2) break;
            }
        }
        
        return [...new Set(urls)];
    } catch (e) {
        console.error(`Error ${query}:`, e);
        return [];
    }
}

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
  "driver-interview-questions-in-qatar": "driving car steering wheel POV",
  "how-to-get-uae-driving-licence-2026": "driving instructor car test highway",
  "self-introduction-for-walk-in-interview-in-uae": "job interview talking professional confidence",
  "cv-for-housekeeping-jobs-dubai-sample": "housekeeping cleaning hotel room",
  "what-to-carry-for-walk-in-interview-in-uae": "resume cv documents folder office",
  "what-to-carry-for-walk-in-interview-uae": "resume cv documents folder office",
  "documents-for-walk-in-interview-dubai": "documents contract folder office",
  "front-office-interview-questions-dubai-hotels": "hotel reception desk receptionist",
  "walk-in-interview-checklist-uae": "checklist clipboard pen tasks",
  "best-remittance-options-uae-2026": "mobile banking money transfer phone app",
  "hospitality-jobs-in-dubai-what-employers-want-2026": "restaurant waiter waitress hospitality",
  "verified-dubai-jobs-open-now-direct-employer-march-2026": "hiring recruiting office team meeting"
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
        
        console.log(`Scraping for ${baseName} (${keyword})...`);
        const urls = await scrapePexels(keyword);
        
        if (urls.length >= 2) {
            const heroPath = path.join(targetDir, `${baseName}-hero.jpg`);
            const inlinePath = path.join(targetDir, `${baseName}-inline.jpg`);
            
            try {
                console.log(`  Downloading ${baseName}-hero.jpg`);
                await downloadImage(urls[0], heroPath);
                
                // wait 1 sec to avoid spam
                await new Promise(r => setTimeout(r, 1000));
                
                console.log(`  Downloading ${baseName}-inline.jpg`);
                await downloadImage(urls[1], inlinePath);
                
                downloadedBases.add(baseName);
                console.log(`✓ Success for ${baseName}!`);
            } catch(e) {
                console.log(`Error downloading ${baseName}:`, e.message);
            }
        } else {
            console.log(`Not enough images scraped for ${baseName}`);
        }
        await new Promise(r => setTimeout(r, 2000));
    }
}

run();

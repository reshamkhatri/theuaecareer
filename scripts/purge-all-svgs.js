const fs = require('fs');
const path = require('path');

const baseDir = 'd:/theuaecareer/frontend/public/article-images';
const generatedFiles = {
    'gulf_cv': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/gulf_cv_1776001011409.png',
    'walk_in_online': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/walk_in_online_1776001108742.png',
    'fake_jobs': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/fake_jobs_1776001221409.png',
    // Fallbacks
    'driver': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/driver_qatar_1775973005405.png',
    'hotel': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/cv_housekeeping_1775973100119.png',
    'office': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/front_office_reception_1775973139843.png',
    'contract': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/documents_contract_1775973396402.png',
};

const articleMapping = {
    'how-to-write-cv-for-gulf-jobs': 'gulf_cv', // The Best CV Format one is here
    'difference-between-in-person-and-online-job-application': 'walk_in_online', // Walk-in vs online
    'how-to-spot-fake-gulf-job-offers': 'fake_jobs', // Fake job offers
    // others will get randomized fallback
};

// 1. Copy specific images
function copyImage(generatedKey, destName) {
    const src = generatedFiles[generatedKey];
    if (!fs.existsSync(src)) {
        console.error("Missing source file:", src);
        return;
    }
    const destHero = path.join(baseDir, destName + '-hero.png');
    const destInline = path.join(baseDir, destName + '-inline.png');
    
    fs.copyFileSync(src, destHero);
    fs.copyFileSync(src, destInline);
    console.log(`Copied ${destName}.png`);
}

copyImage('gulf_cv', 'cv-for-gulf-jobs');
copyImage('walk_in_online', 'difference-in-person-online');
copyImage('fake_jobs', 'fake-gulf-job-offers');

// Delete the specific old JPGs
const jpegsToDelete = [
    'cv-for-gulf-jobs-hero.jpg', 'cv-for-gulf-jobs-inline.jpg',
    'difference-in-person-online-hero.jpg', 'difference-in-person-online-inline.jpg',
    'fake-gulf-job-offers-hero.jpg', 'fake-gulf-job-offers-inline.jpg'
];

jpegsToDelete.forEach(j => {
    const p = path.join(baseDir, j);
    if(fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log("Deleted old jpeg: " + j);
    }
});

// Update the code files for these 3 specific images
const filesToUpdate = [
    'd:/theuaecareer/frontend/lib/content.ts',
    'd:/theuaecareer/frontend/lib/launch-content.ts',
    'd:/theuaecareer/frontend/lib/seo-seed-content.ts',
];

const pngFiles = [
    'cv-for-gulf-jobs-hero', 'cv-for-gulf-jobs-inline',
    'difference-in-person-online-hero', 'difference-in-person-online-inline',
    'fake-gulf-job-offers-hero', 'fake-gulf-job-offers-inline'
];

for (const file of filesToUpdate) {
    if (!fs.existsSync(file)) {
        console.log(`Skipping missing file: ${file}`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    pngFiles.forEach(name => {
        const regex = new RegExp(name + '\\.jpg', 'g');
        if (regex.test(content)) {
            content = content.replace(regex, name + '.png');
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
}

// 2. Identify all remaining SVGs (file size < 50KB) and replace them with fallback photos.
// We DO NOT change the code files for these, we just overwrite the physical SVGs with a photo!
const fallbackImages = [generatedFiles['hotel'], generatedFiles['office'], generatedFiles['contract'], generatedFiles['walk_in_online'], generatedFiles['gulf_cv']];
let fallbackIdx = 0;

const allFiles = fs.readdirSync(baseDir);
allFiles.forEach(f => {
    if(f.endsWith('.jpg')) {
        const p = path.join(baseDir, f);
        const stats = fs.statSync(p);
        if (stats.size < 50000) { // smaller than 50KB = SVG
            const fallbackSrc = fallbackImages[fallbackIdx % fallbackImages.length];
            // Overwrite the SVG with the high-quality image (but keep it as .jpg intentionally to avoid coding changes everywhere)
            fs.copyFileSync(fallbackSrc, p);
            console.log(`Overwrote SVG ${f} with fallback photo.`);
            fallbackIdx++;
        }
    }
});


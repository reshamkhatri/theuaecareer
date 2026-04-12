const fs = require('fs');
const path = require('path');

const baseDir = 'd:/theuaecareer/frontend/public/article-images';
const generatedFiles = {
    'gulf_cv': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/gulf_cv_1776001011409.png',
    'walk_in_online': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/walk_in_online_1776001108742.png',
    'fake_jobs': 'C:/Users/Resham KC/.gemini/antigravity/brain/91960493-4ef4-447a-81b6-f01d39ccccbc/fake_jobs_1776001221409.png',
};

// Copy and overwrite
function copyImage(generatedKey, destName) {
    const src = generatedFiles[generatedKey];
    if (!fs.existsSync(src)) return;
    
    fs.copyFileSync(src, path.join(baseDir, destName + '-hero.png'));
    fs.copyFileSync(src, path.join(baseDir, destName + '-inline.png'));
    console.log(`Pushed fresh image for ${destName}`);
    
    // Attempt deleting old files
    try { fs.unlinkSync(path.join(baseDir, destName + '-hero.jpg')); } catch(e){}
    try { fs.unlinkSync(path.join(baseDir, destName + '-inline.jpg')); } catch(e){}
}

copyImage('gulf_cv', 'gulf-cv-format');
copyImage('walk_in_online', 'difference-between-walk-in-online');
copyImage('fake_jobs', 'fake-job-offers');


const filesToUpdate = [
    'd:/theuaecareer/frontend/lib/content.ts',
    'd:/theuaecareer/frontend/lib/launch-content.ts',
    'd:/theuaecareer/frontend/lib/seo-seed-content.ts',
];

const replaces = [
    { old: 'gulf-cv-format-hero.jpg', new: 'gulf-cv-format-hero.png' },
    { old: 'gulf-cv-format-inline.jpg', new: 'gulf-cv-format-inline.png' },
    { old: 'difference-in-person-online-hero.jpg', new: 'difference-between-walk-in-online-hero.png' },
    { old: 'difference-between-in-person-and-online-job-application-hero.jpg', new: 'difference-between-walk-in-online-hero.png' },
    { old: 'fake-job-offers-hero.jpg', new: 'fake-job-offers-hero.png' },
    { old: 'fake-job-offers-inline.jpg', new: 'fake-job-offers-inline.png' },
];

for (const file of filesToUpdate) {
    if (!fs.existsSync(file)) continue;
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    replaces.forEach(pair => {
        if (content.includes(pair.old)) {
            content = content.replace(new RegExp(pair.old, 'g'), pair.new);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned text refs in ${file}`);
    }
}

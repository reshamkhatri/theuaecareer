const fs = require('fs');

const filesToUpdate = [
    'd:/theuaecareer/frontend/lib/content.ts',
    'd:/theuaecareer/frontend/lib/launch-content.ts',
    'd:/theuaecareer/frontend/lib/seo-seed-articles.ts',
];

const pngFiles = [
    'driver-qatar-hero', 'driver-qatar-inline',
    'uae-driving-licence-hero', 'uae-driving-licence-inline',
    'self-introduction-uae-hero', 'self-introduction-uae-inline',
    'what-to-carry-walk-in-hero', 'what-to-carry-walk-in-inline',
    'walk-in-interview-checklist-hero', 'walk-in-interview-checklist-inline',
    'cv-housekeeping-dubai-hero', 'cv-housekeeping-dubai-inline',
    'front-office-interview-hero', 'front-office-interview-inline',
    'dubai-hotel-jobs-hero', 'dubai-hotel-jobs-inline',
    'documents-walk-in-dubai-hero', 'documents-walk-in-dubai-inline',
    'verified-dubai-jobs-hero', 'verified-dubai-jobs-inline',
    'remittance-uae-hero', 'remittance-uae-inline'
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

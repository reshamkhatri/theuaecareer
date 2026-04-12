const fs = require('fs');

const file = 'd:/theuaecareer/frontend/lib/content.ts';
let content = fs.readFileSync(file, 'utf8');

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
    'verified-dubai-jobs-hero', 'verified-dubai-jobs-inline'
];

pngFiles.forEach(name => {
    // replace exact strings
    const regex = new RegExp(name + '\\.jpg', 'g');
    content = content.replace(regex, name + '.png');
});

fs.writeFileSync(file, content);
console.log('Fixed content.ts to use .png');

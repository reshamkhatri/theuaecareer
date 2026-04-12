const fs = require('fs');
const c = fs.readFileSync('lib/launch-content.ts', 'utf8');
const slugs = [...c.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('launch-content slugs:');
slugs.forEach(s => console.log(s));

const c2 = fs.readFileSync('lib/seo-seed-content.ts', 'utf8');
const slugs2 = [...c2.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
console.log('\nseo-seed-content slugs:');
slugs2.forEach(s => console.log(s));

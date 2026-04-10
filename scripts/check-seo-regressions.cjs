const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'out');
const PUBLIC_EXCLUSIONS = new Set(['/404/', '/404.html', '/_not-found/', '/studio/', '/admin/']);
const failures = [];
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
}

function toUrl(filePath) {
  const relative = path.relative(root, filePath).replace(/\\/g, '/');
  if (relative === 'index.html') {
    return '/';
  }

  return `/${relative.replace(/index\.html$/, '')}`;
}

function getTitle(html) {
  return (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ').trim();
}

function getH1Count(html) {
  return [...html.matchAll(/<h1\b[\s\S]*?<\/h1>/gi)].length;
}

function getExternalImages(html) {
  return [...html.matchAll(/<img[^>]+src="(https?:\/\/[^"]+)"/gi)].map((match) => match[1]);
}

walk(root);

const publicPages = htmlFiles
  .map((filePath) => {
    const url = toUrl(filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    return {
      url,
      title: getTitle(html),
      titleLength: getTitle(html).length,
      h1Count: getH1Count(html),
      externalImages: getExternalImages(html),
    };
  })
  .filter((page) => !PUBLIC_EXCLUSIONS.has(page.url));

for (const page of publicPages) {
  if (page.title.includes('| theuaecareer.com | theuaecareer.com')) {
    failures.push(`${page.url} still has a duplicate brand suffix in the title tag.`);
  }

  if (page.titleLength > 70) {
    failures.push(`${page.url} has a title tag that is still too long (${page.titleLength} chars).`);
  }

  if (page.h1Count > 1) {
    failures.push(`${page.url} still renders ${page.h1Count} H1 tags.`);
  }

  if (page.externalImages.length > 0) {
    failures.push(`${page.url} still renders external content images.`);
  }
}

const duplicateTitles = new Map();
for (const page of publicPages) {
  if (!page.title) {
    continue;
  }

  const pages = duplicateTitles.get(page.title) || [];
  pages.push(page.url);
  duplicateTitles.set(page.title, pages);
}

for (const [title, pages] of duplicateTitles.entries()) {
  if (pages.length > 1) {
    failures.push(`Duplicate title still present for: ${pages.join(', ')} (${title})`);
  }
}

const robotsPath = path.join(root, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (/\nHost:/i.test(robots)) {
    failures.push('robots.txt still contains a Host directive.');
  }
}

if (failures.length > 0) {
  console.error('SEO regression checks failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('SEO regression checks passed.');

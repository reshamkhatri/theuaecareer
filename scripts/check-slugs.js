// Check slugs

const slugFeaturedImages = {
  'walk-in-interviews-dubai-this-week':       '/article-images/what-to-carry-walk-in-hero.jpg',
  'hospitality-jobs-in-dubai':                '/article-images/housekeeping-qatar-hero.jpg',
  'how-to-apply-dubai-hotel-jobs':            '/article-images/dubai-hotel-jobs-hero.jpg',
  'verified-dubai-jobs-direct-employer':      '/article-images/dubai-hotel-jobs-inline.jpg',
  'how-to-find-a-job-in-dubai-as-a-fresher':  '/article-images/self-introduction-uae-hero.jpg',
  'top-10-in-demand-jobs-uae-2026':           '/article-images/walk-in-vs-online-hero.jpg',
  'cost-of-living-dubai-2026':                '/article-images/groceries-dubai-inline.jpg',
  'how-to-write-cv-for-gulf-jobs':            '/article-images/gulf-cv-format-hero.jpg',
  'uae-golden-visa-2026-guide':               '/article-images/dubai-business-hub-inline.jpg',
  'best-free-zones-dubai-2026':               '/article-images/saudi-warehouse-jobs-hero.jpg',
  'salary-guide-uae-2026':                    '/article-images/salary-slip-chart-hero.jpg',
  'uae-interview-questions-and-answers':      '/article-images/self-introduction-uae-inline.jpg',
  'abu-dhabi-vs-dubai-working-living':        '/article-images/abu-dhabi-skyline-hero.jpg',
  'best-remittance-options-uae-2026':         '/article-images/money-transfer-app-inline.jpg',
  'how-to-get-uae-driving-licence':           '/article-images/uae-driving-licence-hero.jpg',
  'how-to-renew-uae-work-visa':               '/article-images/visa-renewal-inline.jpg',
  'uae-labour-law-guide-for-expats':          '/article-images/saudi-offer-documents-hero.jpg',
  'driver-salary-in-uae-2026':               '/article-images/driver-qatar-hero.jpg',
  'what-to-carry-for-walk-in-interview-uae': '/article-images/what-to-carry-walk-in-inline.jpg',
  'walk-in-interview-self-introduction-sample-uae': '/article-images/self-introduction-uae-hero.jpg',
  'retail-sales-associate-interview-questions-uae': '/article-images/cashier-interview-saudi-hero.jpg',
  'construction-helper-interview-questions-uae':    '/article-images/saudi-warehouse-jobs-inline.jpg',
  'uae-driving-licence-2026-guide':           '/article-images/uae-driving-licence-hero.jpg',
  'driver-salary-in-uae-2026-guide':          '/article-images/driver-qatar-hero.jpg',
  'how-to-renew-uae-work-visa-2026':          '/article-images/visa-renewal-inline.jpg',
  'uae-golden-visa-2026-guide-complete':      '/article-images/dubai-business-hub-inline.jpg',
};

const slugs = [
  'abu-dhabi-vs-dubai-working-expats',
  'best-cv-format-for-uae-saudi-qatar-job-applications',
  'best-remittance-options-uae-2026',
  'cashier-interview-questions-for-saudi-retail-jobs',
  'cleaner-salary-in-uae',
  'construction-helper-interview-questions-uae',
  'cost-of-living-dubai-2026',
  'cv-for-housekeeping-jobs-dubai-sample',
  'difference-between-walk-in-interview-and-online-application-in-gulf-jobs',
  'documents-for-walk-in-interview-dubai',
  'documents-required-after-getting-a-saudi-job-offer',
  'driver-interview-questions-in-qatar',
  'driver-salary-in-uae-2026',
  'dubai-free-zone-comparison-2026',
  'front-office-interview-questions-dubai-hotels',
  'hospitality-jobs-in-dubai-what-employers-want-2026',
  'housekeeping-interview-questions-dubai-hotels',
  'housekeeping-interview-questions-for-qatar-hotel-jobs',
  'how-to-apply-for-dubai-hotel-jobs-through-official-career-pages-2026',
  'how-to-apply-for-warehouse-jobs-in-saudi-arabia-safely',
  'how-to-avoid-fake-job-offers-in-uae-saudi-qatar',
  'how-to-find-a-job-in-dubai-as-a-fresher',
  'how-to-get-uae-driving-licence-2026',
  'how-to-renew-uae-work-visa-2026',
  'how-to-write-cv-for-gulf-jobs',
  'retail-sales-associate-interview-questions-uae',
  'room-attendant-interview-questions-dubai',
  'salary-guide-uae-2026',
  'self-introduction-for-walk-in-interview-in-uae',
  'top-10-in-demand-jobs-uae-2026',
  'uae-golden-visa-2026-guide',
  'uae-interview-questions-and-answers',
  'uae-labour-law-guide-for-expats',
  'verified-dubai-jobs-open-now-direct-employer-march-2026',
  'walk-in-interview-checklist-uae',
  'walk-in-interviews-dubai-this-week',
  'walk-in-interview-self-introduction-sample-uae',
  'what-to-carry-for-walk-in-interview-in-uae',
  'what-to-carry-for-walk-in-interview-uae'
];

function getStockFeaturedImage(slug) {
  const normalizedSlug = slug.replace(/^article\./, '');
  for (const [key, url] of Object.entries(slugFeaturedImages)) {
    if (normalizedSlug.includes(key) || key.includes(normalizedSlug.split('-').slice(0, 4).join('-'))) {
      return url;
    }
  }
  return null;
}

const unmapped = [];
for (const slug of slugs) {
  const img = getStockFeaturedImage(slug);
  if (!img) {
    unmapped.push(slug);
  }
}

console.log("Unmapped count:", unmapped.length);
unmapped.forEach(s => console.log(s));

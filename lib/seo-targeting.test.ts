import test from 'node:test';
import assert from 'node:assert/strict';
import type { ArticleRecord, JobRecord } from './types.ts';
import {
  buildArticleTakeaways,
  decorateArticleHtml,
  deriveArticleTargeting,
  deriveJobTargeting,
  getSeoPathwaysForTargeting,
  mergeContentBySlug,
  scoreArticleForJobTargeting,
  scoreRelatedArticlePair,
} from './seo-targeting.ts';

const baseArticle: ArticleRecord = {
  _id: 'article.test',
  title: 'What to Carry for a Walk-In Interview in UAE',
  slug: 'what-to-carry-for-walk-in-interview-in-uae',
  excerpt: 'A practical checklist for walk-in interviews in the UAE.',
  content:
    '<p>Intro</p><h2>Documents to bring</h2><p>Carry your passport copy.</p><h3>Extra copies</h3><p>Bring multiple CV copies.</p>',
  category: 'Walk-In Interviews',
  tags: ['walk-in interview', 'uae jobs'],
  status: 'published',
  publishDate: '2026-04-09T00:00:00.000Z',
  readTime: 4,
  author: 'Editorial Team',
};

const baseJob: JobRecord = {
  _id: 'job.test',
  title: 'Housekeeping Attendant',
  companyName: 'Doha Grand Hotel',
  location: {
    city: 'Doha',
    country: 'Qatar',
  },
  jobType: 'Full-time',
  experienceRequired: '1-2 years',
  category: 'Hospitality',
  categoryLabel: 'Hospitality / Hotel',
  description: '<p>Room attendant role for hotel operations.</p>',
  howToApply: '<p>Email your CV.</p>',
  postedDate: '2026-04-09T00:00:00.000Z',
  isWalkIn: false,
  slug: 'housekeeping-attendant-doha',
  status: 'active',
};

test('deriveArticleTargeting maps walk-in prep content to low-difficulty intent', () => {
  const targeting = deriveArticleTargeting(baseArticle);

  assert.equal(targeting.country, 'UAE');
  assert.equal(targeting.intentCluster, 'walk-in-prep');
  assert.equal(targeting.roleFamily, 'walk-in');
  assert.equal(targeting.searchStage, 'prepare');
});

test('deriveJobTargeting maps hotel roles to role-prep intent by country', () => {
  const targeting = deriveJobTargeting(baseJob);

  assert.equal(targeting.country, 'Qatar');
  assert.equal(targeting.intentCluster, 'role-interview-prep');
  assert.equal(targeting.roleFamily, 'hotel-hospitality');
  assert.equal(targeting.searchStage, 'apply');
});

test('decorateArticleHtml adds stable heading anchors and a toc model', () => {
  const decorated = decorateArticleHtml(baseArticle.content);

  assert.equal(decorated.headings.length, 2);
  assert.match(decorated.html, /id="documents-to-bring"/);
  assert.match(decorated.html, /id="extra-copies"/);
  assert.deepEqual(
    decorated.headings.map((heading) => heading.title),
    ['Documents to bring', 'Extra copies']
  );
});

test('mergeContentBySlug prefers later records with the same slug', () => {
  const merged = mergeContentBySlug(
    [
      baseArticle,
      {
        ...baseArticle,
        _id: 'article.updated',
        excerpt: 'Updated excerpt from Sanity.',
      },
    ],
    (item) => item.slug
  );

  assert.equal(merged.length, 1);
  assert.equal(merged[0]?._id, 'article.updated');
});

test('buildArticleTakeaways and pathways reflect walk-in prep intent', () => {
  const targeting = deriveArticleTargeting(baseArticle);
  const takeaways = buildArticleTakeaways(baseArticle);
  const pathways = getSeoPathwaysForTargeting(targeting, { surface: 'blog', limit: 4 });

  assert.equal(takeaways.length, 3);
  assert.match(takeaways[0] ?? '', /CV|copies|documents/i);
  assert.ok(pathways.some((pathway) => pathway.href === '/jobs/walk-in/'));
  assert.ok(pathways.some((pathway) => pathway.href === '/resources/interview-question-bank/'));
});

test('targeting-aware article scores prefer cluster-relevant content', () => {
  const closerArticle: ArticleRecord = {
    ...baseArticle,
    _id: 'article.related',
    title: 'Self Introduction for Walk-In Interview in UAE',
    slug: 'self-introduction-for-walk-in-interview-in-uae',
    excerpt: 'A practical self-introduction sample for UAE walk-in interviews.',
    category: 'Walk-In Interviews',
    tags: ['walk-in interview', 'self introduction', 'uae'],
  };

  const farArticle: ArticleRecord = {
    ...baseArticle,
    _id: 'article.far',
    title: 'Cleaner Salary in UAE',
    slug: 'cleaner-salary-in-uae',
    excerpt: 'A salary explainer for cleaners working in the UAE.',
    category: 'Salary Guides',
    tags: ['salary', 'uae', 'cleaner'],
  };

  assert.ok(scoreRelatedArticlePair(baseArticle, closerArticle) > scoreRelatedArticlePair(baseArticle, farArticle));
});

test('job-aware article scoring prefers country and role matches', () => {
  const qatarInterviewArticle: ArticleRecord = {
    ...baseArticle,
    _id: 'article.qatar.housekeeping',
    title: 'Housekeeping Interview Questions for Qatar Hotel Jobs',
    slug: 'housekeeping-interview-questions-for-qatar-hotel-jobs',
    excerpt: 'Sample housekeeping interview questions for Qatar hotel roles.',
    category: 'Interview Guides',
    tags: ['qatar', 'housekeeping', 'hotel jobs'],
  };

  const unrelatedSalaryArticle: ArticleRecord = {
    ...baseArticle,
    _id: 'article.salary',
    title: 'Best Remittance Options in UAE',
    slug: 'best-remittance-options-uae-2026',
    excerpt: 'Compare remittance providers from the UAE.',
    category: 'Career Guides',
    tags: ['remittance', 'finance', 'uae'],
  };

  assert.ok(
    scoreArticleForJobTargeting(baseJob, qatarInterviewArticle) >
      scoreArticleForJobTargeting(baseJob, unrelatedSalaryArticle)
  );
});

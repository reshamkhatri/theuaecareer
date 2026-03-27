# Cloudflare Pages + Sanity Migration Plan

This plan is for moving `theuaecareer` from the current `Next.js + MongoDB + custom admin` setup to a lower-cost setup where:

- the public site is hosted on **Cloudflare Pages**
- content is managed through **Sanity Studio**
- articles, jobs, and walk-in posts are edited in a real panel
- most public pages are **static** for speed, SEO, and lower hosting cost

This plan is designed around your main requirement:

> "Through the panel I must be able to change content in the website like articles, post jobs and all."

Important:
- The "panel" in this plan is **Sanity Studio**, not cPanel.
- Sanity Studio is better than cPanel for articles/jobs because it is a real content editor.

---

## 1. Final Target Architecture

### Public Site

- **Hosting:** Cloudflare Pages
- **Frontend:** Next.js static export or a static-first rebuild
- **Delivery:** Cloudflare CDN
- **Pages served statically:** homepage, blog, article pages, jobs pages, walk-in pages, legal pages, tools pages

### Content Panel

- **CMS:** Sanity Studio
- **Purpose:** add/edit/publish articles, jobs, walk-in jobs, featured content
- **Suggested URL:** `studio.theuaecareer.com`

### Forms / extra services

- **Contact form:** third-party form provider or lightweight serverless function
- **Newsletter:** third-party newsletter provider embed
- **Analytics:** Cloudflare Web Analytics

### Features to keep

- Blog
- Jobs board
- Walk-in interviews
- Static content pages
- CV Maker UI and PDF export
- Gratuity calculator

### Features to remove or simplify

- MongoDB-based content admin
- custom article/job CRUD APIs
- admin auth for content editing
- AI CV enhancement route for now

---

## 2. Why This Direction Fits Your Goals

This setup is good for you because:

- you want a real panel for posting content
- you want low hosting cost
- you want fast loading pages
- you want a site that can still rank and monetize
- you do not want to depend on an expensive always-on backend

It is especially good if:

- most traffic is on blog posts, jobs, and walk-in pages
- content updates happen a few times per day, not every minute

---

## 3. What You Will Be Able To Manage In Sanity

We should create these content types in Sanity:

### Article

Fields:
- title
- slug
- excerpt
- content / body
- featured image
- category
- tags
- status
- publish date
- last updated date
- author
- meta title
- meta description

### Job

Fields:
- title
- company name
- city
- country
- job type
- category
- category label
- experience required
- salary min
- salary max
- currency
- salary label
- description
- how to apply
- posted date
- expiry date
- status
- slug
- featured / promoted toggle if needed

### Walk-In Job

This can be:
- either a separate schema
- or the same `job` schema with `isWalkIn = true`

Extra fields:
- walk-in date
- walk-in time
- venue
- schedule summary

### Site Settings

Useful for panel-driven changes:
- site title
- homepage hero copy
- featured jobs section title
- featured articles section title
- footer text
- contact email
- social links
- AdSense toggle later if needed

---

## 4. Current Code Areas This Migration Replaces

### Current content source

The current site gets content from:

- MongoDB through `lib/mongodb.ts`
- fallback launch content in `lib/launch-content.ts`
- content normalization/query logic in `lib/content.ts`

### Current content types

Current content shapes are already defined in:

- `lib/types.ts`

That file is the best starting point for Sanity schema design.

### Current admin routes that would be replaced by Sanity

These routes become unnecessary after migration:

- `app/admin/articles/page.tsx`
- `app/admin/articles/new/page.tsx`
- `app/admin/articles/[id]/edit/page.tsx`
- `app/admin/jobs/page.tsx`
- `app/admin/jobs/new/page.tsx`
- `app/admin/jobs/[id]/edit/page.tsx`
- `app/admin/jobs/import/page.tsx`
- `app/admin/dashboard/page.tsx`
- `app/admin/login/page.tsx`

### Current APIs that would be removed or reduced

These APIs would no longer be the main content system:

- `app/api/articles/route.ts`
- `app/api/articles/[id]/route.ts`
- `app/api/jobs/route.ts`
- `app/api/jobs/[id]/route.ts`
- `app/api/jobs/import/route.ts`
- `app/api/jobs/walk-in/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/me/route.ts`
- `app/api/seed/route.ts`

### APIs likely to keep or replace with external service

- `app/api/contact/route.ts` -> replace with external form provider or tiny serverless function
- `app/api/newsletter/route.ts` -> replace with external newsletter provider
- `app/api/tools/cv-enhance/route.ts` -> optional, likely disable for low-cost setup

---

## 5. Recommended Content Publishing Flow

### Best low-cost workflow

1. You log into **Sanity Studio**
2. You create or edit an article/job/walk-in post
3. You click **Publish**
4. Sanity sends a **webhook**
5. Cloudflare Pages rebuilds the site
6. The public site updates with static pages

### Why this is best

- content is easy to manage
- the site stays very fast
- Cloudflare serves mostly static pages
- Sanity API usage stays low
- good for SEO

### Why not fetch content live on every request

We should avoid a "fetch Sanity on every visitor request" model because:

- it increases Sanity API usage
- it increases moving parts on page load
- it is less cost-efficient
- it is not needed for your kind of content

---

## 6. Performance, SEO, and Traffic Handling

### Speed

This setup should be very fast if implemented correctly.

Reason:
- article/job pages are prebuilt
- Cloudflare CDN serves static pages globally
- no database is queried for every page view

### SEO

This setup can rank well because:

- HTML is crawlable
- pages are pre-rendered
- metadata can be managed properly
- sitemap and robots can remain

Ranking still depends on:
- original content quality
- internal linking
- topical authority
- backlinks

### Monetization

This setup can still monetize with:
- AdSense
- affiliate links
- sponsored posts

### Traffic

This setup can handle high traffic well if the site remains mostly static.

That includes:
- 30k to 40k monthly visitors
- 100k monthly visitors

The important condition is:
- public pages should be served statically
- not rebuilt on every request

---

## 7. Main Drawbacks Of This Plan

This is a strong plan, but not perfect.

### Drawback 1: More than one service

You will use:
- Cloudflare Pages
- Sanity
- likely a form/newsletter service

That is normal, but it is not an all-in-one setup.

### Drawback 2: Rebuild-based publishing

Changes usually appear after a rebuild, not instantly like a live DB-driven admin.

For a content site, this is usually fine.

### Drawback 3: Sanity Free role limits

If only you manage content, this is fine.

If you later need multiple editors/contributors with separate roles, you may need a paid Sanity plan.

### Drawback 4: AI CV enhancement becomes harder on low cost

If we remove backend/API dependence for low-cost hosting, the AI CV enhancement route should be:

- disabled
- moved to a separate service
- or postponed until revenue grows

### Drawback 5: Existing custom admin work becomes obsolete

The current MongoDB-backed admin would likely be retired.

That is not bad, but it means we should not continue investing in the current custom admin if we commit to Sanity.

---

## 8. Recommended Decision On Each Existing Feature

### Keep as-is or close to as-is

- Homepage layout
- Jobs listing UI
- Job detail UI
- Blog listing UI
- Blog article UI
- Gratuity calculator
- CV Maker templates and export
- About / Contact / Privacy / Terms pages

### Change content source

- `lib/content.ts`
- `lib/launch-content.ts`
- article pages
- blog pages
- jobs pages
- walk-in pages

These should read from Sanity content instead of MongoDB + launch JSON.

### Remove

- Mongo-backed content admin routes
- content CRUD APIs
- seed route
- current content auth flow

### Simplify or postpone

- AI CV enhancement
- DB-backed newsletter storage
- DB-backed contact storage

---

## 9. Migration Phases

## Phase 1: Architecture prep

- Freeze new work on the current Mongo content admin
- Keep frontend UI work separate from backend content migration
- Decide whether to keep Next.js or later move to Astro

### Recommendation

For faster migration:
- keep Next.js first
- make it static-first
- move content source to Sanity

---

## Phase 2: Add Sanity

- Create a Sanity project
- Create datasets
- Create schemas for:
  - article
  - job
  - site settings
- Create Sanity Studio
- Test article/job creation in Studio

---

## Phase 3: Replace content layer

- Stop using MongoDB as the primary source for jobs/articles
- Replace `lib/content.ts` with a Sanity-powered content layer
- Map Sanity fields to the existing `ArticleRecord` and `JobRecord` shapes
- Preserve current UI pages as much as possible

---

## Phase 4: Migrate data

- Export current articles/jobs from `launch-content.ts` and Mongo if needed
- Clean placeholder text before import
- Import the cleaned content into Sanity
- Verify slugs and metadata

---

## Phase 5: Replace the admin

- Stop using the current custom admin for content
- Use Sanity Studio for:
  - article creation
  - article editing
  - job posting
  - job expiry updates
  - walk-in post updates

---

## Phase 6: Simplify backend dependencies

- remove or disable content CRUD APIs
- replace contact form handling
- replace newsletter handling
- decide what to do with CV AI route

---

## Phase 7: Deploy

- Deploy public site to Cloudflare Pages
- Deploy Sanity Studio to:
  - `studio.theuaecareer.com`
  - or a separate Cloudflare/Vercel free deployment
- connect publish webhook
- test content publishing flow

---

## 10. What "Done" Looks Like

The migration is successful when:

- you can log into a panel and post articles
- you can create and edit jobs from the panel
- walk-in posts can be updated from the panel
- the public site updates through webhook rebuilds
- the public site no longer depends on MongoDB for content pages
- the custom admin is no longer required for daily publishing
- the site remains fast on Cloudflare Pages

---

## 11. Recommended Final Stack

### Public site

- Next.js static-first frontend
- Cloudflare Pages hosting

### Content management

- Sanity Studio

### Optional helper services

- Formspree / Getform / Basin for contact
- Mailchimp / ConvertKit / Buttondown / Beehiiv for newsletter
- Cloudflare Web Analytics

### Deferred until later

- AI CV enhancement backend
- custom DB-backed admin
- custom DB-backed lead management

---

## 12. My Recommendation

If your top priorities are:

- low cost
- content panel
- good speed
- future SEO
- future monetization

Then this is a very good direction.

### My recommended path

1. Migrate content to Sanity
2. Keep the frontend UI
3. Make the site static-first
4. Deploy public site on Cloudflare Pages
5. Use Sanity Studio as the admin panel
6. Disable or postpone expensive backend-only features

---

## 13. Next Implementation Plan

If we proceed, the actual work should happen in this order:

1. Create Sanity schemas from `lib/types.ts`
2. Build a new content client layer
3. Replace `lib/content.ts` data source
4. Migrate article pages
5. Migrate jobs pages
6. Migrate homepage featured content
7. Disable custom content admin routes
8. Replace contact/newsletter handling
9. Decide whether CV AI stays or is postponed
10. Deploy and test publishing workflow


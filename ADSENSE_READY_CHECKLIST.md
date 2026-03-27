# AdSense Readiness Checklist

This checklist is for `theuaecareer.com` before applying for Google AdSense.

Important:
- Do not apply for AdSense until the site is live on the real domain.
- Do not re-add ads yet. The ad code and ad placeholders were intentionally removed for now.

## Goal

Before applying for AdSense, the site should be:
- live on the final domain
- working correctly on mobile and desktop
- building correctly on Cloudflare Pages
- reading content correctly from Sanity
- free of placeholder text and unfinished content
- filled with useful, original content
- equipped with trust pages like About, Contact, Privacy Policy, and Terms

---

## Phase 1: Launch The Site First

### 1. Deploy the site to Cloudflare Pages

- Create or log in to your Cloudflare account.
- Create a Pages project from the GitHub repo.
- Set the root directory to `frontend`.
- Use `npm run build` as the build command.
- Use `out` as the build output directory.
- Make sure the build succeeds in Cloudflare Pages.

### 2. Add the required environment variables in Cloudflare Pages

Add these in Cloudflare Pages Project Settings -> Environment Variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Real public site URL like `https://theuaecareer.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset, usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Sanity API version |
| `SANITY_API_READ_TOKEN` | If dataset is private | Lets Cloudflare fetch content during the static build |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Yes | Public URL for your Sanity Studio |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Public contact email |
| `NEXT_PUBLIC_NEWSLETTER_EMAIL` | Yes | Public newsletter email |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Optional | Hosted form endpoint if you do not want email-app fallback |
| `NEXT_PUBLIC_NEWSLETTER_FORM_ENDPOINT` | Optional | Hosted newsletter endpoint |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Optional | Blog comments |

Notes:
- `NEXT_PUBLIC_SITE_URL` is used in metadata, sitemap, and robots.
- If your Sanity dataset is private, `SANITY_API_READ_TOKEN` should be set in Cloudflare.

### 3. Confirm Sanity is the live content source

- Open Sanity Studio and confirm articles, jobs, and site settings are present.
- Publish one small content edit and verify the next build shows it.
- Make sure your public site is pulling the expected article and job content.

Current code references:
- `sanity.config.ts`
- `sanity/lib/client.ts`
- `lib/content.ts`

### 4. Connect the custom domain

- Add the domain in Cloudflare Pages.
- Update DNS records or nameservers if needed.
- Wait for SSL/HTTPS to become active.
- Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

Example:
- `https://theuaecareer.com`

### 5. Smoke test the live site

Open the live website and manually test:

- Homepage
- Jobs page
- Job details page
- Walk-in jobs page
- Blog page
- Blog article page
- CV maker
- Gratuity calculator
- Contact page
- Admin bridge page

Confirm:
- pages load
- there are no broken layouts
- mobile works properly
- forms behave as expected
- sitemap and robots load

Useful URLs to test:
- `/`
- `/jobs`
- `/jobs/walk-in`
- `/blog`
- `/tools/cv-maker`
- `/tools/gratuity-calculator`
- `/contact`
- `/admin`
- `/sitemap.xml`
- `/robots.txt`

---

## Phase 2: Fix Content Quality Before AdSense

AdSense approval depends heavily on useful, original, trustworthy content.

### 6. Remove all placeholder or unfinished text

Fix anything that looks temporary, unfinished, or fake.

Current known focus areas:
- review all current Sanity articles
- review all current Sanity job posts
- make sure every visible page reads like finished content

Search for and remove:
- placeholder company names
- bracketed notes
- "coming soon"
- dummy wording
- anything that looks copied, generated, or incomplete
- duplicated sentences
- awkward heading or bullet formatting

### 7. Proofread and normalize content quality

Review all launch content carefully:

- fix awkward punctuation and formatting
- fix bad bullet formatting
- fix strange special characters if they appear
- make job listings look consistent
- make article formatting cleaner and easier to read

### 8. Publish more original articles

Before applying, add more genuinely useful original content.

Recommended minimum:
- at least 8 to 12 strong original articles

Best topics for this site:
- UAE labour law
- gratuity guides
- visa renewal guides
- salary guides
- walk-in interview tips
- CV tips for Gulf jobs
- freshers' guides for Dubai/UAE
- scam warning guides for job seekers

The more useful and original the content feels, the better the AdSense review chances.

### 9. Review all job posts for trust and quality

Check every visible listing and make sure:
- the company name is real or clearly labeled if confidential
- there is no fake placeholder text
- salary and location fields are consistent
- the application instructions make sense
- expired or stale jobs are removed promptly
- confidential listings are clearly labeled if the employer name is hidden

---

## Phase 3: Confirm Trust Signals

### 10. Make sure the trust pages are complete

These pages should stay live and look finished:

- About
- Contact
- Privacy Policy
- Terms of Service

Also make sure:
- your contact email is real and monitored
- the site branding is consistent
- the domain is visible in the About page and footer if needed

### 11. Make sure the contact form actually works

Test the contact form on the live domain and confirm:
- the form experience is clear
- the email-app fallback works, or your hosted endpoint works if configured
- the page still feels complete even if you are not using a backend inbox

### 12. Keep navigation clean

Before applying:
- no broken links
- no empty pages
- no dead buttons
- no hidden unfinished sections
- no pages that look abandoned

---

## Phase 4: Technical Readiness For Review

### 13. Verify search and crawler basics

Check that:
- `robots.txt` works
- `sitemap.xml` works
- the site is publicly accessible
- no login is needed for public content
- pages are not blocked from crawling unnecessarily

### 14. Confirm mobile friendliness

Test on phone and desktop:
- CV maker layout
- job cards
- article pages
- navigation menu
- contact form

### 15. Keep the site free of intrusive UX issues

Before AdSense review:
- no broken overlays
- no overlapping text
- no major layout shifts
- no spammy popups
- no fake ad blocks

---

## Phase 5: Only After The Site Is Ready

### 16. Create the AdSense account

Once the site is live and polished:
- create or log in to your Google AdSense account
- add your domain
- complete ownership verification
- wait for site review

### 17. Re-add ad code only after approval

After approval:
- re-add the AdSense script loader
- start with simple placements or Auto Ads
- keep ad count reasonable

Do not add ads before the site is stable and approved.

### 18. Add `ads.txt`

After AdSense gives your publisher ID:
- create `public/ads.txt`
- add the official AdSense line using your publisher ID
- redeploy

Example format:

```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Do not use the example publisher ID above. Replace it with your real one.

---

## Current Project-Specific Blockers

These should be fixed before applying:

- Cloudflare Pages production deployment must be live on the final domain
- `NEXT_PUBLIC_SITE_URL` must be the final live domain
- `NEXT_PUBLIC_SANITY_STUDIO_URL` should point to the real Studio URL
- all visible Sanity content should be reviewed one last time
- `ads.txt` is not added yet
- AdSense code is currently removed on purpose and should stay removed until approval

---

## Final Go/No-Go Checklist

Apply for AdSense only if all of these are true:

- [ ] Site is deployed on Cloudflare Pages
- [ ] Custom domain is connected
- [ ] HTTPS is active
- [ ] `NEXT_PUBLIC_SITE_URL` is set correctly
- [ ] Sanity content is building correctly in production
- [ ] Contact flow works
- [ ] Newsletter flow works
- [ ] No placeholder text remains
- [ ] No "coming soon" text remains
- [ ] Mobile layout is clean
- [ ] Desktop layout is clean
- [ ] About, Contact, Privacy Policy, and Terms pages are complete
- [ ] At least 8 to 12 good original articles are published
- [ ] Job listings are reviewed and trustworthy
- [ ] `robots.txt` and `sitemap.xml` are working
- [ ] Comments are either configured properly or the fallback state looks intentional
- [ ] Site feels complete and professional

If any of the boxes above are not done, wait before applying.

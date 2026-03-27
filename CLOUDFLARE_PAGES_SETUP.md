# Cloudflare Launch Setup

This project can keep the same look and feel on Cloudflare. Hosting does not change the design by itself.

## Current Recommendation

Use this sequence:

1. Keep the current frontend design.
2. Use Sanity as the content panel for articles and jobs.
3. Deploy the public site as a static export on Cloudflare Pages.
4. Deploy Sanity Studio separately and connect it from `/admin`.

## Cloudflare Project Setup

If you deploy this repo on Cloudflare, start with:

- Framework preset: `None` or `Next.js (static export)`
- Root directory: leave blank
- Build command: `npm run build`
- Build output directory: `out`

This project now uses Next.js static export, so it does not need a Next.js server runtime on Cloudflare.

## Environment Variables

Add these in Cloudflare before deploying:

```env
NEXT_PUBLIC_SITE_URL=https://theuaecareer.com
NEXT_PUBLIC_SANITY_PROJECT_ID=gmirvpfp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-27
SANITY_API_READ_TOKEN=your_read_token_if_dataset_is_private
NEXT_PUBLIC_CONTACT_EMAIL=hello@theuaecareer.com
NEXT_PUBLIC_NEWSLETTER_EMAIL=hello@theuaecareer.com
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-url
```

Optional:

```env
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://your-form-endpoint
NEXT_PUBLIC_NEWSLETTER_FORM_ENDPOINT=https://your-newsletter-endpoint
NEXT_PUBLIC_DISQUS_SHORTNAME=your_disqus_shortname
MONGODB_URI=your_production_mongodb_uri
SANITY_API_WRITE_TOKEN=your_write_token_for_import_scripts_only
```

## Comments Setup

Article pages already include a comments section.

To enable live comments:

1. Create a Disqus site for your domain.
2. Copy the Disqus shortname.
3. Set `NEXT_PUBLIC_DISQUS_SHORTNAME` in Cloudflare Pages.
4. Redeploy the site.

If you leave this unset, the comments block still appears with a fallback message that sends readers to the contact page.

## Domain Setup

Recommended structure:

- `theuaecareer.com` -> main site
- `www.theuaecareer.com` -> redirect to apex
- `studio.theuaecareer.com` -> Sanity Studio deployment

## Go-Live Order

1. Push the latest code to GitHub.
2. Create the Cloudflare project and connect the repo.
3. Add all required environment variables.
4. Run the first deploy.
5. Review key pages:
   - `/`
   - `/blog`
   - `/blog/[slug]`
   - `/jobs`
   - `/jobs/[slug]`
   - `/jobs/walk-in`
   - `/tools/cv-maker`
   - `/admin`
6. Add the custom domain.
7. Point DNS to Cloudflare if the domain is not already on Cloudflare.
8. Set `NEXT_PUBLIC_SITE_URL` to the final real domain and redeploy.
9. Deploy Sanity Studio separately and set `NEXT_PUBLIC_SANITY_STUDIO_URL`.
10. Re-test mobile, forms, Sanity content publishing, and SEO pages.
11. If you want article comments live, add `NEXT_PUBLIC_DISQUS_SHORTNAME` and redeploy.
12. Apply for AdSense only after the domain is live, indexed, and the content library feels strong enough for review.

## Expected Result

If deployed correctly:

- the design should stay the same as it is now
- articles and jobs should come from Sanity
- the site should load fast
- the public site should be fully static from Cloudflare Pages
- you can later connect AdSense after launch cleanup is complete

## Notes

- rotate the Sanity write token since one was shared during setup
- if your Sanity dataset is private, set `SANITY_API_READ_TOKEN` in Cloudflare so the static build can fetch CMS content
- `MONGODB_URI` is only needed if you still want to run the one-time database import script
- the `/admin` page is now a static bridge page, not the old Mongo admin
- keep AdSense code off the site until Google approves the domain

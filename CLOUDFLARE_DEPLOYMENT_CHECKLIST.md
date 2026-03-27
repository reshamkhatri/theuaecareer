# Cloudflare Deployment Checklist

This file is the practical launch plan for moving `theuaecareer` onto Cloudflare and connecting your real domain.

## Current State

The public site is now set up for **Cloudflare Pages static export**.

That means:
- blog and jobs are powered by Sanity at build time
- the public website exports to static files
- contact and newsletter now use static-safe handoff flows
- the old Mongo/API admin has been removed from the live site path

## Domain Structure Recommendation

Use:
- `theuaecareer.com` for the public site
- `www.theuaecareer.com` redirected to the main site
- `studio.theuaecareer.com` for the Sanity Studio deployment

## Cloudflare Domain Steps

### If you want apex domain on Cloudflare

1. Add your domain to Cloudflare as a zone.
2. Change your registrar nameservers to the Cloudflare nameservers.
3. Wait until the zone becomes active.
4. Add the domain to your Cloudflare Pages project from the dashboard.

### If you only want a subdomain

You can use a CNAME from:
- `www`
- or `studio`

pointing to the correct deployment hostname.

## Main App Launch Steps

1. Push the code to GitHub.
2. Create a Cloudflare Pages project.
3. Set:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `out`
4. Add the required environment variables.
5. Deploy the site.
6. Add the custom domain.
7. Test the public site and `/admin`.

### Environment variables to set in Cloudflare

Public:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_NEWSLETTER_EMAIL`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
- `NEXT_PUBLIC_DISQUS_SHORTNAME` if used

Optional:
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`
- `NEXT_PUBLIC_NEWSLETTER_FORM_ENDPOINT`
- `SANITY_API_WRITE_TOKEN` only for local/manual import scripts
- `MONGODB_URI` only for one-time database import scripts

## Sanity Studio Launch Steps

Use a separate Studio deployment.

Recommended path:
1. Run `npm run sanity:deploy`
2. Choose or confirm the hosted Studio URL
3. Point `studio.theuaecareer.com` there if you want a branded CMS URL
4. Save that URL into `NEXT_PUBLIC_SANITY_STUDIO_URL`
5. Use `/admin` on the public site as your quick jump page

## Recommended Go-Live Sequence

1. Review imported content in Sanity.
2. Create one new article and one new job manually in Sanity.
3. Confirm they appear correctly on the public site.
4. Deploy the public site on Cloudflare Pages.
5. Connect your real domain.
6. Set `NEXT_PUBLIC_SITE_URL=https://theuaecareer.com`
7. Rebuild and verify:
   - homepage
   - jobs
   - walk-ins
   - blog
   - article pages
   - CV maker
   - gratuity calculator
   - contact page
   - `/admin`
8. Add redirects:
   - `www` to apex
   - optionally set `studio` subdomain later
9. Deploy Sanity Studio and set `NEXT_PUBLIC_SANITY_STUDIO_URL`
10. Only after the live site is stable, continue with AdSense application.

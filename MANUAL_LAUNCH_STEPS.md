# Manual Launch Steps

This file covers the manual steps you still need to do outside the codebase to make `theuaecareer.com` live on Cloudflare Pages with Sanity.

Use this in order.

---

## 1. Prepare The GitHub Repo

1. Make sure the latest code is pushed to GitHub.
2. Confirm the repo you want Cloudflare to use is the correct one.
3. Keep the `frontend` folder as the app root.

---

## 2. Create The Cloudflare Pages Project

1. Log in to Cloudflare.
2. Go to `Workers & Pages`.
3. Click `Create application`.
4. Choose `Pages`.
5. Connect Git and select your GitHub repo.
6. Set:
   - Project name: `theuaecareer`
   - Production branch: `master` or your live branch
   - Root directory: leave blank
   - Build command: `npm run build`
   - Build output directory: `out`
7. Save the project, but do not deploy until env vars are added.

---

## 3. Add Environment Variables In Cloudflare Pages

Add these in the Cloudflare Pages project settings.

### Required

```env
NEXT_PUBLIC_SITE_URL=https://theuaecareer.com
NEXT_PUBLIC_SANITY_PROJECT_ID=gmirvpfp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-27
NEXT_PUBLIC_CONTACT_EMAIL=hello@theuaecareer.com
NEXT_PUBLIC_NEWSLETTER_EMAIL=hello@theuaecareer.com
NEXT_PUBLIC_SANITY_STUDIO_URL=https://studio.theuaecareer.com
```

### Required if your Sanity dataset is private

```env
SANITY_API_READ_TOKEN=your_sanity_read_token
```

### Optional

```env
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
NEXT_PUBLIC_NEWSLETTER_FORM_ENDPOINT=
NEXT_PUBLIC_DISQUS_SHORTNAME=
```

Notes:
- `NEXT_PUBLIC_DISQUS_SHORTNAME` is only needed if you want live comments on article pages.
- If you do not set a contact/newsletter endpoint, the site will use the email-app fallback already built into the UI.

---

## 4. Deploy The Site On Cloudflare Pages

1. Trigger the first production deploy.
2. Wait for the build to finish.
3. Open the Cloudflare preview URL and test:
   - `/`
   - `/blog`
   - `/jobs`
   - `/jobs/walk-in`
   - `/tools/cv-maker`
   - `/contact`
   - `/admin`
   - `/sitemap.xml`
   - `/robots.txt`

If something is wrong, stop here and fix it before connecting the domain.

---

## 5. Connect Your Domain

### If your domain is already using Cloudflare DNS

1. Open the Pages project.
2. Go to `Custom domains`.
3. Add:
   - `theuaecareer.com`
   - `www.theuaecareer.com`
4. Set `www` to redirect to the main domain if you want only one public version.

### If your domain is not yet on Cloudflare

1. Add the domain to Cloudflare.
2. Update the nameservers at your domain registrar to the Cloudflare nameservers.
3. Wait for the domain to become active in Cloudflare.
4. Then add the custom domain inside the Pages project.

After this:
1. Wait for SSL to become active.
2. Open `https://theuaecareer.com`.
3. Confirm the live domain loads correctly.

Reference:
- [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)

---

## 6. Deploy Sanity Studio

Sanity Studio is your content panel for articles and jobs.

Recommended URL:
- `https://studio.theuaecareer.com`

Do this:

1. In your local project, run:

```bash
npm run sanity:deploy
```

2. Choose the production dataset.
3. Set the Studio hostname or deployment name.
4. After deployment, copy the final Studio URL.
5. Put that URL into Cloudflare Pages as:

```env
NEXT_PUBLIC_SANITY_STUDIO_URL=https://studio.theuaecareer.com
```

6. Redeploy Cloudflare Pages after updating the env var.
7. Open `/admin` on your site and confirm it opens the Studio correctly.

---

## 7. Automate Sanity Publishing

Use the guide in [SANITY_AUTODEPLOY_SETUP.md](D:/theuaecareer/frontend/SANITY_AUTODEPLOY_SETUP.md).

Goal:

1. publish in Sanity
2. Sanity webhook calls `/api/redeploy`
3. Cloudflare Pages rebuilds automatically
4. live site updates without manual redeploy

---

## 8. Set Up Comments

Comments are already built into article pages with the custom guest comment system.

Required Cloudflare env vars:

```env
SANITY_API_WRITE_TOKEN=your_project_editor_token
COMMENTS_AUTO_APPROVE=true
```

Visitors do not need to sign up.

---

## 9. Final Pre-Launch Testing

Open the live site on both desktop and mobile and test:

- homepage
- jobs listing
- job details
- walk-in jobs
- blog listing
- article pages
- CV maker
- gratuity calculator
- contact page
- newsletter form area
- `/admin`
- sitemap
- robots

Check for:

- broken layout
- overlapping text
- missing images
- bad spacing on mobile
- wrong links
- placeholder text
- weird formatting inside articles or jobs

---

## 10. AdSense Preparation

Do not apply immediately after deployment.

First make sure:

1. The domain is live and stable.
2. The site is indexed.
3. The trust pages are complete:
   - About
   - Contact
   - Privacy Policy
   - Terms of Service
4. The site has more strong original articles.
5. The content library feels complete, not thin.
6. Ad code is still removed.

Then:

1. Create or log in to AdSense.
2. Add `theuaecareer.com`.
3. Complete site verification.
4. Wait for review.
5. Only after approval, add ad code back.
6. Add `ads.txt` after you receive your publisher ID.

Useful references:
- [AdSense: Own the site you want to use](https://support.google.com/adsense/answer/91205?hl=en)
- [AdSense: Connect your site](https://support.google.com/adsense/answer/7584263?hl=en)
- [AdSense Program policies](https://support.google.com/adsense/answer/48182?hl=en-EN)

---

## 11. Security Cleanup

Because a Sanity write token was shared during setup, do this after launch setup:

1. Go to your Sanity project settings.
2. Revoke the old write token.
3. Create a new token only if you still need one for local import scripts.
4. Keep the read token in Cloudflare only if your dataset is private.

---

## 12. Go-Live Checklist

Only consider the site ready when all of these are true:

- Cloudflare Pages deploy is successful
- `theuaecareer.com` opens correctly
- SSL is active
- Sanity Studio is deployed
- `/admin` opens the Studio
- article and job content publish correctly
- mobile layout looks clean
- comments are either configured or intentionally left in fallback mode
- trust pages are complete
- no placeholder content remains
- you are happy with the article quality before applying to AdSense

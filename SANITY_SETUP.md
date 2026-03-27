# Sanity Setup

This file covers the practical next steps after creating your Sanity project.

## 1. Add Environment Variables

Add these to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-27
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-url
```

Notes:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are required for public content fetching.
- `SANITY_API_READ_TOKEN` is recommended for builds if your dataset is private. If needed, the site can also fall back to `SANITY_API_WRITE_TOKEN` on the server during build, but a read token is safer.
- `SANITY_API_WRITE_TOKEN` is only needed for the import script.
- `NEXT_PUBLIC_SANITY_STUDIO_URL` is optional, but recommended once you deploy Studio separately.
- Keep the write token secret. Do not expose it in public client code.

## 2. Create a Write Token

In Sanity Manage:

1. Open your project.
2. Go to `API`.
3. Create a token with write access.
4. Copy it into `SANITY_API_WRITE_TOKEN`.

## 3. Open the Studio

Use one of these:

```bash
npm run sanity:dev
```

That starts the Studio locally.

For a live content panel, deploy it separately:

```bash
npm run sanity:deploy
```

After deploy, save that Studio URL into:

```env
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-url
```

You should see document types for:
- Articles
- Jobs
- Site Settings

## 4. Import Existing Content

Dry run first:

```bash
npm run sanity:import:auto -- --dry-run
```

Real import:

```bash
npm run sanity:import:auto
```

Optional cleanup after import:

```bash
npm run sanity:polish
```

Available modes:

```bash
npm run sanity:import:launch
npm run sanity:import:database
npm run sanity:import:auto
```

What each one does:
- `launch`: imports from `lib/launch-content.ts`
- `database`: imports from MongoDB only
- `auto`: prefers MongoDB content when available and falls back to launch content
- `polish`: removes known placeholder phrases from imported launch content

## 5. Verify Content

After import:

1. Open the local Studio or deployed Studio URL
2. Review a few articles
3. Review a few jobs
4. Confirm slugs and dates look correct
5. Publish edits if needed

## 6. Current Frontend Behavior

The public site now prefers Sanity content for:
- blog listing
- article pages
- jobs listing
- walk-in jobs
- job detail pages

If Sanity has no content yet, it still falls back to the old content source so the site does not break during migration.

## 7. Recommended Next Steps

After import is confirmed:

1. Create one new article in Sanity
2. Create one new job in Sanity
3. Confirm they appear on the public site
4. Confirm the `/admin` page points to your Studio URL
5. Keep the public site fully static on Cloudflare Pages

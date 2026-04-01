# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UAE job portal (theuaecareer.com) — a static Next.js 16 site with Sanity CMS, deployed on Cloudflare Pages. Targets Gulf-region job seekers (UAE, Saudi Arabia, Qatar). Monetized via Google AdSense.

## Important: Next.js 16

This project uses Next.js 16 which has breaking changes from earlier versions. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.** Heed deprecation notices.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev              # Dev server at http://localhost:3000
npm run build            # Static export to out/
npm run start            # Preview production build
npm run lint             # ESLint (flat config, ESLint 9)
npm run sanity:dev       # Sanity Studio at http://localhost:3333
npm run sanity:deploy    # Deploy Studio to Sanity Cloud
npm run sanity:import:launch    # Import hardcoded launch content to Sanity
npm run sanity:import:database  # Import from MongoDB to Sanity
npm run sanity:import:auto      # Auto-detect source and import
npm run sanity:polish           # Normalize encoding and clean content
```

## Architecture

### Static Export

The site uses `output: 'export'` in next.config.ts — all pages are pre-rendered to static HTML in `out/`. This means:
- No server-side runtime (no `getServerSideProps`, no API routes at runtime on Cloudflare)
- ISR `revalidate` hints exist but only apply during `next dev`/`next start`
- Sanity Studio cannot be embedded at `/studio`; it runs separately via `sanity:dev` or hosted at theuaecareer.sanity.studio

### Dual Content Source

`lib/content.ts` abstracts content fetching with a fallback chain:
1. **Sanity** (primary) — GROQ queries in `sanity/lib/content.ts`
2. **MongoDB** (fallback) — Mongoose models in `lib/models/`
3. **Hardcoded launch content** (ultimate fallback) — `lib/launch-content.ts`

Components are source-agnostic; they receive typed data from `lib/content.ts`.

### Data Models

Sanity schemas (`sanity/schemaTypes/`) and Mongoose models (`lib/models/`) mirror each other:
- **Job**: title, company, slug, location (city/country), jobType, category, salary, description, walkIn details, status
- **Article**: title, slug, excerpt, content (portable text), featuredImage, category, tags, status, author
- **Comment**: articleSlug, authorName, message, status (pending/approved/rejected), nested replies
- **SiteSettings**: siteTitle, tagline, description, hero text, contact email

### Content Update Flow

Editor updates Sanity Studio -> Sanity webhook hits `/api/redeploy` -> Cloudflare deploy hook triggers rebuild -> new static site goes live.

### Path Alias

`@/*` maps to the project root (e.g., `@/lib/types`, `@/components/Navbar`).

### Styling

Custom CSS only (no Tailwind/CSS-in-JS). ~1900 lines in `app/globals.css` using:
- CSS custom properties for theming (dark slate primary, indigo accents)
- Grid layout classes: `.grid-2`, `.grid-3`, `.grid-4`
- Ad-optimized layouts: `.blog-layout`, `.blog-sidebar`, `.ad-slot`
- Breakpoints: 1024px and 640px

### Key Patterns

- **SEO**: JSON-LD structured data on job/article pages, dynamic sitemap.ts and robots.ts, auto-generated meta titles/descriptions
- **PWA**: Serwist service worker (`app/sw.ts` compiled to `public/sw.js`)
- **Auth**: JWT + bcrypt for admin routes; admin dashboard at `/admin`
- **Monetization**: `AdSlot` component with configurable slot IDs via env vars
- **Content sanitization**: `lib/content-sanitizer.ts` fixes encoding artifacts and normalizes HTML

### Environment Variables

See `.env.example` for the full list. Key required vars:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SITE_URL`

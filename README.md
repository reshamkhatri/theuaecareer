# theuaecareer.com - UAE Job Portal

A modern, static job portal for UAE and Gulf region careers, built with Next.js and Sanity CMS.

## 🚀 Quick Start

### **Run the Website**
```bash
npm install
npm run dev
```
Open: **http://localhost:3000**

### **Run Sanity Studio (Content Editor)** ⭐
```bash
npm run sanity:dev
```
Open: **http://localhost:3333**

**Or double-click:** `start-studio.bat` (Windows)

📖 **[Complete Studio Guide →](HOW_TO_RUN_STUDIO.md)**

---

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── jobs/              # Job listings & details
│   ├── blog/              # Blog articles
│   ├── tools/             # CV Maker, Gratuity Calculator
│   ├── admin/             # Points to Sanity Studio
│   └── studio/            # Embedded studio (disabled for static export)
├── components/            # React components
├── sanity/                # Sanity CMS schema & config
├── lib/                   # Utilities, content fetchers
├── public/                # Static assets
├── sanity.config.ts       # Sanity Studio configuration
└── next.config.ts         # Next.js config (static export)
```

---

## 🛠️ Available Commands

### **Development**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (port 3000) |
| `npm run sanity:dev` | Start Sanity Studio (port 3333) |
| `npm run lint` | Run ESLint |

### **Production**
| Command | Description |
|---------|-------------|
| `npm run build` | Build static site to `out/` folder |
| `npm run start` | Preview production build |
| `npm run sanity:deploy` | Deploy Studio to Sanity hosting |

### **Content Management**
| Command | Description |
|---------|-------------|
| `npm run sanity:import:launch` | Import launch content to Sanity |
| `npm run sanity:import:database` | Import from MongoDB to Sanity |
| `npm run sanity:import:auto` | Auto-detect and import content |
| `npm run sanity:polish` | Clean and normalize content |

---

## 🎨 Sanity Studio Setup

**IMPORTANT:** Sanity Studio **does not work** with the embedded `/studio` route because this project uses static export.

### **How to Access Sanity Studio:**

#### **Development (Local):**
```bash
npm run sanity:dev
# Opens at: http://localhost:3333
```

#### **Production (Hosted):**
```bash
npm run sanity:deploy
# Deploys to: https://theuaecareer.sanity.studio
```

📖 **[Full Studio Documentation →](STUDIO_SETUP_SUMMARY.md)**

---

## 🌐 Deployment

### **Website (Cloudflare Pages)**

1. **Connect Repository:**
   - Go to Cloudflare Pages
   - Connect GitHub repository
   - Select `master` branch

2. **Build Settings:**
   - Build command: `npm run build`
   - Output directory: `out`
   - Root directory: (leave blank)

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://theuaecareer.com
   NEXT_PUBLIC_SANITY_PROJECT_ID=gmirvpfp
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-03-27
   NEXT_PUBLIC_CONTACT_EMAIL=hello@theuaecareer.com
   NEXT_PUBLIC_NEWSLETTER_EMAIL=hello@theuaecareer.com
   NEXT_PUBLIC_SANITY_STUDIO_URL=https://theuaecareer.sanity.studio
   ```

4. **Deploy:**
   - Push to GitHub
   - Cloudflare automatically builds and deploys

📖 **[Deployment Guide →](MANUAL_LAUNCH_STEPS.md)**

### **Sanity Studio (Sanity Hosting)**

```bash
npm run sanity:deploy
```

Follow prompts to choose a studio hostname.

---

## 🔑 Environment Variables

### **Required:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name (production)
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (2026-03-27)
- `NEXT_PUBLIC_SITE_URL` - Your website URL
- `NEXT_PUBLIC_CONTACT_EMAIL` - Contact email
- `NEXT_PUBLIC_NEWSLETTER_EMAIL` - Newsletter email

### **Optional:**
- `NEXT_PUBLIC_SANITY_STUDIO_URL` - External Sanity Studio URL
- `SANITY_API_READ_TOKEN` - For private datasets
- `SANITY_API_WRITE_TOKEN` - For content import scripts
- `NEXT_PUBLIC_DISQUS_SHORTNAME` - Blog comments
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` - Google AdSense
- `GEMINI_API_KEY` - For CV writing assistant

📖 **[Environment Setup →](.env.example)**

---

## 🎯 Features

### **Job Portal**
- ✅ Job listings with filtering (country, type, category)
- ✅ Walk-in interview section
- ✅ Job detail pages with structured data
- ✅ Related jobs suggestions
- ✅ Share functionality

### **Blog/Career Guides**
- ✅ Article listing with categories
- ✅ Related articles
- ✅ Reading time estimation
- ✅ Social sharing
- ✅ Optional Disqus comments

### **Tools**
- ✅ **CV Maker** - AI-assisted resume builder with templates
- ✅ **Gratuity Calculator** - UAE end-of-service calculation

### **SEO & Performance**
- ✅ Static site generation (SSG)
- ✅ Structured data (JSON-LD)
- ✅ Sitemap & robots.txt
- ✅ Open Graph & Twitter cards
- ✅ PWA support (service worker)
- ✅ Mobile responsive

### **Monetization Ready**
- 📋 Google Analytics setup guide
- 📋 AdSense integration components
- 📋 Affiliate marketing ready

📖 **[Monetization Guide →](ADSENSE_READY_CHECKLIST.md)**

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [HOW_TO_RUN_STUDIO.md](HOW_TO_RUN_STUDIO.md) | Complete Sanity Studio guide |
| [STUDIO_SETUP_SUMMARY.md](STUDIO_SETUP_SUMMARY.md) | Studio setup overview |
| [SANITY_STUDIO_FIX.md](SANITY_STUDIO_FIX.md) | Technical explanation of studio fix |
| [MANUAL_LAUNCH_STEPS.md](MANUAL_LAUNCH_STEPS.md) | Production deployment guide |
| [ADSENSE_READY_CHECKLIST.md](ADSENSE_READY_CHECKLIST.md) | AdSense approval checklist |
| [CLOUDFLARE_PAGES_SETUP.md](CLOUDFLARE_PAGES_SETUP.md) | Cloudflare deployment guide |

---

## 🧰 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity.io
- **Styling:** Custom CSS (1900+ lines)
- **Icons:** React Icons
- **PWA:** Serwist
- **Hosting:** Cloudflare Pages (static)
- **Studio Hosting:** Sanity Cloud (free)

---

## 🔧 Development Workflow

### **Typical Session:**

```bash
# Terminal 1: Run website
npm run dev          # → http://localhost:3000

# Terminal 2: Run Sanity Studio
npm run sanity:dev   # → http://localhost:3333
```

### **Content Updates:**

1. Edit content in Studio (localhost:3333)
2. Content saves to Sanity Cloud
3. Rebuild website to fetch latest content:
   ```bash
   npm run build
   ```
4. For production: Trigger Cloudflare rebuild

---

## 🐛 Troubleshooting

### **Sanity Studio Not Working?**
📖 Read: [HOW_TO_RUN_STUDIO.md](HOW_TO_RUN_STUDIO.md)

### **Build Errors?**
```bash
# Clear cache and reinstall
rm -rf .next node_modules out
npm install
npm run build
```

### **Content Not Showing?**
- Check Sanity Studio has content published
- Verify environment variables are set
- Check Sanity dataset is correct (production vs development)

### **Port Already in Use?**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 3333
npx kill-port 3333
```

---

## 📞 Support

- **Sanity Docs:** https://www.sanity.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Project Issues:** Check documentation files above

---

## 📄 License

Private project for theuaecareer.com

---

## ✅ Quick Checklist

### **First Time Setup:**
- [ ] `npm install`
- [ ] Create `.env.local` (copy from `.env.example`)
- [ ] Add Sanity credentials to `.env.local`
- [ ] Run `npm run sanity:dev` to test studio
- [ ] Run `npm run dev` to test website
- [ ] Import content: `npm run sanity:import:launch`

### **Before Production:**
- [ ] Deploy Sanity Studio: `npm run sanity:deploy`
- [ ] Update `NEXT_PUBLIC_SANITY_STUDIO_URL` in Cloudflare
- [ ] Test build: `npm run build`
- [ ] Review content in Sanity Studio
- [ ] Deploy to Cloudflare Pages

---

**Built with ❤️ for UAE job seekers**

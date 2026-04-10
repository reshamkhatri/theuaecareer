# 🎨 How to Run Sanity Studio

## 🚨 IMPORTANT

**Sanity Studio CANNOT run inside `/studio` route** because your website uses static export.

**Solution:** Run Sanity Studio **separately** from your website.

---

## ✅ QUICK START (3 Methods)

### **Method 1: Double-click the Batch File** ⭐ EASIEST (Windows)

1. Find: `start-studio.bat` in this folder
2. **Double-click it**
3. Studio opens at: **http://localhost:3333**

---

### **Method 2: Use NPM Command** (All platforms)

```bash
# In terminal:
npm run sanity:dev
```

Studio opens at: **http://localhost:3333**

---

### **Method 3: Use Shell Script** (Mac/Linux)

```bash
./start-studio.sh
```

Studio opens at: **http://localhost:3333**

---

## 📋 STEP BY STEP GUIDE

### 1. **Open Your Terminal/Command Prompt**

- **Windows:** Press `Win + R`, type `cmd`, press Enter
- **Mac:** Press `Cmd + Space`, type "Terminal", press Enter
- **Or:** Right-click this folder → "Open in Terminal"

### 2. **Navigate to the Project**

```bash
cd d:\theuaecareer\frontend
```

### 3. **Start Sanity Studio**

```bash
npm run sanity:dev
```

### 4. **Wait for Startup**

You'll see:
```
Starting Sanity Studio...
Local: http://localhost:3333
```

### 5. **Open in Browser**

- Open: **http://localhost:3333**
- Log in with your Sanity account
- Manage your content!

---

## 🎯 WHAT YOU'LL SEE

### **In Terminal:**
```
✔ Compiled successfully!
Local:     http://localhost:3333
```

### **In Browser (http://localhost:3333):**
- Sanity Studio login screen
- After login: Content management interface
- Sections: Jobs, Articles, Site Settings

---

## 🔧 TROUBLESHOOTING

### **Error: "Port 3333 is already in use"**

**Solution 1:** Stop the existing process
```bash
# Windows
netstat -ano | findstr :3333
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3333 | xargs kill
```

**Solution 2:** Use a different port
```bash
npx sanity dev --port 3334
```

---

### **Error: "Cannot find module 'sanity'"**

**Solution:** Install dependencies
```bash
npm install
```

---

### **Error: "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"**

**Solution:** Check your `.env.local` file exists and contains:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=gmirvpfp
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-27
```

---

### **Studio loads but shows "Invalid credentials"**

**Solution:** You need to log in to Sanity

1. In terminal, run:
```bash
npx sanity login
```

2. Follow the browser login flow
3. Restart Sanity Studio: `npm run sanity:dev`

---

### **Changes in Studio don't appear on website**

**Explanation:** This is NORMAL for static sites!

**How it works:**
1. Edit content in Studio → Saves to Sanity Cloud ✅
2. Website reads from Sanity during **BUILD TIME** only
3. Need to **rebuild website** to see changes

**Development workflow:**
```bash
# Terminal 1: Run Studio
npm run sanity:dev    # http://localhost:3333

# Terminal 2: Run Website
npm run dev          # http://localhost:3000
```

Then rebuild the website to pull latest content.

**Production workflow:**
1. Edit in Studio
2. Trigger Cloudflare Pages rebuild (webhook or manual)
3. New content appears on live site

---

## 🌐 PRODUCTION DEPLOYMENT

### **Option A: Deploy to Sanity Hosting** ⭐ RECOMMENDED

```bash
npm run sanity:deploy
```

This creates: **https://theuaecareer.sanity.studio**

Then update `.env`:
```env
NEXT_PUBLIC_SANITY_STUDIO_URL=https://theuaecareer.sanity.studio
```

---

### **Option B: Deploy to Vercel/Netlify**

Create separate repository for Studio:

1. Create new folder: `d:\theuaecareer\studio`
2. Copy files:
   - `sanity.config.ts`
   - `sanity.cli.ts`
   - `sanity/` folder
   - `package.json` (only Sanity dependencies)
3. Push to GitHub
4. Deploy to Vercel/Netlify
5. Update your website's `.env` with the new URL

---

## 📁 FILE STRUCTURE

```
frontend/
├── app/
│   ├── studio/        ❌ BROKEN (can't use with static export)
│   └── admin/         ✅ Points to external studio
├── sanity/            ✅ Sanity schema & config
├── sanity.config.ts   ✅ Studio configuration
├── sanity.cli.ts      ✅ CLI settings (port 3333)
├── start-studio.bat   ✅ Windows launcher
└── start-studio.sh    ✅ Mac/Linux launcher
```

---

## ❓ FAQ

### **Q: Why can't I use `/studio` route?**
**A:** Your website uses `output: 'export'` (static HTML). Sanity Studio is a dynamic app. They're incompatible.

### **Q: Do I need to run Studio every time?**
**A:** Only when you want to edit content. Once deployed to production, you can use the hosted version.

### **Q: How do I give others access?**
**A:**
1. Go to: https://www.sanity.io/manage
2. Select your project: `theuaecareer`
3. Settings → Members → Invite users

### **Q: Is this the right way?**
**A:** Yes! This is the **standard approach** for static sites with Sanity CMS.

---

## 🎓 LEARN MORE

- Sanity Docs: https://www.sanity.io/docs
- Next.js + Sanity: https://www.sanity.io/plugins/next-sanity
- Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports

---

## 📞 STILL STUCK?

1. Check terminal for error messages
2. Verify `.env.local` file exists
3. Run: `npm install` (reinstall dependencies)
4. Try: `npx sanity login` (re-authenticate)

**If all else fails:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run sanity:dev
```

---

## ✅ SUCCESS CHECKLIST

- [ ] Terminal shows: "Compiled successfully"
- [ ] Browser opens at: http://localhost:3333
- [ ] Sanity Studio interface loads
- [ ] Can log in with Sanity account
- [ ] Can see Jobs, Articles sections
- [ ] Can create/edit content
- [ ] Changes save successfully

---

**Happy editing! 🎉**

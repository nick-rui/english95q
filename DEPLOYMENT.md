# Deployment Guide

This guide will help you deploy "The Road Knows" to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel is the easiest and fastest way to deploy this React/Vite application.

#### Steps:

1. **Create a Vercel account** (if you don't have one)
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push your code to GitHub** (if you haven't already)
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit: The Road Knows interactive slideshow"

   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/the-road-knows.git
   git branch -M main
   git push -u origin main
   ```

3. **Import project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

4. **Done!** Your site will be live at `your-project-name.vercel.app`

#### Alternative: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? the-road-knows
# - In which directory is your code located? ./
# - Auto-detect settings? Yes
```

---

### Option 2: Netlify

#### Steps:

1. **Create a Netlify account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Deploy from Git**
   - Push your code to GitHub (see Option 1 for git commands)
   - In Netlify dashboard, click "Add new site" > "Import an existing project"
   - Connect to your Git provider
   - Select your repository
   - Build settings (Netlify should auto-detect):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Done!** Your site will be live at a Netlify URL

#### Alternative: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Follow prompts to authorize and configure
```

---

### Option 3: GitHub Pages

#### Steps:

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/the-road-knows/', // Replace with your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

6. **Access your site** at `https://YOUR_USERNAME.github.io/the-road-knows/`

---

## 🎨 Before Deploying - Optional Enhancements

### Add Custom Images

1. Create or source 13 background images (see `/public/assets/slide-backgrounds/README.md`)
2. Save them with exact filenames: `slide1-single-brick.png`, `slide2-construction.png`, etc.
3. Place in `/public/assets/slide-backgrounds/`
4. Rebuild and redeploy

**Note**: The app works beautifully with CSS placeholders if images aren't added.

### Customize Credits (Slide 13)

1. Open `/src/data/slides.js`
2. Find Slide 13 (credits slide)
3. Replace `[Your Name]` and `[Date]` with your actual information
4. Save and rebuild

---

## 🧪 Pre-Deployment Checklist

Before deploying, verify:

- [ ] All 13 slides display correctly
- [ ] Navigation buttons work (Next/Previous)
- [ ] Keyboard navigation works (arrow keys)
- [ ] Yellow brick road progress bar animates
- [ ] Progress saves to localStorage
- [ ] Responsive on mobile (test with browser dev tools)
- [ ] All fonts load (Cinzel and Libre Baskerville)
- [ ] No console errors
- [ ] Production build succeeds: `npm run build`

---

## 🔧 Custom Domain (Optional)

### For Vercel:

1. In Vercel dashboard, go to your project
2. Settings > Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### For Netlify:

1. In Netlify dashboard, go to your site
2. Site settings > Domain management
3. Add custom domain
4. Follow DNS configuration instructions

---

## 📊 Analytics (Optional)

### Add Google Analytics:

1. Get your GA4 tracking ID
2. Add to `index.html` in the `<head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 🐛 Troubleshooting

### Build fails
- Check Node.js version (18+ required)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm run build` locally first

### Fonts not loading
- Check internet connection
- Verify Google Fonts link in `index.html`
- Clear browser cache

### Styles not applying
- Check Tailwind config is correct
- Verify PostCSS config exists
- Run `npm run build` to see CSS warnings

### 404 on deployment
- For GitHub Pages: Check `base` in `vite.config.js`
- For other platforms: Ensure `dist` folder is being deployed

---

## 🎯 Performance Tips

After deployment:

1. **Check Lighthouse scores**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Aim for 90+ in all categories

2. **Test on multiple devices**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Chrome)
   - Tablet

3. **Monitor load times**
   - Should load in < 2 seconds on good connection
   - Optimize images if needed (compress to < 200KB each)

---

## 🎓 Submitting for Class

### Include:

1. **Live URL** from your deployment
2. **GitHub repository URL** (if applicable)
3. **README.md** (already created)
4. **Artist's Statement** (included in Slide 13)

### In your submission email/document:

```
Project Title: The Road Knows
Live URL: https://your-deployment-url.vercel.app
GitHub: https://github.com/yourname/the-road-knows
Description: An interactive narrative retelling of The Wizard of Oz
from the Yellow Brick Road's perspective (13 slides, ~10-15 minutes)
```

---

**You're ready to deploy! 🟡→🟡→🟡**

Questions? Check the main README.md or contact your instructor.

# Quizrine Deployment Guide

This guide will help you deploy your Quizrine wedding quiz app for free using Vercel or Netlify.

## Prerequisites

- [x] Git repository (you have this locally)
- [x] Supabase project set up (you already have this)
- [ ] GitHub/GitLab/Bitbucket account (to push your code)
- [ ] Vercel or Netlify account (free)

---

## Step 1: Push Your Code to GitHub

Your code is currently only on your local machine. You need to push it to GitHub (or GitLab/Bitbucket) so Vercel/Netlify can access it.

### 1.1 Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Name it `quizrine` (or whatever you prefer)
5. Choose **Private** (recommended for wedding app)
6. **DO NOT** initialize with README, .gitignore, or license (you already have these)
7. Click **"Create repository"**

### 1.2 Link Your Local Repository to GitHub

GitHub will show you commands after creating the repo. Run these in your project directory:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quizrine.git

# Rename your branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Important**: Make sure you've committed all your files first:
```bash
git add .
git commit -m "Initial commit - Quizrine wedding quiz app"
git push -u origin main
```

---

## Step 2: Deploy to Vercel (Recommended)

Vercel is the fastest option since your app already has `vercel.json` configured.

### 2.1 Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. On the Vercel dashboard, click **"Add New"** → **"Project"**
2. Find your `quizrine` repository in the list
3. Click **"Import"**

### 2.3 Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Add Environment Variables

**CRITICAL STEP** - Your app won't work without these!

In the "Environment Variables" section, add these three variables:

| Name | Value | Where to Find It |
|------|-------|------------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key | Supabase Dashboard → Settings → API → Project API keys → `anon` `public` |
| `VITE_UPLOAD_PASSWORD` | Choose a secure password | Make up a strong password for the upload page |

**How to add them:**
1. Click **"Add"** for each variable
2. Enter the **Name** (exactly as shown above)
3. Enter the **Value**
4. Select environment: **Production**, **Preview**, and **Development** (check all three)
5. Click **"Add"** to save

### 2.5 Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes while Vercel builds your app
3. Once complete, you'll see a **"Visit"** button
4. Click it to see your live app! 🎉

Your app will be available at: `https://your-project-name.vercel.app`

### 2.6 Custom Domain (Optional)

Vercel free tier includes custom domains:

1. Go to your project settings → **Domains**
2. Add your custom domain (e.g., `quizrine.com`)
3. Follow the DNS configuration instructions
4. Vercel provides free SSL certificates automatically

---

## Alternative: Deploy to Netlify

If you prefer Netlify instead of Vercel:

### 3.1 Sign Up for Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** → **"Continue with GitHub"**

### 3.2 Import Your Project

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"GitHub"**
3. Select your `quizrine` repository

### 3.3 Configure Build Settings

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 3.4 Add Environment Variables

Click **"Show advanced"** → **"New variable"** and add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_UPLOAD_PASSWORD`

(Same values as described in the Vercel section above)

### 3.5 Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete
3. Your site will be live at `https://random-name-12345.netlify.app`

### 3.6 Custom Domain (Optional)

1. Go to **Domain settings** → **Add custom domain**
2. Follow the DNS configuration steps

---

## Step 3: Configure Supabase for Your Live Site

After deployment, you need to allow your live domain to access Supabase:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add your deployed URL to **Site URL** (e.g., `https://your-project.vercel.app`)
4. Add it to **Redirect URLs** as well (if using authentication)

---

## Step 4: Test Your Deployed App

1. Visit your deployed URL
2. Test the landing page loads correctly
3. Try the quiz (make sure videos load from Supabase)
4. Test the upload page with your `VITE_UPLOAD_PASSWORD`
5. Upload a test question to verify Supabase integration works

---

## Step 5: Future Updates

Whenever you make changes to your code:

```bash
# Make your changes
# Test locally with: npm run dev

# Commit changes
git add .
git commit -m "Description of your changes"

# Push to GitHub
git push

# Vercel/Netlify will automatically rebuild and deploy! 🚀
```

Both platforms automatically redeploy when you push to your main branch.

---

## Troubleshooting

### Videos not loading
- Check that your Supabase storage bucket `quiz-videos` is set to **public**
- Verify the environment variables are correct in Vercel/Netlify

### Upload page not working
- Double-check `VITE_UPLOAD_PASSWORD` is set correctly
- Make sure all three env variables are added

### Build fails
- Check the build logs in Vercel/Netlify dashboard
- Verify `package.json` has all dependencies
- Try building locally: `npm run build`

### Environment variables not working
- Variable names must start with `VITE_` for Vite apps
- After adding/changing env vars, trigger a new deployment
- In Vercel: **Deployments** → **...** menu → **Redeploy**

---

## Cost Breakdown

**100% FREE** for your use case:

- ✅ **Vercel Free Tier**: Unlimited personal projects, 100GB bandwidth/month
- ✅ **Netlify Free Tier**: 100GB bandwidth/month, 300 build minutes/month
- ✅ **Supabase Free Tier**: 500MB database, 1GB file storage, 2GB bandwidth
- ✅ **Custom domain**: Free on both platforms (just buy the domain name separately)

Your wedding quiz app will easily fit within all free tier limits!

---

## Recommended: Vercel

**Choose Vercel because:**
- Your app already has `vercel.json` configured
- Fastest deployment process (3 clicks)
- Excellent performance for React/Vite apps
- Great free tier with no credit card required

**Good luck with your wedding! 💍**

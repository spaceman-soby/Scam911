# Netlify Deployment Guide for SCAM911

## Prerequisites

1. A GitHub account
2. A Netlify account (free tier works)
3. Your Supabase project credentials

## Step 1: Push to GitHub

If you haven't already created a GitHub repository:

1. Go to https://github.com/new
2. Create a new repository (e.g., "scam911-app")
3. Do NOT initialize with README, .gitignore, or license

Then run these commands in your project directory:

```bash
git add .
git commit -m "Initial commit: SCAM911 app ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## Step 2: Connect to Netlify

1. Log in to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your SCAM911 repository

## Step 3: Configure Build Settings

Netlify should auto-detect Next.js settings, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Branch to deploy**: `main`

## Step 4: Add Environment Variables

In the Netlify dashboard:

1. Go to "Site settings" → "Environment variables"
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL = your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
```

Get these values from your Supabase project:
- Go to https://app.supabase.com
- Select your project
- Go to Settings → API
- Copy the "Project URL" and "anon/public" key

## Step 5: Deploy

1. Click "Deploy site"
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like `https://your-site-name.netlify.app`

## Step 6: Configure Custom Domain (Optional)

1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to add your domain
4. Update your DNS settings as instructed

## Troubleshooting

### 404 Errors

If you see 404 errors:
- Check that the publish directory is set to `.next` (not `out`)
- Verify the build completed successfully
- Check the deploy logs for any errors

### Authentication Not Working

If login/signup fails:
- Verify environment variables are set correctly in Netlify
- Check that your Supabase URL includes `https://`
- Ensure the anon key is copied completely

### Build Failures

Common issues:
- Missing environment variables: Add them in Netlify settings
- Node version: Netlify uses Node 18 by default
- Dependencies: Run `npm install` locally to verify all packages install

### Supabase Connection Issues

If the app can't connect to Supabase:
- Verify your Supabase project is active
- Check that environment variables match your Supabase dashboard
- Ensure your Supabase project allows connections from Netlify

## Continuous Deployment

Once set up, every push to your `main` branch will automatically trigger a new deployment on Netlify.

To deploy changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Support

- Netlify Documentation: https://docs.netlify.com
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs

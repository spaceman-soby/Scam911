# GitHub Repository Setup Guide

## Quick Start - Push to Existing Repository

If you already have a GitHub repository created, run these commands:

```bash
# Replace YOUR-USERNAME and YOUR-REPO-NAME with your actual values
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

## Option 1: Create New Repository on GitHub (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository details:
   - **Repository name**: `scam911-app` (or your preferred name)
   - **Description**: "SCAM911 - Phone scam detection and prevention app"
   - **Visibility**: Choose Public or Private
   - **IMPORTANT**: Do NOT check any of these boxes:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license

3. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, GitHub will show you instructions. Use these commands in your project directory:

```bash
# Add the GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Replace:**
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

### Example:

If your username is `johnsmith` and repository is `scam911-app`:

```bash
git remote add origin https://github.com/johnsmith/scam911-app.git
git branch -M main
git push -u origin main
```

## Option 2: Using GitHub CLI (Alternative Method)

If you have GitHub CLI installed:

```bash
# Create repository and push in one command
gh repo create scam911-app --public --source=. --remote=origin --push
```

## Verify Your Setup

After pushing, verify your code is on GitHub:

1. Go to `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`
2. You should see all your project files
3. The main branch should be selected by default

## Common Issues and Solutions

### Issue: "remote origin already exists"

**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### Issue: "failed to push some refs"

**Solution:** If the remote repository has files (README, license, etc.):
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue: Authentication Error

**Solutions:**

1. **Use Personal Access Token (Recommended):**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` scope
   - Use token as password when prompted

2. **Use SSH:**
   ```bash
   # Change remote to SSH
   git remote set-url origin git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git
   ```

## Next Steps

Once your code is on GitHub:

1. Go to the [Netlify Deployment Guide](./NETLIFY_DEPLOYMENT.md)
2. Follow the steps to deploy your app to Netlify
3. Your app will auto-deploy on every push to the main branch

## Making Updates

After the initial push, to update your code on GitHub:

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Your description of changes"

# Push to GitHub
git push origin main
```

## Repository Settings (Optional but Recommended)

### Add Repository Description

1. Go to your repository on GitHub
2. Click the gear icon next to "About"
3. Add description: "SCAM911 - Phone scam detection and prevention app for seniors"
4. Add topics: `nextjs`, `scam-detection`, `supabase`, `accessibility`

### Enable Issues and Discussions

1. Go to repository Settings
2. Scroll to "Features"
3. Check "Issues" to enable bug tracking
4. Check "Discussions" for community discussions (optional)

### Protect Main Branch (Recommended for team projects)

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable "Require a pull request before merging"

## Getting Repository URL

Your repository URL format:
- HTTPS: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git`
- SSH: `git@github.com:YOUR-USERNAME/YOUR-REPO-NAME.git`

Find it on your GitHub repository page by clicking the green "Code" button.

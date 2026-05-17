# Pushing this portfolio to GitHub

The portfolio source code is complete in this folder. To push it to
[`parthesaurabh1616/SaurabhParthe-Portfolio`](https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio),
run the commands below from this directory on your machine.

> Note: the `.git` folder in this directory may be in a stale state
> (created from a sandboxed environment). The first step deletes it so
> you can re-initialise the repository cleanly.

## One-time setup

```powershell
# from C:\Users\saura\OneDrive\Desktop\SAURABH WEBSITE\portfolio
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue

git init -b main
git remote add origin https://github.com/parthesaurabh1616/SaurabhParthe-Portfolio.git
git add .
git commit -m "feat: production-grade portfolio for distributed systems & AI infrastructure"
git push -u origin main
```

If the remote already has commits, force-push the first time:

```powershell
git push -u origin main --force
```

## Local development

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push to GitHub (above).
2. Import the repo on https://vercel.com/new.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `next build` (default).
5. Output directory: `.next` (default).
6. Deploy — free tier is enough.

The `vercel.json` in this repo sets sensible defaults and security headers.

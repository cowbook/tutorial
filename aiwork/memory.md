# Deployment update summary

- Converted the site to a static-export Next.js setup for GitHub Pages compatibility
- Removed the server-only middleware and replaced locale detection with client-side logic
- Added a GitHub Actions workflow for deployment to GitHub Pages
- Added `.nojekyll` to prevent GitHub from ignoring static assets
- Verified the production build succeeds with `pnpm build`

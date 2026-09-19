# Deployment update summary

- Converted the site to a static-export Next.js setup for GitHub Pages compatibility
- Removed the server-only middleware and replaced locale detection with client-side logic
- Added a GitHub Actions workflow for deployment to GitHub Pages
- Added `.nojekyll` to prevent GitHub from ignoring static assets
- Verified the production build succeeds with `pnpm build`

## 2026-09-19 — Fix the deployed homepage 404

- Root cause verified live: `/` and `/en/` returned 404 while `/home.zh/` returned 200; GitHub Actions succeeded and the custom domain was already bound. Earlier build-only verification missed broken routing after removing Next.js i18n.
- Migrated language-suffixed content and metadata to real static routes: Chinese at the root and English under `/en`. Preserved static image imports and fixed English links.
- Added a real root index with hydration-safe browser language detection and plain-language links; restored `/home/` and `/en/home/`.
- Added a static-compatible language switcher and a theme wrapper isolating each language's navigation; made logo destinations and titles language-aware.
- Included CNAME and .nojekyll in public output. Added static output/link checks directly to `pnpm build`, so the existing workflow cannot publish a missing homepage again.
- Added Playwright browser regression tests and generated-output ignore rules; updated README deployment and certificate guidance.
- Verification before commit: production export and link/asset checks passed; all 6 Chromium tests passed; changed TypeScript/JSX files have no editor diagnostics.
- Removed the embedded token from the Git remote URL. The exposed token must be revoked by its owner; no credentials are recorded here.
- HTTPS is a separate origin provisioning issue: GitHub API reports no origin certificate and refuses https_enforced=true. Cloudflare edge HTTPS already responds; DNS-only validation requires Cloudflare access, which is not configured in this session.

## 2026-09-19 — Repair clean CI dependency installation

- Remote run 35452202984 exposed a legacy mirror-tarball lockfile conversion incompatibility with pnpm 9.15.9; local cached installation had masked it.
- Pinned existing direct dependency versions (including Nextra 2.13.3 rather than latest), configured npmjs.org in .npmrc, and regenerated the lockfile using pnpm 9.15.9 after removing its stale cached lock snapshot.
- Verified pnpm 9.15.9 frozen installation, production export/link checks, and all 6 Chromium tests again with the regenerated dependencies.
- Existing dependency deprecation/peer warnings remain; a major framework/security upgrade is separate from this static-hosting outage repair.

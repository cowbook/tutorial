## Uncle Cow

This is a  teaching website for beginers to AI development as soon as possible that is  hosting all blogs,video,things created by Uncle Cow. It focus on following development technology:

* Python
* React / Next.js
* Vue.js
* Tensorflow

Built with Next.js 16 App Router, React 19, [Nextra 4](https://nextra.site), TypeScript, and Tailwind CSS 4. Exported as static HTML and deployed through GitHub Actions to GitHub Pages. There is no runtime application server or database.


## Quick Start

Production: https://www.xiaoniushu.com/

- Chinese homepage: `/home/`; English homepage: `/en/`.
- `/` detects a saved language preference or browser language in the browser. It also provides normal links when JavaScript is disabled.
- Chinese content lives under `content`; English content under `content/en`. Do not restore Next.js server-side `i18n`, middleware language redirects, or `.en`/`.zh` page suffixes: this site must work on a static file host.
- `/en/home/` remains a compatibility alias with a normal fallback link and canonical `/en/`. Chapter URLs, including hidden advanced/Django content, are preserved.
- Language switching stays on the same chapter when a translation exists; otherwise it links to the other language's homepage.
- The domain is served at the root, so no repository `basePath` is configured.

## Build and deployment

- Use **Node.js 24 LTS** (`nvm use` with nvm, or another manager honoring `.node-version`) and **pnpm 10.34.6**, pinned in `packageManager`. Only `pnpm-lock.yaml` is supported; do not introduce npm or Yarn lockfiles.
- `pnpm install --frozen-lockfile`
- `pnpm typecheck` generates Next.js route types and runs strict TypeScript checking; `pnpm lint` checks TypeScript, React Hooks, and Next.js rules.
- `pnpm build` exports the site, generates Pagefind indexes, and verifies every content route, compatibility aliases, page language/metadata, sitemap, bilingual search coverage, internal links, assets, and domain files. A successful compile alone is not a successful deployment check.
- `pnpm exec playwright install chromium` then `pnpm test:e2e` tests the export using a strict static server, without a Next.js runtime or SPA fallback.
- If browser downloads are unavailable and Google Chrome is installed, use `PLAYWRIGHT_CHANNEL=chrome pnpm test:e2e`.
- `pnpm start` previews the built export at http://127.0.0.1:4173; it does not run `next start`, which is incompatible with this static export.
- Pull requests run the same build, type/lint checks, and browser tests without deployment. Pushes to `main` deploy only after all checks pass. Pages source must be **GitHub Actions**, custom domain **www.xiaoniushu.com**.
- `public/CNAME` and `public/.nojekyll` are included in the exported artifact.

### Architecture and content editing

- `app/(zh)` and `app/en` provide separate root layouts with the correct document language. Their catch-all routes enumerate MDX pages at build time.
- `content/**/*.mdx` contains lessons. `content/**/_meta.ts` defines typed navigation order, titles, and theme settings. Nextra 4 does **not** read the old `_meta.json` files.
- `components/site-layout.tsx` configures the shared docs theme; `components/home-page.tsx` renders both homepages from translated copy. Browser language detection and cookie handling live in small Client Components.
- `lib/site.ts` centralizes site metadata, locale rules, and translation targets. `lib/content-routes.mjs` discovers routes for both the application and export verification.
- A new lesson is picked up automatically by static generation, language mapping, sitemap generation, and export checks. Give it a meaningful first heading or frontmatter `title`; optionally supply a frontmatter `description`.
- Use public image URLs such as `/images/example.png`; do not point content at the old `pages` directory. Native links work without JavaScript; interactive MDX elements should be extracted into a Client Component.
- Pagefind builds independent Chinese/English indexes from each document's `lang`. Search is fully client-side and requires a completed build; it is not available on a fresh `pnpm dev` run.
- Optimized WebP images are checked in. `pnpm images:optimize` regenerates the main site images with lossless compression and verifies identical decoded pixels. Original PNG URLs are retained for compatibility.

### Compatibility constraints

- Development and production explicitly use **Webpack**. The current Nextra Mermaid import alias fails under Next.js 16's default Turbopack; diagram rendering is covered by browser tests. Remove `--webpack` only after both build and diagram tests pass.
- `pnpm-workspace.yaml` pins **only Nextra's Zod dependencies** to 4.1.12. Zod 4.6.5 rejects a missing custom `children` field in Nextra 4.6.1's published layout schema, preventing prerendering. Revisit the pin when upgrading Nextra; do not remove it without a full static build.
- TypeScript stays on 5.9.3, within the supported range of the installed TypeScript ESLint tooling.
- When newly moved content has not yet been committed, Nextra may warn that Git modification timestamps are unavailable. This does not prevent export. No timestamps are fabricated.

### Cloudflare and HTTPS

The `www` CNAME points to `cowbook.github.io`. Cloudflare's edge certificate and GitHub's origin certificate are separate. Changing Cloudflare to Full does not create a GitHub certificate and does not repair missing HTML files.

If GitHub's **Enforce HTTPS** remains unavailable, temporarily switch `www` to **DNS only** so GitHub can validate DNS and provision its certificate (this can take up to 24 hours). Once the origin certificate is ready, enable Enforce HTTPS, restore Cloudflare proxying, and use **Full (strict)**. Do not use Flexible. Changes to the apex domain or email records are not required for the `www` site.

Never embed access tokens in remote URLs. Use GitHub CLI authentication or a credential manager; revoke any token that has appeared in a terminal command or chat.


## Local Development

Select Node.js 24, then run `pnpm install --frozen-lockfile`.

Then, run `pnpm dev` to start the development server and visit localhost:3000.

## License

This project is licensed under the MIT License.

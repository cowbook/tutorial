## Uncle Cow

This is a  teaching website for beginers to AI development as soon as possible that is  hosting all blogs,video,things created by Uncle Cow. It focus on following development technology:

* Python
* React / Next.js
* Vue.js
* Tensorflow

Built with [Nextra](https://nextra.site), exported as static HTML and deployed through GitHub Actions to GitHub Pages.


## Quick Start

Production: https://www.xiaoniushu.com/

- Chinese homepage: `/home/`; English homepage: `/en/`.
- `/` detects a saved language preference or browser language in the browser. It also provides normal links when JavaScript is disabled.
- Chinese content lives directly under `pages`; English content under `pages/en`. Do not restore Next.js `i18n` or `.en`/`.zh` page suffixes: they are incompatible with this static routing layout.
- The domain is served at the root, so no repository `basePath` is configured.

## Build and deployment

- `pnpm install --frozen-lockfile`
- `pnpm build` exports the site and verifies that the homepage, language routes, internal links, assets, and domain files exist. A successful compile alone is not a successful deployment check.
- `pnpm exec playwright install chromium` then `pnpm test:e2e` tests the export using a strict static server, without a Next.js runtime or SPA fallback.
- Push to `main` to trigger the existing GitHub Pages workflow. Pages source must be **GitHub Actions**, custom domain **www.xiaoniushu.com**.
- `public/CNAME` and `public/.nojekyll` are included in the exported artifact.

### Cloudflare and HTTPS

The `www` CNAME points to `cowbook.github.io`. Cloudflare's edge certificate and GitHub's origin certificate are separate. Changing Cloudflare to Full does not create a GitHub certificate and does not repair missing HTML files.

If GitHub's **Enforce HTTPS** remains unavailable, temporarily switch `www` to **DNS only** so GitHub can validate DNS and provision its certificate (this can take up to 24 hours). Once the origin certificate is ready, enable Enforce HTTPS, restore Cloudflare proxying, and use **Full (strict)**. Do not use Flexible. Changes to the apex domain or email records are not required for the `www` site.

Never embed access tokens in remote URLs. Use GitHub CLI authentication or a credential manager; revoke any token that has appeared in a terminal command or chat.


## Local Development

First, run `pnpm i` to install the dependencies.

Then, run `pnpm dev` to start the development server and visit localhost:3000.

## License

This project is licensed under the MIT License.

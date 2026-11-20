# Chineke! Foundation front end

The public website for the [Chineke! Foundation](https://chineke.org), built
with Next.js (Pages Router) and sourcing content from a Drupal CMS through the
[`next-drupal`](https://next-drupal.org) library. It is hosted on Pantheon's
Next.js hosting.

## Requirements

- Node.js 24 (see `.nvmrc`)
- npm. The `.npmrc` sets `legacy-peer-deps=true`, which `npm install` needs.
- A running Drupal backend with the Next.js module and an OAuth consumer that
  has the `nextjs_preview` scope.

## Environment variables

Copy `.env.example` to `.env.local` for local development. On Pantheon, set the
same values in the Secrets Manager.

| Variable                   | Required | Purpose                                                                                                         |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `BACKEND_URL`              | Yes      | URL of the Drupal site. The build fails if it is missing.                                                       |
| `CLIENT_ID`                | Yes      | Drupal OAuth consumer client ID, used to validate draft preview requests.                                       |
| `CLIENT_SECRET`            | Yes      | Drupal OAuth consumer secret.                                                                                   |
| `DRUPAL_REVALIDATE_SECRET` | Yes      | Must match the revalidate secret on the Drupal `next_site`. Drupal sends it as `?secret=` to `/api/revalidate`. |
| `FRONTEND_URL`             | No       | Public URL of this site, used for `hreflang`.                                                                   |
| `IMAGE_DOMAIN`             | No       | Host serving images, if different from `BACKEND_URL`.                                                           |
| `IMAGE_OPT_CONCURRENCY`    | No       | Concurrent image optimisations. Defaults to `2`.                                                                |
| `DEBUG_MODE`               | No       | Enables extra debug output.                                                                                     |
| `NODE_EXTRA_CA_CERTS`      | No       | Local only. Path to the DDEV mkcert root CA when the backend is `*.ddev.site`.                                  |

The draft preview secret is validated by Drupal, so this site does not need it.

## Local development

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Script                              | What it does                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`                       | Starts the development server.                                                          |
| `npm run build`                     | Builds the standalone output and copies the static assets into it. Used by Pantheon.    |
| `npm start`                         | Runs the standalone production server (`.next/standalone/server.js`). Used by Pantheon. |
| `npm run build:mono` / `start:mono` | Standard `next build` and `next start`, without the standalone copy step.               |
| `npm run lint` / `lint:fix`         | Runs ESLint.                                                                            |
| `npm run prettier` / `prettier:fix` | Checks or fixes formatting.                                                             |

## How it works

### Content

`lib/drupal.js` creates a `NextDrupalPages` client using `BACKEND_URL` and the
OAuth credentials. Pages are rendered on the server on each request.

### Caching

Pages and the public API routes send
`Cache-Control: public, s-maxage=300, stale-while-revalidate=86400`, set by
`utils/setCacheHeaders.ts`. Editor changes can take up to five minutes to
appear. Requests carrying the Draft Mode cookie are never cached.

`cacheHandler.mjs` wires in `@pantheon-systems/nextjs-cache-handler`, which
selects the cache backend for the environment.

### On-demand revalidation

On save, Drupal calls `/api/revalidate?path=<path>&secret=<secret>`. The route
returns 401 if the secret is wrong or unset, and 400 for an invalid path. It
handles `path` only, so the Drupal revalidator must be set to Path, not Cache
Tag. Pages render on the server, so the route also calls `clearEdgeCachePaths()` from the cache handler to purge the saved path from the Pantheon edge.

### Draft preview

Drupal's preview link opens `/api/preview`. That route asks Drupal to validate
the link at `/next/draft-url` using the OAuth credentials, and enables Next.js
Draft Mode only when Drupal accepts it. Any other response returns 403.
`/api/exit-preview` turns Draft Mode off.

### Redirects

`proxy.js` holds the legacy redirects: a map of individual paths, plus a
catch-all that sends every `/events/...` and `/news/...` path to the home page.
Its `matcher` lists the same paths so the proxy does not run on other requests.
When adding a redirect, update both the map and the `matcher`.

### Images

Remote images are optimised by Next.js and allowed only from the backend (or
`IMAGE_DOMAIN`) host. Optimisation runs inside the site's container, so
`IMAGE_OPT_CONCURRENCY` and the image cache size in `next.config.js` limit how
much it can use.

### Locales

`next.config.js` reads the locale list from the Drupal backend through
`scripts/get-locales`, so the backend must be reachable at build time.

## Deploying to Pantheon

1. Set `BACKEND_URL`, `CLIENT_ID` and `CLIENT_SECRET` in the Secrets Manager.
2. Push to the branch connected to the Pantheon site. Pantheon runs
   `npm run build` and `npm start`.
3. Confirm Draft Mode preview works from Drupal on a Multidev before launch.

See the
[Pantheon Next.js hosting documentation](https://docs.pantheon.io/guides/decoupled/)
for platform details.

## Licence

See `LICENSE.md`.

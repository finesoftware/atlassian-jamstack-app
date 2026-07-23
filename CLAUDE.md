# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

"Hello Charlie" — a sample Jamstack app demonstrating how to write Jira Cloud app
business logic **once** and ship it on both the **Atlassian Connect** and **Atlassian
Forge** platforms. Two next.js sites share the same route/component code; a webpack
alias swap decides at build time which platform-specific implementation of two small
abstractions (`jira-request`, `react-link`) gets bundled.

Repo: `finesoftware/atlassian-jamstack-app`. Single package under active development:
`packages/hello-charlie`.

## Repository structure (yarn workspaces monorepo)

- `libraries/connect-api` — thin typed wrapper around Connect's global `window.AP`
  JS API (`getConnectAPI()`).
- `libraries/jira-request(-api|-connect|-forge)` — the REST-call abstraction.
  - `jira-request-api`: shared `Request`/`Options` types only.
  - `jira-request` (**the stub**): always throws `Error('Not implemented')` — it is
    never meant to run as-is, only to be aliased away by webpack (see Gotchas).
  - `jira-request-connect`: implemented via `window.AP.request(...)`.
  - `jira-request-forge`: implemented via `@forge/bridge`'s `requestJira(...)`.
- `libraries/react-link(-api|-connect|-forge)` — same stub/api/connect/forge pattern
  for an anchor-tag `<Link>` component (Connect uses `AP.navigator.go`, Forge uses
  `@forge/bridge`'s `router`).
- `routes/hello` — the actual `/hello` business logic and UI (`Header`, `Error`,
  `RecentProjects`, `Footer`). Imports only the **stub** packages
  (`@hello-charlie/jira-request`, `@hello-charlie/react-link`) — never the concrete
  `-connect`/`-forge` ones directly.
- `services/connect/site` — next.js site for the Connect app; provides
  `public/atlassian-connect.json` app descriptor.
- `services/forge/site-hello` — next.js site for the Forge app's `hello` resource;
  exported (via `next export`) into...
- `services/forge/app` — the actual Forge app (`manifest.yml`, `index.js`) that the
  Forge CLI deploys. Receives the exported `site-hello` output as a static resource.

## Common commands

- `nvm use` — switches to Node **12.22.1** (pinned in `.nvmrc`; required by Forge CLI
  tooling at the time this repo was written).
- `yarn` — installs all workspace dependencies.
- `yarn run hello-charlie:connect-site:dev` — starts the Connect site's next.js dev
  server on `localhost:3000`.
- `yarn run hello-charlie:forge-site-hello:export` — builds + `next export`s the Forge
  `site-hello` app into `packages/hello-charlie/services/forge/app/resources/hello`.
- Forge deploy: `cd packages/hello-charlie/services/forge/app` then use the Forge CLI
  (`forge deploy`, `forge install`) directly — not scripted in `package.json`.

There is **no test suite, no lint config, and no CI workflow** in this repo currently.
Type-checking is `noEmit`-only (see `tsconfig.json`); there's no standalone `tsc`
build/check script wired up in `package.json`.

## Architecture / key decision: the stub + webpack-alias pattern

`routes/hello` and both `_app.tsx` shells import the **stub** packages
(`@hello-charlie/jira-request`, `@hello-charlie/react-link`). Each site's
`next.config.js` webpack config rewrites those imports at bundle time:

\`\`\`js
config.resolve.alias['@hello-charlie/jira-request'] = '@hello-charlie/jira-request-connect'; // or -forge
config.resolve.alias['@hello-charlie/react-link'] = '@hello-charlie/react-link-connect';      // or -forge
\`\`\`

This is the entire mechanism that lets one `routes/hello` package power two
platform-specific apps. If you add a new platform-specific capability, follow the same
`-api` (types) / stub / `-connect` / `-forge` split — do not import `-connect` or
`-forge` packages directly from `routes/*` or you'll break portability.

The Forge site's `next.config.js` only applies the alias `if (!options.isServer)` —
server-side rendering keeps the stub (which throws). Don't "fix" this without checking
whether SSR of data-fetching components is actually intended.

## Conventions

- TypeScript everywhere, `strict: true`, 4-space indentation, Prettier-formatted
  (`prettier ^2.3.0` is a dependency though no `.prettierrc`/script is committed —
  match surrounding style manually).
- Packages are scoped `@hello-charlie/*`, one npm package per `libraries/*` folder,
  each with its own minimal `package.json` (`main: src/index.ts(x)`, `sideEffects:
  false`).
- Cross-platform abstractions always follow the 4-way split: `X-api` (types),
  `X` (throwing stub), `X-connect`, `X-forge`.
- Babel (not `tsc`) compiles `.ts`/`.tsx` inside next.js webpack configs, via
  `@babel/preset-typescript` — TypeScript is used for type-checking/editor support
  only, not as the emit compiler.

## Gotchas / important notes

- **Never invoke the stub packages' `request`/`Link` directly outside of a next.js
  build** — `jira-request`'s implementation is literally `reject(new Error('Not
  implemented'))`. It only "works" because webpack aliases swap it out; running
  `routes/hello` code in a plain Node/Jest context without replicating that alias will
  always fail.
- **`connect-api`'s `getConnectAPI()` casts `window.AP` as `any`** — there is no
  runtime validation that `window.AP` actually matches the `AP` type; failures show up
  as `undefined` methods at runtime inside a Jira iframe, not compile errors.
- **Forge site export path is hardcoded**: `next export ... -o
  packages/hello-charlie/services/forge/app/resources/hello` — this directory is
  generated/overwritten by the export script; treat it as build output, not
  hand-edited source.
- **`manifest.yml`'s `app.id` is a placeholder** (`<your-app-id>`) — must be replaced
  with a real Forge app ID (created via `forge create`) before `forge deploy` will work.
- **`atlassian-connect.json`'s base URL is also a placeholder** (`<your-base-url>`) —
  must point at your `ngrok` tunnel (or real host) before Connect installation works.
- Root `package.json` pins `resolutions.react` to `^17.0.2` — both sites and all
  libraries must stay on React 17; this is a yarn workspaces monorepo so a single
  mismatched nested React version will break hooks silently.
- `next-images` + a custom webpack loader (`babel-loader` with three presets) are
  configured per-site in `next.config.js`, not centrally — if a new site is added, its
  `next.config.js` needs the same `.ts`/`.tsx` webpack rule or TypeScript files won't
  resolve.
```

Let me know if you'd like me to attempt writing this to disk via another route (e.g. an Edit against a placeholder file), or if you can enable file-write permissions and I'll retry directly.
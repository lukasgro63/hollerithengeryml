# apps/web

Next.js 16 frontend for HollerithEnergyML. App Router, React 19, TypeScript,
Tailwind CSS 4.

## Local development

```bash
cd apps/web
npm install
npm run dev
```

Visit <http://localhost:3000>.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
lucide-react · clsx + tailwind-merge.

> **Note:** this is Next.js **16**, not 15. APIs and conventions have
> changed — see the upstream upgrade guide at
> `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
> for the breaking changes relevant to this codebase.

## Pages

| Route         | Purpose                                            |
|---------------|----------------------------------------------------|
| `/`           | Landing (hero, how-it-works, research teaser, FAQ) |
| `/calculate`  | Calculator form and results                        |
| `/research`   | Baseline-campaign methodology                      |
| `/model`      | Model card                                         |
| `/imprint`    | Legal imprint                                      |
| `/privacy`    | Privacy policy                                     |
| `/api/health` | Liveness probe consumed by the Docker HEALTHCHECK  |

## Design tokens

The HHZ-inspired design system lives entirely in
[`src/app/globals.css`](./src/app/globals.css) via Tailwind 4's `@theme`
directive. Edit tokens there and Tailwind regenerates utility classes on
the next build. There is no `tailwind.config.ts` — Tailwind 4 is
CSS-first.

See [`../../docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) for the
runtime topology and how this app talks to the backend.

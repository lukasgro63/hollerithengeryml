# apps/web

Next.js 15 frontend for HollerithEnergyML.

> **Status:** Skeleton directory. Implementation lands in Phase 2.

## Local development

```bash
cd apps/web
npm install
npm run dev
```

Visit http://localhost:3000.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
shadcn/ui · lucide-react · react-hook-form · zod · Recharts.

## Pages

| Route           | Purpose                                  |
|-----------------|------------------------------------------|
| `/`             | Landing (hero, calculator, research teaser) |
| `/research`     | Methodology — how the baseline was measured |
| `/model`        | Model card — what the meta-model is      |
| `/about`        | HHZ attribution and credits              |
| `/calculate`    | Deep-link to the calculator              |
| `/imprint`      | Legal imprint                            |
| `/privacy`      | Privacy policy                           |

See [`../../docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) for what this
app does and how it talks to the backend.

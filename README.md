# HollerithEnergyML

> **Predict the energy consumption of ML model training before you train.**

Estimate how much electrical energy (in kWh) a scikit-learn training run will
consume — given only the shape of your dataset. Powered by a meta-model trained
on a controlled baseline campaign at the
[Herman Hollerith Zentrum](https://www.hhz.de), Reutlingen University.

![Status](https://img.shields.io/badge/status-rebuild--in--progress-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Python](https://img.shields.io/badge/python-3.12-blue)
![Next.js](https://img.shields.io/badge/next.js-15-black)
![FastAPI](https://img.shields.io/badge/fastapi-0.115-009688)

---

## How it works

1. The user supplies three inputs: number of numerical features, number of
   categorical features, and total dataset size.
2. A meta-model (a scikit-learn regressor trained on CodeCarbon measurements
   across a baseline of classical algorithms) predicts the energy consumption
   of training five classical algorithms on that input shape:
   DecisionTree, GaussianNB, KNN, LogisticRegression, RandomForest.
3. The webapp visualises the comparison so users can pick a greener algorithm
   before they even start training.

The research foundation — which factors affect training energy, how the
baseline was measured, what datasets were used — is archived under
[`research/`](./research/).

## Architecture

```
┌─────────────────┐    HTTPS     ┌─────────────────┐
│  Next.js 15     │  ◄────────►  │  FastAPI        │
│  (web)          │              │  (api)          │
│  Tailwind +     │              │  Python 3.12    │
│  shadcn/ui      │              │  scikit-learn   │
└────────┬────────┘              └────────┬────────┘
         │                                │
         └────────── Caddy 2 ─────────────┘
                         │
                   Hetzner Cloud
```

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for the full architectural
blueprint, API contract, and deployment topology.

## Project structure

```
apps/
├── api/          FastAPI backend (Python 3.12, scikit-learn)
└── web/          Next.js 15 frontend (React 19, Tailwind, shadcn/ui)
infra/            Docker Compose, Caddy, deployment scripts
research/         Archived baseline-test notebooks and raw research data
docs/             Architecture, Model Card, Runbook, Contributing
```

## Quickstart (local development)

> **Status:** Phase 0 complete. Backend (Phase 1) and frontend (Phase 2)
> implementations land in subsequent commits.

```bash
git clone https://github.com/lukasgro63/hollerithengeryml.git
cd hollerithengeryml

# Backend (once Phase 1 is complete)
cd apps/api
uv sync
uv run uvicorn hollerith_api.main:app --reload

# Frontend (once Phase 2 is complete)
cd apps/web
npm install
npm run dev
```

## Tech stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Frontend    | Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 |
| UI kit      | shadcn/ui · lucide-react · Recharts                 |
| Forms       | react-hook-form · zod                               |
| Backend     | FastAPI 0.115 · Python 3.12 · Pydantic v2           |
| ML runtime  | scikit-learn 1.2.2 (pinned) · joblib                |
| Tooling     | uv · ruff · pytest                                  |
| Container   | Docker · Docker Compose v2                          |
| Proxy       | Caddy 2 (automatic HTTPS)                           |
| Hosting     | Hetzner Cloud (Nuremberg)                           |
| CI/CD       | GitHub Actions · ghcr.io                            |

## Model preservation

The production meta-model lives at
[`apps/api/models/ml_model_package.pkl`](./apps/api/models/). It was trained
in 2024 and is **not** retrained as part of this rebuild. We pin
`scikit-learn==1.2.2` to guarantee joblib-load compatibility across Python
versions.

See [`docs/MODEL_CARD.md`](./docs/MODEL_CARD.md) for model details, training
methodology, intended use, and known limitations.

## Contributing

Read [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) before opening pull
requests. This project follows GitHub-flow: branch off `main`, open a PR, get
a review, merge.

## License

[MIT](./LICENSE) © 2024–2026 HollerithEnergyML contributors.

Herman Hollerith Zentrum · Reutlingen University

# Architecture

## Goals

HollerithEnergyML is a single-feature web application: take three integers
describing a machine learning dataset shape, return predicted energy
consumption (in kWh) for training each of five classical scikit-learn
algorithms on data of that shape.

**Non-goals:** authentication, multi-tenancy, persisting user data, retraining
the meta-model.

## Monorepo layout

```
apps/
├── api/   FastAPI service, loads the scikit-learn meta-model from disk
└── web/   Next.js 15 site with a client-side calculator component
infra/     Docker Compose, Caddy reverse proxy, Hetzner provisioning
research/  Archived research artefacts (see research/README.md)
docs/      Architecture, Model Card, Runbook, Contributing
```

## Runtime topology

```
┌──────────────────────────── Hetzner Cloud CX22 ────────────────────────────┐
│                                                                            │
│   ┌─── Caddy 2 ────────────────────────────────────────────────────┐       │
│   │   :80 → :443  ·  Let's Encrypt  ·  HSTS  ·  Security headers   │       │
│   └────────┬──────────────────────────────────────┬────────────────┘       │
│            │ /*                                   │ /api/*                 │
│            ▼                                      ▼                        │
│   ┌────────────────────┐             ┌─────────────────────────────┐       │
│   │ web (Next.js 15)   │             │ api (FastAPI)               │       │
│   │ node:22-alpine     │             │ python:3.11-slim            │       │
│   │ next start         │             │ gunicorn + uvicorn-worker   │       │
│   │ :3000              │             │ :8000                       │       │
│   └────────────────────┘             └──────────────┬──────────────┘       │
│                                                     │ read-only             │
│                                                     ▼                       │
│                                        ┌────────────────────────┐          │
│                                        │ model_data (volume)    │          │
│                                        │ ml_model_package.pkl   │          │
│                                        └────────────────────────┘          │
└────────────────────────────────────────────────────────────────────────────┘
```

## API contract (v1)

```
POST /api/v1/predictions
Content-Type: application/json

Request:
{
  "num_numerical_features":   int [1, 10_000],
  "num_categorical_features": int [0, 10_000],
  "dataset_size":             int [1, 100_000_000]
}

Response 200:
{
  "predictions": [
    {"algorithm": "RandomForest",       "energy_kwh": 0.156, "rank": 1},
    {"algorithm": "KNN",                "energy_kwh": 0.092, "rank": 2},
    {"algorithm": "GaussianNB",         "energy_kwh": 0.078, "rank": 3},
    {"algorithm": "DecisionTree",       "energy_kwh": 0.045, "rank": 4},
    {"algorithm": "LogisticRegression", "energy_kwh": 0.034, "rank": 5}
  ],
  "average_kwh": 0.081,
  "model_used": "random_forest" | "linear_regression",
  "thresholds_applied": { "num_features": 50, "dataset_size": 50000 }
}

GET /api/v1/health
  → { "status": "ok", "model_loaded": true, "version": "1.0.0" }

GET /api/v1/metadata
  → { "trained_at": "2024-01-22", "sklearn_version": "1.2.2",
      "algorithms": [...], "feature_shape": 8 }
```

**Model-selection rule** (inherited from the 2024 codebase):
`num_numerical_features ≤ 50` AND `num_categorical_features ≤ 50` AND
`dataset_size ≤ 50_000` → RandomForest meta-model; otherwise the linear
fallback.

## Technology choices

| Concern        | Choice                    | Alternative considered       |
|----------------|---------------------------|------------------------------|
| Web framework  | Next.js 15 (App Router)   | Astro 5, SvelteKit 2         |
| UI kit         | shadcn/ui + Tailwind 4    | Angular Material, DaisyUI    |
| Forms          | react-hook-form + zod     | Formik, native HTML          |
| Charts         | Recharts                  | Visx, Chart.js               |
| Backend        | FastAPI 0.115             | Litestar, Flask              |
| Validation     | Pydantic v2               | marshmallow                  |
| Python tooling | uv + ruff                 | poetry + black/flake8        |
| Container      | Docker + Compose v2       | Podman, Kubernetes           |
| Proxy/TLS      | Caddy 2                   | Traefik, Nginx               |
| Hosting        | Hetzner Cloud             | Fly.io, Railway              |
| CI/CD          | GitHub Actions + ghcr.io  | GitLab CI, CircleCI          |

## Security posture

- HTTPS only — Caddy auto-renews Let's Encrypt certificates.
- HSTS with `preload`, strict CSP, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`
  locking out camera, microphone, geolocation.
- CORS allowlist — no wildcards.
- Pydantic v2 bounded inputs to prevent resource exhaustion.
- Rate limiting on `/api/v1/predictions` (slowapi).
- Docker containers run as a non-root user with a read-only root filesystem.
- The joblib-serialised model is loaded from an immutable model volume at
  startup only — never from user input — to neutralise the
  deserialisation-RCE attack surface that affects Python's binary
  serialisation format.
- Secrets live in `/etc/hollerith/.env` (chmod 600) on the host, outside git.
- Dependency scanning via Dependabot and Trivy in CI.

## Deployment

See [`../infra/`](../infra/) for Docker Compose files, the Caddyfile, and the
Hetzner provisioning script. CI/CD workflows live under
[`../.github/workflows/`](../.github/workflows/).

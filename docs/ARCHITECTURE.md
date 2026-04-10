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
└── web/   Next.js 16 site with a client-side calculator component
infra/     Docker Compose, Caddy reverse proxy, Hetzner provisioning
research/  Archived research artefacts (see research/README.md)
docs/      Architecture, Model Card, Runbook, Contributing
```

## Runtime topology

```mermaid
%%{init: {'look': 'handDrawn', 'theme': 'base', 'themeVariables': {'primaryColor': '#FFE400', 'primaryTextColor': '#0a0a0a', 'primaryBorderColor': '#0a0a0a', 'lineColor': '#0a0a0a', 'secondaryColor': '#f5f5f0', 'tertiaryColor': '#0a0a0a', 'noteBkgColor': '#FFE400', 'noteTextColor': '#0a0a0a'}}}%%
graph TB
    internet((Internet))
    subgraph hetzner["Hetzner Cloud CX22"]
        caddy["Caddy 2<br/>:80 → :443<br/>Let's Encrypt · HSTS · CSP"]
        web["web · Next.js 16<br/>node:22-alpine<br/>:3000"]
        api["api · FastAPI 0.135<br/>python:3.11-slim<br/>gunicorn + uvicorn<br/>:8000"]
        model[("ml_model_package.pkl<br/>scikit-learn 1.2.2")]
    end

    internet -->|HTTPS| caddy
    caddy -->|"/*"| web
    caddy -->|"/api/*"| api
    api -.->|read-only| model

    style caddy fill:#FFE400,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
    style web fill:#f5f5f0,stroke:#0a0a0a,stroke-width:1px,color:#0a0a0a
    style api fill:#f5f5f0,stroke:#0a0a0a,stroke-width:1px,color:#0a0a0a
    style model fill:#0a0a0a,stroke:#FFE400,stroke-width:2px,color:#FFE400
    style hetzner fill:#ffffff,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
    style internet fill:#FFE400,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
```

## Prediction flow

```mermaid
%%{init: {'look': 'handDrawn', 'theme': 'base', 'themeVariables': {'primaryColor': '#FFE400', 'primaryTextColor': '#0a0a0a', 'primaryBorderColor': '#0a0a0a', 'lineColor': '#0a0a0a', 'secondaryColor': '#f5f5f0'}}}%%
sequenceDiagram
    participant U as Browser
    participant W as Next.js
    participant A as FastAPI
    participant M as ModelManager
    participant P as EnergyPredictor

    U->>W: Submit 3 integers
    W->>A: POST /api/v1/predictions
    A->>M: select(num, cat, rows)
    alt num ≤ 25, cat ≤ 25, rows ≤ 350k
        M-->>A: RandomForest estimator
    else any threshold exceeded
        M-->>A: LinearRegression fallback
    end
    A->>P: predict_all(estimator, num, cat, rows)
    P->>P: Build 5×8 DataFrame (one-hot per algorithm)
    P-->>A: 5 Prediction objects (kWh)
    A-->>W: JSON response (ranked, with average)
    W-->>U: Bar chart + ranking
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
    {"algorithm": "RandomForest",       "energy_kwh": 0.000035, "rank": 1},
    {"algorithm": "LogisticRegression", "energy_kwh": 0.000012, "rank": 2},
    {"algorithm": "DecisionTree",       "energy_kwh": 0.000002, "rank": 3},
    {"algorithm": "KNN",                "energy_kwh": 0.0000004, "rank": 4},
    {"algorithm": "GaussianNB",         "energy_kwh": 0.0000002, "rank": 5}
  ],
  "average_kwh": 0.0000099,
  "model_used": "random_forest",
  "thresholds_applied": { "num_features": 25, "cat_features": 25, "dataset_size": 350000 },
  "out_of_training_range": false
}

GET /api/v1/health
  → { "status": "ok", "model_loaded": true, "version": "1.0.0" }

GET /api/v1/metadata
  → { "version": "1.0.0", "sklearn_version": "1.2.2",
      "algorithms": [...], "feature_names": [...],
      "thresholds": { "max_numerical_features": 25, ... },
      "model_path": "ml_model_package.pkl" }
```

**Model-selection rule** (inherited from the 2024 deployed codebase):
`num_numerical_features ≤ 25` AND `num_categorical_features ≤ 25` AND
`dataset_size ≤ 350_000` → RandomForest meta-model; otherwise the linear
fallback.

## CI/CD pipeline

```mermaid
%%{init: {'look': 'handDrawn', 'theme': 'base', 'themeVariables': {'primaryColor': '#FFE400', 'primaryTextColor': '#0a0a0a', 'primaryBorderColor': '#0a0a0a', 'lineColor': '#0a0a0a', 'secondaryColor': '#f5f5f0'}}}%%
graph LR
    push["git push main"]
    ci["CI<br/>ruff · pytest · tsc · next build"]
    build["Docker Buildx<br/>web + api → ghcr.io"]
    deploy["SSH → Hetzner<br/>deploy.sh &lt;sha&gt;"]
    health{"Health check<br/>/api/v1/health"}
    ok(["Live"])
    rollback["Rollback<br/>previous tag"]

    push --> ci --> build --> deploy --> health
    health -->|pass| ok
    health -->|fail| rollback

    style push fill:#f5f5f0,stroke:#0a0a0a,stroke-width:1px
    style ci fill:#f5f5f0,stroke:#0a0a0a,stroke-width:1px
    style build fill:#FFE400,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
    style deploy fill:#FFE400,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
    style health fill:#f5f5f0,stroke:#0a0a0a,stroke-width:2px
    style ok fill:#FFE400,stroke:#0a0a0a,stroke-width:2px,color:#0a0a0a
    style rollback fill:#0a0a0a,stroke:#FFE400,stroke-width:2px,color:#FFE400
```

## Technology choices

| Concern        | Choice                    | Alternative considered       |
|----------------|---------------------------|------------------------------|
| Web framework  | Next.js 16 (App Router)   | Astro 5, SvelteKit 2         |
| UI             | Custom components + Tailwind 4 | Angular Material, DaisyUI |
| Forms          | react-hook-form + zod     | Formik, native HTML          |
| Charts         | Recharts                  | Visx, Chart.js               |
| Backend        | FastAPI 0.135             | Litestar, Flask              |
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
  deserialisation-RCE attack surface.
- Secrets live in `/etc/hollerith/.env` (chmod 600) on the host, outside git.
- Dependency scanning via Dependabot.

## What lives where

| Concern                  | File                              |
|--------------------------|-----------------------------------|
| Local dev stack          | `infra/docker-compose.yml`        |
| Production stack         | `infra/docker-compose.prod.yml`   |
| Reverse proxy + HTTPS    | `infra/Caddyfile`                 |
| One-time host bootstrap  | `infra/deploy/provision.sh`       |
| CI-triggered deploy      | `infra/deploy/deploy.sh`          |
| CI checks                | `.github/workflows/ci.yml`        |
| Build, push, deploy      | `.github/workflows/deploy.yml`    |
| Dependency updates        | `.github/dependabot.yml`          |

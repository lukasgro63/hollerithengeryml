# apps/api

FastAPI backend serving the HollerithEnergyML meta-model.

> **Status:** Skeleton directory. Implementation lands in Phase 1.

## Local development

```bash
cd apps/api
uv sync
uv run uvicorn hollerith_api.main:app --reload --port 8000
```

## Stack

Python 3.12 · FastAPI 0.115 · Pydantic v2 · scikit-learn 1.2.2 (pinned) ·
joblib · structlog · slowapi · uv · ruff · pytest.

## Entry points

| Path                   | Purpose                               |
|------------------------|---------------------------------------|
| `POST /api/v1/predictions` | Energy prediction for the five algorithms |
| `GET  /api/v1/health`      | Liveness + readiness probe            |
| `GET  /api/v1/metadata`    | Meta-model metadata                   |

See [`../../docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) for the full
API contract and runtime topology.

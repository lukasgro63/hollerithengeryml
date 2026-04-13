# apps/api

FastAPI backend serving the HollerithEnergyML meta-model.

Loads the 2024 meta-model at startup and exposes a small versioned REST API
for energy-consumption predictions across five scikit-learn algorithms.

## Local development

```bash
cd apps/api
uv sync
uv run uvicorn hollerith_api.main:app --reload --port 8000
```

## Stack

Python 3.11 · FastAPI 0.135 · Pydantic v2 · scikit-learn 1.2.2 (pinned) ·
joblib · structlog · slowapi · uv · ruff · pytest.

> **Note:** Python is pinned to 3.11 because scikit-learn 1.2.2 (required to
> load the 2024 joblib artefact) does not publish wheels for Python 3.12+.

## Entry points

| Path                   | Purpose                               |
|------------------------|---------------------------------------|
| `POST /api/v1/predictions` | Energy prediction for the five algorithms |
| `GET  /api/v1/health`      | Liveness + readiness probe            |
| `GET  /api/v1/metadata`    | Meta-model metadata                   |

See [`../../docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) for the full
API contract and runtime topology.

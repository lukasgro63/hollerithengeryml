.DEFAULT_GOAL := help

# ---------------------------------------------------------------------------
# Local development
# ---------------------------------------------------------------------------

.PHONY: dev
dev: ## Start both services via Docker Compose
	docker compose -f infra/docker-compose.yml up --build

.PHONY: dev-api
dev-api: ## Start only the backend (uvicorn with hot reload)
	cd apps/api && uv run uvicorn hollerith_api.main:app --reload --port 8000

.PHONY: dev-web
dev-web: ## Start only the frontend (Next.js dev server)
	cd apps/web && npm run dev

# ---------------------------------------------------------------------------
# Quality gates
# ---------------------------------------------------------------------------

.PHONY: lint
lint: ## Run all linters (ruff + eslint)
	cd apps/api && uv run ruff check src tests
	cd apps/api && uv run ruff format --check src tests
	cd apps/web && npx eslint .

.PHONY: test
test: ## Run all tests (pytest + tsc type-check)
	cd apps/api && uv run pytest tests/ -v
	cd apps/web && npx tsc --noEmit

.PHONY: check
check: lint test ## Run linters and tests together

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

.PHONY: build
build: ## Build both Docker images locally
	docker build -t hollerith-api apps/api
	docker build -t hollerith-web apps/web

# ---------------------------------------------------------------------------
# Cleanup
# ---------------------------------------------------------------------------

.PHONY: clean
clean: ## Remove containers, volumes, and caches
	docker compose -f infra/docker-compose.yml down -v --remove-orphans 2>/dev/null || true
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .ruff_cache -exec rm -rf {} + 2>/dev/null || true
	rm -rf apps/web/.next 2>/dev/null || true

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

.PHONY: setup
setup: ## Install dependencies and pre-commit hooks
	cd apps/api && uv sync
	cd apps/web && npm install
	pre-commit install

# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

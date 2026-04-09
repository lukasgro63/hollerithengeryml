"""FastAPI application factory."""

from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from .config import Settings
from .logging import configure_logging
from .rate_limit import limiter, rate_limit_exceeded_handler
from .routes import health, metadata, predictions
from .services.model_loader import ModelLoader

log = structlog.get_logger(__name__)

API_V1_PREFIX = "/api/v1"


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    settings: Settings = app.state.settings
    log.info(
        "app_startup",
        environment=settings.environment,
        model_path=str(settings.model_path),
    )
    ModelLoader.load(settings.model_path)
    try:
        yield
    finally:
        log.info("app_shutdown")
        ModelLoader.reset()


def create_app(settings: Settings | None = None) -> FastAPI:
    """Build a fully wired FastAPI application.

    Passing a custom ``settings`` object is useful in tests; production code
    should rely on the default, which reads from environment variables.
    """
    settings = settings or Settings()
    configure_logging(settings)

    app = FastAPI(
        title="HollerithEnergyML API",
        version=settings.api_version,
        description=(
            "Predict the energy consumption of ML model training from "
            "dataset shape alone. Backed by a 2024 meta-model trained at "
            "the Herman Hollerith Zentrum."
        ),
        lifespan=lifespan,
    )
    app.state.settings = settings

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Accept"],
    )

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)
    app.add_middleware(SlowAPIMiddleware)

    app.include_router(health.router, prefix=API_V1_PREFIX, tags=["health"])
    app.include_router(metadata.router, prefix=API_V1_PREFIX, tags=["metadata"])
    app.include_router(predictions.router, prefix=API_V1_PREFIX, tags=["predictions"])

    return app


app = create_app()

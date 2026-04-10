"""Shared fixtures: build a real FastAPI app against the real meta-model.

We deliberately do not mock the model. These tests load the actual 2024
joblib artefact so that any future drift in scikit-learn, joblib, numpy,
or pandas is caught by CI rather than discovered in production.
"""

from __future__ import annotations

from collections.abc import Iterator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from hollerith_api.config import Settings
from hollerith_api.main import create_app
from hollerith_api.rate_limit import limiter
from hollerith_api.services.model_loader import ModelLoader

API_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = API_DIR / "models" / "ml_model_package.pkl"


@pytest.fixture(scope="session")
def settings() -> Settings:
    return Settings(
        environment="development",
        log_level="warning",
        allowed_origins=["http://test"],
        predictions_rate_limit_per_minute=1000,
        model_path=MODEL_PATH,
    )


@pytest.fixture(scope="session", autouse=True)
def _disable_rate_limiter() -> Iterator[None]:
    previous = limiter.enabled
    limiter.enabled = False
    try:
        yield
    finally:
        limiter.enabled = previous


@pytest.fixture(scope="session")
def client(settings: Settings) -> Iterator[TestClient]:
    ModelLoader.reset()
    app = create_app(settings)
    with TestClient(app) as test_client:
        yield test_client
    ModelLoader.reset()

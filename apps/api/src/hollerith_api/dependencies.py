"""FastAPI dependency-injection wiring."""

from __future__ import annotations

from fastapi import Request

from .config import Settings
from .services.energy_predictor import EnergyPredictor
from .services.model_loader import ModelLoader
from .services.model_manager import ModelManager


def get_settings(request: Request) -> Settings:
    """Return the application-wide Settings attached to ``app.state``."""
    return request.app.state.settings  # type: ignore[no-any-return]


def get_model_manager() -> ModelManager:
    return ModelManager(bundle=ModelLoader.get())


def get_predictor() -> EnergyPredictor:
    return EnergyPredictor(bundle=ModelLoader.get())

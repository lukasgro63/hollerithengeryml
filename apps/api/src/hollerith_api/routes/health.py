"""Liveness and readiness endpoint."""

from typing import Annotated

from fastapi import APIRouter, Depends

from ..config import Settings
from ..dependencies import get_settings
from ..schemas.health import HealthResponse
from ..services.model_loader import ModelLoader

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Liveness + model-loaded probe.",
)
async def health(settings: Annotated[Settings, Depends(get_settings)]) -> HealthResponse:
    try:
        ModelLoader.get()
        loaded = True
    except RuntimeError:
        loaded = False

    return HealthResponse(
        status="ok",
        model_loaded=loaded,
        version=settings.api_version,
    )

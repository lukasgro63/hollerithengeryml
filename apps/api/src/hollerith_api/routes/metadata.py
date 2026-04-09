"""Meta-model introspection endpoint."""

from typing import Annotated

from fastapi import APIRouter, Depends

from ..config import Settings
from ..dependencies import get_settings
from ..schemas.metadata import MetadataResponse, MetadataThresholds
from ..services.energy_predictor import Algorithm
from ..services.model_loader import ModelLoader
from ..services.model_manager import Thresholds

router = APIRouter()


@router.get(
    "/metadata",
    response_model=MetadataResponse,
    summary="Inspect the loaded meta-model.",
)
async def metadata(settings: Annotated[Settings, Depends(get_settings)]) -> MetadataResponse:
    bundle = ModelLoader.get()
    thresholds = Thresholds()
    return MetadataResponse(
        version=settings.api_version,
        sklearn_version=bundle.sklearn_version,
        algorithms=[algo.display_name for algo in Algorithm],
        feature_names=bundle.feature_names,
        thresholds=MetadataThresholds(
            max_numerical_features=thresholds.max_numerical_features,
            max_categorical_features=thresholds.max_categorical_features,
            max_dataset_size=thresholds.max_dataset_size,
        ),
        model_path=str(bundle.loaded_from),
    )

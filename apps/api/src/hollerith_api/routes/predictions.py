"""Energy prediction endpoint with rate limiting.

NOTE: this module intentionally does NOT use ``from __future__ import annotations``.
Combined with slowapi's ``@limiter.limit`` decorator it prevents FastAPI from
resolving the ``Annotated[PredictionsRequest, Body()]`` ForwardRefs through
the wrapper function, causing every valid payload to be rejected as a missing
query parameter. Keep annotations evaluated eagerly in this file.
"""

from typing import Annotated

from fastapi import APIRouter, Body, Depends, Request

from ..config import Settings
from ..dependencies import get_model_manager, get_predictor
from ..rate_limit import limiter
from ..schemas.predictions import (
    AlgorithmPrediction,
    PredictionsRequest,
    PredictionsResponse,
    ThresholdsApplied,
)
from ..services.energy_predictor import EnergyPredictor
from ..services.model_manager import ModelManager

router = APIRouter()

# Frozen at import time from env (PREDICTIONS_RATE_LIMIT_PER_MINUTE).
# slowapi decorators bind at class-definition time, so the Settings object
# passed to create_app() cannot influence this value — only the env var can.
_PREDICTIONS_RATE_LIMIT = f"{Settings().predictions_rate_limit_per_minute}/minute"


@router.post(
    "/predictions",
    response_model=PredictionsResponse,
    summary="Predict training energy for five classical ML algorithms.",
)
@limiter.limit(_PREDICTIONS_RATE_LIMIT)
async def create_predictions(
    request: Request,
    payload: Annotated[PredictionsRequest, Body()],
    manager: Annotated[ModelManager, Depends(get_model_manager)],
    predictor: Annotated[EnergyPredictor, Depends(get_predictor)],
) -> PredictionsResponse:
    selection = manager.select(
        num_numerical_features=payload.num_numerical_features,
        num_categorical_features=payload.num_categorical_features,
        dataset_size=payload.dataset_size,
    )

    raw = predictor.predict_all(
        estimator=selection.estimator,
        num_numerical_features=payload.num_numerical_features,
        num_categorical_features=payload.num_categorical_features,
        dataset_size=payload.dataset_size,
    )

    ranked = sorted(raw, key=lambda p: p.energy_kwh, reverse=True)
    max_kwh = ranked[0].energy_kwh if ranked else 0.0
    predictions = [
        AlgorithmPrediction(
            algorithm=p.algorithm,
            energy_percent=int((p.energy_kwh / max_kwh) * 100) if max_kwh > 0 else 0,
            rank=idx + 1,
        )
        for idx, p in enumerate(ranked)
    ]

    thresholds = selection.thresholds
    out_of_range = (
        payload.num_numerical_features > thresholds.max_numerical_features
        or payload.num_categorical_features > thresholds.max_categorical_features
        or payload.dataset_size > thresholds.max_dataset_size
    )

    return PredictionsResponse(
        predictions=predictions,
        model_used=selection.name,
        thresholds_applied=ThresholdsApplied(
            num_features=thresholds.max_numerical_features,
            cat_features=thresholds.max_categorical_features,
            dataset_size=thresholds.max_dataset_size,
        ),
        out_of_training_range=out_of_range,
    )

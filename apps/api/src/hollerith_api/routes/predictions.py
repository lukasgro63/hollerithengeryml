"""Energy prediction endpoint with rate limiting.

NOTE: this module intentionally does NOT use ``from __future__ import annotations``.
Combined with slowapi's ``@limiter.limit`` decorator it prevents FastAPI from
resolving the ``Annotated[PredictionsRequest, Body()]`` ForwardRefs through
the wrapper function, causing every valid payload to be rejected as a missing
query parameter. Keep annotations evaluated eagerly in this file.
"""

from typing import Annotated

from fastapi import APIRouter, Body, Depends, Request

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

# Rate limit is deliberately conservative: the endpoint is cheap but the
# service is public, and a single well-behaved user never needs more than a
# few requests per minute. Tighten or loosen via pyproject if needed.
_PREDICTIONS_RATE_LIMIT = "30/minute"


@router.post(
    "/predictions",
    response_model=PredictionsResponse,
    summary="Predict training energy for five classical ML algorithms.",
)
@limiter.limit(_PREDICTIONS_RATE_LIMIT)
async def create_predictions(
    request: Request,  # required by slowapi's handler contract
    payload: Annotated[PredictionsRequest, Body()],
    manager: Annotated[ModelManager, Depends(get_model_manager)],
    predictor: Annotated[EnergyPredictor, Depends(get_predictor)],
) -> PredictionsResponse:
    # `request` is referenced by slowapi via the wrapper; suppress unused warning.
    del request

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
    predictions = [
        AlgorithmPrediction(
            algorithm=p.algorithm,
            energy_kwh=p.energy_kwh,
            rank=idx + 1,
        )
        for idx, p in enumerate(ranked)
    ]

    average_kwh = sum(p.energy_kwh for p in raw) / len(raw)

    thresholds = selection.thresholds
    out_of_range = (
        payload.num_numerical_features > thresholds.max_numerical_features
        or payload.num_categorical_features > thresholds.max_categorical_features
        or payload.dataset_size > thresholds.max_dataset_size
    )

    return PredictionsResponse(
        predictions=predictions,
        average_kwh=average_kwh,
        model_used=selection.name,
        thresholds_applied=ThresholdsApplied(
            num_features=thresholds.max_numerical_features,
            dataset_size=thresholds.max_dataset_size,
        ),
        out_of_training_range=out_of_range,
    )

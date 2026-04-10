"""Schemas for the /predictions endpoint."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

ModelUsed = Literal["random_forest", "linear_regression"]


class PredictionsRequest(BaseModel):
    """Input payload for an energy-prediction request.

    Bounds prevent resource exhaustion: a caller cannot request a prediction
    for 10^18 features or rows. The upper bounds are generous compared to
    anything the meta-model was trained against; callers pushing far beyond
    the thresholds get the linear fallback, which extrapolates but remains
    cheap to compute.
    """

    model_config = ConfigDict(extra="forbid")

    num_numerical_features: int = Field(
        ge=1,
        le=10_000,
        description="Number of numerical input features in the dataset.",
    )
    num_categorical_features: int = Field(
        ge=0,
        le=10_000,
        description="Number of categorical input features in the dataset.",
    )
    dataset_size: int = Field(
        ge=1,
        le=100_000_000,
        description="Number of rows in the dataset.",
    )


class AlgorithmPrediction(BaseModel):
    algorithm: str = Field(description="Algorithm display name.")
    energy_kwh: float = Field(description="Predicted training energy in kWh.")
    rank: int = Field(ge=1, le=5, description="1 = highest predicted energy, 5 = lowest.")


class ThresholdsApplied(BaseModel):
    num_features: int
    dataset_size: int


class PredictionsResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    predictions: list[AlgorithmPrediction]
    average_kwh: float = Field(description="Arithmetic mean of the five predictions in kWh.")
    model_used: ModelUsed = Field(description="Which sub-model the selector picked.")
    thresholds_applied: ThresholdsApplied
    out_of_training_range: bool = Field(
        description="True when any input exceeds the thresholds the meta-model was trained within.",
    )

"""Threshold-based selection between the RandomForest and LinearRegression models.

Ported from the 2024 ``Backend/models/model_manager.py``. The thresholds were
determined empirically during the baseline campaign; see
``research/README.md`` for the methodology.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Literal

from .model_loader import ModelBundle

ModelName = Literal["random_forest", "linear_regression"]


@dataclass(frozen=True)
class Thresholds:
    """Switch-over thresholds inherited from the 2024 codebase."""

    max_numerical_features: int = 50
    max_categorical_features: int = 50
    max_dataset_size: int = 50_000


@dataclass(frozen=True)
class ModelSelection:
    estimator: Any
    name: ModelName
    thresholds: Thresholds


class ModelManager:
    """Chooses which of the two regressors to run against a given input."""

    def __init__(self, bundle: ModelBundle, thresholds: Thresholds | None = None):
        self._bundle = bundle
        self.thresholds = thresholds or Thresholds()

    def select(
        self,
        num_numerical_features: int,
        num_categorical_features: int,
        dataset_size: int,
    ) -> ModelSelection:
        within_rf_range = (
            num_numerical_features <= self.thresholds.max_numerical_features
            and num_categorical_features <= self.thresholds.max_categorical_features
            and dataset_size <= self.thresholds.max_dataset_size
        )
        if within_rf_range:
            return ModelSelection(
                estimator=self._bundle.random_forest,
                name="random_forest",
                thresholds=self.thresholds,
            )
        return ModelSelection(
            estimator=self._bundle.linear_regression,
            name="linear_regression",
            thresholds=self.thresholds,
        )

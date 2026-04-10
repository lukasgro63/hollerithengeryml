"""Per-algorithm inference against a single selected regressor.

Feature vector layout (8 columns, matching ``feature_names_in_`` from the
2024 training pipeline)::

    [num_num_features,
     num_cat_features,
     number_of_instances,
     model_0, model_1, model_2, model_3, model_4]

where ``model_i`` is a one-hot flag for the :class:`Algorithm` enum index.
The enum order is load-bearing — it matches the 2024 training one-hot and
must not be reordered without retraining the meta-model.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import IntEnum

import pandas as pd
import structlog

from .model_loader import ModelBundle, SklearnRegressor

log = structlog.get_logger(__name__)


class Algorithm(IntEnum):
    """The five classical scikit-learn algorithms the meta-model can score."""

    DECISION_TREE = 0
    GAUSSIAN_NB = 1
    KNN = 2
    LOGISTIC_REGRESSION = 3
    RANDOM_FOREST = 4

    @property
    def display_name(self) -> str:
        return _DISPLAY_NAMES[self]


_DISPLAY_NAMES: dict[Algorithm, str] = {
    Algorithm.DECISION_TREE: "DecisionTree",
    Algorithm.GAUSSIAN_NB: "GaussianNB",
    Algorithm.KNN: "KNN",
    Algorithm.LOGISTIC_REGRESSION: "LogisticRegression",
    Algorithm.RANDOM_FOREST: "RandomForest",
}


@dataclass(frozen=True)
class Prediction:
    algorithm: str
    energy_kwh: float


class EnergyPredictor:
    """Builds the 5x8 input frame and runs a single vectorised predict call.

    We construct a pandas DataFrame with the exact column names the 2024
    estimators were fitted with, so scikit-learn's feature-name check is
    satisfied and we avoid the ``X does not have valid feature names`` warning
    on every request.
    """

    def __init__(self, bundle: ModelBundle):
        self._feature_names = bundle.feature_names

    def predict_all(
        self,
        estimator: SklearnRegressor,
        num_numerical_features: int,
        num_categorical_features: int,
        dataset_size: int,
    ) -> list[Prediction]:
        algorithms = list(Algorithm)
        rows: list[list[float]] = []
        for algo in algorithms:
            onehot = [0.0] * len(algorithms)
            onehot[algo.value] = 1.0
            rows.append(
                [
                    float(num_numerical_features),
                    float(num_categorical_features),
                    float(dataset_size),
                    *onehot,
                ]
            )

        expected_cols = len(self._feature_names)
        actual_cols = len(rows[0])
        if actual_cols != expected_cols:
            raise RuntimeError(
                f"feature vector has {actual_cols} columns, "
                f"but the artefact expects {expected_cols}"
            )

        frame = pd.DataFrame(rows, columns=self._feature_names)
        energies = estimator.predict(frame)

        log.debug(
            "prediction_complete",
            num_numerical_features=num_numerical_features,
            num_categorical_features=num_categorical_features,
            dataset_size=dataset_size,
        )

        return [
            Prediction(
                algorithm=algo.display_name,
                energy_kwh=float(energies[i]),
            )
            for i, algo in enumerate(algorithms)
        ]

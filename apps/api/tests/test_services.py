"""Unit tests for the service layer that bypass FastAPI."""

from __future__ import annotations

import math

from hollerith_api.services.energy_predictor import Algorithm, EnergyPredictor
from hollerith_api.services.model_loader import ModelBundle, ModelLoader
from hollerith_api.services.model_manager import ModelManager, Thresholds

from .conftest import MODEL_PATH


def _load_bundle() -> ModelBundle:
    return ModelLoader.load(MODEL_PATH)


def test_algorithm_enum_order_is_load_bearing() -> None:
    assert [algo.value for algo in Algorithm] == [0, 1, 2, 3, 4]
    assert Algorithm(0).display_name == "DecisionTree"
    assert Algorithm(1).display_name == "GaussianNB"
    assert Algorithm(2).display_name == "KNN"
    assert Algorithm(3).display_name == "LogisticRegression"
    assert Algorithm(4).display_name == "RandomForest"


def test_model_loader_returns_populated_bundle() -> None:
    bundle = _load_bundle()
    assert bundle.sklearn_version == "1.2.2"
    assert len(bundle.feature_names) == 8
    assert bundle.feature_names[0] == "num_num_features"
    assert bundle.feature_names[-1] == "model_4"


def test_model_loader_is_idempotent() -> None:
    first = _load_bundle()
    second = _load_bundle()
    assert first is second


def test_manager_selects_random_forest_inside_thresholds() -> None:
    manager = ModelManager(_load_bundle())
    selection = manager.select(
        num_numerical_features=10,
        num_categorical_features=5,
        dataset_size=1000,
    )
    assert selection.name == "random_forest"
    assert selection.thresholds == Thresholds()


def test_manager_selects_linear_regression_when_any_threshold_exceeded() -> None:
    manager = ModelManager(_load_bundle())

    over_numerical = manager.select(26, 1, 1)
    assert over_numerical.name == "linear_regression"

    over_categorical = manager.select(1, 26, 1)
    assert over_categorical.name == "linear_regression"

    over_dataset = manager.select(1, 1, 350_001)
    assert over_dataset.name == "linear_regression"


def test_predictor_returns_one_prediction_per_algorithm() -> None:
    bundle = _load_bundle()
    manager = ModelManager(bundle)
    predictor = EnergyPredictor(bundle)

    selection = manager.select(25, 17, 10_000)
    predictions = predictor.predict_all(
        estimator=selection.estimator,
        num_numerical_features=25,
        num_categorical_features=17,
        dataset_size=10_000,
    )

    assert len(predictions) == 5
    assert {p.algorithm for p in predictions} == {
        "DecisionTree",
        "GaussianNB",
        "KNN",
        "LogisticRegression",
        "RandomForest",
    }
    assert all(math.isfinite(p.energy_kwh) for p in predictions)


def test_predictor_uses_feature_names_and_does_not_emit_warning() -> None:
    """Passing a DataFrame with the expected column names suppresses the
    ``X does not have valid feature names`` warning that plagued the 2024
    numpy-array-based implementation."""
    import warnings

    bundle = _load_bundle()
    manager = ModelManager(bundle)
    predictor = EnergyPredictor(bundle)

    selection = manager.select(25, 17, 10_000)

    with warnings.catch_warnings(record=True) as caught:
        warnings.simplefilter("always")
        predictor.predict_all(
            estimator=selection.estimator,
            num_numerical_features=25,
            num_categorical_features=17,
            dataset_size=10_000,
        )

    feature_warnings = [w for w in caught if "feature names" in str(w.message).lower()]
    assert feature_warnings == []

"""Singleton loader for the 2024 HollerithEnergyML meta-model artefact.

The artefact lives at ``apps/api/models/ml_model_package.pkl``. It is a
joblib-serialised 2-tuple ``(LinearRegression, RandomForestRegressor)``
produced with scikit-learn 1.2.2 on a pandas DataFrame, so both estimators
carry ``feature_names_in_`` metadata that we reuse at inference time.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import joblib
import sklearn
import structlog

log = structlog.get_logger(__name__)


@dataclass(frozen=True)
class ModelBundle:
    """In-memory handle to the loaded meta-model."""

    linear_regression: Any
    random_forest: Any
    feature_names: list[str]
    sklearn_version: str
    loaded_from: Path


class ModelLoader:
    """Class-level singleton that loads the artefact exactly once.

    We deliberately use a class-level cache rather than an instance so that
    FastAPI dependencies (which construct fresh instances per request) can
    retrieve the shared model without threading state through the DI graph.
    """

    _bundle: ModelBundle | None = None

    @classmethod
    def load(cls, path: Path) -> ModelBundle:
        if cls._bundle is not None:
            return cls._bundle

        resolved = path.resolve()
        log.info("loading_model_artefact", path=str(resolved))
        if not resolved.exists():
            raise FileNotFoundError(f"model artefact not found at {resolved}")

        artefact = joblib.load(resolved)

        if not isinstance(artefact, tuple) or len(artefact) != 2:
            raise RuntimeError(
                f"expected a 2-tuple (linear, random_forest), "
                f"got {type(artefact).__name__}"
            )

        linear, forest = artefact
        feature_names = list(getattr(forest, "feature_names_in_", []))
        if not feature_names:
            raise RuntimeError(
                "random forest estimator is missing feature_names_in_; "
                "the artefact is incompatible with this build"
            )

        cls._bundle = ModelBundle(
            linear_regression=linear,
            random_forest=forest,
            feature_names=feature_names,
            sklearn_version=sklearn.__version__,
            loaded_from=resolved,
        )
        log.info(
            "model_loaded",
            feature_count=len(feature_names),
            sklearn_version=sklearn.__version__,
        )
        return cls._bundle

    @classmethod
    def get(cls) -> ModelBundle:
        if cls._bundle is None:
            raise RuntimeError(
                "ModelLoader.load() has not been called; "
                "the FastAPI lifespan should load the model at startup"
            )
        return cls._bundle

    @classmethod
    def reset(cls) -> None:
        """Discard the cached bundle. Intended for tests only."""
        cls._bundle = None

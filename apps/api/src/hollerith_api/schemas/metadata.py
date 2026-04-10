"""Schemas for the /metadata endpoint."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class MetadataThresholds(BaseModel):
    max_numerical_features: int
    max_categorical_features: int
    max_dataset_size: int


class MetadataResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    version: str = Field(description="API version string.")
    sklearn_version: str = Field(description="scikit-learn version the artefact was built against.")
    algorithms: list[str] = Field(description="Display names of all scored algorithms.")
    feature_names: list[str] = Field(description="Column names the regressor was fitted with.")
    thresholds: MetadataThresholds = Field(
        description="RandomForest vs LinearRegression switch-over points."
    )
    model_path: str = Field(description="Filename of the loaded artefact.")

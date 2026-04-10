"""End-to-end metadata endpoint tests.

These assertions pin the exact shape of the 2024 artefact so any drift in
the feature layout or algorithm ordering will be caught immediately.
"""

from __future__ import annotations

from fastapi.testclient import TestClient

EXPECTED_ALGORITHMS = [
    "DecisionTree",
    "GaussianNB",
    "KNN",
    "LogisticRegression",
    "RandomForest",
]

EXPECTED_FEATURE_NAMES = [
    "num_num_features",
    "num_cat_features",
    "number_of_instances",
    "model_0",
    "model_1",
    "model_2",
    "model_3",
    "model_4",
]


def test_metadata_has_expected_shape(client: TestClient) -> None:
    response = client.get("/api/v1/metadata")

    assert response.status_code == 200
    body = response.json()

    assert body["sklearn_version"] == "1.2.2"
    assert body["algorithms"] == EXPECTED_ALGORITHMS
    assert body["feature_names"] == EXPECTED_FEATURE_NAMES
    assert body["thresholds"] == {
        "max_numerical_features": 25,
        "max_categorical_features": 25,
        "max_dataset_size": 350_000,
    }
    assert body["model_path"].endswith("ml_model_package.pkl")

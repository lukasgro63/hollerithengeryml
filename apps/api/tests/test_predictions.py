"""End-to-end tests for the /predictions endpoint."""

from __future__ import annotations

import math

from fastapi.testclient import TestClient


def test_small_input_uses_random_forest_and_returns_five_ranked_predictions(
    client: TestClient,
) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 25,
            "num_categorical_features": 17,
            "dataset_size": 10_000,
        },
    )

    assert response.status_code == 200
    body = response.json()

    assert body["model_used"] == "random_forest"
    assert body["thresholds_applied"] == {"num_features": 50, "dataset_size": 50_000}

    predictions = body["predictions"]
    assert len(predictions) == 5

    algorithms = {p["algorithm"] for p in predictions}
    assert algorithms == {
        "DecisionTree",
        "GaussianNB",
        "KNN",
        "LogisticRegression",
        "RandomForest",
    }

    # Ranks are 1..5 in order, and energies are sorted descending.
    assert [p["rank"] for p in predictions] == [1, 2, 3, 4, 5]
    energies = [p["energy_kwh"] for p in predictions]
    assert energies == sorted(energies, reverse=True)

    # Average matches arithmetic mean of the raw energies.
    expected_average = sum(energies) / len(energies)
    assert math.isclose(body["average_kwh"], expected_average, rel_tol=1e-9)


def test_large_input_falls_back_to_linear_regression(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 100,
            "num_categorical_features": 80,
            "dataset_size": 1_000_000,
        },
    )

    assert response.status_code == 200
    assert response.json()["model_used"] == "linear_regression"


def test_exact_boundary_still_uses_random_forest(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 50,
            "num_categorical_features": 50,
            "dataset_size": 50_000,
        },
    )

    assert response.status_code == 200
    assert response.json()["model_used"] == "random_forest"


def test_one_feature_over_threshold_falls_back_to_linear(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 51,
            "num_categorical_features": 0,
            "dataset_size": 1,
        },
    )

    assert response.status_code == 200
    assert response.json()["model_used"] == "linear_regression"


def test_rejects_negative_numerical_features(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": -1,
            "num_categorical_features": 0,
            "dataset_size": 100,
        },
    )

    assert response.status_code == 422


def test_rejects_zero_numerical_features(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 0,
            "num_categorical_features": 0,
            "dataset_size": 100,
        },
    )

    assert response.status_code == 422


def test_accepts_zero_categorical_features(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 10,
            "num_categorical_features": 0,
            "dataset_size": 100,
        },
    )

    assert response.status_code == 200


def test_rejects_oversized_dataset(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 1,
            "num_categorical_features": 0,
            "dataset_size": 500_000_000,
        },
    )

    assert response.status_code == 422


def test_rejects_unknown_fields(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 10,
            "num_categorical_features": 5,
            "dataset_size": 1000,
            "extra_field": "nope",
        },
    )

    assert response.status_code == 422


def test_rejects_missing_fields(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={"num_numerical_features": 10},
    )

    assert response.status_code == 422


def test_predictions_are_finite_and_numeric(client: TestClient) -> None:
    response = client.post(
        "/api/v1/predictions",
        json={
            "num_numerical_features": 3,
            "num_categorical_features": 2,
            "dataset_size": 3,
        },
    )

    assert response.status_code == 200
    for prediction in response.json()["predictions"]:
        energy = prediction["energy_kwh"]
        assert isinstance(energy, (int, float))
        assert math.isfinite(energy)

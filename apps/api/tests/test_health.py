"""End-to-end health endpoint tests."""

from __future__ import annotations

from fastapi.testclient import TestClient


def test_health_reports_ok_and_model_loaded(client: TestClient) -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["model_loaded"] is True
    assert isinstance(body["version"], str)
    assert len(body["version"]) > 0

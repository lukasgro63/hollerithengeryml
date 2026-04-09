"""Schemas for the /health endpoint."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class HealthResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())

    status: Literal["ok"] = "ok"
    model_loaded: bool = Field(description="Whether the meta-model is in memory.")
    version: str = Field(description="API version string.")

"""Application settings loaded from environment variables."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Annotated, Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict

Environment = Literal["development", "production"]
LogLevel = Literal["debug", "info", "warning", "error"]


class Settings(BaseSettings):
    """Runtime configuration.

    Values are sourced from environment variables or a `.env` file in the
    working directory. Lists such as `allowed_origins` accept either JSON
    (`["a","b"]`) or comma-separated strings (`a,b`) for ergonomic shell usage.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        protected_namespaces=(),
    )

    environment: Environment = "development"
    log_level: LogLevel = "info"

    # ``NoDecode`` disables pydantic-settings' built-in JSON decoding so the
    # field validator below can accept a plain comma-separated string from
    # the environment (`ALLOWED_ORIGINS=http://a,http://b`). JSON arrays
    # still work because the validator passes them through untouched.
    allowed_origins: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: ["http://localhost:3000"],
        description="CORS allowlist. No wildcards in production.",
    )

    predictions_rate_limit_per_minute: int = Field(
        default=30,
        ge=1,
        le=10_000,
        description="Per-client-IP rate limit on the predictions endpoint.",
    )

    model_path: Path = Field(
        default=Path("models/ml_model_package.pkl"),
        description="Path to the joblib meta-model artefact.",
    )

    api_version: str = "1.0.0"

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def _parse_origins(cls, value: object) -> object:
        if isinstance(value, str):
            stripped = value.strip()
            if stripped.startswith("["):
                parsed = json.loads(stripped)
                if not isinstance(parsed, list):
                    raise ValueError("allowed_origins JSON must be a list")
                return parsed
            return [origin.strip() for origin in stripped.split(",") if origin.strip()]
        return value

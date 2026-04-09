"""structlog configuration: JSON in production, coloured console in dev."""

from __future__ import annotations

import logging
import sys

import structlog

from .config import Settings


def configure_logging(settings: Settings) -> None:
    """Wire structlog and the stdlib root logger.

    Uvicorn and gunicorn emit records through stdlib logging, so we configure
    the root handler too — otherwise their startup lines disappear.
    """
    log_level = getattr(logging, settings.log_level.upper())

    processors: list[structlog.types.Processor] = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso", utc=True),
        structlog.processors.StackInfoRenderer(),
    ]

    if settings.environment == "production":
        processors.append(structlog.processors.format_exc_info)
        processors.append(structlog.processors.JSONRenderer())
    else:
        processors.append(structlog.dev.ConsoleRenderer(colors=True))

    structlog.configure(
        processors=processors,
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )

    logging.basicConfig(
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
        level=log_level,
        stream=sys.stdout,
    )

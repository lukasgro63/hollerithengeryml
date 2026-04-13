# Security Policy

We take the security of HollerithEnergyML seriously and welcome responsible
disclosure from the community. This document tells you how to report a
vulnerability, what's in scope, and what to expect when you do.

## Reporting a vulnerability

Please report vulnerabilities **privately** via GitHub Security Advisories:

> https://github.com/lukasgro63/hollerithengeryml/security/advisories/new

If for any reason you cannot use GitHub Security Advisories, email
`security@REPLACE_WITH_DOMAIN` instead. (The production domain is pending
go-live; once it is set, this address will resolve.)

Do **not** open public GitHub issues for security findings.

## Supported versions

| Version | Supported |
|---------|-----------|
| `main`  | yes       |

Only the current `main` branch is supported. There are no backports and no
long-term support branches.

## In scope

- The deployed production service at the configured domain
- The FastAPI backend source under `apps/api/`
- The Next.js frontend source under `apps/web/`
- The model artefact loading path (joblib archive baked into the api image)
- The CI/CD pipeline under `.github/workflows/`
- The Caddy and Docker Compose configuration under `infra/`

## Out of scope

- Upstream dependencies — please report directly to the upstream project
- Hetzner Cloud infrastructure issues — please report directly to Hetzner
- Social engineering attempts against contributors or maintainers
- Denial-of-service via the documented rate limiter (slowapi rate limiting
  on `/api/v1/predictions` is intentional, documented behaviour)

## Threat model summary

The following mitigations are implemented in the repository today. This
list is non-exhaustive but covers the load-bearing controls:

- Bounded Pydantic v2 inputs on `/api/v1/predictions` prevent resource
  exhaustion via oversized payloads
- slowapi rate limiting (default 30 requests per minute per IP) throttles
  abuse against the prediction endpoint
- Docker containers run as non-root: the api as a dedicated `app` uid, the
  web as `nextjs:1001`
- The production api container runs with `read_only: true` root filesystem
- The joblib model artefact is baked into the api image at build time and
  loaded read-only at startup — never from user input — eliminating the
  deserialisation-RCE exposure to untrusted data
- HSTS preload, strict Content-Security-Policy, `X-Frame-Options: DENY`,
  `Referrer-Policy`, and a `Permissions-Policy` locking out camera,
  microphone, and geolocation are applied globally by Caddy
- HTTPS only, with automatic Let's Encrypt certificate renewal via Caddy
- CORS allowlist (no wildcards), configured per environment via the
  `ALLOWED_ORIGINS` environment variable
- No user data is stored: no database, no cookies, no third-party
  analytics, no session state
- Dependency versions are pinned to exactly the values that the 2024
  meta-model artefact was serialised with (`scikit-learn==1.2.2`,
  `numpy==1.23.5`, `pandas==1.5.3`, `joblib==1.3.2`). Automatic
  dependency updates are disabled to protect model-load compatibility;
  future maintainers should re-enable them after retraining.

## Response expectations

We will acknowledge security reports within 7 days, aim to patch
high-severity findings within 30 days, and will credit reporters in the
fix commit unless they request otherwise.

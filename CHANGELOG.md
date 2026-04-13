# Changelog

All notable changes to this project will be documented in this file.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.1](https://github.com/lukasgro63/hollerithengeryml/compare/v1.0.0...v1.0.1) (2026-04-13)


### Bug Fixes

* mobile layout overflow, tables-as-cards, portal mobile menu ([#29](https://github.com/lukasgro63/hollerithengeryml/issues/29)) ([6626310](https://github.com/lukasgro63/hollerithengeryml/commit/66263105235e966d3321222637f46badc9144912))


### CI/CD

* introduce release-please for changelog and semver tagging ([#30](https://github.com/lukasgro63/hollerithengeryml/issues/30)) ([735f65a](https://github.com/lukasgro63/hollerithengeryml/commit/735f65a5937d5cdbd3e3bfd0bd72546f88041a19))
* revert PAT for release-please ([#33](https://github.com/lukasgro63/hollerithengeryml/issues/33)) ([b21c157](https://github.com/lukasgro63/hollerithengeryml/commit/b21c157cdaa462c448a0a14b6642dd22a8ba78c0))
* use PAT for release-please so its PRs trigger CI checks ([#32](https://github.com/lukasgro63/hollerithengeryml/issues/32)) ([cb6eb41](https://github.com/lukasgro63/hollerithengeryml/commit/cb6eb41b66d5238b950fe48a27cbea4a31ca7211))

## [1.0.0] - 2026-04-10

### Added
- FAQ section on homepage (ported from legacy Angular site)
- Out-of-training-range warning banner on calculator results
- `cat_features` field in predictions response for complete threshold visibility
- Content Security Policy and security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Imprint page referencing HHZ / Hochschule Reutlingen with bilingual disclaimer
- Privacy policy with Hetzner hosting details, GDPR rights, and self-hosted fonts disclosure
- `SklearnRegressor` protocol type replacing `Any` throughout the inference pipeline
- `ModelNotLoadedError` dedicated exception for clear health-check semantics
- Structured logging in the prediction hot path
- Feature vector dimension assertion before sklearn predict call
- Pre-commit hook configuration (ruff, trailing-whitespace, detect-secrets)
- Issue and PR templates for structured contributor workflow
- CODEOWNERS, Code of Conduct, EditorConfig, Makefile
- This changelog

### Fixed
- Model-selection thresholds corrected to match 2024 deployed values (25/25/350,000 instead of erroneous 50/50/50,000)
- Dataset statistics on research page aligned with actual CSV files (Diabetes ~254k/21, Bank ~41k/19, Heart ~320k/17)
- "Six classifiers" / "five classifiers" inconsistency on research page resolved
- Algorithm display names in model card now match API response format
- Rate limit wired to `Settings.predictions_rate_limit_per_minute` (previously hardcoded)
- Metadata endpoint uses DI-injected thresholds instead of constructing a fresh `Thresholds()`
- `model_path` in metadata response returns filename only (no server filesystem leak)
- CitationBlock timer cleanup on unmount (resource leak)
- Recharts ResponsiveContainer min-height to prevent -1px warning
- Non-existent Tailwind class `h-4.5` replaced with `h-[18px]`
- Static `willChange`/`containIntrinsicSize` removed from non-animated Hero elements

### Changed
- Legacy branch (`legacy/2024`) replaced with actual deployed source from Docker images
- All dependencies updated to latest compatible versions (FastAPI 0.135, uvicorn 0.44, gunicorn 25, structlog 25, pytest 9, react 19.2.5)
- Dockerfile uses `--preload-app` for copy-on-write model sharing across workers
- Test fixtures use `Iterator` instead of `Generator` annotation
- Service tests use realistic input values (min 1, not 0)
- 36 redundant comments removed across frontend components
- Dead code removed (Input.tsx, PlaceholderPage.tsx, `/about` sitemap entry)

### Removed
- Template warning banners from imprint and privacy pages (replaced with real content)

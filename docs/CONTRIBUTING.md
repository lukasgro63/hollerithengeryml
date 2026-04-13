# Contributing

Thanks for taking an interest in HollerithEnergyML. This document describes
how to propose changes.

## First-time setup

```bash
make setup   # installs dependencies + pre-commit hooks
```

Pre-commit hooks run `ruff`, `trailing-whitespace`, and `detect-secrets`
automatically on every commit. If a hook fails, fix the issue and re-stage.

## Workflow

We follow GitHub-flow:

1. Create a topic branch off `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes. Keep commits focused — one logical change per commit.
3. Run the local checks:
   ```bash
   make check   # runs lint + test for both apps
   ```
4. Push the branch and open a Pull Request against `main`.
   The [PR template](../.github/PULL_REQUEST_TEMPLATE.md) will guide you.
5. A reviewer will look at your change, request adjustments if needed, and
   merge once CI is green.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org). The
release pipeline (`release-please`) reads commit messages on `main` to
generate the changelog, bump the version, and tag Docker images.

Format:

```
<type>: <short imperative summary>

<optional body>

<optional footer, e.g. Closes #123>
```

Allowed types and how they affect releases:

| Type       | Section in changelog | Triggers version bump |
|------------|----------------------|-----------------------|
| `feat`     | Features             | minor (1.0.0 → 1.1.0) |
| `fix`      | Bug Fixes            | patch (1.0.0 → 1.0.1) |
| `perf`     | Performance          | patch                 |
| `refactor` | Refactoring          | patch                 |
| `docs`     | Documentation        | patch                 |
| `deps`     | Dependencies         | patch                 |
| `build`    | Build                | patch                 |
| `ci`       | CI/CD                | patch                 |
| `test`     | (hidden)             | patch                 |
| `chore`    | (hidden)             | patch                 |
| `style`    | (hidden)             | patch                 |

A breaking change is signalled by a `!` after the type or a
`BREAKING CHANGE:` footer; that triggers a major bump.

Rules:

- First line under 70 characters, imperative mood: "Add health endpoint",
  not "Added" or "Adds".
- One logical change per commit.
- Reference issues in the footer: `Closes #123`.

Example:

```
feat: add domain-aware Caddy config

The reverse proxy now provisions a Let's Encrypt certificate
automatically when SITE_DOMAIN is a hostname instead of an IP.

Closes #42
```

## How releases work

`release-please` runs on every push to `main`. It groups your commits
since the last release and opens a **Release PR** with:

- An updated `CHANGELOG.md`
- A version bump in `.release-please-manifest.json`

When you merge the Release PR:

1. A git tag (e.g. `v1.1.0`) is created.
2. A GitHub Release is published with the changelog body.
3. The deploy workflow re-tags the Docker images with `1.1.0`, `1.1`,
   and `1` so historical versions remain pullable from `ghcr.io`.

The `:latest` tag still points at the head of `main`, so production
keeps deploying continuously. Tagged versions are there for rollback
and for any future stable-channel deployment.

## Code style

- **Python:** `ruff format` for formatting, `ruff check` for linting, type
  hints everywhere, `mypy --strict` where practical.
- **TypeScript:** `prettier` for formatting, `eslint` for linting, strict
  `tsconfig`, no `any` without a comment explaining why.
- **English** for code, comments, commit messages, and documentation.

## What not to contribute

- Changes to `research/` — it is an immutable archive.
- Retrained models — out of scope for this rebuild.
- New features baked into `ml_model_package.pkl` — treat the model as a
  black box.

## Questions

Open a [GitHub issue](https://github.com/lukasgro63/hollerithengeryml/issues)
and tag it with `question`.

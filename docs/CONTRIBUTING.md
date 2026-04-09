# Contributing

Thanks for taking an interest in HollerithEnergyML. This document describes
how to propose changes.

## Workflow

We follow GitHub-flow:

1. Create a topic branch off `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes. Keep commits focused — one logical change per commit.
3. Run the local checks:
   ```bash
   # Backend
   cd apps/api && uv run ruff check . && uv run pytest

   # Frontend
   cd apps/web && npm run lint && npm run test && npm run build
   ```
4. Push the branch and open a Pull Request against `main`.
5. A reviewer will look at your change, request adjustments if needed, and
   merge once CI is green.

## Commit messages

- Present tense, imperative mood: "Add health endpoint", not "Added" or
  "Adds".
- First line under 70 characters.
- If the change closes an issue, add `Closes #123` at the bottom.

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

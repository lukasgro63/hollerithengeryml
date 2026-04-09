# Research Archive

This directory preserves the 2024 research artefacts that led to the
production meta-model used in
[`apps/api/models/ml_model_package.pkl`](../apps/api/models/).

**Nothing in `research/` is part of the deployed application.** These files
are kept in the repository as an immutable reference for methodology,
reproducibility, and knowledge transfer to future contributors.

## Contents

```
research/
├── docs/
│   ├── calculation-of-energy-equivalencies.md
│   ├── gitlab-model-experiments.md
│   └── GitFlow.jpg
├── baseline-tests/          (was: Content/Experimentation/)
│   ├── Diabetes_Project_CodeCarbon_Sem2.ipynb
│   ├── notebooks/           Per-algorithm training notebooks
│   ├── data/                Original datasets (Diabetes, Bank, Heart)
│   └── results/             CodeCarbon emissions CSVs per algorithm
└── ml-notebooks/            (was: ML-Notebooks/)
    ├── data_analysis.ipynb
    ├── energy_experiement.ipynb
    └── data/training-data/  Aggregated data used to train the meta-model
```

## What the baseline campaign measured

For each algorithm (DecisionTree, GaussianNB, KNN, LogisticRegression,
RandomForest) on each dataset (Diabetes, Bank Marketing, Heart 2020), the
team recorded energy consumption during training using
[CodeCarbon](https://codecarbon.io). The aggregate measurements became the
training data for the meta-model in
[`ml-notebooks/energy_experiement.ipynb`](./ml-notebooks/energy_experiement.ipynb).

## Why this is archived, not deleted

Future contributors — researchers, students, supervisors — need the raw
measurements to understand *why* the meta-model predicts what it predicts,
to validate model drift over time, and to retrain against new algorithms or
new hardware profiles.

## How to re-run (historical only)

The notebooks were originally executed inside a Python 3.10 virtualenv with
`mlflow`, `scikit-learn==1.2.2`, `codecarbon`, and related packages. They
are **not** guaranteed to run against current versions of these libraries.
Treat the notebooks as documentation, not executable code.

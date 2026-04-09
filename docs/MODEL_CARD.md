# Model Card — HollerithEnergyML Meta-Model

> **Status:** Placeholder. To be finalised in Phase 6 during project handoff.

## Model details

- **Artefact:** `apps/api/models/ml_model_package.pkl`
- **Type:** joblib-serialised tuple `(linear_regression_model, random_forest_regressor)`
- **Framework:** scikit-learn 1.2.2
- **Trained:** 2024-01, Herman Hollerith Zentrum, Reutlingen University
- **Serialisation:** joblib

## Intended use

Predicts the energy consumption (in kWh) of training one of five classical
scikit-learn algorithms on a tabular dataset of a given shape. Intended as a
**decision-support tool** for students and researchers evaluating algorithm
choice for their training workloads.

## Input features (8)

| Index | Name                        | Type  | Notes                     |
|-------|-----------------------------|-------|---------------------------|
| 0     | `num_numerical_features`    | float | Raw count                 |
| 1     | `num_categorical_features`  | float | Raw count                 |
| 2     | `dataset_size`              | float | Number of rows            |
| 3     | `is_decision_tree`          | float | One-hot (0 or 1)          |
| 4     | `is_gaussian_nb`            | float | One-hot (0 or 1)          |
| 5     | `is_knn`                    | float | One-hot (0 or 1)          |
| 6     | `is_logistic_regression`    | float | One-hot (0 or 1)          |
| 7     | `is_random_forest`          | float | One-hot (0 or 1)          |

## Model-selection rule

| Condition                                                                   | Model used        |
|-----------------------------------------------------------------------------|-------------------|
| `num_num ≤ 50` AND `num_cat ≤ 50` AND `dataset_size ≤ 50_000`               | Random Forest     |
| Otherwise                                                                   | Linear Regression |

## Output

Single float: predicted training energy in kWh (can be sub-kWh, displayed in
Wh / mWh / µWh depending on magnitude).

## Training data

See [`../research/README.md`](../research/README.md) for the archived
baseline campaign: CodeCarbon measurements on Diabetes, Bank Marketing, and
Heart 2020 datasets across the five algorithms.

## Known limitations

- **TODO Phase 6:** document algorithm coverage, hardware dependence, model
  staleness, and extrapolation behaviour beyond measured ranges.

## Maintenance

- `scikit-learn==1.2.2` is pinned to guarantee joblib-load compatibility.
- If the model is retrained, update this card and regenerate the artefact.
- Consider exporting to ONNX in a future phase for language-agnostic serving
  and to eliminate the deserialisation-RCE attack surface entirely.

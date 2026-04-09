# Instructions for using Model Experiemnts

When creating machine learning models, data scientists often experiment with different parameters, configurations, and feature engineering to improve the performance of the model. Keeping track of all this metadata and the associated artifacts so that the data scientist can later replicate the experiment is not trivial. Machine learning experiment tracking enables them to log parameters, metrics, and artifacts directly into GitLab, giving easy access later on.

These features have been proposed:

- Searching experiments.
- Visual comparison of candidates.
- Creating, deleting, and updating candidates through the GitLab UI.

## What is an experiment?

In a project, an experiment is a collection of comparable model candidates. Experiments can be long-lived (for example, when they represent a use case), or short-lived (results from hyperparameter tuning triggered by a merge request), but usually hold model candidates that have a similar set of parameters measured by the same metrics.

For further Infos see [Machine learning model experiments](https://docs.gitlab.com/ee/user/project/ml/experiment_tracking/)

## Use it in HollerithEnergyML

- Create a token with api access
- Copy project ID (3206)

```python
os.environ["MLFLOW_TRACKING_TOKEN"]='<Der Token>'
os.environ["MLFLOW_TRACKING_URI"]='https://gitlab.reutlingen-university.de/api/v4/projects/3206/ml/mlflow'
```
**Attention:** Token should not be shared in a repo!

- Run the experiments locally on your computer in an env or in google collab. Make sure that `mlflow` is installed.

- B
```python
mlflow.set_experiment(experiment_name=f"Your Model Experiment")

with mlflow.start_run(run_name='Run Name'):
    model = RandomForestRegressor(random_state=42)
    model.fit(X_train, y_train)
    
    scores = show_scores(model, X_train, y_train, X_test, y_test)
    mlflow.log_params(model.get_params())
    
    for score_name, score_value in scores.items():
        mlflow.log_metric(score_name, score_value)

    mlflow.sklearn.log_model(model, '')
```

- Goto [Model Experiments](https://gitlab.reutlingen-university.de/schulza/ml_recommender_system/-/ml/experiments) and check your runs!


## Troubleshooting

Mit Mlflow kommt es teilweise zu Schwierigekiten beim laden in einem Jupyter Notebook. Daher muss der Jupyter Kernal für die umgebung hinzugefügt werden:

```bash
pip install mlflow jupyter ipykernel
ipython kernel install --user --name=my_new_mlflow_env --display-name="Python (my_new_mlflow_env)"
```
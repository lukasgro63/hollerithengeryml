from concurrent.futures import ThreadPoolExecutor
from enum import Enum

import numpy as np


class EnergyPredictor:
    class Model(Enum):
        DecisionTree = 0
        GaussianNB = 1
        KNN = 2
        LogisticRegression = 3
        RandomForest = 4

    def __init__(self, selected_prediction_model, max_threads=5):
        self.models = {model: selected_prediction_model for model in self.Model}
        self.max_threads = max_threads

    def predict_energy(self, prediction_parameters):
        predictions = {}
        with ThreadPoolExecutor(max_workers=self.max_threads) as executor:
            futures = []

            for model in self.Model:
                future = executor.submit(self._predict_energy_for_model, model, prediction_parameters)
                futures.append(future)

            for model, future in zip(self.Model, futures):
                predicted_energy = future.result()
                predictions[model.name] = predicted_energy

        relative_predictions = self._calculate_relative_values(predictions)
        return relative_predictions

    def _predict_energy_for_model(self, model, prediction_parameters):
        model_features = [0.0] * 5
        model_features[model.value] = 1.0  

        X_predict = np.array([
            prediction_parameters.num_num_features,
            prediction_parameters.num_cat_features,
            prediction_parameters.number_of_instances,
            *model_features 
        ]).reshape(1, -1)

        predicted_energy = self.models[model].predict(X_predict)

        return predicted_energy[0]
    
    def _calculate_relative_values(self, predictions):
        max_value = max(predictions.values())
        return {model: int((energy / max_value) * 100) if max_value != 0 else 0 for model, energy in predictions.items()}



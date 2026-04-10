import pickle

import joblib


class ModelManager:
    def __init__(self, model_path):
        self.model_path = model_path
        self.li_model, self.rf_model = self.load_model()
        self.thresholds = {
            'num_num': 25,
            'num_cat': 25,
            'data_size': 350000
        }

    def load_model(self):
        with open(self.model_path, 'rb') as file:
            li_model, rf_model = joblib.load(file)
            return li_model, rf_model

    def select_model(self, prediction_parameters):
        if (prediction_parameters.num_num_features <= self.thresholds['num_num'] and
            prediction_parameters.num_cat_features <= self.thresholds['num_cat'] and
            prediction_parameters.number_of_instances <= self.thresholds['data_size']
        ):
            return self.rf_model
        else:
            return self.li_model

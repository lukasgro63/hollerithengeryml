from pydantic import BaseModel


class PredictionParameters(BaseModel):
    num_num_features: float
    num_cat_features: float
    number_of_instances: float

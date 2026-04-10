import os

from decouple import config
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.energy_predictor import EnergyPredictor
from models.model_manager import ModelManager
from models.predictions_parameters import PredictionParameters

app = FastAPI()

if os.getenv("DEV_ENVIRONMENT"):
    origins = config("ALLOWED_ORIGINS").split(",") if config("ALLOWED_ORIGINS") else ["*"]
else:
    origins = os.getenv("CORS_ORIGINS").split(",") if os.getenv("CORS_ORIGINS") else ["*"]

model_path = "data/ml_model_package.pkl"
model_manager = ModelManager(model_path)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predictions")
async def create_prediction(prediction_parameters: PredictionParameters):
    seleced_models = model_manager.select_model(prediction_parameters)
    energy_predictor = EnergyPredictor(seleced_models, max_threads=5)
    predictions = energy_predictor.predict_energy(prediction_parameters)

    return predictions

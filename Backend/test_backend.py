import sys
import warnings

warnings.filterwarnings("ignore", category=UserWarning)


from fastapi.testclient import TestClient
from main import app
from models.predictions_parameters import PredictionParameters

client = TestClient(app)

# Define color codes
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

def colored(status, text):
    """
    Function to add colors to the output.
    """
    if status == "PASSED":
        return f"{GREEN}[  PASSED  ]{RESET} {text}"
    elif status == "FAILED":
        return f"{RED}[  FAILED  ]{RESET} {text}"

def test_prediction_endpoint():
    print("\n======================== Testing /predictions ========================\n")

    # Sample prediction data
    prediction_data = {
        "num_num_features": 3.0,
        "num_cat_features": 2.0,
        "number_of_instances": 3.0
    }

    # Send a request to the '/predictions' endpoint
    response = client.post("/predictions", json=prediction_data)

    # Check if the response has the expected HTTP status code (200 OK)
    if response.status_code == 200:
        print(colored("PASSED", "HTTP status code: 200 OK"))
    else:
        print(colored("FAILED", f"Error with HTTP status code: {response.status_code}"))

    # Check if the response has a JSON content type
    if "application/json" in response.headers["content-type"]:
        print(colored("PASSED", "Response has the expected Content-Type: application/json"))
    else:
        print(colored("FAILED", "Error in response Content-Type"))

    # Convert the response JSON into a Python dictionary
    predictions = response.json()

    # Check if the expected models are present in the predictions
    expected_models = ["DecisionTree", "GaussianNB", "KNN", "LogisticRegression", "RandomForest"]
    for model in expected_models:
        if model in predictions:
            print(colored("PASSED", f"Model {model} found in predictions"))
        else:
            print(colored("FAILED", f"Model {model} missing in predictions"))

    # Check if the predictions are valid floating-point numbers
    for model, prediction in predictions.items():
        if isinstance(prediction, (int, float)):
            print(colored("PASSED", f"Prediction for {model} is a valid number: {prediction}"))
        else:
            print(colored("FAILED", f"Invalid prediction for {model}: {prediction}"))

    # Success message
    print("\n======================== All tests completed ========================\n")

if __name__ == "__main__":
    test_prediction_endpoint()

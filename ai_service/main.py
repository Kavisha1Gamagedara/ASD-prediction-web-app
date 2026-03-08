from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
MODEL_PATH = "asd_svm_kaggle_model.pkl"
SCALER_PATH = "asd_svm_scaler.pkl"

model = None
scaler = None

if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")

if os.path.exists(SCALER_PATH):
    try:
        scaler = joblib.load(SCALER_PATH)
        print("Scaler loaded successfully")
    except Exception as e:
        print(f"Error loading scaler: {e}")

class PredictionInput(BaseModel):
    # Defining a simplified version or full version based on the CSV
    # For now, let's use a list of features or a dict
    features: list

@app.get("/")
def read_root():
    return {"message": "ASD AI Service is running"}

@app.post("/predict")
def predict(input_data: PredictionInput):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or Scaler not loaded")
    
    try:
        data = np.array(input_data.features).reshape(1, -1)
        scaled_data = scaler.transform(data)
        prediction = model.predict(scaled_data)
        probability = model.predict_proba(scaled_data).tolist() if hasattr(model, "predict_proba") else None
        
        return {
            "prediction": int(prediction[0]),
            "probability": probability,
            "result": "Positive" if prediction[0] == 1 else "Negative"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

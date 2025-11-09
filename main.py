import nltk
nltk.download('vader_lexicon')
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import pandas as pd
from nltk.sentiment import SentimentIntensityAnalyzer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Authentication setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def authenticate_user(token: str = Depends(oauth2_scheme)):
    if token != "my_secure_token":
        raise HTTPException(status_code=401, detail="Invalid token")
@app.get("/status")
def status():
    return {"status": "API is running"}
from fastapi import File, UploadFile

@app.post("/analyze")
def analyze_csv(file: UploadFile = File(...), token: str = Depends(authenticate_user)):
    # Read CSV file
    df = pd.read_csv(file.file)

    # Ensure the required columns are present
    if "text" not in df.columns:
        raise HTTPException(status_code=400, detail="CSV must contain a 'text' column.")

    # Initialize Sentiment Analyzer
    sia = SentimentIntensityAnalyzer()

    # Analyze sentiment for each text entry
    def get_sentiment(text):
        score = sia.polarity_scores(text)["compound"]
        if score > 0.05:
            return "positive"
        elif score < -0.05:
            return "negative"
        else:
            return "neutral"

    df["sentiment"] = df["text"].apply(get_sentiment)

    # Convert results to dictionary for response
    result = df[["id", "text", "sentiment"]].to_dict(orient="records")
    return {"results": result}
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

from fastapi import FastAPI
from database import get_emotion_color

app = FastAPI()

@app.get("/emotion-color/{emotion}")
def get_emotion_color_api(emotion: str):
    color = get_emotion_color(emotion)
    if not color:
        return {"error": "Emotion not found"}
    return {"emotion": emotion, "color": color}


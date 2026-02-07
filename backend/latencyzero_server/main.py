from fastapi import FastAPI

app = FastAPI(title="LatencyZero Server")

@app.get("/")
def root():
    return {"message": "LatencyZero backend activo 🚀"}

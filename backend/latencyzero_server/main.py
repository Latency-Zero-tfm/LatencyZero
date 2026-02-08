from fastapi import FastAPI

from .core.config import settings 
from .db.session import engine, Base, SessionLocal
from . import models
import logging
from .api.auth.router import router as auth_router
from .core.exception_handlers import setup_exception_handlers

app = FastAPI(title="LatencyZero Server")

setup_exception_handlers(app)

Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def run_seeds_on_startup():
  logger = logging.getLogger(__name__)
  db = SessionLocal()
  try:
    try:
      user_exists = db.query(models.User).first()
    except Exception:
      user_exists = True

    if not user_exists:
      logger.info("No se detectaron usuarios, ejecutando seeds de datos de prueba...")
      from .seeds.seeds_manager import SeedsManager
      manager = SeedsManager()
      manager.run_all(db)
    else:
      logger.info("Usuarios detectados, omitiendo seeds.")
  finally:
    db.close()

app.include_router(auth_router)

@app.get("/")
def root():
  return {
    "LatencyZero backend 🤖"
  }

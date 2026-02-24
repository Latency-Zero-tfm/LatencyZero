from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings 
from .db.session import engine, Base, SessionLocal
from . import models
import logging
from .api.auth.router import router as auth_router
from .api.components.router import router as components_router
from .api.chat.router import router as chat_router
from .api.session.router import router as session_router
from .api.opinions.router import router as opinions_router
from .core.exception_handlers import setup_exception_handlers

app = FastAPI(title="LatencyZero Server")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if settings.CORS_ORIGINS else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
app.include_router(components_router)
app.include_router(chat_router)
app.include_router(session_router)
app.include_router(opinions_router)

@app.get("/")
def root():
  return {
    "LatencyZero backend 🤖"
  }

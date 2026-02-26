import os

from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

class Settings(BaseSettings):
  """
  Configuración global del backend LatencyZero.
  Se carga desde .env y variables por defecto según entorno.
  """

  ENV: str = os.getenv("ENV", "development")  # 'development' o 'production'

  DATABASE_URL: str | None = None 

  SECRET_KEY: str = os.getenv("SECRET_KEY", "SECRET_KEY")
  ALGORITHM: str = "HS256"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 dia
  CORS_ORIGINS: list = []
  GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY", "GROQ_API_KEY")

  DEBUG: bool = True

  def __init__(self, **kwargs):
    super().__init__(**kwargs)
    # Procesar CORS_ORIGINS desde .env
    cors_origins_str = os.getenv("CORS_ORIGINS", "")
    self.CORS_ORIGINS = [origin.strip() for origin in cors_origins_str.split(",") if origin.strip()]
    if self.ENV == "development":
      self.DATABASE_URL = "sqlite:///./latencyzero.db"
      self.DEBUG = True
      # En desarrollo, agregar localhost:4200 si no está
      if "http://localhost:4200" not in self.CORS_ORIGINS:
        self.CORS_ORIGINS.append("http://localhost:4200")
    elif self.ENV == "production":
      self.DATABASE_URL = os.getenv("DATABASE_URL")
      self.DEBUG = False

settings = Settings()

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

  SECRET_KEY: str = os.getenv("SECRET_KEY", "TU_SECRET_KEY_SUPER_SEGURA")
  ALGORITHM: str = "HS256"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 dia

  DEBUG: bool = True

  def __init__(self, **kwargs):
    super().__init__(**kwargs)
    if self.ENV == "development":
      self.DATABASE_URL = "sqlite:///./latencyzero.db"
      self.DEBUG = True
    elif self.ENV == "production":
      self.DATABASE_URL = os.getenv("DATABASE_URL")
      self.DEBUG = False

settings = Settings()

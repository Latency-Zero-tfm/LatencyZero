# latencyzero_server/core/config.py
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    """Configuración global de LatencyZero"""

    model_config = SettingsConfigDict(
        env_file=BASE_DIR.parent / ".env",
        env_file_encoding="utf-8"
    )

    ENV: str = "development"
    DATABASE_URL: str | None = None
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    CORS_ORIGINS: list[str] = []
    GROQ_API_KEY: str
    DEBUG: bool = True

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # Configuración según entorno
        if self.ENV == "development":
            self.DATABASE_URL = self.DATABASE_URL or "sqlite:///./latencyzero.db"
            if "http://localhost:4200" not in self.CORS_ORIGINS:
                self.CORS_ORIGINS.append("http://localhost:4200")
        elif self.ENV == "production":
            self.DATABASE_URL = self.DATABASE_URL or ""
            self.DEBUG = False

settings = Settings()
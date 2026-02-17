import logging
from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)

class BaseSeed(ABC):
  """Clase base para implementar seeders."""

  @abstractmethod
  def run(self, db: Session) -> None:
    pass

  @abstractmethod
  def clear(self, db: Session) -> None:
    pass

  def log_success(self, message: str) -> None:
    """Log de operación exitosa."""
    logger.info(f"✓ {message}")

  def log_error(self, message: str) -> None:
    """Log de error."""
    logger.error(f"✗ {message}")

  def log_warning(self, message: str) -> None:
    """Log de advertencia."""
    logger.warning(f"⚠ {message}")

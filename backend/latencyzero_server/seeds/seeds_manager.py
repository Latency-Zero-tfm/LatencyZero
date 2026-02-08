import logging
from sqlalchemy.orm import Session
from typing import List

from .base import BaseSeed
from .users_seed import UsersSeed

logger = logging.getLogger(__name__)


class SeedsManager:
  """Gestor central de seeds."""

  def __init__(self):
    self.seeds: List[BaseSeed] = [
      UsersSeed(),
    ]

  def run_all(self, db: Session) -> None:
    logger.info("=" * 60)
    logger.info("INICIALIZANDO SEEDS")
    logger.info("=" * 60)

    for seed in self.seeds:
      seed_name = seed.__class__.__name__
      logger.info(f"\nEjecutando {seed_name}...")
      try:
        seed.run(db)
      except Exception as e:
        logger.error(f"Error en {seed_name}: {str(e)}")
        raise

    logger.info("\n" + "=" * 60)
    logger.info("SEEDS COMPLETADOS")
    logger.info("=" * 60)

  def clear_all(self, db: Session) -> None:
    logger.info("=" * 60)
    logger.info("LIMPIANDO DATOS DE SEEDS")
    logger.info("=" * 60)

    for seed in self.seeds:
      seed_name = seed.__class__.__name__
      logger.info(f"\nLimpiando {seed_name}...")
      try:
        seed.clear(db)
      except Exception as e:
        logger.error(f"Error limpiando {seed_name}: {str(e)}")
        raise

    logger.info("\n" + "=" * 60)
    logger.info("DATOS LIMPIADOS")
    logger.info("=" * 60)

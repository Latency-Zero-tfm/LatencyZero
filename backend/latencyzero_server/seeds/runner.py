from __future__ import annotations

import sys
import logging
from typing import Sequence
from pathlib import Path

from ..db.session import SessionLocal, Base, engine
from .seeds_manager import SeedsManager

logger = logging.getLogger(__name__)


class SeedsRunner:
    """Encapsula la lógica para ejecutar y limpiar seeds."""

    def __init__(self) -> None:
        # asegurar tablas
        Base.metadata.create_all(bind=engine)

    def init_database(self) -> None:
        logger.info("Verificando/creando tablas de la base de datos...")
        Base.metadata.create_all(bind=engine)

    def run(self) -> None:
        self.init_database()
        db = SessionLocal()
        try:
            manager = SeedsManager()
            manager.run_all(db)
        finally:
            db.close()

    def clear(self) -> None:
        db = SessionLocal()
        try:
            manager = SeedsManager()
            manager.clear_all(db)
        finally:
            db.close()

    def main(self, argv: Sequence[str] | None = None) -> int:
        if argv is None:
            argv = sys.argv[1:]

        if not argv:
            self.show_help()
            return 1

        cmd = argv[0].lower()
        try:
            if cmd == "run":
                self.run()
                logger.info("Seeds ejecutados correctamente.")
                return 0
            elif cmd == "clear":
                self.clear()
                logger.info("Seeds limpiados correctamente.")
                return 0
            elif cmd == "help":
                self.show_help()
                return 0
            else:
                logger.error(f"Comando desconocido: {cmd}")
                self.show_help()
                return 2
        except Exception as e:
            logger.exception("Error ejecutando seeds: %s", e)
            return 3

    @staticmethod
    def show_help() -> None:
        print(__doc__)


def run_from_cli() -> None:
    runner = SeedsRunner()
    code = runner.main()
    sys.exit(code)


if __name__ == "__main__":
    run_from_cli()

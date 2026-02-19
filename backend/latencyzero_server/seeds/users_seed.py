import logging
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from .base import BaseSeed
from ..models.user import User
from ..utils.security import get_password_hash

logger = logging.getLogger(__name__)


class UsersSeed(BaseSeed):
  """Seed para crear usuarios de prueba."""

  TEST_USERS = [
    {
      "username": "admin",
      "email": "latencyzero.tfm@gmail.com",
      "password": "Admin@123456",
      "role": "admin",
      "image": ""
    },
    {
      "username": "user",
      "email": "user@latencyzero.dev",
      "password": "User@123456",
      "role": "user",
      "image": ""
    },
    {
      "username": "demo",
      "email": "demo@latencyzero.dev",
      "password": "Demo@123456",
      "role": "user",
      "image": ""
    }
  ]

  def run(self, db: Session) -> None:
    try:
      created_count = 0
      skipped_count = 0

      for user_data in self.TEST_USERS:
        try:
          existing_user = db.query(User).filter(
            (User.username == user_data["username"]) | 
            (User.email == user_data["email"])
          ).first()

          if existing_user:
            self.log_warning(
              f"Usuario '{user_data['username']}' ya existe, se omite"
            )
            skipped_count += 1
            continue

          hashed_password = get_password_hash(user_data["password"])
          new_user = User(
            username=user_data["username"],
            email=user_data["email"],
            password=hashed_password,
            role=user_data["role"],
            image=user_data.get("image")
          )

          db.add(new_user)
          created_count += 1

        except IntegrityError:
          db.rollback()
          self.log_warning(
            f"Cannot create user '{user_data['username']}' due to integrity error"
          )
          skipped_count += 1
          continue

      db.commit()

      self.log_success(
        f"Usuarios creados: {created_count}, Omitidos: {skipped_count}"
      )

      self._log_test_credentials()

    except Exception as e:
      db.rollback()
      self.log_error(f"Error al crear usuarios: {str(e)}")
      raise

  def clear(self, db: Session) -> None:
    try:
      usernames = [u["username"] for u in self.TEST_USERS]
      deleted_count = db.query(User).filter(
        User.username.in_(usernames)
      ).delete(synchronize_session=False)

      db.commit()
      self.log_success(f"Usuarios de prueba eliminados: {deleted_count}")

    except Exception as e:
      db.rollback()
      self.log_error(f"Error al eliminar usuarios: {str(e)}")
      raise

  def _log_test_credentials(self) -> None:
    logger.info("=" * 60)
    logger.info("CREDENCIALES DE PRUEBA")
    logger.info("=" * 60)
    for user in self.TEST_USERS:
      logger.info(
        f"Usuario: {user['username']:20} | "
        f"Email: {user['email']:30} | "
        f"Password: {user['password']}"
      )
    logger.info("=" * 60)

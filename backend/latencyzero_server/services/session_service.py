from sqlalchemy.orm import Session

from ..models import Session as SessionModel
from ..repositories.session_repository import SessionRepository

def get_status_service():
    return {"status": "Session API is running"}

def create_session(db: Session, name: str) -> SessionModel:
  repo = SessionRepository(db)
  return repo.create_session(name=name)

def create_session_for_user(db: Session, user, name: str) -> SessionModel:
  repo = SessionRepository(db)
  return repo.create_session_for_user(user=user, name=name)

from sqlalchemy.orm import Session

from ..mappers.session_mapper import map_session_to_dtos
from ..schemas.session import SessionDto

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

def get_sessions_for_user(db: Session, user) -> list[SessionDto]:
  repo = SessionRepository(db)
  sessions = repo.get_sessions_for_user(user=user)
  return map_session_to_dtos(sessions)

def delete_session(db: Session, session_id: int):
  repo = SessionRepository(db)
  repo.delete_by_id(session_id)
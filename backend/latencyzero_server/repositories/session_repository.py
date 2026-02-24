from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..models import Session as SessionModel

from ..models.user import User
from .base import BaseRepository

class SessionRepository(BaseRepository[SessionModel]):
  def __init__(self, db: Session):
    super().__init__(SessionModel, db)

  def create_session(self, name: str) -> SessionModel:
    session = SessionModel(session_name=name)
    return self.create(session)

  def create_session_for_user(self, user: User, name: str) -> SessionModel:
    session = SessionModel(session_name=name,user_id=user.id, user=user)
    return self.create(session)
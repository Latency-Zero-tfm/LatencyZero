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

  def get_sessions_for_user(self, user: User):
    return (
      self.db.query(SessionModel)
      .filter(SessionModel.user_id == user.id)
      .order_by(SessionModel.update_at.desc()) 
      .all()
    )
  
  def get_session_by_id(self, session_id: int) -> Optional[SessionModel]:
    return self.db.query(SessionModel).filter(SessionModel.id == session_id).first()
  
  def get_session_by_id_and_user(self, session_id: int, user_id: int) -> Optional[SessionModel]:
    return self.db.query(SessionModel).filter(SessionModel.id == session_id, SessionModel.user_id == user_id).first()
  
  def delete_by_id(self, session_id: int):
    session = self.get_session_by_id(session_id)
    if session:
      self.db.delete(session)
      self.db.commit()
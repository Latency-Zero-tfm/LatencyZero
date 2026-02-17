from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..models.user import User
from .base import BaseRepository

class UserRepository(BaseRepository[User]):
  def __init__(self, db: Session):
    super().__init__(User, db)

  def get_by_username(self, username: str, normalized: bool = False) -> Optional[User]:
    query = self.db.query(User)
    if normalized:
      return query.filter(func.lower(User.username) == username.lower()).first()
    return query.filter(User.username == username).first()

  def get_by_email(self, email: str) -> Optional[User]:
    return self.db.query(User).filter(func.lower(User.email) == email.lower()).first()

  def create_user(self, username: str, email: str, hashed_password: str) -> User:
    user = User(username=username, email=email.lower(), password=hashed_password)
    return self.create(user)

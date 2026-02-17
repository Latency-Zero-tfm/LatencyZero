from sqlalchemy import Column, Integer, String, Boolean, Enum, TIMESTAMP
from sqlalchemy.sql import func

from ..db.session import Base

class User(Base):
  __tablename__ = "user"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String(50), unique=True, nullable=False)
  email = Column(String(100), unique=True, nullable=False)
  email_confirm = Column(Boolean, default=False)
  password = Column(String(255), nullable=False)
  role = Column(Enum("user", "admin", name="user_roles"), default="user")
  create_at = Column(TIMESTAMP, server_default=func.now())
  image = Column(String(255), nullable=True)
  email_confirmation_token = Column(String(255), nullable=True)

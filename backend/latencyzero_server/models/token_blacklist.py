from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func

from ..db.session import Base


class TokenBlacklist(Base):
  __tablename__ = "token_blacklist"

  id = Column(Integer, primary_key=True, index=True)
  token = Column(String(512), unique=True, nullable=False, index=True)
  revoked_at = Column(TIMESTAMP, server_default=func.now())

from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, Enum, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from ..db.session import Base


class Chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=True)
    session_id = Column(Integer, ForeignKey("sessions.id", ondelete="CASCADE"), nullable=False)
    user_message = Column(String(2000), nullable=False)
    bot_message = Column(String(4000), nullable=True)
    create_at = Column(TIMESTAMP, server_default=func.now())
    tools_mode = Column(
        Enum("llm", "ml_model", "search", "other", name="tools_mode_enum"),
        default="llm"
    )
    bot_files = Column(JSON, nullable=True)
    user_files = Column(JSON, nullable=True)

    user = relationship("User", back_populates="chats")
    session = relationship("Session", back_populates="chats")

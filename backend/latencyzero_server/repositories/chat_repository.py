from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..models import Chat

from ..models.user import User
from .base import BaseRepository

class ChatRepository(BaseRepository[Chat]):
  def __init__(self, db: Session):
    super().__init__(Chat, db)

  def create_chat(self, session_id: int, user_message: str, tools_mode: str, user_files: str) -> Chat:
    chat = Chat(session_id=session_id, user_message=user_message, tools_mode=tools_mode, user_files=user_files)
    return self.create(chat)

  def create_chat_for_user(self, user: User, session_id: int, user_message: str, tools_mode: str, user_files: str) -> Chat:
    chat = Chat(session_id=session_id,user_id=user.id, user=user, user_message=user_message, tools_mode=tools_mode, user_files=user_files)
    return self.create(chat)

  def get_chats_for_session(self, session_id: int):
    return self.db.query(Chat).filter(Chat.session_id == session_id).all()
  
  def update_chat_ai_response(self, chat_id: int, ai_response: str, bot_files: dict = None):
    chat = self.get_chat_by_id(chat_id)
    chat.bot_message = ai_response
    chat.bot_files = bot_files
    self.db.commit()
    self.db.refresh(chat)
    return chat
  
  def get_chat_by_id(self, chat_id: int):
    return self.db.query(Chat).filter(Chat.id == chat_id).first()
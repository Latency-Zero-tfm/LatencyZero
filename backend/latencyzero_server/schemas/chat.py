from pydantic import BaseModel
from typing import Optional

class ChatResponse(BaseModel):
    id: int
    session_id: int
    user_message: str
    bot_message: Optional[str] = None

    class Config:
        orm_mode = True
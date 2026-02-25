from pydantic import BaseModel
from typing import Optional

class ChatResponse(BaseModel):
    id: int
    session_id: int
    user_message: str

    class Config:
        orm_mode = True
from pydantic import BaseModel
from typing import Optional


class ChatCreateRequest(BaseModel):
    session_id: int
    user_message: str
    tools_mode: Optional[str] = None
    user_files: Optional[str] = None


class ChatResponse(BaseModel):
    id: int
    session_id: int
    user_message: str

    class Config:
        orm_mode = True
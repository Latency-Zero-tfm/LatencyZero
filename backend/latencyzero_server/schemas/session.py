from datetime import datetime
from pydantic import BaseModel 


class SessionDto(BaseModel):
    id: int
    session_name: str
    create_at: datetime
    update_at: datetime
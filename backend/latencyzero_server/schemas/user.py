from pydantic import BaseModel
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
  user = "user"
  admin = "admin"

class UserDTO(BaseModel):
  username: str
  token: str
  role: UserRole
  image: Optional[str] = None

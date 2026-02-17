from typing import Optional
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
  username: str
  email: EmailStr
  password: str

class UserOut(BaseModel):
  id: int
  username: str
  email: EmailStr

  class Config:
    orm_mode = True

class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  username: Optional[str] = None

class Login(BaseModel):
  username: str
  password: str

class RegisterResponse(BaseModel):
  created: bool


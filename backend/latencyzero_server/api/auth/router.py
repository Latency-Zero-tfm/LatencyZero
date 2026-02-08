from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import timedelta

from ...db.session import get_db
from ...services.auth_service import register_user, login_user
from ...schemas.auth import Login, UserCreate, RegisterResponse
from ...schemas.user import UserDTO

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=RegisterResponse, status_code=201)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
  """Register a new user."""
  register_user(db, user_in.username, user_in.email, user_in.password)
  return RegisterResponse(created=True)


@router.post("/login", response_model=UserDTO)
def login(form: Login, db: Session = Depends(get_db)):
  """Login user by username or email. Devuelve el `UserDTO` con token."""
  return login_user(db, form.username, form.password)


from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...services.auth_service import register_user, login_user, logout_user
from ...schemas.auth import Login, UserCreate, RegisterResponse
from ...schemas.user import UserDTO

router = APIRouter(prefix="/auth", tags=["auth"])
_bearer = HTTPBearer()

@router.post("/register", response_model=RegisterResponse, status_code=201)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
  """Register a new user."""
  register_user(db, user_in.username, user_in.email, user_in.password)
  return RegisterResponse(created=True)


@router.post("/login", response_model=UserDTO)
def login(form: Login, db: Session = Depends(get_db)):
  """Login user by username or email."""
  return login_user(db, form.username, form.password)


@router.post("/logout", status_code=200)
def logout(
  credentials: HTTPAuthorizationCredentials = Depends(_bearer),
  db: Session = Depends(get_db)
):
  """Revoke the current access token."""
  logout_user(db, credentials.credentials)
  return {"detail": "Logged out successfully"}
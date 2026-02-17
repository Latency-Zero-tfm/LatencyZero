from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi import BackgroundTasks

from ...db.session import get_db
from ...services.auth_service import register_user, login_user
from ...schemas.auth import Login, UserCreate, RegisterResponse
from ...schemas.user import UserDTO

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from ...db.session import get_db
from ...core.config import settings
from ...models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=RegisterResponse, status_code=201)
def register(user_in: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
  """Register a new user with email confirmation."""
  register_user(db, user_in.username, user_in.email, user_in.password, background_tasks)
  return RegisterResponse(created=True)


@router.post("/login", response_model=UserDTO)
def login(form: Login, db: Session = Depends(get_db)):
  """Login user by username or email."""
  return login_user(db, form.username, form.password)


@router.get("/confirm-email")
def confirm_email(token: str, db: Session = Depends(get_db)):
  try:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    email = payload.get("sub")
  except JWTError:
    raise HTTPException(status_code=400, detail="Token inválido o expirado")
    
  user = db.query(User).filter(User.email == email).first()
  if not user:
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

  user.email_confirm = True
  db.commit()
    
  return {"message": "Email confirmado exitosamente!"}
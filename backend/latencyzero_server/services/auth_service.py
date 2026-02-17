from datetime import timedelta
from sqlalchemy.orm import Session
from fastapi import BackgroundTasks

from ..core.config import settings
from ..core.exceptions import InvalidCredentialsException, UserAlreadyExistsException, InvalidConfirmEmailException
from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserDTO, UserRole
from ..utils.password import validate_password_strength
from ..utils.security import verify_password, get_password_hash, create_access_token, create_email_confirmation_token
from ..utils.email import send_email_gmail, send_confirmation_email

def authenticate_user(db: Session, identifier: str, password: str) -> User:
  repo = UserRepository(db)

  identifier_normalized = identifier.strip().lower()

  user = repo.get_by_username(identifier)
  if not user:
    user = repo.get_by_email(identifier_normalized)

  if not user or not verify_password(password, user.password):
    raise InvalidCredentialsException()

  if not user.email_confirm:
    raise InvalidConfirmEmailException("Email no confirmado")

  return user

def register_user(db: Session, username: str, email: str, password: str, background_tasks: BackgroundTasks) -> User:
    repo = UserRepository(db)

    email_normalized = email.strip().lower()
    username_normalized = username.strip().lower()

    if repo.get_by_username(username_normalized, normalized=True):
        raise UserAlreadyExistsException(field="username")
    if repo.get_by_email(email_normalized):
        raise UserAlreadyExistsException(field="email")

    validate_password_strength(password)
    hashed = get_password_hash(password)
    user = repo.create_user(username=username.strip(), email=email_normalized, hashed_password=hashed)

    token = create_email_confirmation_token(user.email)

    background_tasks.add_task(send_confirmation_email,
                              to_email=user.email,
                              token=token,
                              username=user.username)

    return user

def create_user(db: Session, username: str, email: str, password: str) -> User:
  repo = UserRepository(db)
  email_normalized = email.strip().lower()
  validate_password_strength(password)
  hashed = get_password_hash(password)
  return repo.create_user(username=username, email=email_normalized, hashed_password=hashed)

def login_user(db: Session, username: str, password: str) -> UserDTO:
  user = authenticate_user(db, username, password)
  access_token = create_access_token(data={"sub": str(user.id)})
  return UserDTO(
    username=user.username,
    token=access_token,
    role=user.role,
    image=user.image
  )
from datetime import timedelta
from sqlalchemy.orm import Session

from ..core.config import settings
from ..core.exceptions import InvalidCredentialsException, UserAlreadyExistsException
from ..models.user import User
from ..models.token_blacklist import TokenBlacklist
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserDTO, UserRole
from ..utils.password import validate_password_strength
from ..utils.security import verify_password, get_password_hash, create_access_token, decode_token

def authenticate_user(db: Session, identifier: str, password: str) -> User:
  repo = UserRepository(db)

  identifier_normalized = identifier.strip().lower()

  user = repo.get_by_username(identifier_normalized, normalized=True)
  if not user:
    user = repo.get_by_email(identifier_normalized)

  if not user or not verify_password(password, user.password):
    raise InvalidCredentialsException()

  return user

def register_user(db: Session, username: str, email: str, password: str) -> User:
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
  )

def is_token_blacklisted(db: Session, token: str) -> bool:
  return db.query(TokenBlacklist).filter(TokenBlacklist.token == token).first() is not None

def logout_user(db: Session, token: str) -> None:
  try:
    decode_token(token)
  except Exception:
    # Token already invalid or expired — user is already unauthenticated, nothing to blacklist
    return
  if not is_token_blacklisted(db, token):
    db.add(TokenBlacklist(token=token))
    db.commit()
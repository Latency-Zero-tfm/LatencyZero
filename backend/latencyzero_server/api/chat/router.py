from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...services.chat_service import (
  create_chat_service,
  create_chat_for_user_service,
  get_chats_service,
  get_chats_by_user_service,
)
from ...schemas.chat import ChatResponse
from ...models.user import User
from ...utils.security import decode_token

router = APIRouter(prefix="/chat", tags=["chat"])
_bearer = HTTPBearer(auto_error=False)


def get_optional_user(
  credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
  db: Session = Depends(get_db)
) -> Optional[User]:
  """
  Devuelve el usuario si hay token válido, si no None.
  """
  if not credentials:
    return None
  try:
    payload = decode_token(credentials.credentials)
    user_id = payload.get("sub")
    if not user_id:
      return None
    user = db.query(User).filter(User.id == int(user_id)).first()
    return user
  except Exception:
    return None


@router.post("/", response_model=ChatResponse, status_code=status.HTTP_201_CREATED)
async def create_chat(
    session_id: int = Form(...),
    user_message: str = Form(...),
    tools_mode: str = Form(...),
    user_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    """
    Crea un chat con soporte para imágenes.
    Funciona con usuario logueado o anónimo.
    """

    try:
        if current_user:
            return  await create_chat_for_user_service(
                db=db,
                user=current_user,
                session_id=session_id,
                user_message=user_message,
                tools_mode=tools_mode,
                user_file=user_file,
            )
        else:
            return await create_chat_service(
                db=db,
                session_id=session_id,
                user_message=user_message,
                tools_mode=tools_mode,
                user_file=user_file,
            )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{session_id}", response_model=List[ChatResponse])
def get_chats(
  session_id: int,
  db: Session = Depends(get_db),
  current_user: Optional[User] = Depends(get_optional_user),
):
  """
  Devuelve los chats de una sesión. Funciona con usuario logueado o anónimo.
  """
  try:
    if current_user:
      return get_chats_by_user_service(
        db=db,
        user_id=current_user.id,
        session_id=session_id,
      )
    else:
      return get_chats_service(
        db=db,
        session_id=session_id,
      )
  except ValueError as e:
    raise HTTPException(status_code=403, detail=str(e))
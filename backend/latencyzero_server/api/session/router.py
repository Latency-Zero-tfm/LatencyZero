from typing import Optional

from ...utils.security import decode_token
from ...models.user import User

from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...services.session_service import create_session, create_session_for_user, get_status_service, get_sessions_for_user

router = APIRouter(prefix="/session", tags=["session"])
_bearer = HTTPBearer(auto_error=False)

@router.get("/status")
async def get_status():
    return get_status_service()

@router.post("/create", status_code=200)
def create(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
    db: Session = Depends(get_db)
):
    """Create a new session."""

    user = None

    if credentials:
        token = credentials.credentials

        try:
            payload = decode_token(token)
            user_id = payload.get("sub")

            if user_id:
                user = db.query(User).filter(User.id == int(user_id)).first()

        except Exception:
            user = None

    if user:
        session = create_session_for_user(db, user=user, name="Nuevo chat")
    else:
        session = create_session(db, name="Nuevo chat")

    return {
        "detail": "Session created successfully",
        "authenticated": bool(user),
        "session": session.id
    }

@router.get("/sessions")
def get_my_sessions(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(_bearer),
    db: Session = Depends(get_db)
):
    """Get sessions for the authenticated user."""

    if not credentials:
        return {"detail": "Authentication required"}, 401

    token = credentials.credentials

    try:
        payload = decode_token(token)
        user_id = payload.get("sub")

        if not user_id:
            return {"detail": "Invalid token"}, 401

        user = db.query(User).filter(User.id == int(user_id)).first()

        if not user:
            return {"detail": "User not found"}, 404

        sessions = get_sessions_for_user(db, user=user)

        return {
            "sessions": sessions
        }

    except Exception:
        return {"detail": "Invalid token"}, 401
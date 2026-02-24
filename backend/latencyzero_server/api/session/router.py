from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...services.session_service import get_status_service

router = APIRouter(prefix="/session", tags=["session"])
_bearer = HTTPBearer()

@router.get("/status")
async def get_status():
    return get_status_service()

@router.post("/create", status_code=200)
def create(
  credentials: HTTPAuthorizationCredentials = Depends(_bearer),
  db: Session = Depends(get_db)
):
  """Create a new session."""
  # Create a new session in the database
  # session = create_session(db, credentials.credentials)
  return {"detail": "Session created successfully"}
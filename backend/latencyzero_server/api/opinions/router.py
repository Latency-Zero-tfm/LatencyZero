from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ...db.session import get_db
from ...schemas.opinion import OpinionCreate, OpinionOut
from ...repositories.opinion_repository import save_opinion, get_all_opinions
from ...services.sentiment_service import analyze_sentiment

router = APIRouter(prefix="/opinions", tags=["opinions"])


@router.post("", response_model=OpinionOut, status_code=201)
def submit_opinion(data: OpinionCreate, db: Session = Depends(get_db)):
    """Submit a user opinion and run sentiment analysis."""
    label, score = analyze_sentiment(data.message)
    return save_opinion(db, data, label, score)


@router.get("", response_model=List[OpinionOut])
def list_opinions(db: Session = Depends(get_db)):
    """Return all opinions with their sentiment results (admin)."""
    return get_all_opinions(db)

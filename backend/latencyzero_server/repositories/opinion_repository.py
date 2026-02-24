from sqlalchemy.orm import Session
from typing import List

from ..models.opinion import Opinion
from ..schemas.opinion import OpinionCreate


def save_opinion(db: Session, data: OpinionCreate, sentiment_label: str, sentiment_score: float) -> Opinion:
    opinion = Opinion(
        name=data.name,
        message=data.message,
        sentiment_label=sentiment_label,
        sentiment_score=round(sentiment_score, 4),
    )
    db.add(opinion)
    db.commit()
    db.refresh(opinion)
    return opinion


def get_all_opinions(db: Session) -> List[Opinion]:
    return db.query(Opinion).order_by(Opinion.create_at.desc()).all()

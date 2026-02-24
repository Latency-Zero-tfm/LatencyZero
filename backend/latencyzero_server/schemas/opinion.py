from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class OpinionCreate(BaseModel):
    name: Optional[str] = None
    message: str = Field(..., min_length=10)


class OpinionOut(BaseModel):
    id: int
    name: Optional[str] = None
    message: str
    sentiment_label: Optional[str] = None
    sentiment_score: Optional[float] = None
    create_at: datetime

    class Config:
        from_attributes = True

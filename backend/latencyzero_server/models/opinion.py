from sqlalchemy import Column, Integer, String, Float, TIMESTAMP
from sqlalchemy.sql import func

from ..db.session import Base


class Opinion(Base):
    __tablename__ = "opinions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=True, default=None)
    message = Column(String(1000), nullable=False)
    sentiment_label = Column(String(20), nullable=True, default=None)  # positive / neutral / negative
    sentiment_score = Column(Float, nullable=True, default=None)
    create_at = Column(TIMESTAMP, server_default=func.now())

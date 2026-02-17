from typing import Optional, Dict, List
from pydantic import BaseModel


class ComponentDTO(BaseModel):
    predicted_label: Optional[str] = None
    predicted_label_es: Optional[str] = None
    predicted_index: Optional[int] = None
    confidences: Optional[Dict[str, float]] = None
    ocr: Optional[List[str]] = None
    brand: Optional[str] = None
    error: Optional[str] = None
    message: Optional[str] = None

    class Config:
        orm_mode = True

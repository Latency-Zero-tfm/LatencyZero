from typing import Generic, TypeVar, Type, List, Optional
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")

class BaseRepository(Generic[ModelType]):
  """Repositorio base con operaciones CRUD comunes."""
  def __init__(self, model: Type[ModelType], db: Session):
    self.model = model
    self.db = db

  def get(self, id: int) -> Optional[ModelType]:
    return self.db.query(self.model).get(id)

  def list(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
    return self.db.query(self.model).offset(skip).limit(limit).all()

  def create(self, obj: ModelType) -> ModelType:
    self.db.add(obj)
    self.db.commit()
    self.db.refresh(obj)
    return obj

  def update(self, obj: ModelType) -> ModelType:
    self.db.add(obj)
    self.db.commit()
    self.db.refresh(obj)
    return obj

  def delete(self, obj: ModelType) -> None:
    self.db.delete(obj)
    self.db.commit()

from fastapi import APIRouter, UploadFile, File, HTTPException

from ...services.components_service import predict_from_bytes
from ...schemas.component import ComponentDTO

router = APIRouter(prefix="/components", tags=["components"])


@router.post("/analyze", response_model=ComponentDTO)
async def detect_component(file: UploadFile = File(...)):
  try:
    image_bytes = await file.read()
    result = predict_from_bytes(image_bytes)
    return result
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))

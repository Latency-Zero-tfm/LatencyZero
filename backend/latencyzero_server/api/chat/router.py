from fastapi import APIRouter
from ...services.chat_service import get_status_service

router = APIRouter(prefix="/chat", tags=["chat"])

@router.get("/status")
async def get_status():
    return get_status_service()
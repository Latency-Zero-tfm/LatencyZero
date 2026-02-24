from fastapi import APIRouter
# from ...services.chat_service import 

router = APIRouter(prefix="/chat", tags=["chat"])

@router.get("/status")
async def get_status():
    return {"status": "Chat API is running"}
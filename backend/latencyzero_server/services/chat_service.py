from typing import Optional
from .agent_service import ask_groq
from fastapi import UploadFile
from sqlalchemy.orm import Session
from ..repositories.chat_repository import ChatRepository
from ..repositories.session_repository import SessionRepository
from ..models.user import User


def _generate_session_title(user_message: str) -> str:
    """Trunca el mensaje a 20 caracteres y agrega '...' si es necesario."""
    clean_message = user_message.strip()
    max_length = 20
    if len(clean_message) > max_length:
        truncated = clean_message[:max_length].rsplit(" ", 1)[0]
        return truncated + "..."
    return clean_message

def create_chat_service(
    db: Session,
    session_id: int,
    user_message: str,
    tools_mode: str,
    user_file: Optional[UploadFile] = None
):
    """Crea un chat sin usuario (anónimo) y llama a Groq para la respuesta."""
    chat_repo = ChatRepository(db)
    session_repo = SessionRepository(db)

    # 1️⃣ Obtener la sesión
    session = session_repo.get_session_by_id(session_id)
    if not session:
        raise ValueError("Session not found")

    # 2️⃣ Procesar archivo opcional
    user_files_str = None
    if user_file:
        user_files_str = "upload_img"
        # aquí mandarías a procesar a hardvision si aplica

    # 3️⃣ Guardar el mensaje del usuario
    new_chat = chat_repo.create_chat(
        session_id=session_id,
        user_message=user_message,
        tools_mode=tools_mode,
        user_files=user_files_str,
    )

    # 4️⃣ Actualizar el nombre de la sesión
    session.session_name = _generate_session_title(user_message)
    session_repo.update(session)

    # 5️⃣ Construir prompt para la IA
    messages = [
        {"role": "system", "content": "Eres un asistente experto en LatencyZero."},
        {"role": "user", "content": user_message}
    ]

    # 6️⃣ Llamar a Groq y obtener la respuesta
    ai_response = ask_groq(messages)

    # 7️⃣ Guardar la respuesta de la IA en el chat
    chat_repo.update_chat_ai_response(new_chat.id, ai_response)

    # 8️⃣ Agregar la respuesta al objeto para devolver
    new_chat.chatbot_message = ai_response

    return new_chat


def create_chat_for_user_service(
    db: Session,
    user: User,
    session_id: int,
    user_message: str,
    tools_mode: str,
    user_file: Optional[UploadFile] = None
):
    """Crea un chat asociado a un usuario, validando propiedad de la sesión."""
    chat_repo = ChatRepository(db)
    session_repo = SessionRepository(db)

    session = session_repo.get_session_by_id_and_user(session_id, user.id)
    if not session:
        raise ValueError("Session not found for user")

    user_files_str = None
    if user_file:
        user_files_str = "upload_img"
        # aqui mandare a procesar a hardvision

    new_chat = chat_repo.create_chat_for_user(
        user=user,
        session_id=session_id,
        user_message=user_message,
        tools_mode=tools_mode,
        user_files=user_files_str,
    )

    session.session_name = _generate_session_title(user_message)
    session_repo.update(session)

    return new_chat


def get_chats_service(
    db: Session,
    session_id: int
):
    """Devuelve todos los chats de una sesión (anónimo)."""
    chat_repo = ChatRepository(db)
    return chat_repo.get_chats_for_session(session_id)


def get_chats_by_user_service(
    db: Session,
    user_id: int,
    session_id: int
):
    """Devuelve los chats de una sesión validando que el usuario tenga acceso."""
    session_repo = SessionRepository(db)
    chat_repo = ChatRepository(db)

    session = session_repo.get_session_by_id_and_user(session_id, user_id)
    if not session:
        raise ValueError("User does not have access to this session's chats")

    return chat_repo.get_chats_for_session(session_id)
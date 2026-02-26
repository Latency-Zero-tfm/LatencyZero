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


def _create_chat_common(
    db: Session,
    user_message: str,
    tools_mode: str,
    session_id: int,
    user: Optional[User] = None,
    user_file: Optional[UploadFile] = None,
):
    chat_repo = ChatRepository(db)
    session_repo = SessionRepository(db)

    # Obtener la sesión
    session = session_repo.get_session_by_id_and_user(session_id, user.id) if user else session_repo.get_session_by_id(session_id)
    if not session:
        raise ValueError("Session not found")

    # Procesar archivo opcional
    user_files_str = "upload_img" if user_file else None

    # Crear el chat
    new_chat = chat_repo.create_chat_for_user(
        user=user,
        session_id=session_id,
        user_message=user_message,
        tools_mode=tools_mode,
        user_files=user_files_str,
    ) if user else chat_repo.create_chat(
        session_id=session_id,
        user_message=user_message,
        tools_mode=tools_mode,
        user_files=user_files_str,
    )

    # Actualizar nombre de la sesión
    session.session_name = _generate_session_title(user_message)
    session_repo.update(session)

    # Preparar prompt para IA
    messages = [
        {"role": "system", "content": "Eres un asistente experto en LatencyZero."},
        {"role": "user", "content": user_message}
    ]

    # Llamar a Groq
    ai_response = ask_groq(messages)

    # Guardar la respuesta del bot
    chat_repo.update_chat_ai_response(new_chat.id, ai_response)

    # Agregar la respuesta al objeto para devolver
    new_chat.bot_message = ai_response

    return new_chat

def create_chat_service(
    db: Session,
    session_id: int,
    user_message: str,
    tools_mode: str,
    user_file: Optional[UploadFile] = None
) -> "Chat":
    """Crea un chat anónimo y llama a la IA."""
    return _create_chat_common(
        db=db,
        user_message=user_message,
        tools_mode=tools_mode,
        session_id=session_id,
        user_file=user_file
    )


def create_chat_for_user_service(
    db: Session,
    user: User,
    session_id: int,
    user_message: str,
    tools_mode: str,
    user_file: Optional[UploadFile] = None
) -> "Chat":
    """Crea un chat para un usuario autenticado y llama a la IA."""
    return _create_chat_common(
        db=db,
        user=user,
        session_id=session_id,
        user_message=user_message,
        tools_mode=tools_mode,
        user_file=user_file
    )


def get_chats_service(db: Session, session_id: int):
    """Devuelve todos los chats de una sesión (anónimo)."""
    chat_repo = ChatRepository(db)
    return chat_repo.get_chats_for_session(session_id)


def get_chats_by_user_service(db: Session, user_id: int, session_id: int):
    """Devuelve los chats de una sesión validando que el usuario tenga acceso."""
    session_repo = SessionRepository(db)
    chat_repo = ChatRepository(db)

    session = session_repo.get_session_by_id_and_user(session_id, user_id)
    if not session:
        raise ValueError("User does not have access to this session's chats")

    return chat_repo.get_chats_for_session(session_id)

from ..schemas.session import SessionDto


def map_session_to_dto(session):
  return SessionDto(
    id=session.id,
    session_name=session.session_name,
    create_at=session.create_at,
    update_at=session.update_at
  )


def map_session_to_dtos(sessions):
  return [map_session_to_dto(session) for session in sessions]
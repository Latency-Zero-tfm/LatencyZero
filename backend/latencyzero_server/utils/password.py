import re
from ..core.exceptions import WeakPasswordException

def validate_password_strength(password: str) -> None:
  if len(password) < 8:
    raise WeakPasswordException("La contraseña debe tener al menos 8 caracteres.")
  if not re.search(r"[A-Z]", password):
    raise WeakPasswordException("La contraseña debe contener al menos una mayúscula.")
  if not re.search(r"[a-z]", password):
    raise WeakPasswordException("La contraseña debe contener al menos una minúscula.")
  if not re.search(r"[0-9]", password):
    raise WeakPasswordException("La contraseña debe contener al menos un número.")
  if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
    raise WeakPasswordException("La contraseña debe contener al menos un carácter especial.")

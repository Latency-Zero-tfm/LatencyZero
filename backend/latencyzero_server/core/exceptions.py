"""Custom exceptions for LatencyZero backend."""

class LatencyZeroException(Exception):
  """Base exception for LatencyZero."""
  def __init__(self, message: str, status_code: int = 400):
    self.message = message
    self.status_code = status_code
    super().__init__(self.message)

class UserAlreadyExistsException(LatencyZeroException):
  """Raised when trying to register a user that already exists."""
  def __init__(self, field: str = "user"):
    super().__init__(
      message=f"This {field} is already registered",
      status_code=400
    )

class InvalidCredentialsException(LatencyZeroException):
  """Raised when login credentials are invalid."""
  def __init__(self):
    super().__init__(
      message="Invalid username or password",
      status_code=401
    )

class UserNotFoundException(LatencyZeroException):
  """Raised when user is not found."""
  def __init__(self):
    super().__init__(
      message="User not found",
      status_code=404
    )

class InvalidPasswordException(LatencyZeroException):
  """Raised when password doesn't meet requirements."""
  def __init__(self, reason: str = "Password does not meet requirements"):
    super().__init__(
      message=reason,
      status_code=400
    )

class TokenException(LatencyZeroException):
  """Raised when token is invalid or expired."""
  def __init__(self, message: str = "Invalid or expired token"):
    super().__init__(
      message=message,
      status_code=401
    )

class WeakPasswordException(LatencyZeroException):
  """Raised when password is too weak."""
  def __init__(self, reason: str = "La contraseña no cumple los requisitos de seguridad"):
    super().__init__(
      message=reason,
      status_code=400
    )


class InvalidConfirmEmailException(LatencyZeroException):
    def __init__(self, message="Email no confirmado"):
        self.message = message
        super().__init__(self.message)

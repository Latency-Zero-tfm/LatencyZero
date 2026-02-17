"""Exception handlers for custom LatencyZero exceptions."""
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from .exceptions import LatencyZeroException


def setup_exception_handlers(app: FastAPI):
  """Register exception handlers to the FastAPI app."""
  
  @app.exception_handler(LatencyZeroException)
  async def latency_zero_exception_handler(request, exc: LatencyZeroException):
    return JSONResponse(
      status_code=exc.status_code,
      content={
        "detail": exc.message,
        "error_code": exc.__class__.__name__
      }
    )

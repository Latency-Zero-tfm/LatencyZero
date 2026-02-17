import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export function authTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {

  const jwtService = inject(JwtService);

  const token = jwtService.getToken();
  const isPublic = req.url.includes('/api/auth');

  if (isPublic) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }

  return next(req);
}

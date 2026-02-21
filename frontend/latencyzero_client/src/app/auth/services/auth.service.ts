import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT } from '../../config';
import { JwtService } from '../../core/services/jwt.service';
import { RegisterDTO } from '../interfaces/register-dto.interface';
import { Router } from '@angular/router';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');

  private http = inject(HttpClient);
  private jwt = inject(JwtService);
  private router = inject(Router);

  authStatus = computed<AuthStatus>(() => this._authStatus());

  constructor() {
    this.jwt.init();
    this._authStatus.set(this.jwt.isAuthenticated() ? 'authenticated' : 'not-authenticated');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(LOGIN_ENDPOINT, { username, password }, { responseType: 'text', withCredentials: true }).pipe(
      map((token: string) => {
        this.jwt.setToken(token);
        this._authStatus.set('authenticated');
        return true;
      }),
      catchError((error) => {
        this._authStatus.set('not-authenticated');
        return of(false)
      })
    );
  }

  register(registerDTO: RegisterDTO): Observable<boolean> {
    return this.http.post<{ created: boolean }>(REGISTER_ENDPOINT, registerDTO).pipe(
      map((response) => {
        if (response.created) {
          return true;
        }
        return false;
      }),
      catchError((error) => {
        return of(false);
      })
    );
  }

  logout() {
    const token = this.jwt.getToken();
    this.jwt.clear();
    this._authStatus.set('not-authenticated');
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
    if (token) {
      this.http.post(LOGOUT_ENDPOINT, {}, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe();
    }
  }


}

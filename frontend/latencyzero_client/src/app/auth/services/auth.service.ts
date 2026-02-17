import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { LOGIN_ENDPOINT } from '../../config';
import { JwtService } from '../../core/services/jwt.service';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');

  private http = inject(HttpClient);
  private jwt = inject(JwtService);

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

}

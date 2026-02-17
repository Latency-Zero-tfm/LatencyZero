import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class JwtService {

  private readonly TOKEN_KEY = 'token';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  private name: string | null = null;
  private id: number | null = null;

  constructor() {
    this.init();
  }

  init() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token && this.validateToken(token)) {
      this.tokenSubject.next(token);
      this.decodeToken(token);
    } else {
      this.clear();
    }
  }

  private validateToken(token: string): boolean {
    try {
      const decoded: any = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp > now : false;
    } catch {
      return false;
    }
  }

  private decodeToken(token: string) {
    try {
      const decoded: any = jwtDecode<JwtPayload>(token);
      this.name = decoded.name || null;
      this.id = decoded.id || null;
    } catch (e) {
      this.clear();
    }
  }

public setToken(token: string): void {
    let decoded: any;
    try {
      decoded = jwtDecode<JwtPayload>(token);
      this.name = decoded.name || null;
      this.id = decoded.id || null;
    } catch {
      this.clear();
      return;
    }
  }

  public clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
    this.id = null;
  }

  public getToken(): string | null {
    return this.tokenSubject.value;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? this.validateToken(token) : false;
  }

  public getName(): string | null { return this.name; }
  public getId(): number | null { return this.id; }


}

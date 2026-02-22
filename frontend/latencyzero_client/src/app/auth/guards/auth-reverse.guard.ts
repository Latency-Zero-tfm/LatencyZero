import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthReverseGuard implements CanActivate {

    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): boolean {
        const isAuthenticated = this.authService.authStatus() === 'authenticated';

        if (isAuthenticated) {
            this.router.navigate(['/']);
            return false;
        }
        return true;

    }
}

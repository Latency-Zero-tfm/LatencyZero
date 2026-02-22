import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'navbar-mobile-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-mobile-menu.html',
  styleUrl: './navbar-mobile-menu.css',
})
export class NavbarMobileMenuComponent {

  private authService = inject(AuthService);
  private jwtService = inject(JwtService);
  username = this.jwtService.getName() ?? 'Usuario';

  isOpen = signal(false);
  isLoggedIn = computed(() => this.authService.authStatus() === 'authenticated');

  get userInitial(): string {
    return this.jwtService.getName()?.charAt(0).toUpperCase() ?? 'U';
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  logout() {
    this.close();
    this.authService.logout();
  }
}

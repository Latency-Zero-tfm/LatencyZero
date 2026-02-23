import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtService } from '../../../core/services/jwt.service';
import { NavbarMobileMenuComponent } from '../navbar-mobile-menu/navbar-mobile-menu';

@Component({
  selector: 'navbar-component',
  imports: [RouterLink, RouterLinkActive, NavbarMobileMenuComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private jwtService = inject(JwtService);

  isLoggedIn = computed(() => this.authService.authStatus() === 'authenticated');

  get userInitial(): string {
    const username = this.authService.username();
    return username ? username.charAt(0).toUpperCase() : 'U';
  }

  logout() {
    this.authService.logout();
  }

}

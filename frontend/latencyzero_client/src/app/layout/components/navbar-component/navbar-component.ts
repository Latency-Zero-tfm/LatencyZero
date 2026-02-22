import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtService } from '../../../core/services/jwt.service';

@Component({
  selector: 'navbar-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private jwtService = inject(JwtService);

  isLoggedIn = computed(() => this.authService.authStatus() === 'authenticated');

  get userInitial(): string {
    return this.jwtService.getName() ? this.jwtService.getName()!.charAt(0).toUpperCase() : 'U';
  }

  logout() {
    this.authService.logout();
  }

}

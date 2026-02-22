import { Component, inject } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'profile-menu',
  imports: [],
  templateUrl: './profile-menu.html',
  styleUrl: './profile-menu.css',
})
export class ProfileMenu {

  private authService = inject(AuthService);
  jwtService = inject(JwtService);
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }

}

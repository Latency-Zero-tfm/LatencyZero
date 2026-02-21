import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { FooterComponent } from "../components/footer-component/footer-component";
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterLink, FooterComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {

  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

}

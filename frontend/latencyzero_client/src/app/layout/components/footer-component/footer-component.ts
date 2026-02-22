import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialMedia } from "../../../shared/components/social-media/social-media";

@Component({
  selector: 'footer-component',
  imports: [SocialMedia, RouterLink],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

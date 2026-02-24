import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialMedia } from "../../../shared/components/social-media/social-media";
import { OpinionUsers } from "../../../features/analisys-sentiment/components/opinion-users/opinion-users";

@Component({
  selector: 'footer-component',
  imports: [SocialMedia, RouterLink, OpinionUsers],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}

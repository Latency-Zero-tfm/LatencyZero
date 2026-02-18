import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { FooterComponent } from "../components/footer-component/footer-component";

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterLink, FooterComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {

}

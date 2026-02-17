import { Component } from '@angular/core';
import { HomePage } from "../home-page/home-page";
import { RouterOutlet, RouterLink } from "@angular/router";

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {

}

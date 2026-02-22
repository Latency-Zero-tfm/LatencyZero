import { Component} from '@angular/core';
import { FooterComponent } from "../components/footer-component/footer-component";
import { NavbarComponent } from "../components/navbar-component/navbar-component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout-component',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {

}

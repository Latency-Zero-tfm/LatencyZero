import { Component } from '@angular/core';
import { HardVisionPage } from '../../pages/hard-vision-page/hard-vision-page.component';
import { NavbarComponent } from '../../../../layout/components/navbar-component/navbar-component';

@Component({
  selector: 'app-hardvision-layout.component',
  imports: [HardVisionPage, NavbarComponent],
  templateUrl: './hardvision-layout.component.html',
  styleUrl: './hardvision-layout.component.css',
})
export class HardvisionLayoutComponent {

}

import { Component } from '@angular/core';
import { HardVisionPage } from '../../pages/hard-vision-page/hard-vision-page.component';
import { AuthLayout } from "../../../../auth/layout/auth-layout/auth-layout";
import { FooterComponent } from "../../../../layout/components/footer-component/footer-component";

@Component({
  selector: 'app-hardvision-layout.component',
  imports: [HardVisionPage, AuthLayout, FooterComponent],
  templateUrl: './hardvision-layout.component.html',
  styleUrl: './hardvision-layout.component.css',
})
export class HardvisionLayoutComponent {

}

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: []
  }
];

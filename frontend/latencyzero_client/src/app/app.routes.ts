import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { HardVisionPage } from './features/hardvision/pages/hard-vision-page/hard-vision-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent
  },
  {
    path: 'hardvisionai',
    component: HardVisionPage
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  }
];

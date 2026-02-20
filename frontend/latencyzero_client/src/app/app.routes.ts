import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { HardVisionPage } from './features/hardvision/pages/hard-vision-page/hard-vision-page.component';
import { HardvisionLayoutComponent } from './features/hardvision/layout/hardvision-layout.component/hardvision-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent
  },
  {
    path: 'hardvisionai',
    component: HardvisionLayoutComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  }
];

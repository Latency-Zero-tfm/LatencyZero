import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { HardVisionPage } from './features/hardvision/pages/hard-vision-page/hard-vision-page';
import { HomePage } from './layout/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'hardvisionai',
        component: HardVisionPage
      },

    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  }
];

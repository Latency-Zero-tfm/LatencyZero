import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { HardVisionPage } from './features/hardvision/pages/hard-vision-page/hard-vision-page.component';
import { HomePage } from './features/home/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePage,
        title: 'Inicio'
      },
      {
        path: 'hardvisionai',
        component: HardVisionPage,
        title: 'HardVision AI'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { HardVisionPage } from './features/hardvision/pages/hard-vision-page/hard-vision-page.component';
import { HomePage } from './features/home/pages/home-page/home-page';
import { DocsPage } from './features/docs/pages/docs-page.component/docs-page.component';
import { AgentPage } from './features/agent/pages/agent-page/agent-page';

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
      },
      {
        path: 'agente',
        component: AgentPage,
        title: 'Agente'
      },
      {
        path: 'docs',
        component: DocsPage,
        title: 'Docs'
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

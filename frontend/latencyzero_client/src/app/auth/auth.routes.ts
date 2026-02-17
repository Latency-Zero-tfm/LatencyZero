import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layout/main-layout-component/main-layout-component";

export const authRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'login',
        component: MainLayoutComponent,
      },
      {
        path: 'register',
        component: MainLayoutComponent,
      },
      {
        path: 'confirm-email/:token',
        component: MainLayoutComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;

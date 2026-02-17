import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layout/main-layout-component/main-layout-component";
import { AuthLayout } from "./layout/auth-layout/auth-layout";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
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

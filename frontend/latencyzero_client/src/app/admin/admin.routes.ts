import { Routes } from "@angular/router";
import { AdminLayout } from "./layout/admin-layout/admin-layout";
import { AnalysisSentimentPage } from "./pages/analysis-sentiment-page/analysis-sentiment-page";

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'analysis-sentiment',
        component: AnalysisSentimentPage,
      },
    ],
  },
];

export default adminRoutes;

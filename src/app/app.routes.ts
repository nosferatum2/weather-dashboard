import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'weather-dashboard',
    loadComponent: () =>
      import('./pages/weather-dashboard/weather-dashboard.component').then(
        (m) => m.WeatherDashboardComponent
      ),
  }
];

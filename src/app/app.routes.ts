import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'nasa',
    loadComponent: () => import('./pages/nasa/nasa.component')
  },
  {
    path: 'nasa/asteroides',
    loadComponent: () => import('./pages/nasa-asteroids/nasa-asteroids.component')
  },
  {
    path: 'starwars',
    loadComponent: () => import('./pages/starwars/starwars.component')
  },
  {
    path: 'starwars/:id',
    loadComponent: () => import('./pages/starwars-detail/starwars-detail.component')
  }
];

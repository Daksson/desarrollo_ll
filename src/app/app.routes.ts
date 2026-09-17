import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NasaComponent } from './pages/nasa/nasa.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'nasa', component: NasaComponent },
  {
    path: 'starwars',
    loadComponent: () => import('./pages/starwars/starwars.component')
  },
  {
    path: 'starwars/:id',
    loadComponent: () => import('./pages/starwars-detail/starwars-detail.component')
  }
];

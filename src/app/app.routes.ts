import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { NasaComponent } from './pages/nasa/nasa.component';
import { StarwarsComponent } from './pages/starwars/starwars.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'nasa', component: NasaComponent },
  { path: 'starwars', component: StarwarsComponent }
];

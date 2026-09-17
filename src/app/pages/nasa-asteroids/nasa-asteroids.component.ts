import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NasaService } from '../../services/service_nasa/nasa.service';
import { Asteroid } from '../../interfaces/nasa.interface';
import { NasaMenuComponent } from '../../components/nasa/nasa-menu/nasa-menu.component';
import { AsteroidListComponent } from '../../components/nasa/asteroid-list/asteroid-list.component';
import { getTodayDate } from '../../utils/date.util';

@Component({
  selector: 'app-nasa-asteroids',
  standalone: true,
  imports: [NasaMenuComponent, AsteroidListComponent, DecimalPipe],
  templateUrl: './nasa-asteroids.component.html',
  styleUrl: './nasa-asteroids.component.css'
})
export default class NasaAsteroidsComponent {
  private nasaService = inject(NasaService);

  asteroids = signal<Asteroid[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  date = signal(getTodayDate());

  // Se recalculan solos cada vez que cambia la lista
  hazardousCount = computed(() => this.asteroids().filter((asteroid) => asteroid.hazardous).length);
  closest = computed<Asteroid | undefined>(() => this.asteroids()[0]);

  constructor() {
    this.loadAsteroids();
  }

  loadAsteroids() {
    this.loading.set(true);
    this.error.set(null);

    this.nasaService.getAsteroids(this.date()).subscribe({
      next: (asteroids) => {
        this.asteroids.set(asteroids);
        this.loading.set(false);
      },
      error: () => {
        this.asteroids.set([]);
        this.error.set('No se pudieron cargar los asteroides.');
        this.loading.set(false);
      }
    });
  }

  onDateChange(date: string) {
    if (date) {
      this.date.set(date);
      this.loadAsteroids();
    }
  }
}

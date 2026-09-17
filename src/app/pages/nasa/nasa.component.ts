import { Component, inject, signal } from '@angular/core';
import { NasaService } from '../../services/service_nasa/nasa.service';
import { Apod } from '../../interfaces/nasa.interface';
import { NasaMenuComponent } from '../../components/nasa/nasa-menu/nasa-menu.component';
import { getTodayDate } from '../../utils/date.util';

@Component({
  selector: 'app-nasa',
  standalone: true,
  imports: [NasaMenuComponent],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export default class NasaComponent {
  private nasaService = inject(NasaService);

  apod = signal<Apod | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  today = getTodayDate();

  constructor() {
    // Sin fecha: la NASA devuelve la última foto publicada
    this.loadApod();
  }

  loadApod(date?: string) {
    this.loading.set(true);
    this.error.set(null);

    this.nasaService.getApod(date).subscribe({
      next: (apod) => {
        this.apod.set(apod);
        this.loading.set(false);
      },
      error: () => {
        this.apod.set(null);
        this.error.set('No hay foto para esa fecha o la NASA no respondió.');
        this.loading.set(false);
      }
    });
  }

  onDateChange(date: string) {
    if (date) {
      this.loadApod(date);
    }
  }
}

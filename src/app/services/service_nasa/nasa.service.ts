import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const NASA_API_KEY = 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

export interface ApodResponse {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  date: string;
  copyright?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private readonly http= inject(HttpClient);

  readonly apod=signal<ApodResponse | null>(null);
  readonly loading=signal<boolean>(false);
  readonly error=signal<string | null>(null);

  constructor() { }
}

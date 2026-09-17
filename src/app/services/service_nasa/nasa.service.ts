import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NasaApodResponse, NasaNeoFeedResponse } from '../../interfaces/nasa-api.interface';
import { Apod, Asteroid } from '../../interfaces/nasa.interface';
import { NasaMapper } from '../../mappers/nasa.mapper';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private http = inject(HttpClient);

  // Sin fecha, la NASA responde con la última foto publicada
  getApod(date?: string): Observable<Apod> {
    const params: Record<string, string> = {
      api_key: environment.nasaApiKey
    };
    if (date) {
      params['date'] = date;
    }

    return this.http.get<NasaApodResponse>(`${environment.nasaUrl}/planetary/apod`, { params }).pipe(
      map((response) => NasaMapper.mapApodResponseToApod(response))
    );
  }

  getAsteroids(date: string): Observable<Asteroid[]> {
    return this.http.get<NasaNeoFeedResponse>(`${environment.nasaUrl}/neo/rest/v1/feed`, {
      params: {
        start_date: date,
        end_date: date,
        api_key: environment.nasaApiKey
      }
    }).pipe(
      map((response) => NasaMapper.mapFeedToAsteroids(response, date))
    );
  }
}

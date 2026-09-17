import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { NasaService } from './nasa.service';
import { Apod, Asteroid } from '../../interfaces/nasa.interface';

describe('NasaService', () => {
  let service: NasaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(NasaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ask for the APOD of a date', () => {
    let result: Apod | undefined;

    service.getApod('2026-09-15').subscribe((apod) => {
      result = apod;
    });

    const request = httpMock.expectOne((req) => req.url.includes('/planetary/apod'));
    expect(request.request.params.get('date')).toBe('2026-09-15');
    expect(request.request.params.has('api_key')).toBeTrue();

    request.flush({
      date: '2026-09-15',
      title: 'A Daytime Eclipse: Moon Occults Venus',
      explanation: 'There was something behind the clouds.',
      media_type: 'image',
      url: 'https://apod.nasa.gov/image.jpg'
    });

    expect(result?.title).toBe('A Daytime Eclipse: Moon Occults Venus');
    expect(result?.copyright).toBe('Dominio público');
  });

  it('should not send a date when none is given', () => {
    service.getApod().subscribe();

    const request = httpMock.expectOne((req) => req.url.includes('/planetary/apod'));
    expect(request.request.params.has('date')).toBeFalse();
    request.flush({ date: '2026-09-16', title: '', explanation: '', media_type: 'image' });
  });

  it('should ask for the asteroids of one day', () => {
    let result: Asteroid[] | undefined;

    service.getAsteroids('2026-09-15').subscribe((asteroids) => {
      result = asteroids;
    });

    const request = httpMock.expectOne((req) => req.url.includes('/neo/rest/v1/feed'));
    expect(request.request.params.get('start_date')).toBe('2026-09-15');
    expect(request.request.params.get('end_date')).toBe('2026-09-15');

    request.flush({ element_count: 0, near_earth_objects: { '2026-09-15': [] } });

    expect(result).toEqual([]);
  });
});

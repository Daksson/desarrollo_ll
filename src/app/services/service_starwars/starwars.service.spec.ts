import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { StarwarsService } from './starwars.service';
import { CharacterPage } from '../../interfaces/starwars.interface';

describe('StarwarsService', () => {
  let service: StarwarsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(StarwarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    if (!service) {
      throw new Error('Service was not created');
    }
  });

  it('should send page and search and return the mapped characters', () => {
    let result: CharacterPage | undefined;

    service.getCharacters(2, 'sky').subscribe((characterPage) => {
      result = characterPage;
    });

    const request = httpMock.expectOne((req) => req.url.includes('/people/'));
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('search')).toBe('sky');

    request.flush({
      count: 11,
      next: null,
      previous: 'https://swapi.dev/api/people/?search=sky&page=1',
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [],
          url: 'https://swapi.dev/api/people/1/'
        }
      ]
    });

    expect(result?.total).toBe(11);
    expect(result?.hasNext).toBeFalse();
    expect(result?.hasPrevious).toBeTrue();
    expect(result?.characters[0].id).toBe(1);
    expect(result?.characters[0].height).toBe(172);
  });
});

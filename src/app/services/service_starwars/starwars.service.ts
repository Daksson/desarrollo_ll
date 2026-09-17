import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const SWAPI_URL = 'https://swapi.dev/api';

export interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
}

export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {
  private readonly http = inject(HttpClient);

  readonly people = signal<Person[]>([]);
  readonly total = signal<number>(0);
  readonly hasNext = signal<boolean>(false);
  readonly hasPrevious = signal<boolean>(false);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly selectedPerson = signal<Person | null>(null);
  readonly planet = signal<Planet | null>(null);
  readonly films = signal<Film[]>([]);
  readonly loadingDetail = signal<boolean>(false);

  async loadPeople(page: number, search: string) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.get<PeopleResponse>(`${SWAPI_URL}/people/`, { params: { page, search } })
      );
      this.people.set(response.results);
      this.total.set(response.count);
      this.hasNext.set(response.next !== null);
      this.hasPrevious.set(response.previous !== null);
    } catch {
      this.people.set([]);
      this.error.set('No se pudieron cargar los personajes.');
    }

    this.loading.set(false);
  }

  async loadDetail(person: Person) {
    this.selectedPerson.set(person);
    this.planet.set(null);
    this.films.set([]);
    this.loadingDetail.set(true);
    this.error.set(null);

    try {
      const planet = await firstValueFrom(this.http.get<Planet>(person.homeworld));
      this.planet.set(planet);

      const films: Film[] = [];
      for (const url of person.films) {
        const film = await firstValueFrom(this.http.get<Film>(url));
        films.push(film);
      }
      this.films.set(films);
    } catch {
      this.error.set('No se pudo cargar el detalle del personaje.');
    }

    this.loadingDetail.set(false);
  }
}

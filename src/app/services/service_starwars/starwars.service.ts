import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SwapiFilm, SwapiPeopleResponse, SwapiPerson, SwapiPlanet } from '../../interfaces/swapi.interface';
import { Character, CharacterPage, Film, Planet } from '../../interfaces/starwars.interface';
import { StarwarsMapper } from '../../mappers/starwars.mapper';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {
  private http = inject(HttpClient);

  getCharacters(page: number, search: string): Observable<CharacterPage> {
    return this.http.get<SwapiPeopleResponse>(`${environment.swapiUrl}/people/`, {
      params: {
        page: page,
        search: search
      }
    }).pipe(
      map((response) => StarwarsMapper.mapPeopleResponseToCharacterPage(response))
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<SwapiPerson>(`${environment.swapiUrl}/people/${id}/`).pipe(
      map((person) => StarwarsMapper.mapPersonToCharacter(person))
    );
  }

  getPlanet(url: string): Observable<Planet> {
    return this.http.get<SwapiPlanet>(url).pipe(
      map((planet) => StarwarsMapper.mapSwapiPlanetToPlanet(planet))
    );
  }

  getFilm(url: string): Observable<Film> {
    return this.http.get<SwapiFilm>(url).pipe(
      map((film) => StarwarsMapper.mapSwapiFilmToFilm(film))
    );
  }
}

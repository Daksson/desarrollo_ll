import { SwapiFilm, SwapiPeopleResponse, SwapiPerson, SwapiPlanet } from '../interfaces/swapi.interface';
import { Character, CharacterPage, Film, Planet } from '../interfaces/starwars.interface';

export class StarwarsMapper {

  // "https://swapi.dev/api/people/1/" -> 1
  static getIdFromUrl(url: string): number {
    const parts = url.split('/').filter((part) => part !== '');
    return Number(parts[parts.length - 1]);
  }

  // "172" -> 172, "1,358" -> 1358, "unknown" -> null
  static toNumber(value: string): number | null {
    const number = Number(value.replace(',', ''));
    return isNaN(number) ? null : number;
  }

  static mapPersonToCharacter(person: SwapiPerson): Character {
    return {
      id: StarwarsMapper.getIdFromUrl(person.url),
      name: person.name,
      height: StarwarsMapper.toNumber(person.height),
      mass: StarwarsMapper.toNumber(person.mass),
      birthYear: person.birth_year,
      gender: person.gender,
      homeworldUrl: person.homeworld,
      filmUrls: person.films
    };
  }

  static mapPeopleResponseToCharacterPage(response: SwapiPeopleResponse): CharacterPage {
    return {
      total: response.count,
      hasNext: response.next !== null,
      hasPrevious: response.previous !== null,
      characters: response.results.map(StarwarsMapper.mapPersonToCharacter)
    };
  }

  static mapSwapiPlanetToPlanet(planet: SwapiPlanet): Planet {
    return {
      name: planet.name,
      climate: planet.climate,
      terrain: planet.terrain,
      population: planet.population
    };
  }

  static mapSwapiFilmToFilm(film: SwapiFilm): Film {
    return {
      id: StarwarsMapper.getIdFromUrl(film.url),
      title: film.title,
      episode: film.episode_id,
      director: film.director,
      releaseDate: film.release_date
    };
  }
}

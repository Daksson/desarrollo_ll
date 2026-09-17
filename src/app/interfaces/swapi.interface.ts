// Así llegan los datos desde swapi.dev

export interface SwapiPeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiPerson[];
}

export interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
}

export interface SwapiPlanet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface SwapiFilm {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  url: string;
}

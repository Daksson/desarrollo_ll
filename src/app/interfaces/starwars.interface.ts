// Así usamos los datos dentro de la aplicación

export interface Character {
  id: number;
  name: string;
  height: number | null;
  mass: number | null;
  birthYear: string;
  gender: string;
  homeworldUrl: string;
  filmUrls: string[];
}

export interface CharacterPage {
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
  characters: Character[];
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

export interface Film {
  id: number;
  title: string;
  episode: number;
  director: string;
  releaseDate: string;
}

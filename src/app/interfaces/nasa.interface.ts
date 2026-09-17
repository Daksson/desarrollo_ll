// Así usamos los datos dentro de la aplicación

export interface Apod {
  date: string;
  title: string;
  explanation: string;
  mediaType: 'image' | 'video' | 'other';
  url: string | null;
  hdUrl: string | null;
  copyright: string;
}

export interface Asteroid {
  id: string;
  name: string;
  hazardous: boolean;
  diameterMinMeters: number;
  diameterMaxMeters: number;
  speedKmH: number | null;
  distanceKm: number | null;
}

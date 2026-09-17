import { NasaApodResponse, NasaAsteroid, NasaCloseApproach, NasaNeoFeedResponse } from '../interfaces/nasa-api.interface';
import { Apod, Asteroid } from '../interfaces/nasa.interface';

export class NasaMapper {

  static mapApodResponseToApod(response: NasaApodResponse): Apod {
    return {
      date: response.date,
      title: response.title,
      explanation: response.explanation,
      mediaType: NasaMapper.toMediaType(response.media_type),
      url: response.url ?? null,
      hdUrl: response.hdurl ?? null,
      // a veces trae saltos de línea y espacios de más: "Rui Santos \n(Living Impressions)"
      copyright: response.copyright?.trim() ?? 'Dominio público'
    };
  }

  static toMediaType(value: string): 'image' | 'video' | 'other' {
    if (value === 'image' || value === 'video') {
      return value;
    }
    return 'other';
  }

  // "75622.5229106279" -> 75623, undefined -> null
  static toRoundedNumber(value: string | undefined): number | null {
    if (value === undefined) {
      return null;
    }
    const number = Number(value);
    return isNaN(number) ? null : Math.round(number);
  }

  static mapNasaAsteroidToAsteroid(asteroid: NasaAsteroid): Asteroid {
    // la lista de acercamientos puede venir vacía
    const approach: NasaCloseApproach | undefined = asteroid.close_approach_data[0];
    const { estimated_diameter_min, estimated_diameter_max } = asteroid.estimated_diameter.meters;

    return {
      id: asteroid.id,
      name: asteroid.name,
      hazardous: asteroid.is_potentially_hazardous_asteroid,
      diameterMinMeters: Math.round(estimated_diameter_min),
      diameterMaxMeters: Math.round(estimated_diameter_max),
      speedKmH: NasaMapper.toRoundedNumber(approach?.relative_velocity.kilometers_per_hour),
      distanceKm: NasaMapper.toRoundedNumber(approach?.miss_distance.kilometers)
    };
  }

  // Devuelve los asteroides de esa fecha, del más cercano al más lejano
  static mapFeedToAsteroids(response: NasaNeoFeedResponse, date: string): Asteroid[] {
    const list = response.near_earth_objects[date] ?? [];

    return list
      .map(NasaMapper.mapNasaAsteroidToAsteroid)
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }
}

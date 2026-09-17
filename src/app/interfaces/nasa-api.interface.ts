// Así llegan los datos desde api.nasa.gov

export interface NasaApodResponse {
  date: string;
  title: string;
  explanation: string;
  media_type: string;    // "image", "video" u "other"
  url?: string;          // no siempre viene
  hdurl?: string;        // solo en imágenes
  copyright?: string;    // no viene si la foto es de dominio público
}

export interface NasaNeoFeedResponse {
  element_count: number;
  // la clave es la fecha: { "2026-09-15": [ ...asteroides ] }
  near_earth_objects: Record<string, NasaAsteroid[]>;
}

export interface NasaAsteroid {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: NasaCloseApproach[];
}

export interface NasaCloseApproach {
  close_approach_date: string;
  relative_velocity: {
    kilometers_per_hour: string;   // "75622.5229106279"
  };
  miss_distance: {
    kilometers: string;            // "20160851.134761355"
  };
}

import { NasaMapper } from './nasa.mapper';
import { NasaAsteroid } from '../interfaces/nasa-api.interface';

const asteroid = (id: string, kilometers: string | null): NasaAsteroid => ({
  id: id,
  name: `(${id})`,
  is_potentially_hazardous_asteroid: false,
  estimated_diameter: {
    meters: { estimated_diameter_min: 59.4, estimated_diameter_max: 132.8 }
  },
  close_approach_data: kilometers === null ? [] : [{
    close_approach_date: '2026-09-15',
    relative_velocity: { kilometers_per_hour: '75622.52' },
    miss_distance: { kilometers: kilometers }
  }]
});

describe('NasaMapper', () => {

  it('should map an APOD image', () => {
    const apod = NasaMapper.mapApodResponseToApod({
      date: '2026-09-15',
      title: 'A Daytime Eclipse: Moon Occults Venus',
      explanation: 'There was something behind the clouds.',
      media_type: 'image',
      url: 'https://apod.nasa.gov/image.jpg',
      hdurl: 'https://apod.nasa.gov/image-hd.jpg',
      copyright: '\nArnaud Mariat\n'
    });

    expect(apod.mediaType).toBe('image');
    expect(apod.hdUrl).toBe('https://apod.nasa.gov/image-hd.jpg');
    expect(apod.copyright).toBe('Arnaud Mariat');
  });

  it('should fill the missing optional fields', () => {
    const apod = NasaMapper.mapApodResponseToApod({
      date: '2026-09-10',
      title: 'Video',
      explanation: '',
      media_type: 'other'
    });

    expect(apod.mediaType).toBe('other');
    expect(apod.url).toBeNull();
    expect(apod.hdUrl).toBeNull();
    expect(apod.copyright).toBe('Dominio público');
  });

  it('should convert text to rounded numbers', () => {
    expect(NasaMapper.toRoundedNumber('75622.5229106279')).toBe(75623);
    expect(NasaMapper.toRoundedNumber('abc')).toBeNull();
    expect(NasaMapper.toRoundedNumber(undefined)).toBeNull();
  });

  it('should map the asteroids of a date sorted by distance', () => {
    const asteroids = NasaMapper.mapFeedToAsteroids({
      element_count: 3,
      near_earth_objects: {
        '2026-09-15': [asteroid('far', '9000000'), asteroid('none', null), asteroid('near', '100.4')]
      }
    }, '2026-09-15');

    expect(asteroids.map((item) => item.id)).toEqual(['near', 'far', 'none']);
    expect(asteroids[0].distanceKm).toBe(100);
    expect(asteroids[0].diameterMinMeters).toBe(59);
    expect(asteroids[2].speedKmH).toBeNull();
  });

  it('should return an empty list when the date is missing', () => {
    expect(NasaMapper.mapFeedToAsteroids({ element_count: 0, near_earth_objects: {} }, '2026-09-15')).toEqual([]);
  });
});

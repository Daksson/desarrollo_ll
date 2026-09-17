import { StarwarsMapper } from './starwars.mapper';
import { SwapiPerson } from '../interfaces/swapi.interface';

describe('StarwarsMapper', () => {

  it('should get the id from the url', () => {
    expect(StarwarsMapper.getIdFromUrl('https://swapi.dev/api/people/1/')).toBe(1);
    expect(StarwarsMapper.getIdFromUrl('https://swapi.dev/api/films/6/')).toBe(6);
  });

  it('should convert text to number', () => {
    expect(StarwarsMapper.toNumber('172')).toBe(172);
    expect(StarwarsMapper.toNumber('1,358')).toBe(1358);
    expect(StarwarsMapper.toNumber('unknown')).toBeNull();
  });

  it('should map a SWAPI person to a character', () => {
    const person: SwapiPerson = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: ['https://swapi.dev/api/films/1/'],
      url: 'https://swapi.dev/api/people/1/'
    };

    expect(StarwarsMapper.mapPersonToCharacter(person)).toEqual({
      id: 1,
      name: 'Luke Skywalker',
      height: 172,
      mass: 77,
      birthYear: '19BBY',
      gender: 'male',
      homeworldUrl: 'https://swapi.dev/api/planets/1/',
      filmUrls: ['https://swapi.dev/api/films/1/']
    });
  });
});

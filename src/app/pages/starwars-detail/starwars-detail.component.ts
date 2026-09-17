import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarwarsService } from '../../services/service_starwars/starwars.service';
import { Character, Film, Planet } from '../../interfaces/starwars.interface';

@Component({
  selector: 'app-starwars-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './starwars-detail.component.html',
  styleUrl: './starwars-detail.component.css'
})
export default class StarwarsDetailComponent {
  private starwarsService = inject(StarwarsService);
  private route = inject(ActivatedRoute);

  character = signal<Character | null>(null);
  planet = signal<Planet | null>(null);
  films = signal<Film[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    // /starwars/1 -> params['id'] = '1'
    this.route.params.subscribe((params) => {
      this.loadCharacter(Number(params['id']));
    });
  }

  loadCharacter(id: number) {
    this.loading.set(true);
    this.error.set(null);
    this.character.set(null);
    this.planet.set(null);
    this.films.set([]);

    this.starwarsService.getCharacter(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loading.set(false);
        this.loadPlanet(character.homeworldUrl);
        this.loadFilms(character.filmUrls);
      },
      error: () => {
        this.error.set('No se encontró el personaje.');
        this.loading.set(false);
      }
    });
  }

  loadPlanet(url: string) {
    this.starwarsService.getPlanet(url).subscribe((planet) => {
      this.planet.set(planet);
    });
  }

  loadFilms(urls: string[]) {
    for (const url of urls) {
      this.starwarsService.getFilm(url).subscribe((film) => {
        // Las películas llegan en cualquier orden, se ordenan por episodio
        this.films.update((list) => [...list, film].sort((a, b) => a.episode - b.episode));
      });
    }
  }
}

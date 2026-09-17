import { Component, inject, signal } from '@angular/core';
import { StarwarsService } from '../../services/service_starwars/starwars.service';
import { Character } from '../../interfaces/starwars.interface';
import { CharacterListComponent } from '../../components/starwars/character-list/character-list.component';

@Component({
  selector: 'app-starwars',
  standalone: true,
  imports: [CharacterListComponent],
  templateUrl: './starwars.component.html',
  styleUrl: './starwars.component.css'
})
export default class StarwarsComponent {
  private starwarsService = inject(StarwarsService);

  characters = signal<Character[]>([]);
  total = signal(0);
  hasNext = signal(false);
  hasPrevious = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  page = signal(1);
  searchText = signal('');

  constructor() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.error.set(null);

    this.starwarsService.getCharacters(this.page(), this.searchText()).subscribe({
      next: (characterPage) => {
        this.characters.set(characterPage.characters);
        this.total.set(characterPage.total);
        this.hasNext.set(characterPage.hasNext);
        this.hasPrevious.set(characterPage.hasPrevious);
        this.loading.set(false);
      },
      error: () => {
        this.characters.set([]);
        this.error.set('No se pudieron cargar los personajes.');
        this.loading.set(false);
      }
    });
  }

  onSearch(text: string) {
    this.searchText.set(text.trim());
    this.page.set(1);
    this.loadCharacters();
  }

  nextPage() {
    this.page.update((current) => current + 1);
    this.loadCharacters();
  }

  previousPage() {
    this.page.update((current) => current - 1);
    this.loadCharacters();
  }
}

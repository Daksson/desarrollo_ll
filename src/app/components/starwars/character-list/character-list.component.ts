import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Character } from '../../../interfaces/starwars.interface';

@Component({
  selector: 'starwars-character-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters = input.required<Character[]>();
}

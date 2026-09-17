import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Asteroid } from '../../../interfaces/nasa.interface';

@Component({
  selector: 'nasa-asteroid-list',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './asteroid-list.component.html',
  styleUrl: './asteroid-list.component.css'
})
export class AsteroidListComponent {
  asteroids = input.required<Asteroid[]>();
}

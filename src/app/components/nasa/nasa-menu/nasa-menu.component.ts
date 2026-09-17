import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nasa-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nasa-menu.component.html',
  styleUrl: './nasa-menu.component.css'
})
export class NasaMenuComponent {

}

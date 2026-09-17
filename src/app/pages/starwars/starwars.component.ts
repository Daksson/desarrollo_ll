import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StarwarsService, Person } from '../../services/service_starwars/starwars.service';

@Component({
  selector: 'app-starwars',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './starwars.component.html',
  styleUrl: './starwars.component.css'
})
export class StarwarsComponent implements OnInit {
  readonly starwars = inject(StarwarsService);

  searchText = '';
  page = 1;

  ngOnInit() {
    this.starwars.loadPeople(this.page, this.searchText);
  }

  search() {
    this.page = 1;
    this.starwars.loadPeople(this.page, this.searchText);
  }

  nextPage() {
    this.page++;
    this.starwars.loadPeople(this.page, this.searchText);
  }

  previousPage() {
    this.page--;
    this.starwars.loadPeople(this.page, this.searchText);
  }

  showDetail(person: Person) {
    this.starwars.loadDetail(person);
  }

  closeDetail() {
    this.starwars.selectedPerson.set(null);
  }
}

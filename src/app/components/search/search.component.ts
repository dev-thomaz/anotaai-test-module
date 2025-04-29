import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';
  
  @Output() search = new EventEmitter<string>();

  onSearchInputChange(): void {
    this.search.emit(this.searchTerm);
  }
}
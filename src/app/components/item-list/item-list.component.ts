import { Component, OnInit, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Item } from '../../models/item.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadItems, deleteItem } from '../../store/actions/item.actions';
import { selectItems, selectLoading, selectError } from '../../store/selectors/item.selectors';
import { AppState } from '../../store/state';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit, OnChanges {
  private store = inject(Store<AppState>);
  items$: Observable<Item[]> = this.store.select(selectItems);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  @Input() searchTerm: string = '';
  filteredItems$!: Observable<Item[]>;
  filteredItems: Item[] = [];
  ngOnInit(): void {
    this.store.dispatch(loadItems());
    this.handleSearch()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.handleSearch()
    }
  }

  deleteCard(id: number): void {
    this.store.dispatch(deleteItem({ id }));
  }



  handleSearch(searchTerm: string = ''): void {
    this.filteredItems$ = this.items$.pipe(
      startWith([]),
      map(items =>
        items.filter(item =>
          item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
          item.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )
      )
    );
  }
}
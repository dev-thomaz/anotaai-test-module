import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../../services/item.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { ItemCardComponent } from '../item-card/item-card.component';
import { provideStore, Store } from '@ngrx/store';
import { itemReducer, getItemFeatureKey } from '../../store/reducers/item.reducer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { loadItems } from '../../store/actions/item.actions';
import { Item } from '../../models/item.model';

type ItemServiceMock = {
  getItems: jest.Mock<() => Observable<Item[]>, []>;
  deleteItem?: jest.Mock<any, [number]>;
};

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let store: Store;
  let itemServiceSpy: ItemService;
  beforeEach(async () => {
 
    const spy: ItemServiceMock = {
      getItems: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        
      ],
      declarations:[
        ItemCardComponent,
        ItemListComponent,
      ],
      providers: [
        { provide: ItemService, useValue: spy },
        provideStore({ [getItemFeatureKey]: itemReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    itemServiceSpy = TestBed.inject(ItemService); 
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadItems on ngOnInit', () => {
    jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadItems());
  });

  it('should have observables for items, loading, and error', () => {
    expect(component.items$).toBeDefined();
    expect(component.loading$).toBeDefined();
    expect(component.error$).toBeDefined();
  });
});
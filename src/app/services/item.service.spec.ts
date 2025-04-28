import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Item } from '../models/item.model';

describe('ItemService', () => {
  let service: ItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });
    service = TestBed.inject(ItemService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve items from the API via GET', () => {
    const mockItems: Item[] = [{ id: 1, title: 'Test 1', img: '', type: 1, description: 'desc' }];

    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpTestingController.expectOne('https://githubanotaai.github.io/frontend-interview-mock-data/cardlist.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

});
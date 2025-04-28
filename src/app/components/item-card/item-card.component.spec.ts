import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { Item } from '../../models/item.model';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  const mockItem: Item = { id: 1, title: 'Test Item', img: '', type: 1, description: 'Test Description' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ItemCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    component.delete = new EventEmitter<number>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the delete event with the item ID when the delete button is clicked', () => {
    jest.spyOn(component.delete, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.item-card__delete-button');
    deleteButton.click();
    expect(component.delete.emit).toHaveBeenCalledWith(mockItem.id);
  });

  it('should display the item title', () => {
    const titleElement = fixture.nativeElement.querySelector('.item-card__title');
    expect(titleElement.textContent).toContain(mockItem.title);
  });

});
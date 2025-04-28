import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item, typeMap } from '../../models/item.model';
@Component({
  selector: 'app-item-card',
  standalone: false,
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() delete = new EventEmitter<number>();
  typeMap = typeMap;

  getTypeText(): string {
    return this.typeMap[this.item.type] || 'Desconhecido';
  }

  getTypeClass(): string {
    const typeString = this.typeMap[this.item.type] || 'desconhecido';
    return typeString.toLowerCase();
  }

  onDelete(): void {
    this.delete.emit(this.item.id);
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../pokemon-types';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input() showButton!: boolean;
  @Output() listItemClick: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.listItemClick.emit(this.pokemon);
  }
}

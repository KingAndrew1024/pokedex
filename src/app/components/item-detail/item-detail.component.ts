import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  @Input('pokemonData') pokemonData: any = {};

  //Todo: set a specific type
  details: any = {};

  constructor() {}

  ngOnInit(): void {
    this.details = this.pokemonData?.details || {};
  }
}

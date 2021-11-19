import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailComponent } from 'src/app/components/item-detail/item-detail.component';
import {
  IPokedexService,
  POKEDEX_SERVICE,
} from 'src/app/contracts/pokedex-service';

@Component({
  selector: 'app-pokedex-detail',
  templateUrl: './pokedex-detail.component.html',
  styleUrls: ['./pokedex-detail.component.scss'],
})
export class PokedexDetailComponent implements OnInit {
  @ViewChild('pokemonDetailsView', { read: ViewContainerRef })
  pokemonDetailsView: ViewContainerRef;

  //Todo: set a specific type
  selectedPokemon: any;

  constructor(
    private route: ActivatedRoute,
    @Inject(POKEDEX_SERVICE) public pokedexService: IPokedexService,
    public cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const selectedId = this.route.snapshot.paramMap.get('id');
    if (selectedId) {
      const list = this.pokedexService.getStoredItems() || {};
      this.selectedPokemon = list[selectedId];
    }

    this.pokemonDetailsView.clear();

    //to avoid having 'ExpressionChangedAfterItHasBeenCheckedError' Error
    setTimeout(() => {
      const componentFactory =
        this.cfr.resolveComponentFactory(ItemDetailComponent);
      const componentRef =
        this.pokemonDetailsView.createComponent(componentFactory);
      componentRef.instance.pokemonData = this.selectedPokemon;
    }, 0);
  }
}

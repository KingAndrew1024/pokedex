import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import {
  IPokedexService,
  POKEDEX_SERVICE,
} from 'src/app/contracts/pokedex-service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit, OnDestroy {
  pokemonList: { name: string; details$: Observable<string> }[] = [];

  //public for TDD
  destroyed$ = new Subject();

  constructor(
    @Inject(POKEDEX_SERVICE) public pokedexService: IPokedexService
  ) {}

  ngOnInit(): void {
    this.pokedexService
      .getItems()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        this.pokemonList = response.results.map((item) => ({
          name: item.name,
          details$: this.getItemDetails(item.name),
        }));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getItemDetails(nameOrId: string) {
    return this.pokedexService.getItemByIdOrName(nameOrId).pipe(first());
  }
}

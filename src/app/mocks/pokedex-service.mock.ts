import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPokedexAPiResult } from '../contracts/api-response';
import { IPokedexService } from '../contracts/pokedex-service';

export class PokedexServiceMock implements IPokedexService {
  private storedItems: { [key: string]: any } = {};

  getItems(): Observable<IPokedexAPiResult> {
    console.warn('PokedexServiceMock:: getItems()');
    return of(ApiResult).pipe(
      map((itemList) => {
        this.storedItems = {};
        itemList.results.forEach((item) => {
          this.storedItems[item.name] = {
            name: item.name,
            url: item.url,
            details: undefined,
          };
        });
        return itemList;
      })
    );
  }

  getItemByIdOrName(idOrName: string | number): Observable<any> {
    console.warn('PokedexServiceMock:: getItemByIdOrName()', idOrName);
    return new Observable((s) => s.next({}));
  }

  // this is used only to emulate a store
  //Todo: Implement a store management module/library
  getStoredItems() {
    return {};
  }
}

export const ApiResult = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
    { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
    { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
    { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
    { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
    { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
    { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
    { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
    { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
    { name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/' },
  ],
};

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPokedexAPiResult } from '../contracts/api-response';
import { IPokedexService } from '../contracts/pokedex-service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService implements IPokedexService {
  readonly serverUrl = 'https://pokeapi.co';

  // this is used only to emulate a store
  //Todo: Implement a store management module/library
  private storedItems: { [key: string]: any };

  constructor(private http: HttpClient) {}

  // this is used only to emulate a store
  //Todo: Implement a store management module/library
  getStoredItems(): { [key: string]: any } {
    return this.storedItems;
  }

  getItems(pagination?: {
    limit: number;
    offset: number;
  }): Observable<IPokedexAPiResult> {
    return this.http
      .get<IPokedexAPiResult>(`${this.serverUrl}/api/v2/pokemon`)
      .pipe(
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
    return this.http
      .get<any>(`${this.serverUrl}/api/v2/pokemon/${idOrName}`)
      .pipe(
        map((detailedItem) => {
          this.storedItems[detailedItem.name].details = detailedItem;
          return detailedItem;
        })
      );
  }
}

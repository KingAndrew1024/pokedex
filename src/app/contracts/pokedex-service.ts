import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PokedexService } from '../services/pokedex.service';
import { IPokedexAPiResult } from './api-response';

export interface IPokedexService {
  getItems(): Observable<IPokedexAPiResult>;
  getItemByIdOrName(idOrName: string | number): Observable<any>;
  getStoredItems(): { [key: string]: any };
}

export const POKEDEX_SERVICE = new InjectionToken<PokedexService>(
  'POKEDEX_SERVICE'
);

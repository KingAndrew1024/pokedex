export interface Result {
  name: string;
  url: string;
}

export interface IPokedexAPiResult {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}

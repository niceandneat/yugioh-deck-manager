import { SortOrder } from './etc';

export interface Deck {
  name: string;
  kind: string;
  game?: string;
  year?: number;
  month?: number;
  rank?: number;
  picks?: number[];
  main: number[];
  extra: number[];
  side: number[];
}

export type DeckSortKey = 'name' | 'kind' | 'game' | 'year' | 'month' | 'rank';

export interface DeckFilterInfo {
  kind: Record<string, number>;
  year: Record<number, number>;
  game: Record<string, number>;
}

export interface DeckParams {
  name?: string;
  kind?: string[];
  year?: string[];
  game?: string[];
  sortkey?: DeckSortKey;
  sortorder?: SortOrder;
}

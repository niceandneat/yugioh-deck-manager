export interface Ban {
  year: number;
  month: number;
  forbidden: number[];
  limited: number[];
  semiLimited: number[];
}

export type BanStatus = 'forbidden' | 'limited' | 'semiLimited';

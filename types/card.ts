import { SortOrder } from '.';

export interface Card {
  // common
  id: number;
  altIds: number[];
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  archetype?: string;
  // monster
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  scale?: number;
  linkval?: number;
  linkmarkers?: string[];
  // mics
  cardSets?: CardSet[];
}

export interface CardSet {
  name: string;
  code: string;
  rarity: string;
  rarityCode: string;
  price: string;
}

export interface CardInfo {
  data: CardInfoItem[];
}

export interface CardInfoItem {
  // common
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  archetype?: string;
  // monster
  atk?: number;
  def?: number;
  level?: number;
  attribute?: string;
  scale?: number;
  linkval?: number;
  linkmarkers?: string[];
  // mics
  card_sets?: {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_rarity_code: string;
    set_price: string;
  }[];
  card_images: { id: number }[];
}

export type CardSortKey =
  | 'name'
  | 'type'
  | 'race'
  | 'atk'
  | 'def'
  | 'level'
  | 'attribute';

export interface CardFilterInfo {
  type: Record<string, number>;
  race: Record<string, number>;
  attribute: Record<string, number>;
  level: Record<number, number>;
}

export interface CardParams {
  name?: string;
  type?: string[];
  race?: string[];
  attribute?: string[];
  level?: number[];
  sortkey?: CardSortKey;
  sortorder?: SortOrder;
}

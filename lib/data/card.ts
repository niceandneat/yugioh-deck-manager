import { Card, CardInfo, CardInfoItem } from '@/types';
import { promises as fs } from 'fs';
import { cache } from '../cache';
import { compareValue } from '../value';

const parseCard = (cardInfoItem: CardInfoItem): Card => {
  const {
    id,
    name,
    type,
    frameType,
    desc,
    race,
    atk,
    def,
    level,
    attribute,
    archetype,
    scale,
    linkval,
    linkmarkers,
    card_sets,
    card_images,
  } = cardInfoItem;

  const altIds = card_images.map(({ id }) => id);

  const cardSets = card_sets?.map((set) => {
    const { set_name, set_code, set_rarity, set_rarity_code, set_price } = set;

    return {
      name: set_name,
      code: set_code,
      rarity: set_rarity,
      rarityCode: set_rarity_code,
      price: set_price,
    };
  });

  return {
    id,
    altIds,
    name,
    type,
    frameType,
    desc,
    race,
    archetype,
    atk,
    def,
    level,
    attribute,
    scale,
    linkval,
    linkmarkers,
    cardSets,
  };
};

const loadCards = async () => {
  const cacheKey = ['cards'];
  const cachedData = cache.get<Card[]>(cacheKey);
  if (cachedData) return cachedData;

  const data = await fs.readFile('data/cards.json');
  const cardInfos = JSON.parse(data.toString()) as CardInfo;
  const cards = cardInfos.data
    .map<Card>(parseCard)
    .filter((card) => card.type !== 'Skill Card')
    .sort((a, b) => compareValue(a.name, b.name));

  cache.set(cacheKey, cards);
  cache.set(['cards', 'name', 'asc'], cards);

  return cards;
};

const loadCardsMap = async () => {
  const cacheKey = ['cards', 'map'];
  const cachedData = cache.get<Record<number, Card>>(cacheKey);
  if (cachedData) return cachedData;

  const cards = await loadCards();

  const cardsMap: Record<number, Card> = {};
  for (const card of cards) {
    cardsMap[card.id] = card;
    for (const altId of card.altIds) {
      cardsMap[altId] = card;
    }
  }

  cache.set(cacheKey, cardsMap);

  return cardsMap;
};

export const getCards = async () => {
  const cards = await loadCards();
  const cardsMap = await loadCardsMap();

  return { cards, cardsMap };
};

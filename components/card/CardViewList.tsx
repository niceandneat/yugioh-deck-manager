import {
  arrayCondition,
  compareValue,
  stringArrayCondition,
  stringCondition,
} from '@/lib/value';
import { Ban, Card, CardFilterInfo, CardParams } from '@/types';
import { memo, useMemo, useState } from 'react';
import { CardViewListHeader } from './CardViewListHeader';
import { CardList, CardListVirtual } from './CardList';

// words in type value that should be removed from filter list.
const TYPES_TO_IGNORE = ['Card'];

const getCardFilterInfo = (cards: Card[]) => {
  const addCount = <T extends string | number>(
    target: Record<T, number>,
    value?: T
  ) => {
    if (!value) return;
    target[value] = (target[value] || 0) + 1;
  };

  return cards.reduce(
    (res, card) => {
      card.type
        .split(' ')
        .filter((value) => !TYPES_TO_IGNORE.includes(value))
        .forEach((value) => addCount(res.type, value));

      addCount(res.race, card.race);
      addCount(res.attribute, card.attribute);
      addCount(res.level, card.level);

      return res;
    },
    { type: {}, race: {}, attribute: {}, level: {} } as CardFilterInfo
  );
};

const filterCards = (cards: Card[], params: CardParams) => {
  const { name, race, type, attribute, level } = params;

  return cards.filter((card) => {
    const nameCondition = stringCondition(card.name, name);
    const typeCondition = stringArrayCondition(card.type, type);
    const raceCondition = arrayCondition(card.race, race);
    const attributeCondition = arrayCondition(card.attribute, attribute);
    const levelCondition = arrayCondition(card.level, level);

    return (
      nameCondition &&
      typeCondition &&
      raceCondition &&
      attributeCondition &&
      levelCondition
    );
  });
};

const sortCards = (cards: Card[], params: CardParams) => {
  const { sortkey, sortorder } = params;

  if (!sortkey || !sortorder) return cards;

  return cards.sort((a: Card, b: Card) =>
    compareValue(a[sortkey], b[sortkey], sortorder)
  );
};

interface CardViewListProps {
  cards: Card[];
  ban?: Ban;
  onClick?: (card: Card) => void;
}

export const CardViewList = memo(
  ({ cards, ban, onClick }: CardViewListProps) => {
    const [params, setParams] = useState<CardParams>({});
    const filterInfo = useMemo(() => getCardFilterInfo(cards), [cards]);
    const activeCards = useMemo(
      () => sortCards(filterCards(cards, params), params),
      [cards, params]
    );

    return (
      <div
        className="grid grid-rows-[64px_1fr] px-4"
        style={{ height: 'calc(100vh - var(--header-height))' }}
      >
        <CardViewListHeader
          filterInfo={filterInfo}
          params={params}
          onChangeParams={setParams}
        />
        <div className="h-full">
          <CardListVirtual cards={activeCards} ban={ban} onClick={onClick} />
        </div>
      </div>
    );
  }
);

CardViewList.displayName = 'CardViewList';

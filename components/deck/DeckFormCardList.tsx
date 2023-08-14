'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Ban, Card } from '@/types';
import { getCardsFromIds } from '@/lib/select';
import { CardActionMenu, CardList } from '@/components/card';
import { DeckFormData } from './DeckForm';
interface CardHeaderProps {
  title: string;
  counts: number;
}

const CardsHeader = ({ title, counts }: CardHeaderProps) => {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-accent rounded-md text-accent-foreground">
        <h4>{title}</h4>
        <span className="text-muted-foreground">{counts}</span>
      </div>
    </div>
  );
};

interface DeckFormCardListProps {
  cardsMap: Record<number, Card>;
  ban?: Ban;
  onClick?: (card: Card) => void;
}

export const DeckFormCardList = ({
  cardsMap,
  ban,
  onClick,
}: DeckFormCardListProps) => {
  const { getValues, setValue, watch } = useFormContext<DeckFormData>();

  const menus: CardActionMenu[] = useMemo(
    () => [
      {
        key: 'Add to picks',
        onClick: (card) => {
          const picks = getValues('picks') || [];
          if (picks.length >= 3) return;
          setValue('picks', [...picks, card.id]);
        },
      },
    ],
    [getValues, setValue]
  );

  const main = getCardsFromIds(watch('main'), cardsMap);
  const extra = getCardsFromIds(watch('extra'), cardsMap);
  const side = getCardsFromIds(watch('side'), cardsMap);

  return (
    <div>
      <CardsHeader title="Main" counts={main.length} />
      <CardList cards={main} ban={ban} menus={menus} onClick={onClick} />
      <CardsHeader title="Extra" counts={extra.length} />
      <CardList cards={extra} ban={ban} menus={menus} onClick={onClick} />
      <CardsHeader title="Side" counts={side.length} />
      <CardList cards={side} ban={ban} menus={menus} onClick={onClick} />
    </div>
  );
};

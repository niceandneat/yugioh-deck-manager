'use client';

import { Ban, Card } from '@/types';
import { CardList } from '@/components/card';

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

interface DeckDetailCardListProps {
  ban?: Ban;
  main: Card[];
  extra: Card[];
  side: Card[];
  onClick?: (card: Card) => void;
}

export const DeckDetailCardList = ({
  ban,
  main,
  extra,
  side,
  onClick,
}: DeckDetailCardListProps) => {
  return (
    <div>
      <CardsHeader title="Main" counts={main.length} />
      <CardList cards={main} ban={ban} onClick={onClick} />
      <CardsHeader title="Extra" counts={extra.length} />
      <CardList cards={extra} ban={ban} onClick={onClick} />
      <CardsHeader title="Side" counts={side.length} />
      <CardList cards={side} ban={ban} onClick={onClick} />
    </div>
  );
};

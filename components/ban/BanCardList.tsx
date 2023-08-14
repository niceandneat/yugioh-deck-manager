'use client';

import { Ban, Card } from '@/types';
import { CardList } from '@/components/card';

interface BanHeaderProps {
  title: string;
  counts: number;
}

const BansHeader = ({ title, counts }: BanHeaderProps) => {
  return (
    <div className="my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-accent rounded-md text-accent-foreground">
        <h4>{title}</h4>
        <span className="text-muted-foreground">{counts}</span>
      </div>
    </div>
  );
};

interface BanCardListProps {
  ban: Ban;
  forbidden: Card[];
  limited: Card[];
  semiLimited: Card[];
  onClick?: (card: Card) => void;
}

export const BanCardList = ({
  ban,
  forbidden,
  limited,
  semiLimited,
  onClick,
}: BanCardListProps) => {
  return (
    <div>
      <BansHeader title="Forbidden" counts={forbidden.length} />
      <CardList cards={forbidden} ban={ban} onClick={onClick} />
      <BansHeader title="Limited" counts={limited.length} />
      <CardList cards={limited} ban={ban} onClick={onClick} />
      <BansHeader title="Semi-Limited" counts={semiLimited.length} />
      <CardList cards={semiLimited} ban={ban} onClick={onClick} />
    </div>
  );
};

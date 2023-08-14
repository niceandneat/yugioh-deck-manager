'use client';

import { useState } from 'react';
import { Ban, Card, Deck } from '@/types';
import { CardDetail } from '@/components/card';
import { DetailListLayout } from '@/components/layout';
import { CardViewList } from './CardViewList';

interface CardViewProps {
  cards: Card[];
  ban?: Ban;
}

export const CardView = ({ cards, ban }: CardViewProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  return (
    <DetailListLayout
      detail={<CardDetail card={selectedCard} />}
      list={<CardViewList cards={cards} ban={ban} onClick={setSelectedCard} />}
    />
  );
};

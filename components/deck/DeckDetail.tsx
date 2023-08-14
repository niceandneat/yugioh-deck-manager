'use client';

import { useState } from 'react';
import { Ban, Card, Deck } from '@/types';
import { CardDetail } from '@/components/card';
import { DetailListLayout } from '@/components/layout';
import { DeckDetailHeader } from './DeckDetailHeader';
import { DeckDetailCardList } from './DeckDetailCardList';

interface DeckDetailProps {
  deck: Deck;
  main: Card[];
  extra: Card[];
  side: Card[];
  ban?: Ban;
}

export const DeckDetail = ({
  deck,
  main,
  extra,
  side,
  ban,
}: DeckDetailProps) => {
  const [selectedCard, setSelectedCard] = useState(main[0]);

  return (
    <DetailListLayout
      detail={<CardDetail card={selectedCard} />}
      list={
        <div className="p-4">
          <DeckDetailHeader deck={deck} ban={ban} />
          <DeckDetailCardList
            ban={ban}
            main={main}
            extra={extra}
            side={side}
            onClick={setSelectedCard}
          />
        </div>
      }
    />
  );
};

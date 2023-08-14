'use client';

import { useState } from 'react';
import { Card, Ban } from '@/types';
import { CardDetail } from '@/components/card';
import { DetailListLayout } from '@/components/layout';
import { BanDetailHeader } from './BanDetailHeader';
import { BanCardList } from './BanCardList';

interface BanDetailProps {
  ban: Ban;
  bans: Record<string, Ban>;
  forbidden: Card[];
  limited: Card[];
  semiLimited: Card[];
}

export const BanDetail = ({
  ban,
  bans,
  forbidden,
  limited,
  semiLimited,
}: BanDetailProps) => {
  const [selectedCard, setSelectedCard] = useState(
    forbidden[0] || limited[0] || semiLimited[0]
  );

  return (
    <DetailListLayout
      detail={<CardDetail card={selectedCard} />}
      list={
        <div className="p-4">
          <BanDetailHeader ban={ban} bans={bans} />
          <BanCardList
            ban={ban}
            forbidden={forbidden}
            limited={limited}
            semiLimited={semiLimited}
            onClick={setSelectedCard}
          />
        </div>
      }
    />
  );
};

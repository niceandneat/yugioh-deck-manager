'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/types';
import { Badge } from '@/components/ui/badge';
import { AttributeIcon, LevelIcon, RaceIcon } from '@/components/icon';
import { cn } from '@/lib/utils';
import { CardImage } from './CardImage';

interface CardDetailProps {
  card: Card;
}

export const CardDetail = ({ card }: CardDetailProps) => {
  const { id, altIds, name, type, desc, race, atk, def, level, attribute } =
    card;

  const [selectedId, setSelectedId] = useState(id);

  useEffect(() => {
    setSelectedId(id);
  }, [id]);

  return (
    <div className="text-sm">
      <CardImage cardId={selectedId} width={'100%'} />
      <div className="flex items-center justify-between mt-2">
        <h3 className="text-base font-bold">{name}</h3>
        {attribute && <AttributeIcon attribute={attribute} />}
      </div>
      {level && (
        <div className="flex items-center justify-between mt-1">
          <LevelIcon level={level} />
          <p>{`${atk}/${def}`}</p>
        </div>
      )}
      <div className="flex items-center justify-between mt-1 font-bold">
        <p>{type}</p>
        <div className="flex items-center">
          <p className="mr-1">{race}</p>
          <RaceIcon race={race} />
        </div>
      </div>
      <p className="mt-1">{desc}</p>
      {altIds.length > 1 && (
        <div className="flex items-center mt-2">
          <Badge variant="secondary" className="mr-1">
            images
          </Badge>
          {altIds.map((altId, i) => (
            <p
              key={altId}
              onClick={() => setSelectedId(altId)}
              className={cn(
                'cursor-pointer px-1',
                altId === selectedId ? 'underline' : undefined
              )}
            >
              {i + 1}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

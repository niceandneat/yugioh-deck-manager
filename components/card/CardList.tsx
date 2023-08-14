'use client';

import { VirtuosoGrid } from 'react-virtuoso';
import { Ban, BanStatus, Card } from '@/types';
import { Action } from '@/components/tool';
import { CardListItem } from './CardListItem';

export interface CardActionMenu {
  key: string;
  onClick: (card: Card) => void;
}

interface CardListProps {
  cards: Card[];
  ban?: Ban;
  menus?: CardActionMenu[];
  onClick?: (card: Card) => void;
}

const getBanStatus = (card: Card, ban: Ban): BanStatus | undefined => {
  for (const id of card.altIds) {
    if (ban.forbidden.includes(id)) {
      return 'forbidden';
    } else if (ban.limited.includes(id)) {
      return 'limited';
    } else if (ban.semiLimited.includes(id)) {
      return 'semiLimited';
    }
  }
};

export const CardList = ({ cards, ban, menus, onClick }: CardListProps) => {
  const components = cards.map((card, index) => {
    const actionMenus = menus?.map(({ key, onClick }) => ({
      key,
      onClick: () => onClick(card),
    }));

    return (
      <Action key={index} menus={actionMenus}>
        <CardListItem
          card={card}
          onClick={onClick}
          banStatus={ban && getBanStatus(card, ban)}
        />
      </Action>
    );
  });

  return <div className="flex flex-wrap items-center gap-2">{components}</div>;
};

export const CardListVirtual = ({
  cards,
  ban,
  menus,
  onClick,
}: CardListProps) => {
  return (
    <VirtuosoGrid
      style={{ height: '100%' }}
      data={cards}
      overscan={200}
      listClassName="flex flex-wrap items-center gap-2"
      itemClassName="w-[100px] h-[146px]"
      itemContent={(_, card) => {
        const actionMenus = menus?.map(({ key, onClick }) => ({
          key,
          onClick: () => onClick(card),
        }));

        return (
          <Action menus={actionMenus}>
            <CardListItem
              card={card}
              onClick={onClick}
              banStatus={ban && getBanStatus(card, ban)}
            />
          </Action>
        );
      }}
    />
  );
};

import { Ban, Card, Deck } from '@/types';
import { toDateString } from './parse';

export const getActiveBan = (
  deck: Pick<Deck, 'year' | 'month'>,
  bans: Record<string, Ban>
): Ban | undefined => {
  if (!deck.year || !deck.month) return;

  const sortedBans = Object.values(bans).sort(
    (a, b) => a.year - b.year && a.month - b.month
  );

  for (const ban of sortedBans) {
    if (
      toDateString(deck.year, deck.month) >= toDateString(ban.year, ban.month)
    ) {
      return ban;
    }
  }
};

const createUnknownCard = (id: number): Card => ({
  id,
  altIds: [],
  name: 'Unknown Card',
  desc: 'Cannot find the ID of the card. It might be a card from before the errata or an unofficial card.',
  type: 'Unknown',
  frameType: 'Unknown',
  race: 'Unknown',
});

export const getCardsFromIds = (
  cardIds: number[],
  cardsMap: Record<number, Card>
) => {
  return cardIds.map((id) => cardsMap[id] || createUnknownCard(id));
};

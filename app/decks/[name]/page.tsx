import { DeckDetail } from '@/components/deck';
import { getBans, getCards, getDecks } from '@/lib/data';
import { getActiveBan, getCardsFromIds } from '@/lib/select';

export default async function Deck({ params }: { params: { name: string } }) {
  const { decks } = await getDecks();
  const { cardsMap } = await getCards();
  const { bans } = await getBans();

  const deckName = decodeURIComponent(params.name);
  const deck = decks.find(({ name }) => name === deckName);

  if (!deck) throw new Error(`Deck [${deckName}] does not exist.`);

  const main = getCardsFromIds(deck.main, cardsMap);
  const extra = getCardsFromIds(deck.extra, cardsMap);
  const side = getCardsFromIds(deck.side, cardsMap);
  const ban = getActiveBan(deck, bans);

  return (
    <DeckDetail deck={deck} main={main} extra={extra} side={side} ban={ban} />
  );
}

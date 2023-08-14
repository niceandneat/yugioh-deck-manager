import { DeckEdit } from '@/components/deck';
import { getBans, getCards, getDecks } from '@/lib/data';

export default async function DeckEditPage({
  params,
}: {
  params: { name: string };
}) {
  const { decks } = await getDecks();
  const { cardsMap } = await getCards();
  const { bans } = await getBans();

  const deckName = decodeURIComponent(params.name);
  const deck = decks.find(({ name }) => name === deckName);

  if (!deck) throw new Error(`Deck [${deckName}] does not exist.`);

  return <DeckEdit deck={deck} cardsMap={cardsMap} bans={bans} />;
}

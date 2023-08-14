import { DeckCreate } from '@/components/deck';
import { getBans, getCards } from '@/lib/data';

export default async function DeckEditPage() {
  const { cardsMap } = await getCards();
  const { bans } = await getBans();

  return <DeckCreate cardsMap={cardsMap} bans={bans} />;
}

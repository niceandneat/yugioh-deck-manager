import { DeckList } from '@/components/deck';
import { DeckParams } from '@/types';
import { getDecks } from '@/lib/data';

export default async function Decks({
  searchParams,
}: {
  searchParams: DeckParams;
}) {
  const { decks, filterInfo } = await getDecks(searchParams);

  return <DeckList decks={decks} filterInfo={filterInfo} />;
}

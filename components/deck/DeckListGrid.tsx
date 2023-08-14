import { Deck } from '@/types';
import { DeckGridItem } from './DeckGridItem';

interface DeckListGridProps {
  decks: Deck[];
}

export const DeckListGrid = ({ decks }: DeckListGridProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {decks.map((deck, i) => (
        <DeckGridItem key={i} deck={deck} />
      ))}
    </div>
  );
};

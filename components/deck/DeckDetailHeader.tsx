import { Ban, Deck } from '@/types';
import { toDateString } from '@/lib/parse';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DeckDetailHeaderProps {
  deck: Deck;
  ban?: Ban;
}

export const DeckDetailHeader = ({ deck, ban }: DeckDetailHeaderProps) => {
  const { name, kind, year, month, game, rank } = deck;
  const currentBanDate = ban && toDateString(ban.year, ban.month);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl font-bold">{name}</h2>
          <span className="text-muted-foreground">
            {toDateString(year, month)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {currentBanDate && (
            <Link href={`/bans/${currentBanDate}`}>
              <Button
                className="h-8"
                variant="outline"
              >{`Ban List: ${currentBanDate}`}</Button>
            </Link>
          )}
          <Link href={`/decks/${deck.name}/edit`}>
            <Button className="h-8" variant="default">
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-muted-foreground">{kind}</span>
        {game && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{game}</span>
          </>
        )}
        {rank !== undefined && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{`★ ${rank}`}</span>
          </>
        )}
      </div>
    </div>
  );
};

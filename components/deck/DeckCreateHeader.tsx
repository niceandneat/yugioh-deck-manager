import Link from 'next/link';
import { Ban } from '@/types';
import { toDateString } from '@/lib/parse';
import { Button } from '@/components/ui/button';

interface DeckCreateHeaderProps {
  ban?: Ban;
}

export const DeckCreateHeader = ({ ban }: DeckCreateHeaderProps) => {
  const currentBanDate = ban && toDateString(ban.year, ban.month);

  return (
    <div className="flex justify-end">
      {currentBanDate && (
        <Link href={`/bans/${currentBanDate}`}>
          <Button
            className="h-8"
            variant="outline"
          >{`Ban List: ${currentBanDate}`}</Button>
        </Link>
      )}
    </div>
  );
};

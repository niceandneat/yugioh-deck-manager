import Link from 'next/link';
import { Ban } from '@/types';
import { toDateString } from '@/lib/parse';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface DeckEditHeaderProps {
  ban?: Ban;
  onDelete?: () => void;
}

export const DeckEditHeader = ({ ban, onDelete }: DeckEditHeaderProps) => {
  const currentBanDate = ban && toDateString(ban.year, ban.month);

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-4">
        {currentBanDate && (
          <Link href={`/bans/${currentBanDate}`}>
            <Button
              className="h-8"
              variant="outline"
            >{`Ban List: ${currentBanDate}`}</Button>
          </Link>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="h-8">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                deck.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

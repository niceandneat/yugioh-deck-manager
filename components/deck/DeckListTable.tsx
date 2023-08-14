import Link from 'next/link';
import Image from 'next/image';
import { Deck } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toDateString } from '@/lib/parse';

interface DeckListTableProps {
  decks: Deck[];
}

export const DeckListTable = ({ decks }: DeckListTableProps) => {
  const rows = decks.map(({ name, kind, year, month, game, rank, picks }) => {
    return (
      <TableRow key={name}>
        <TableCell className="font-medium">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Link href={`/decks/${name}`}>{name}</Link>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm" side="right">
                <div className="flex items-center justify-center gap-4">
                  {picks?.map((id) => (
                    <Image
                      key={id}
                      alt={`Card Image for ${id}`}
                      src={`/images/${id}.jpg`}
                      width={412}
                      height={614}
                      style={{ width: 100, height: 'auto' }}
                    />
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell>{kind}</TableCell>
        <TableCell>{toDateString(year, month)}</TableCell>
        <TableCell className="text-right">
          {[game, rank].filter(Boolean).join(' / ')}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className="px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>kind</TableHead>
            <TableHead>date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    </div>
  );
};

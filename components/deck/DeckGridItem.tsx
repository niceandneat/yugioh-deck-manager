import Image from 'next/image';
import Link from 'next/link';
import { Deck } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toDateString } from '@/lib/parse';

interface DeckGridItemProps {
  deck: Deck;
}

export const DeckGridItem = ({ deck }: DeckGridItemProps) => {
  const { name, kind, year, month, game, rank, picks } = deck;

  return (
    <Card className="w-96 min-h-[24rem] flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            <span className="flex justify-between">
              <span className="inline-block">{kind}</span>
              <span className="inline-block">{toDateString(year, month)}</span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-max">
          <div className="flex items-center justify-center gap-4">
            {picks?.map((id, index) => (
              <Image
                key={index}
                alt={`Card Image for ${id}`}
                src={`/images/${id}.jpg`}
                width={412}
                height={614}
                style={{ width: 100, height: 'auto' }}
              />
            ))}
          </div>
          {game && (
            <div className="flex items-center justify-between gap-4 mt-4 text-sm">
              <span>{game}</span>
              {rank !== undefined && <span>{`★ ${rank}`}</span>}
            </div>
          )}
        </CardContent>
      </div>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/decks/${name}`}>View Deck</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

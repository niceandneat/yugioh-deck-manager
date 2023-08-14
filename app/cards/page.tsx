import { CardView } from '@/components/card/CardView';
import { getCards } from '@/lib/data';
import { Suspense } from 'react';

export default async function Cards() {
  const { cards } = await getCards();

  return (
    <Suspense fallback={null}>
      <CardView cards={cards} />
    </Suspense>
  );
}

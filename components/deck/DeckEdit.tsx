'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, Card, Deck } from '@/types';
import { DetailListLayout } from '@/components/layout';
import { getActiveBan } from '@/lib/select';
import { DeckForm, DeckFormData, deckFormSchema } from './DeckForm';
import { DeckEditHeader } from './DeckEditHeader';
import { DeckFormCardList } from './DeckFormCardList';

interface DeckEditProps {
  deck: Deck;
  cardsMap: Record<number, Card>;
  bans: Record<string, Ban>;
}

export const DeckEdit = ({ deck, cardsMap, bans }: DeckEditProps) => {
  const form = useForm<DeckFormData>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: { ...deck },
  });

  const ban = getActiveBan(
    { year: form.watch('year'), month: form.watch('month') },
    bans
  );

  const [_, forceError] = useState<never>();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: DeckFormData) => {
      const result = await fetch(`/api/decks/${deck.name}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.ok) {
        const newDeck: Deck = await result.json();

        if (newDeck.name === deck.name) router.refresh();

        router.push(`/decks/${newDeck.name}`);
      } else {
        const error = await result.json();

        forceError(() => {
          throw new Error(error.message);
        });
      }
    },
    [deck.name, router]
  );

  const handleDelete = useCallback(async () => {
    const result = await fetch(`/api/decks/${deck.name}`, { method: 'DELETE' });

    if (result.ok) {
      router.push('/decks');
    } else {
      const error = await result.json();

      forceError(() => {
        throw new Error(error.message);
      });
    }
  }, [deck.name, router]);

  return (
    <FormProvider {...form}>
      <DetailListLayout
        detail={<DeckForm onSubmit={handleSubmit} />}
        list={
          <div className="p-4">
            <DeckEditHeader ban={ban} onDelete={handleDelete} />
            <DeckFormCardList ban={ban} cardsMap={cardsMap} />
          </div>
        }
      />
    </FormProvider>
  );
};

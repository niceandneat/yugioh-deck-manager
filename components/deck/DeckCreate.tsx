'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, Card, Deck } from '@/types';
import { DetailListLayout } from '@/components/layout';
import { getActiveBan } from '@/lib/select';
import { DeckForm, DeckFormData, deckFormSchema } from './DeckForm';
import { DeckCreateHeader } from './DeckCreateHeader';
import { DeckFormCardList } from './DeckFormCardList';

interface DeckCreateProps {
  cardsMap: Record<number, Card>;
  bans: Record<string, Ban>;
}

export const DeckCreate = ({ cardsMap, bans }: DeckCreateProps) => {
  const form = useForm<DeckFormData>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: { main: [], extra: [], side: [] },
  });

  const ban = getActiveBan(
    { year: form.watch('year'), month: form.watch('month') },
    bans
  );

  const [_, forceError] = useState<never>();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: DeckFormData) => {
      const result = await fetch('/api/decks', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (result.ok) {
        const newDeck: Deck = await result.json();

        router.refresh();
        router.push(`/decks/${newDeck.name}`);
      } else {
        const error = await result.json();

        forceError(() => {
          throw new Error(error.message);
        });
      }
    },
    [router]
  );

  return (
    <FormProvider {...form}>
      <DetailListLayout
        detail={<DeckForm onSubmit={handleSubmit} />}
        list={
          <div className="p-4">
            <DeckCreateHeader ban={ban} />
            <DeckFormCardList ban={ban} cardsMap={cardsMap} />
          </div>
        }
      />
    </FormProvider>
  );
};

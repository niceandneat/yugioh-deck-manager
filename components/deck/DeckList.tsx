'use client';

import { Deck, DeckFilterInfo } from '@/types';
import { DeckListHeader } from './DeckListHeader';
import { DeckListTable } from './DeckListTable';
import { useState } from 'react';
import { DeckListGrid } from './DeckListGrid';

export type DeckListView = 'grid' | 'table';

interface DeckListProps {
  decks: Deck[];
  filterInfo: DeckFilterInfo;
}

export const DeckList = ({ decks, filterInfo }: DeckListProps) => {
  const [view, setView] = useState<DeckListView>('grid');

  return (
    <div className="p-4">
      <DeckListHeader
        filterInfo={filterInfo}
        view={view}
        onViewChange={setView}
      />
      <div className="mt-4">
        {view === 'grid' ? (
          <DeckListGrid decks={decks} />
        ) : (
          <DeckListTable decks={decks} />
        )}
      </div>
    </div>
  );
};

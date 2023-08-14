import { ChangeEvent, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DeckFilterInfo, SortOrder } from '@/types';
import { debounce } from '@/lib/utils';
import { useUpdateSearchParams } from '@/lib/path';
import { Filter, FilterOption, Sort } from '@/components/tool';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DeckListView } from './DeckList';

const deckSortKeys = ['name', 'kind', 'game', 'year', 'month', 'rank'] as const;

const getFilterOptions = (info: Record<string, number>): FilterOption[] =>
  Object.entries(info).map(([value, counts]) => ({
    value,
    counts,
    label: value,
  }));

interface DeckListHeaderProps {
  filterInfo: DeckFilterInfo;
  view: DeckListView;
  onViewChange?: (view: DeckListView) => void;
}

export const DeckListHeader = ({
  filterInfo,
  view,
  onViewChange,
}: DeckListHeaderProps) => {
  const updateSearchParams = useUpdateSearchParams();
  const serachParams = useSearchParams();

  const handleNameChange = useMemo(
    () =>
      debounce(
        (event: ChangeEvent<HTMLInputElement>) =>
          updateSearchParams(['name', event.target.value]),
        200
      ),
    [updateSearchParams]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter decks..."
          onChange={handleNameChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Select value={view} onValueChange={onViewChange}>
          <SelectTrigger className="h-8 w-20 text-xs">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="grid">
              Grid
            </SelectItem>
            <SelectItem className="text-xs" value="table">
              Table
            </SelectItem>
          </SelectContent>
        </Select>
        <Filter
          title="Kind"
          options={getFilterOptions(filterInfo.kind)}
          values={serachParams.getAll('kind')}
          onChange={(value) => updateSearchParams(['kind', value])}
        />
        <Filter
          title="Year"
          options={getFilterOptions(filterInfo.year)}
          values={serachParams.getAll('year')}
          onChange={(value) => updateSearchParams(['year', value])}
        />
        <Filter
          title="Game"
          options={getFilterOptions(filterInfo.game)}
          values={serachParams.getAll('game')}
          onChange={(value) => updateSearchParams(['game', value])}
        />
        <Sort
          options={deckSortKeys.map((value) => ({ value, label: value }))}
          sortKey={serachParams.get('sortkey') ?? undefined}
          sortOrder={(serachParams.get('sortorder') as SortOrder) ?? undefined}
          onChange={(sortKey, sortOrder) =>
            updateSearchParams(['sortkey', sortKey], ['sortorder', sortOrder])
          }
        />
      </div>
      <div className="flex items-center gap-4">
        <Select value={view} onValueChange={onViewChange}>
          <SelectTrigger className="h-8 w-20 text-xs">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="text-xs" value="grid">
              Grid
            </SelectItem>
            <SelectItem className="text-xs" value="table">
              Table
            </SelectItem>
          </SelectContent>
        </Select>
        <Link href="/create-deck">
          <Button className="h-8" variant="default">
            Create
          </Button>
        </Link>
      </div>
    </div>
  );
};

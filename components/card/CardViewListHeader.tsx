import { ChangeEvent, ChangeEventHandler, useMemo } from 'react';
import { CardFilterInfo, CardParams, SortOrder } from '@/types';
import { debounce } from '@/lib/utils';
import { Filter, FilterOption, Sort } from '@/components/tool';
import { Input } from '@/components/ui/input';
import { AttributeIcon, RaceIcon } from '../icon';

const cardSortKeys = [
  'name',
  'type',
  'race',
  'atk',
  'def',
  'level',
  'attribute',
] as const;

const getFilterOptions = (info: Record<string, number>): FilterOption[] =>
  Object.entries(info).map(([value, counts]) => ({
    value,
    counts,
    label: value,
  }));

const getRaceFilterOptions = (info: CardFilterInfo['race']): FilterOption[] =>
  getFilterOptions(info).map((info) => ({
    ...info,
    icon: <RaceIcon race={info.value} />,
  }));

const getAttributeFilterOptions = (
  info: CardFilterInfo['attribute']
): FilterOption[] =>
  getFilterOptions(info).map((info) => ({
    ...info,
    icon: <AttributeIcon attribute={info.value} />,
  }));

interface CardViewListHeaderProps {
  filterInfo: CardFilterInfo;
  params: CardParams;
  onChangeParams?: (s: CardParams | ((s: CardParams) => CardParams)) => void;
}

export const CardViewListHeader = ({
  filterInfo,
  params,
  onChangeParams,
}: CardViewListHeaderProps) => {
  const handleNameChange = useMemo(
    () =>
      debounce(
        (event: ChangeEvent<HTMLInputElement>) =>
          onChangeParams?.((params) => ({
            ...params,
            name: event.target.value,
          })),
        200
      ),
    [onChangeParams]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter cards..."
          onChange={handleNameChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Filter
          title="Type"
          options={getFilterOptions(filterInfo.type)}
          values={params.type}
          onChange={(type) => onChangeParams?.((p) => ({ ...p, type }))}
        />
        <Filter
          title="Race"
          options={getRaceFilterOptions(filterInfo.race)}
          values={params.race}
          onChange={(race) => onChangeParams?.((p) => ({ ...p, race }))}
        />
        <Filter
          title="Attribute"
          options={getAttributeFilterOptions(filterInfo.attribute)}
          values={params.attribute}
          onChange={(attribute) =>
            onChangeParams?.((p) => ({ ...p, attribute }))
          }
        />
        <Filter
          title="Level"
          options={getFilterOptions(filterInfo.level)}
          values={params.level?.map(String)}
          onChange={(level) =>
            onChangeParams?.((p) => ({ ...p, level: level.map(Number) }))
          }
        />
        <Sort
          options={cardSortKeys.map((value) => ({ value, label: value }))}
          sortKey={params.sortkey}
          sortOrder={params.sortorder}
          onChange={(sortkey, sortorder) =>
            onChangeParams?.((p) => ({ ...p, sortkey, sortorder }))
          }
        />
      </div>
    </div>
  );
};

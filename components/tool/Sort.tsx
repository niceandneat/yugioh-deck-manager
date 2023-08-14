import { ArrowDownCircle, ArrowUpCircle, CircleDot } from 'lucide-react';
import { SortOrder } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';

interface SortOption<T> {
  value: T;
  label: string;
}

interface SortProps<T extends string> {
  options: SortOption<T>[];
  sortKey?: T;
  sortOrder?: SortOrder;
  onChange?: (sortKey: T, sortOrder: SortOrder) => void;
}

export const Sort = <T extends string>({
  options,
  sortKey,
  sortOrder,
  onChange,
}: SortProps<T>) => {
  const Icon =
    sortOrder === 'asc'
      ? ArrowUpCircle
      : sortOrder === 'desc'
      ? ArrowDownCircle
      : CircleDot;

  const isActive = (key: string, order: SortOrder) =>
    key === sortKey && order === sortOrder;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {sortKey || 'Sort'}
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-48">
        <div className="grid grid-cols-[1fr_36px_36px] gap-2 items-center">
          {options.map((option) => (
            <React.Fragment key={option.value}>
              <span className="text-sm">{option.label}</span>
              <Button
                variant={isActive(option.value, 'asc') ? 'default' : 'outline'}
                size="icon"
                onClick={() => onChange?.(option.value, 'asc')}
              >
                <ArrowUpCircle className="h-4 w-4" />
              </Button>
              <Button
                variant={isActive(option.value, 'desc') ? 'default' : 'outline'}
                size="icon"
                onClick={() => onChange?.(option.value, 'desc')}
              >
                <ArrowDownCircle className="h-4 w-4" />
              </Button>
            </React.Fragment>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

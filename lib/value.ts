import { SortOrder } from '@/types';

export const compareValue = (
  a?: string | number,
  b?: string | number,
  order: SortOrder = 'asc'
) => {
  const type = typeof a;
  const multiplier = order === 'asc' ? 1 : -1;

  if (a === undefined && b === undefined) return -1;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  if (a === null && b === null) return -1;
  if (a === null) return 1;
  if (b === null) return -1;

  if (type === 'number') {
    return multiplier * ((a as number) - (b as number));
  }
  if (type === 'string') {
    return multiplier * (a as string).localeCompare(b as string);
  }

  return -1;
};

export const stringCondition = (value?: string, filter?: string) => {
  if (filter) {
    if (value) {
      return value.toLowerCase().includes(filter.toLowerCase());
    } else {
      return false;
    }
  }

  return true;
};

export const arrayCondition = <T>(value?: T, filter?: T | T[]) => {
  const filters = filter && (Array.isArray(filter) ? filter : [filter]);

  if (filters && filters.length) {
    if (value) {
      return filters.includes(value);
    } else {
      return false;
    }
  }

  return true;
};

export const stringArrayCondition = (
  value?: string,
  filter?: string | string[]
) => {
  const filters = filter && (Array.isArray(filter) ? filter : [filter]);

  if (filters && filters.length) {
    if (value) {
      return filters.every((f) => value.includes(f));
    } else {
      return false;
    }
  }

  return true;
};

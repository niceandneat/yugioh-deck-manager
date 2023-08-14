import { Deck } from '@/types';

export const toDateString = (year?: number, month?: number) =>
  year && month ? `${year}-${String(month).padStart(2, '0')}` : '';

export const toYearMonth = (date: string) => date.split('-').map(parseInt);

export const parseYdkDeck = (
  text: string
): Pick<Deck, 'main' | 'extra' | 'side'> => {
  const lines = text.split(/\r?\n/);

  const mainIndex = lines.indexOf('#main');
  const extraIndex = lines.indexOf('#extra');
  const sideIndex = lines.indexOf('!side');

  const main = lines.slice(mainIndex + 1, extraIndex).map(Number);
  const extra = lines.slice(extraIndex + 1, sideIndex).map(Number);
  const side = lines
    .slice(sideIndex + 1)
    .map(Number)
    .filter(Boolean);

  return { main, extra, side };
};

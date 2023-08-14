import {
  Deck,
  DeckFilterInfo,
  DeckParams,
  DeckSortKey,
  SortOrder,
} from '@/types';
import { promises as fs } from 'fs';
import { glob } from 'glob';
import { cache } from '../cache';
import { arrayCondition, compareValue, stringCondition } from '../value';
import path from 'path';

const loadDecks = async () => {
  const cacheKey = ['decks'];
  const cachedData = cache.get<Deck[]>(cacheKey);
  if (cachedData) return cachedData;

  const deckFilePaths = await glob('data/decks/**/*.json');

  const data: Buffer[] = [];
  while (deckFilePaths.length) {
    data.push(
      ...(await Promise.all(
        deckFilePaths.splice(0, 10).map((filePath) => fs.readFile(filePath))
      ))
    );
  }

  const decks = data
    .map((d) => JSON.parse(d.toString()) as Deck)
    .sort((a, b) => compareValue(a.name, b.name));

  cache.set(cacheKey, decks);
  cache.set(['decks', 'name', 'asc'], decks);

  return decks;
};

const loadSortedDecks = async (sortkey: DeckSortKey, sortorder: SortOrder) => {
  const cacheKey = ['decks', sortkey, sortorder];
  const cachedData = cache.get<Deck[]>(cacheKey);
  if (cachedData) return cachedData;

  const decks = await loadDecks();

  const sortedDecks = [...decks].sort((a: Deck, b: Deck) =>
    compareValue(a[sortkey], b[sortkey], sortorder)
  );

  cache.set(cacheKey, sortedDecks);

  return sortedDecks;
};

const loadDeckFilterInfo = async () => {
  const cacheKey = ['decks', 'filterInfo'];
  const cachedData = cache.get<DeckFilterInfo>(cacheKey);
  if (cachedData) return cachedData;

  const decks = await loadDecks();

  const addCount = <T extends string | number>(
    target: Record<T, number>,
    value?: T
  ) => {
    if (!value) return;
    target[value] = (target[value] || 0) + 1;
  };

  const filterInfo = decks.reduce(
    (res, deck) => {
      addCount(res.kind, deck.kind);
      addCount(res.year, deck.year);
      addCount(res.game, deck.game);

      return res;
    },
    { kind: {}, year: {}, game: {} } as DeckFilterInfo
  );

  cache.set(cacheKey, filterInfo);

  return filterInfo;
};

export const getDecks = async (params: DeckParams = {}) => {
  const {
    name: nameFilter,
    kind: kindFilter,
    year: yearFilter,
    game: gameFilter,
    sortkey,
    sortorder,
  } = params;

  const allDecks =
    sortkey && sortorder
      ? await loadSortedDecks(sortkey, sortorder)
      : await loadDecks();

  const decks = allDecks.filter((deck) => {
    const nameCondition = stringCondition(deck.name, nameFilter);
    const kindCondition = arrayCondition(deck.kind, kindFilter);
    const yearCondition = arrayCondition(String(deck.year), yearFilter);
    const gameCondition = arrayCondition(deck.game, gameFilter);

    return nameCondition && kindCondition && yearCondition && gameCondition;
  });

  const filterInfo = await loadDeckFilterInfo();

  return { decks, filterInfo };
};

const makeDeckFileName = (deckName: string) =>
  path.resolve('data/decks', `${deckName}.json`);

const findDeckFileName = async (name: string) => {
  const [file] = await glob(`data/decks/**/${name}.json`);
  return file;
};

export const createDeck = async (deck: Deck) => {
  await fs.mkdir('data/decks').catch(() => undefined);
  const deckFilePaths = await glob('data/decks/**/*.json');

  if (
    deckFilePaths.some((file) => path.basename(file, '.json') === deck.name)
  ) {
    throw new Error(`deck name ${deck.name} already exist.`);
  }

  const fileName = path.resolve('data/decks', `${deck.name}.json`);
  await fs.writeFile(fileName, JSON.stringify(deck));
  cache.clear(['decks']);
};

export const updateDeck = async (prevDeckName: string, deck: Deck) => {
  const prevDeckFileName = await findDeckFileName(prevDeckName);
  const newDeckFileName = path.resolve(
    path.dirname(prevDeckFileName),
    `${deck.name}.json`
  );

  if (prevDeckFileName !== newDeckFileName) {
    await fs.rename(prevDeckFileName, newDeckFileName);
  }

  await fs.writeFile(newDeckFileName, JSON.stringify(deck));
  cache.clear(['decks']);
};

export const deleteDeck = async (name: string) => {
  await fs.rm(await findDeckFileName(name));
  cache.clear(['decks']);
};

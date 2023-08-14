import { Ban } from '@/types';
import { promises as fs } from 'fs';
import { toDateString } from '../parse';
import { cache } from '../cache';

const loadBans = async () => {
  const cacheKey = ['bans'];
  const cachedData = cache.get<Record<string, Ban>>(cacheKey);
  if (cachedData) return cachedData;

  const data = await fs.readFile('data/bans.json');
  const bansList = JSON.parse(data.toString()) as Ban[];

  const bans: Record<string, Ban> = Object.fromEntries(
    bansList.map((ban) => [toDateString(ban.year, ban.month), ban])
  );

  cache.set(cacheKey, bans);

  return bans;
};

export const getBans = async () => {
  const bans = await loadBans();

  return { bans };
};

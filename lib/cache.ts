interface SimpleCache {
  get<T>(key: string[]): T | undefined;
  set<T>(key: string[], value: T): void;
  clear(key?: string[]): string[];
}

const getCacheKey = (key: string[]) => key.join('_');

export const createCache = (): SimpleCache => {
  const store = new Map<string, any>();

  const get = <T>(key: string[]) => store.get(getCacheKey(key));

  const set = <T>(key: string[], value: T) =>
    store.set(getCacheKey(key), value);

  const clear = (key?: string[]) => {
    if (!key) {
      const keys = [...store.keys()];
      store.clear();
      return keys;
    }

    const prefixKey = getCacheKey(key);
    const deletedKeys: string[] = [];

    for (const cacheKey of store.keys()) {
      if (cacheKey.startsWith(prefixKey)) {
        store.delete(cacheKey);
        deletedKeys.push(cacheKey);
      }
    }

    return deletedKeys;
  };

  return { get, set, clear };
};

export const cache = createCache();

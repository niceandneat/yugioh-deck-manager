import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateSearchParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return useCallback(
    (...args: [string, string | string[]][]) => {
      const writableSearchParams = new URLSearchParams(searchParams.toString());

      args.forEach(([key, value]) => {
        if (Array.isArray(value)) {
          writableSearchParams.delete(key);
          value.forEach((v) => writableSearchParams.append(key, v));
        } else {
          writableSearchParams.set(key, value);
        }
      });

      const url = `${pathname}?${writableSearchParams}`;

      router.push(url);
    },
    [pathname, searchParams, router]
  );
};

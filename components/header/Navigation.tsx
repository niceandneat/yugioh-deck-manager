'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="inline-block font-bold">Yu-Gi-Oh Deck Manager</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/decks"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/decks')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Decks
        </Link>
        <Link
          href="/cards"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/cards')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Cards
        </Link>
        <Link
          href="/bans"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/bans')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Bans
        </Link>
      </nav>
    </div>
  );
};

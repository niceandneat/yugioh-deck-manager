import { useRouter } from 'next/navigation';
import { Ban } from '@/types';
import { toDateString } from '@/lib/parse';
import { Button } from '@/components/ui/button';
import { BanSelect } from './BanSelect';
import { useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BanDetailHeaderProps {
  ban: Ban;
  bans: Record<string, Ban>;
}

export const BanDetailHeader = ({ ban, bans }: BanDetailHeaderProps) => {
  const options = useMemo(() => Object.keys(bans), [bans]);

  const router = useRouter();
  const handleSelect = useCallback(
    (banDate: string) => router.push(`/bans/${banDate}`),
    [router]
  );

  const currentBanId = toDateString(ban.year, ban.month);
  const currentIndex = options.indexOf(currentBanId);
  const safeIndex = (index: number) =>
    Math.min(Math.max(index, 0), options.length - 1);

  return (
    <div className="flex items-end justify-between">
      <h2 className="text-3xl font-bold">{currentBanId}</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSelect(options[safeIndex(currentIndex + 1)])}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <BanSelect
          options={options}
          selected={currentBanId}
          onSelect={handleSelect}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleSelect(options[safeIndex(currentIndex - 1)])}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

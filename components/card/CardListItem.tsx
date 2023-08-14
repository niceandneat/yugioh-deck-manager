import { BanStatus, Card } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BanIcon } from '@/components/icon';
import { CardImage } from './CardImage';

interface CardListItemProps {
  card: Card;
  banStatus?: BanStatus;
  onClick?: (card: Card) => void;
}

export const CardListItem = ({
  card,
  banStatus,
  onClick,
}: CardListItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger onClick={() => onClick?.(card)}>
          <div className="relative">
            <CardImage cardId={card.id} width={100} height={146} />
            {banStatus && (
              <div className="absolute bottom-0 left-0">
                <BanIcon banStatus={banStatus} />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <p className="font-bold">{card.name}</p>
          <p>{card.desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

import Forbidden from '@/assets/Forbidden.svg';
import Limited from '@/assets/Limited.svg';
import SemiLimited from '@/assets/SemiLimited.svg';
import { BanStatus } from '@/types';
import Image, { StaticImageData } from 'next/image';

const banStatusToSrcMap: Record<BanStatus, StaticImageData> = {
  forbidden: Forbidden,
  limited: Limited,
  semiLimited: SemiLimited,
};

interface BanIconProps {
  banStatus: BanStatus;
  width?: number | string;
}

export const BanIcon = ({ banStatus, width = 20 }: BanIconProps) => {
  return (
    <Image
      alt={`Ban icon for ${banStatus}`}
      src={banStatusToSrcMap[banStatus]}
      style={{ width, height: 'auto' }}
    />
  );
};

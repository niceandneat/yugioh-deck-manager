import Image from 'next/image';
import Level from '@/assets/Level.svg';

interface LevelIconProps {
  level: number;
  width?: number | string;
}

export const LevelIcon = ({ level = 1, width = 16 }: LevelIconProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: level }).map((_, i) => (
        <Image
          key={i}
          alt={`Level icon`}
          src={Level}
          style={{ width, height: 'auto' }}
        />
      ))}
    </div>
  );
};

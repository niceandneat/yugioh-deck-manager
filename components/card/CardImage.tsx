import Image from 'next/image';

interface CardImageProps {
  cardId: number;
  width?: number | string;
  height?: number | string;
}

export const CardImage = ({
  cardId,
  width = 100,
  height = 'auto',
}: CardImageProps) => {
  return (
    <Image
      alt={`${cardId}`}
      src={`/images/${cardId}.jpg`}
      width={412}
      height={614}
      style={{ width, height }}
    />
  );
};

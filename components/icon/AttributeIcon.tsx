import Image, { StaticImageData } from 'next/image';
import DARK from '@/assets/DARK.svg';
import EARTH from '@/assets/EARTH.svg';
import FIRE from '@/assets/FIRE.svg';
import LIGHT from '@/assets/LIGHT.svg';
import WATER from '@/assets/WATER.svg';
import WIND from '@/assets/WIND.svg';
import DIVINE from '@/assets/DIVINE.svg';
import attributeLangs from '@/langs/attribute.json';

const attributeToSrcMap: Record<string, StaticImageData> = {
  DARK: DARK,
  DIVINE: DIVINE,
  EARTH: EARTH,
  FIRE: FIRE,
  LIGHT: LIGHT,
  WATER: WATER,
  WIND: WIND,
};

const iconMap = Object.entries(attributeLangs).reduce(
  (res, [attribute, langs]) => {
    langs.forEach((lang) => {
      res[lang] = attributeToSrcMap[attribute];
    });
    return res;
  },
  { ...attributeToSrcMap }
);

interface AttributeIconProps {
  attribute: string;
  width?: number | string;
}

export const AttributeIcon = ({
  attribute,
  width = 20,
}: AttributeIconProps) => {
  return (
    <Image
      alt={`Attribute icon for ${attribute}`}
      src={iconMap[attribute]}
      style={{ width, height: 'auto' }}
    />
  );
};

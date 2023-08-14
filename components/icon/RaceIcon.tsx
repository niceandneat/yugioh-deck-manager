import Image, { StaticImageData } from 'next/image';
import Aqua from '@/assets/Aqua.png';
import BeastWarrior from '@/assets/Beast-Warrior.png';
import Beast from '@/assets/Beast.png';
import Continuous from '@/assets/Continuous.png';
import Counter from '@/assets/Counter.png';
import CreatorGod from '@/assets/Creator_God.png';
import Cyberse from '@/assets/Cyberse.png';
import Dinosaur from '@/assets/Dinosaur.png';
import DivineBeast from '@/assets/Divine-Beast.png';
import Dragon from '@/assets/Dragon.png';
import Equip from '@/assets/Equip.png';
import Fairy from '@/assets/Fairy.png';
import Field from '@/assets/Field.png';
import Fiend from '@/assets/Fiend.png';
import Fish from '@/assets/Fish.png';
import Illusion from '@/assets/Illusion.png';
import Insect from '@/assets/Insect.png';
import Machine from '@/assets/Machine.png';
import Normal from '@/assets/Normal.svg';
import Plant from '@/assets/Plant.png';
import Psychic from '@/assets/Psychic.png';
import Pyro from '@/assets/Pyro.png';
import QuickPlay from '@/assets/Quick-Play.png';
import Reptile from '@/assets/Reptile.png';
import Ritual from '@/assets/Ritual.png';
import Rock from '@/assets/Rock.png';
import SeaSerpent from '@/assets/Sea_Serpent.png';
import Spellcaster from '@/assets/Spellcaster.png';
import Thunder from '@/assets/Thunder.png';
import Warrior from '@/assets/Warrior.png';
import WingedBeast from '@/assets/Winged_Beast.png';
import Wyrm from '@/assets/Wyrm.png';
import Zombie from '@/assets/Zombie.png';
import raceLangs from '@/langs/race.json';

const raceToSrcMap: Record<string, StaticImageData> = {
  // Monster
  Aqua: Aqua,
  'Beast-Warrior': BeastWarrior,
  Beast: Beast,
  'Creator-God': CreatorGod,
  Cyberse: Cyberse,
  Dinosaur: Dinosaur,
  'Divine-Beast': DivineBeast,
  Dragon: Dragon,
  Fairy: Fairy,
  Fiend: Fiend,
  Fish: Fish,
  Illusion: Illusion,
  Insect: Insect,
  Machine: Machine,
  Plant: Plant,
  Psychic: Psychic,
  Pyro: Pyro,
  Reptile: Reptile,
  Rock: Rock,
  'Sea Serpent': SeaSerpent,
  Spellcaster: Spellcaster,
  Thunder: Thunder,
  Warrior: Warrior,
  'Winged Beast': WingedBeast,
  Wyrm: Wyrm,
  Zombie: Zombie,
  // Spell & Trap
  Continuous: Continuous,
  Counter: Counter,
  Equip: Equip,
  Field: Field,
  Normal: Normal,
  'Quick-Play': QuickPlay,
  Ritual: Ritual,
};

const iconMap = Object.entries(raceLangs).reduce(
  (res, [race, langs]) => {
    langs.forEach((lang) => {
      res[lang] = raceToSrcMap[race];
    });
    return res;
  },
  { ...raceToSrcMap }
);

interface RaceIconProps {
  race: string;
  width?: number | string;
}

export const RaceIcon = ({ race, width = 20 }: RaceIconProps) => {
  return (
    <Image
      alt={`Race icon for ${race}`}
      src={iconMap[race]}
      style={{ width, height: 'auto' }}
    />
  );
};

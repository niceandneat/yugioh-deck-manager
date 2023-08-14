import { BanDetail } from '@/components/ban';
import { getBans, getCards } from '@/lib/data';
import { getCardsFromIds } from '@/lib/select';

export async function generateStaticParams() {
  const { bans } = await getBans();

  return Object.keys(bans).map((date) => ({ date }));
}

export default async function Ban({ params }: { params: { date: string } }) {
  const { bans } = await getBans();
  const { cardsMap } = await getCards();

  const banName = decodeURIComponent(params.date);
  const ban = bans[banName];

  if (!ban) throw new Error(`Ban [${banName}] does not exist.`);

  const forbidden = getCardsFromIds(ban.forbidden, cardsMap);
  const limited = getCardsFromIds(ban.limited, cardsMap);
  const semiLimited = getCardsFromIds(ban.semiLimited, cardsMap);

  return (
    <BanDetail
      ban={ban}
      bans={bans}
      forbidden={forbidden}
      limited={limited}
      semiLimited={semiLimited}
    />
  );
}

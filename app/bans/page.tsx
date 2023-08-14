import { getBans } from '@/lib/data';
import { toDateString } from '@/lib/parse';
import { redirect } from 'next/navigation';

export default async function Bans() {
  const { bans } = await getBans();
  const [latestBan] = Object.values(bans);

  redirect(`/bans/${toDateString(latestBan.year, latestBan.month)}`);
}

import { createDeck } from '@/lib/data';
import { Deck } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const deck: Deck = await request.json();
    await createDeck(deck);

    return NextResponse.json(deck);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).toString() },
      { status: 500 }
    );
  }
}

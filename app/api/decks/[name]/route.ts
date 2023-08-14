import { deleteDeck, updateDeck } from '@/lib/data';
import { Deck } from '@/types';
import { NextResponse } from 'next/server';

interface RouteParams {
  name: string;
}

export async function PATCH(
  request: Request,
  { params }: { params: RouteParams }
) {
  const { name } = params;

  try {
    const deck: Deck = await request.json();
    await updateDeck(name, deck);

    return NextResponse.json(deck);
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).toString() },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams }
) {
  const { name } = params;

  try {
    await deleteDeck(name);

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error).toString() },
      { status: 500 }
    );
  }
}

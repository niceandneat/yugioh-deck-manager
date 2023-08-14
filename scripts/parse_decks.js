/**
 * @type {import('node:fs/promises')}
 **/
const { readFile, writeFile, mkdir } = require('node:fs/promises');
/**
 * @type {import('path')}
 **/
const path = require('node:path');
/**
 * @type {import('glob')}
 **/
const { glob } = require('glob');

const DECK_DIR = 'data/decks';

const parseJsonDeck = (text, kidToYid) => {
  const deck = JSON.parse(text.split('//')[0]);
  const { name, pick_cards, m, e, s } = deck;

  const main = m.ids.map(kidToYid);
  const extra = e.ids.map(kidToYid);
  const side = s.ids.map(kidToYid);

  const picks = pick_cards?.ids
    ? [...Object.values(pick_cards.ids)].map(kidToYid)
    : [...new Set(main)].slice(0, 3);

  return {
    name,
    picks,
    main,
    extra,
    side,
  };
};

const parseYdkDeck = (text) => {
  const lines = text.split(/\r?\n/);

  const mainIndex = lines.indexOf('#main');
  const extraIndex = lines.indexOf('#extra');
  const sideIndex = lines.indexOf('!side');

  const main = deck.slice(mainIndex + 1, extraIndex).map(Number);
  const extra = deck.slice(extraIndex + 1, sideIndex).map(Number);
  const side = deck.slice(sideIndex + 1, extraIndex).map(Number);
  const picks = [...new Set(main)].slice(0, 3);

  return {
    picks,
    main,
    extra,
    side,
  };
};

const parseJsonGameFileName = (filename) => {
  const kind = 'Game';
  const game = 'Tag Force 2 (GX)';
  const name = filename;
  const year = 2007;
  const month = 4;
  const rank = Number(filename.split(' ★')[1]);

  return { name, kind, game, year, month, rank };
};

const parseJsonFileName = (filename) => {
  const kind = 'Structure';
  const name = filename.split(' - ')[1];
  const date = filename.split(' - ')[0];
  const year = parseInt(date.split('-')[0]);
  const month = parseInt(date.split('-')[1]);

  return { name, kind, year, month };
};

const parseYdkFileName = (filename) => {
  const kind = 'Construct';
  const match = /(\d\d)_(\d\d)\s*(.*)/.exec(filename);
  const year = parseInt('20' + match[1]);
  const month = parseInt(match[2]);
  const name = match[3];

  return { name, kind, year, month };
};

const reorderKeys = (deck) => ({
  name: deck.name,
  kind: deck.kind,
  year: deck.year,
  month: deck.month,
  game: deck.game,
  rank: deck.rank,
  picks: deck.picks,
  main: deck.main,
  extra: deck.extra,
  side: deck.side,
});

const main = async () => {
  const directory = process.argv[2];
  const idFile = process.argv[3];
  const subPath = process.argv[4];

  const ids = (await readFile(idFile, 'utf8'))
    .split('\n')
    .map((line) => line.split(' ').map(Number));

  const kidToYidMap = new Map(ids.map(([a, b]) => [b, a]));
  const kidToYid = (kid) => kidToYidMap.get(kid);

  const jsonDeckFiles = await glob(`${directory}/**/*.json`);
  const ydkDeckFiles = await glob(`${directory}/**/*.ydk`);

  const decks = [];

  for (const file of jsonDeckFiles) {
    const text = await readFile(file, 'utf8');
    const filename = path.basename(file, path.extname(file));

    decks.push({
      ...parseJsonDeck(text, kidToYid),
      ...parseJsonGameFileName(filename),
    });
  }

  for (const file of ydkDeckFiles) {
    const text = await readFile(file, 'utf8');
    const filename = path.basename(file, path.extname(file));

    decks.push({ ...parseYdkDeck(text), ...parseYdkFileName(filename) });
  }

  const resultPath = path.resolve(DECK_DIR, subPath);
  await mkdir(resultPath, { recursive: false }).catch(() => undefined);
  for (const deck of decks) {
    await writeFile(
      path.resolve(resultPath, `${deck.name}.json`),
      JSON.stringify(reorderKeys(deck))
    );
  }
};

main();

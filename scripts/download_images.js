/**
 * @type {import('node:http')}
 **/
const http = require('node:http');
/**
 * @type {import('node:https')}
 **/
const https = require('node:https');
/**
 * @type {import('node:fs')}
 **/
const fs = require('node:fs');
/**
 * @type {import('node:path')}
 **/
const path = require('node:path');

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol
      .get(url, (response) => {
        // Check if the request was successful
        if (response.statusCode !== 200) {
          reject(new Error('Response status was ' + response.statusCode));
          return;
        }

        // Pipe the image data to the file
        response.pipe(file);

        file.on('finish', () => {
          file.close(resolve); // Close the write stream and resolve the promise
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete the file on error, ignore if it doesn't exist
        reject(err);
      });
  });
};

const main = async () => {
  const cardsFile = process.argv[2];
  const directory = process.argv[3];

  // Ensure directory exists
  await fs.promises.mkdir(directory).catch(() => undefined);

  const cards = JSON.parse(await fs.promises.readFile(cardsFile, 'utf-8')).data;
  const existingCardIds = new Set(
    (await fs.promises.readdir(directory)).map((file) =>
      Number(path.basename(file, 'jpg'))
    )
  );

  for (const [index, card] of Object.entries(cards.slice(0, 10))) {
    let skipped = false;

    for (const { id, image_url } of card.card_images) {
      if (existingCardIds.has(id)) {
        skipped = true;
        continue;
      }

      const detination = path.resolve(directory, `${id}.jpg`);
      await downloadImage(image_url, detination);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    if (!skipped) {
      console.log(new Date(), `${card.id}`, `(${index}/${cards.length})`);
    }
  }
};

main();

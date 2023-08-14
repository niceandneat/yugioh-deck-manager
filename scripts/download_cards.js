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

const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

const downloadJson = (url, dest) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error('Response status was ' + response.statusCode));
          return;
        }

        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', async () => {
          try {
            const jsonData = JSON.parse(data); // To ensure it's valid JSON
            await fs.promises.writeFile(
              dest,
              JSON.stringify(jsonData, null, 2)
            );
            resolve();
          } catch (error) {
            reject(new Error('Error parsing JSON: ' + error.message));
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const main = async () => {
  const directory = process.argv[2];

  // Ensure directory exists
  await fs.promises.mkdir(directory).catch(() => undefined);

  const detination = path.resolve(directory, 'cards.json');
  await downloadJson(API_URL, detination);

  console.log('Cards data saved in', detination);
};

main();

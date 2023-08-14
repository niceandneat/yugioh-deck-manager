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

const API_URL = 'https://ygoprodeck.com/api/banlist/getBanList.php';

// prettier-ignore
const banDates = [[7, 2023],[4, 2023],[1, 2023],[10, 2022],[7, 2022],[4, 2022],[1, 2022],[10, 2021],[7, 2021],[4, 2021],[1, 2021],[10, 2020],[7, 2020],[4, 2020],[1, 2020],[10, 2019],[7, 2019],[4, 2019],[1, 2019],[10, 2018],[7, 2018],[4, 2018],[1, 2018],[10, 2017],[7, 2017],[4, 2017],[1, 2017],[10, 2016],[7, 2016],[4, 2016],[1, 2016],[10, 2015],[4, 2015],[1, 2015],[10, 2014],[7, 2014],[4, 2014],[11, 2013],[3, 2013],[9, 2012],[9, 2011],[3, 2011],[9, 2010],[3, 2010],[9, 2009],[3, 2009],[9, 2008],[3, 2008],[9, 2007],[3, 2007],[9, 2006],[3, 2006],[9, 2005],[3, 2005],[9, 2004],[3, 2004],[10, 2003],[7, 2003],[4, 2003],[1, 2003],[5, 2002],[1, 2002],[5, 2001],[1, 2001],[11, 2000],[8, 2000],[7, 2000],[5, 2000],[2, 2000],[7, 1999]];

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.toString().startsWith('https') ? https : http;

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

        response.on('end', () => {
          try {
            resolve(JSON.parse(data));
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

  const bans = [];
  for (const [month, year] of banDates) {
    const url = new URL(API_URL);
    url.searchParams.set('list', 'OCG');
    url.searchParams.set(
      'date',
      `${year}-${month.toString().padStart(2, '0')}-01`
    );

    const data = await fetchJson(url);

    const forbidden = [];
    const limited = [];
    const semiLimited = [];

    for (const d of data) {
      switch (d.status_text) {
        case 'Banned':
          forbidden.push(d.id);
        case 'Limited':
          limited.push(d.id);
        case 'Semi-Limited':
          semiLimited.push(d.id);
      }
    }

    bans.push({ year, month, forbidden, limited, semiLimited });

    console.log(
      'Downloaded ban data for',
      `${year}-${month.toString().padStart(2, '0')}`
    );
  }

  const detination = path.resolve(directory, 'bans.json');
  await fs.promises.writeFile(detination, JSON.stringify(bans, null, 2));

  console.log('Bans data saved in', detination);
};

main();

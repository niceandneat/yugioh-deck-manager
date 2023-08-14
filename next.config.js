/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/decks',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

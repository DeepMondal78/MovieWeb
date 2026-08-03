/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:5000/api/:path*', // ব্যাকএন্ড সার্ভারের লিংক
      },
    ];
  },
};

module.exports = nextConfig;
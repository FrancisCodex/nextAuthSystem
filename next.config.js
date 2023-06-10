/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.REACT_APP_UPLOAD_URL, 'image.tmdb.org'],
  },
};

module.exports = nextConfig

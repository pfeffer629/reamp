/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  reactStrictMode: false,
  images: {
    domains: ["spinamp.mypinata.cloud", "ipfs.io", "i.seadn.io", "arweave.net"],
  },
}

const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching
})(
  config
);

module.exports = nextConfig;

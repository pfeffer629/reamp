/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache.js');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  reactStrictMode: false,
  images: {
    domains: [
      "spinamp.mypinata.cloud", 
      "web3-music-pipeline.mypinata.cloud", 
      "cf-prod.noizd.com", 
      "ipfs.io", 
      "i.seadn.io", 
      "arweave.net", 
      "storageapi.fleek.co", 
      "storageapi.fleek.one", 
      "catalog-dev.s3.filebase.com",
      "d2i9ybouka0ieh.cloudfront.net",
      "catalog-prod.s3.filebase.com",
      "gateway.ipfs.io",
    ],
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

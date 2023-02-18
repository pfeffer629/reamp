/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["spinamp.mypinata.cloud", "ipfs.io", "i.seadn.io", "arweave.net"],
  },
};

module.exports = withPWA({
  nextConfig
})

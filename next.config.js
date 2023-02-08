/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["spinamp.mypinata.cloud", "ipfs.io", "i.seadn.io", "arweave.net"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["spinamp.mypinata.cloud", "ipfs.io"],
  },
};

module.exports = nextConfig;

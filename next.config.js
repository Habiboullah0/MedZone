/** @type {import("next").NextConfig} */
const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // any other configurations
};

module.exports = nextConfig;


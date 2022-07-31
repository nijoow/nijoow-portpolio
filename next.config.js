const debug = process.env.NODE_ENV !== "production";
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  assetPrefix: !debug ? "https://nijoow.github.io/" : "",
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    prependData: `@use '~@/styles/_variables.scss' as *;`,
  },
};

module.exports = nextConfig;

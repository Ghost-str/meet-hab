const path = require('node:path'); 

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compress: false,
    poweredByHeader: false,
    reactStrictMode: true,
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../'),
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;

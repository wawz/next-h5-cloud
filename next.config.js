/** @type {import('next').NextConfig} */
const withImages = require('next-images');
module.exports = withImages({
  reactStrictMode: true,
  inlineImageLimit: false,
  name: '[name].[hash:8].[ext]',
  images: {
    domains: ['clarins-te.oss-cn-hongkong.aliyuncs.com'],
    minimumCacheTTL: 31536000,
  },
  headers: async () => {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  generateBuildId: async () => {
    return 'my-build-id'
  },
  webpack5: true,
  poweredByHeader: false,
  generateEtags: false
})

/** @type {import('next').NextConfig} */
const withImages = require('next-images');
module.exports = withImages({
  reactStrictMode: true,
  inlineImageLimit: false,
  name: '[name].[hash:8].[ext]',
  images: {
    disableStaticImages: true
  },
  images: {
    domains: ['clarins-te.oss-cn-hongkong.aliyuncs.com'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3|mp4)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: -1,
            publicPath: `/_next/static/media/`,
            outputPath: `${isServer ? '../' : ''}static/media/`,
            name: '[name]-[hash:8].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    });
    return config;
  },
  i18n: {
    locales: ['sc-tr', 'en-tr', 'fr-tr'],
    defaultLocale: 'sc-tr',
    localeDetection: false
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
  compress: false,
  generateEtags: false
})

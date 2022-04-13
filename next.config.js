/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['bm-h5-cp.oss-cn-shanghai.aliyuncs.com', 'qq-proj.oss-cn-beijing.aliyuncs.com'],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id'
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
}

module.exports = nextConfig

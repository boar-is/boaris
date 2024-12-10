import withBundleAnalyzer from '@next/bundle-analyzer'
import optimizeLocales from '@react-aria/optimize-locales-plugin'
import type { NextConfig } from 'next'
import { isLocalhost } from '~/lib/metadata/base-url'

const isAnalyze = globalThis.process.env['ANALYZE'] === 'true'

const baseNextConfig: NextConfig = {
  productionBrowserSourceMaps: isAnalyze,
  experimental: {
    optimizePackageImports: [
      'react-aria-components',
      'effect',
      'motion',
      'motion/react',
    ],
  },
  webpack(config) {
    config.plugins.push(
      optimizeLocales.webpack({
        locales: ['en-US'],
      }),
    )
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
  default-src 'self' vercel.live;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com unpkg.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  media-src 'self';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  ${isLocalhost ? '' : 'upgrade-insecure-requests;'}
`.replace(/\n/g, ''),
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          ...(isLocalhost
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=31536000; includeSubDomains; preload',
                },
              ]),
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

const nextConfig = withBundleAnalyzer({
  enabled: isAnalyze,
  openAnalyzer: true,
})(baseNextConfig)

export default nextConfig

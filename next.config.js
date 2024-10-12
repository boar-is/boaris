import withBundleAnalyzer from '@next/bundle-analyzer'
import optimizeLocales from '@react-aria/optimize-locales-plugin'

/** @type {import('next').NextConfig} */
const baseNextConfig = {
  experimental: {
    optimizePackageImports: ['react-aria-components', 'usehooks-ts'],
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
      {
        protocol: 'https',
        hostname: process.env['NEXT_PUBLIC_CONVEX_URL'].replace('https://', ''),
        port: '',
      },
    ],
  },
}

const nextConfig = withBundleAnalyzer({
  enabled: globalThis.process.env.ANALYZE === 'true',
  openAnalyzer: true,
})(baseNextConfig)

export default nextConfig

import withBundleAnalyzer from '@next/bundle-analyzer'
import optimizeLocales from '@react-aria/optimize-locales-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: globalThis.process.env.ANALYZE === 'true',
  openAnalyzer: true,
})({
  webpack(config) {
    config.plugins.push(
      optimizeLocales.webpack({
        locales: ['en-US'],
      }),
    )
    return config
  },
})

export default nextConfig

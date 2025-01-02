import {
  getSocialImageMetadataBaseFallback,
  resolveAbsoluteUrlWithPathname,
} from 'next/dist/lib/metadata/resolvers/resolve-url'

export const resolveUrl = (url = '/') =>
  resolveAbsoluteUrlWithPathname(
    url,
    getSocialImageMetadataBaseFallback(null),
    {
      trailingSlash: false,
      pathname: '/',
      isStaticMetadataRouteFile: false,
    },
  )

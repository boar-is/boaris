import type { MetadataRoute } from 'next'
import { resolveUrl } from '~/lib/metadata/resolvers'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: resolveUrl('sitemap.xml'),
  }
}

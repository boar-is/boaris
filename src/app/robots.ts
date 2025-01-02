import type { MetadataRoute } from 'next'
import { baseUrl } from '~/lib/metadata/base-url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

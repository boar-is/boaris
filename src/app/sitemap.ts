import { DateTime } from 'effect'
import type { MetadataRoute } from 'next'
import { baseUrl } from '~/lib/metadata/base-url'
import { posts } from '~/model/post'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
    },
    ...posts.map((it) => ({
      url: `${baseUrl}/blog/${it.slug}`,
      lastModified: it.updateDate.pipe(DateTime.toDate),
    })),
  ]
}

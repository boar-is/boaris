import { DateTime } from 'effect'
import type { MetadataRoute } from 'next'
import { resolveUrl } from '~/lib/metadata/resolvers'
import { posts } from '~/model/post'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: resolveUrl(),
    },
    ...posts.map((it) => ({
      url: resolveUrl(`/blog/${it.slug}`),
      lastModified: it.updateDate.pipe(DateTime.toDate),
    })),
  ]
}

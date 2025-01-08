import { DateTime, Schema } from 'effect'
import type { MetadataRoute } from 'next'
import { resolveUrl } from '~/lib/routing/resolvers'
import { postRepository } from '~/model/data/post'
import { Post } from '~/model/post'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = Schema.decodeSync(Schema.Array(Post))(postRepository)

  return [
    {
      url: resolveUrl(),
    },
    ...posts.map((it) => ({
      url: resolveUrl(`/p/${it.slug}`),
      lastModified: it.updateDate.pipe(DateTime.toDate),
    })),
  ]
}

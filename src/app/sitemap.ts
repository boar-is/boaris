import { DateTime } from 'effect'
import type { MetadataRoute } from 'next'
import { resolveUrl } from '~/lib/metadata/resolvers'
import { postRepository } from '~/model/data/post'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: resolveUrl(),
    },
    ...postRepository.map((it) => ({
      url: resolveUrl(`/p/${it.slug}`),
      lastModified: it.updateDate.pipe(DateTime.toDate),
    })),
  ]
}

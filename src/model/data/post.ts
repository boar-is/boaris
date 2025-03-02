import { DateTime, Option } from 'effect'
import { pp1, s1 } from '~/model/_no-db-helpers'
import type { Post } from '~/model/post'

export const postRepository: ReadonlyArray<typeof Post.Encoded> = [
  {
    slug: 'nextjs-metadata',
    title: 'The Ultimate Next.js Metadata Guide for 2025',
    lead: 'The Next.js Metadata API gives us tools but no map. This is the map: a simple, practical guide to set it up, forget it, and move on. Stop wasting time on metadata and focus on what really matters — building your project.',
    description:
      'The Next.js Metadata API gives us tools but no map. This is the map: set it up, forget it, and get back to building what matters.',
    posterUrl: '/assets/nextjs-metadata/poster.png',
    tags: ['Next.js'],
    interpolation: {
      // @ts-expect-error
      input: [0, s1].map(pp1),
      // @ts-expect-error
      output: [0, s1].map(pp1),
    },
    date: DateTime.make({ year: 2025, month: 3, day: 1 }).pipe(
      Option.getOrThrow,
      DateTime.toEpochMillis,
    ),
    updateDate: DateTime.make({ year: 2025, month: 3, day: 1 }).pipe(
      Option.getOrThrow,
      DateTime.toEpochMillis,
    ),
    twitterUrl: 'https://x.com/MrBoaris/status/1896118623460307437',
  },
]

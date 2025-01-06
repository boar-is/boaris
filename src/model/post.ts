import { DateTime, Option, Schema } from 'effect'

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.NonEmptyTrimmedString,
  description: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  posterUrl: Schema.NonEmptyTrimmedString,
  tags: Schema.Array(Schema.NonEmptyTrimmedString),
  interpolation: Schema.Struct({
    input: Schema.NonEmptyArray(Schema.Number),
    output: Schema.NonEmptyArray(Schema.Number),
  }),
  date: Schema.DateTimeUtcFromNumber,
  updateDate: Schema.DateTimeUtcFromNumber,
}) {}

export const postRepository: ReadonlyArray<Post> = [
  new Post({
    slug: 'nextjs-metadata',
    title: 'The Ultimate Next.js Metadata Guide for 2025',
    lead: 'The Next.js Metadata API gives us tools but no map. This is the map: a simple, practical guide to set it up, forget it, and move on. Stop wasting time on metadata and focus on what really matters — building your project.',
    description: Option.some(
      'The Next.js Metadata API gives us tools but no map. This is the map: set it up, forget it, and get back to building what matters.',
    ),
    posterUrl: '/assets/nextjs-metadata/poster.webp',
    tags: ['Next.js'],
    interpolation: {
      // @ts-expect-error
      input: [0, 300, 7024, 7400, 8372, 9100, 10700, s1].map(pp1),
      // @ts-expect-error
      output: [0, 1599, 7024, 7763, 8372, 9767, 10437, s1].map(pp1),
    },
    date: DateTime.make({ year: 2025, month: 1, day: 7 }).pipe(
      Option.getOrThrow,
    ),
    updateDate: DateTime.make({ year: 2025, month: 1, day: 7 }).pipe(
      Option.getOrThrow,
    ),
  }),
]

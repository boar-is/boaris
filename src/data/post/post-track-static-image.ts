import * as S from '@effect/schema/Schema'

export class PostTrackStaticImage extends S.TaggedClass<PostTrackStaticImage>()(
  'PostTrackStaticImage',
  {
    id: S.NonEmptyTrimmedString,
    name: S.NonEmptyTrimmedString,
    url: S.NonEmptyTrimmedString,
    caption: S.Option(S.NonEmptyTrimmedString),
    alt: S.Option(S.NonEmptyTrimmedString),
  },
) {}

import * as S from '@effect/schema/Schema'

export class PostTrackStaticImage extends S.TaggedClass<PostTrackStaticImage>()(
  'PostTrackStaticImage',
  {
    id: S.NonEmptyString,
    name: S.NonEmptyString,
    url: S.NonEmptyString,
    caption: S.Option(S.NonEmptyString),
    alt: S.Option(S.NonEmptyString),
  },
) {}

import * as S from '@effect/schema/Schema'

export class PostTrackDynamicImage extends S.TaggedClass<PostTrackDynamicImage>()(
  'PostTrackDynamicImage',
  {
    id: S.NonEmptyString,
    name: S.NonEmptyString,
    url: S.NonEmptyString,
    caption: S.Option(S.NonEmptyString),
  },
) {}

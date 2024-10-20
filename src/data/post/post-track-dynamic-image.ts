import * as S from '@effect/schema/Schema'

export class PostTrackDynamicImage extends S.TaggedClass<PostTrackDynamicImage>()(
  'PostTrackDynamicImage',
  {
    id: S.NonEmptyTrimmedString,
    name: S.NonEmptyTrimmedString,
    url: S.NonEmptyTrimmedString,
    caption: S.Option(S.NonEmptyTrimmedString),
  },
) {}

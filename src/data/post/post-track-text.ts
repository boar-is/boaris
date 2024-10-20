import * as S from '@effect/schema/Schema'

export class PostTrackText extends S.TaggedClass<PostTrackText>()(
  'PostTrackText',
  {
    id: S.NonEmptyTrimmedString,
    name: S.NonEmptyTrimmedString,
    value: S.NonEmptyTrimmedString,
  },
) {}

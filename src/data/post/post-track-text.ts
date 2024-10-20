import * as S from '@effect/schema/Schema'

export class PostTrackText extends S.TaggedClass<PostTrackText>()(
  'PostTrackText',
  {
    id: S.NonEmptyString,
    name: S.NonEmptyString,
    value: S.NonEmptyString,
  },
) {}

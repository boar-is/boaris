import * as S from '@effect/schema/Schema'

export class PostTrackBase extends S.Class<PostTrackBase>('PostTrackBase')({
  id: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
}) {}

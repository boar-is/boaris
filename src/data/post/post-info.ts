import * as S from '@effect/schema/Schema'

export class PostInfo extends S.Class<PostInfo>('PostInfo')({
  title: S.NonEmptyTrimmedString,
  lead: S.Option(S.NonEmptyTrimmedString),
  description: S.NonEmptyTrimmedString,
  date: S.DateFromNumber,
  thumbnailUrl: S.Option(S.NonEmptyTrimmedString),
}) {}

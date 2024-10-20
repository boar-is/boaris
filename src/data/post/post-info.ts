import * as S from '@effect/schema/Schema'

export class PostInfo extends S.Class<PostInfo>('PostInfo')({
  title: S.NonEmptyString,
  lead: S.Option(S.NonEmptyString),
  description: S.NonEmptyString,
  date: S.DateFromNumber,
  thumbnailUrl: S.Option(S.NonEmptyString),
}) {}

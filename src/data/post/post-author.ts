import * as S from '@effect/schema/Schema'

export class PostAuthor extends S.Class<PostAuthor>('PostAuthor')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
  avatarUrl: S.Option(S.NonEmptyTrimmedString),
}) {}

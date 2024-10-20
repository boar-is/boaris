import * as S from '@effect/schema/Schema'

export class PostAuthor extends S.Class<PostAuthor>('PostAuthor')({
  slug: S.NonEmptyString,
  name: S.NonEmptyString,
  avatarUrl: S.Option(S.NonEmptyString),
}) {}

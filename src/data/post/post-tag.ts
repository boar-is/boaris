import * as S from '@effect/schema/Schema'

export class PostTag extends S.Class<PostTag>('PostTag')({
  slug: S.NonEmptyString,
  name: S.NonEmptyString,
}) {}

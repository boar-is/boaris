import * as S from '@effect/schema/Schema'

export class PostLayoutLayer extends S.Class<PostLayoutLayer>(
  'PostLayoutLayer',
)({
  areas: S.NonEmptyString,
  columns: S.OptionFromUndefinedOr(S.NonEmptyString),
  rows: S.OptionFromUndefinedOr(S.NonEmptyString),
}) {}

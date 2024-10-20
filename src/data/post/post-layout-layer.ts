import * as S from '@effect/schema/Schema'

export class PostLayoutLayer extends S.Class<PostLayoutLayer>(
  'PostLayoutLayer',
)({
  areas: S.NonEmptyTrimmedString,
  columns: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  rows: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {}

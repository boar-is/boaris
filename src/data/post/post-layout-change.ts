import * as S from '@effect/schema/Schema'
import { PostLayout } from './post-layout'

export class PostLayoutChange extends S.Class<PostLayoutChange>(
  'PostLayoutChange',
)({
  id: S.NonEmptyTrimmedString,
  at: S.Number,
  value: S.OptionFromUndefinedOr(PostLayout),
}) {}

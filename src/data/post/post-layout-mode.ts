import * as S from '@effect/schema/Schema'

export const PostLayoutMode = S.Literal(
  'static',
  'scrolling',
  'watching',
  'sliding',
)

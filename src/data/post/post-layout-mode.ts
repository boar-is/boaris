import { Schema } from '@effect/schema'

export const PostLayoutMode = Schema.Literal(
  'static',
  'scrolling',
  'watching',
  'sliding',
)

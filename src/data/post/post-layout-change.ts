import { Schema } from '@effect/schema'
import { PostLayout } from '~/data/post/post-layout'

export class PostLayoutChange extends Schema.Class<PostLayoutChange>(
  'PostLayoutChange',
)({
  id: Schema.NonEmptyString,
  at: Schema.Number,
  value: Schema.OptionFromUndefinedOr(PostLayout),
}) {}

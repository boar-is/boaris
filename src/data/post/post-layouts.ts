import { Schema } from '@effect/schema'
import { PostLayoutChange } from './post-layout-change'
import { PostLayoutMode } from './post-layout-mode'

export class PostLayout extends Schema.Class<PostLayout>('PostLayout')({
  modes: Schema.NonEmptyArray(PostLayoutMode),
  changes: Schema.Array(PostLayoutChange),
}) {}

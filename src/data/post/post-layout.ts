import { Schema } from '@effect/schema'
import { PostLayoutLayer } from './post-layout-layer'

export class PostLayout extends Schema.Class<PostLayout>('PostLayout')({
  static: Schema.OptionFromUndefinedOr(PostLayoutLayer),
  floating: Schema.OptionFromUndefinedOr(PostLayoutLayer),
}) {}

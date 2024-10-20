import { Schema } from '@effect/schema'

export class PostTag extends Schema.Class<PostTag>('PostTag')({
  slug: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
}) {}

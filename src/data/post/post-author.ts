import { Schema } from '@effect/schema'

export class PostAuthor extends Schema.Class<PostAuthor>('PostAuthor')({
  slug: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  avatarUrl: Schema.Option(Schema.NonEmptyString),
}) {}

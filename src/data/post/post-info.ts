import { Schema } from '@effect/schema'

export class PostInfo extends Schema.Class<PostInfo>('PostInfo')({
  title: Schema.NonEmptyString,
  lead: Schema.Option(Schema.NonEmptyString),
  description: Schema.NonEmptyString,
  date: Schema.DateFromNumber,
  thumbnailUrl: Schema.Option(Schema.NonEmptyString),
}) {}

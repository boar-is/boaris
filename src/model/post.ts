import { Schema } from 'effect'

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.NonEmptyTrimmedString,
  description: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  posterUrl: Schema.NonEmptyTrimmedString,
  tags: Schema.Array(Schema.NonEmptyTrimmedString),
  interpolation: Schema.Struct({
    input: Schema.NonEmptyArray(Schema.Number),
    output: Schema.NonEmptyArray(Schema.Number),
  }),
  date: Schema.DateTimeUtcFromNumber,
  updateDate: Schema.DateTimeUtcFromNumber,
}) {}

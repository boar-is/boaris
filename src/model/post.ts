import { Schema } from 'effect'

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.NonEmptyTrimmedString,
  description: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  posterUrl: Schema.NonEmptyTrimmedString,
  tags: Schema.Array(Schema.NonEmptyTrimmedString),
  date: Schema.DateTimeUtcFromNumber,
  updateDate: Schema.DateTimeUtcFromNumber,
  twitterUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {}

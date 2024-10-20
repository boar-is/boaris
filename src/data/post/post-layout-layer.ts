import { Schema } from '@effect/schema'

export class PostLayoutLayer extends Schema.Class<PostLayoutLayer>(
  'PostLayoutLayer',
)({
  areas: Schema.NonEmptyString,
  columns: Schema.OptionFromUndefinedOr(Schema.NonEmptyString),
  rows: Schema.OptionFromUndefinedOr(Schema.NonEmptyString),
}) {}

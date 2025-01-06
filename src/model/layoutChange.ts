import { Schema } from 'effect'

export class LayoutChange extends Schema.Class<LayoutChange>('LayoutChange')({
  postSlug: Schema.NonEmptyTrimmedString,
  offset: Schema.Number,
  areas: Schema.String,
}) {}

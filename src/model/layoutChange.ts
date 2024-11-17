import { Schema } from 'effect'

export class LayoutChange extends Schema.Class<LayoutChange>('LayoutChange')({
  offset: Schema.Number,
  areas: Schema.String,
}) {}

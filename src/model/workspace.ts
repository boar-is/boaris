import { Schema } from 'effect'

export class Workspace extends Schema.Class<Workspace>('Workspace')({
  name: Schema.NonEmptyTrimmedString,
  description: Schema.NonEmptyTrimmedString,
  socialLinks: Schema.Array(
    Schema.Struct({
      href: Schema.NonEmptyTrimmedString,
      label: Schema.NonEmptyTrimmedString,
    }),
  ),
}) {}
